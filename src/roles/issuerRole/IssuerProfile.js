import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import User from "../../context/User";
import Interface from "../../utilities/contract";
import IPFS from "../../utilities/ipfs/pinata";
import { Issuer } from "../../utilities/templates";

const IssuerProfile = () => {
  const { address, role } = useContext(User);
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    address: "",
    profileImageURL: "",
    issuerName: "",
    organizationName: "",
    description: "",
    country: "",
    contact: "",
    website: "",
    becameIssuerOn: "",
  });

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
    setProfile({
      ...profile,
      profileImageURL: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const uploadProfileImage = async () => {
    const image = new FormData();
    const fileName = `siddhicred-issuer-profile-picture-${profile.address}-2`;

    // other image metadata and version
    const metadata = JSON.stringify({
      name: fileName,
    });
    const options = JSON.stringify({
      cidVersion: 0,
    });

    image.append("file", profileImage);
    image.append("pinataMetadata", metadata);
    image.append("pinataOptions", options);
    console.log("img: ", image);

    // Now, upload on IPFS and return CID & status
    const res = await IPFS.pinFile(image);
    console.log(res);

    return res;
  };

  const handleIssuerUpdateButton = async () => {
    // upload profile picture on IPFS and get CID
    const upload = await uploadProfileImage();

    // IF: profile image upload fails
    if (upload.Status === "Error") {
      toast.error("Error! Failed to upload Issuer profile picture to IPFS.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    // IF: profile image upload success
    toast.success("Success! Issuer profile picture uploaded successfully.", {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
    });

    // create Issuer content JSON
    const newProfile = {
      ...profile,
      profileImageURL: GATEWAY + upload.IpfsHash,
    };
    // console.log(newProfile);
    setProfile(newProfile);

    // upload Issuer content JSON
    const issuer = new Issuer(newProfile);
    const uploadJson = await IPFS.pinJson(issuer);

    // IF: Json upload fails
    if (uploadJson.Status === "Error") {
      toast.error("Error! Uploading new Issuer content to IPFS failed.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    // IF: profile image upload success
    toast.success("Success! Issuer Content uploaded to IPFS successfully.", {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
    });

    // update contract state with Issuer address and CID
    const res = await Interface.Admin.updateIssuer(
      issuer.address,
      uploadJson.IpfsHash
    );

    if (res.Status === "Error") {
      toast.error(res.Message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } else if (res.Status === "Success") {
      toast.success(res.Message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      // IF: Successfully removed, perform clean-up on IPFS (deal with this later!)
    }
  };

  useEffect(() => {
    const getIssuerInfo = async () => {
      if (!address) return;
      const res = await Interface.Public.getIssuerInfo(address);
      console.log(res);

      if (res.Status === "Error") {
        toast.error(res.Message, {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: 3000,
        });
        return;
      }

      const { IpfsHash } = res;
      const httpRes = await axios.get(GATEWAY + IpfsHash);
      const json = httpRes.data;
      console.log(httpRes.data);
      setProfile(json);

      toast.success(res.Message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });
    };

    getIssuerInfo();
  }, [address]);

  return (
    <div className="h-5/6 p-3 bg-gray-100 font-medium flex items-center justify-center mt-24">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 md:mt-14 sm:mt-14">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <img
                  src={
                    profile.profileImageURL
                      ? profile.profileImageURL
                      : "/notfound.png"
                  }
                  className="bg-red-400 w-1/2 m-auto rounded-full"
                  alt="Avatar"
                />
                <div className="flex justify-center mt-8">
                  <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                    <div className="m-4">
                      <label className="inline-block mb-2 text-gray-500">
                        Upload Profile Picture
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-24 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div className="flex flex-col items-center justify-center pt-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Attach a file
                            </p>
                          </div>
                          <input
                            disabled
                            name="profileImage"
                            type="file"
                            className="opacity-0"
                            onChange={(e) => handleFileChange(e)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3">
                    <label htmlFor="address">Organization Name</label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="organizationName"
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={profile.organizationName}
                      placeholder="Apple Inc."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">
                      Issuer Name (from organization)
                    </label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      name="issuerName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={profile.issuerName}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Issuer Public Address</label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="address"
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                      placeholder="0xf39Fd6e51..."
                      value={profile.address}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Contact Email Address</label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="contact"
                      value={profile.contact}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Organization website</label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="website"
                      profile={profile.website}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={profile.website}
                      placeholder="https://myorganization.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Country</label>
                    <input
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="country"
                      value={profile.country}
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="India"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Organization description </label>
                    <textarea
                      disabled
                      onChange={(e) => handleInputChange(e)}
                      name="description"
                      value={profile.description}
                      type="text"
                      className="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="More information about organization..."
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        onClick={() => handleIssuerUpdateButton()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded"
                      >
                        Update Issuer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerProfile;
