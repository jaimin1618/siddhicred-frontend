import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import User from "../../context/User";
import IPFS from "../../utilities/ipfs/pinata";
import { Earner } from "../../utilities/templates";
import ProgressBar from "../../common/ProgressBar";
import Interface from "../../utilities/contract/index";

const Register = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [isLoading, setIsLoading] = useState(false);
  const [earnerProfile, setEarnerProfile] = useState({
    fname: "",
    lname: "",
    about: "",
    address: "",
    profileImageURL: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const { address } = useContext(User);
  const [progressed, setProgressed] = useState(0);

  // useEffect
  useEffect(() => {
    if (!address) return;

    setEarnerProfile({
      ...earnerProfile,
      address: address,
    });
  }, [address]);

  // functions/methods
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEarnerProfile({
      ...earnerProfile,
      [name]: value,
    });
  };

  const uploadProfileImage = async () => {
    const image = new FormData();
    const fileName = `siddhicred-earner-profile-picture-${earnerProfile.address}`;

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

    // Now, upload on IPFS and return CID & status
    const res = await IPFS.pinFile(image);

    return res;
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Image uploaded successfully!👍",
    });
  };

  const handleSubmitButtonClick = async () => {
    // upload profile picture image
    setIsLoading(true);
    const uploadImage = await uploadProfileImage();

    // IF: profile image upload fails
    if (uploadImage.Status === "Error") {
      toast.error("Error! Failed to upload Issuer profile picture to IPFS.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      setIsLoading(false);
      return;
    }

    setProgressed(20);
    // IF: 1) profile image upload success
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      toast.success("Success! User profile picture uploaded successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

    // 2) create Earner content JSON
    const newEarnerProfile = {
      ...earnerProfile,
      profileImageURL: GATEWAY + uploadImage.IpfsHash,
    };

    setProgressed(40);
    setEarnerProfile(newEarnerProfile);

    // 3) upload Earner content JSON
    const earner = new Earner(newEarnerProfile);
    const uploadJson = await IPFS.pinJson(earner);

    // IF: Json upload fails
    if (uploadJson.Status === "Error") {
      toast.error("Error! Uploading new earner content to IPFS failed.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      setIsLoading(false);
      return;
    }
    setProgressed(60);

    // IF: 4) earner content upload success
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      toast.success("Success! Earner content uploaded to IPFS successfully.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });
    setProgressed(70);

    // 5) update contract state with Earner address and CID
    const res = await Interface.Public.registerEarner(uploadJson.IpfsHash);
    setProfileImage(85);

    if (res.Status === "Error") {
      toast.error(res.Message, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } else if (res.Status === "Success") {
      toast.success(
        "This public address is registered as Earner successfully!",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: 3000,
        }
      );
    }

    // 6) Final result
    setProgressed(100);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center px-12 my-5">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        {isLoading && <ProgressBar progressedPercent={progressed} />}

        <form
          className={`py-0 lg:px-6 px-0 ${
            isLoading ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="mb-3 pt-0">
            <label className="mb-3 block text-lg font-semibold text-[#07074D]">
              Upload Profile Image
            </label>

            <div className="mb-5">
              <input
                disabled={isLoading ? "disabled" : ""}
                onChange={(e) => handleFileChange(e)}
                type="file"
                name="file"
                id="file"
                className="sr-only"
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
              >
                <div>
                  <span className="mb-1 block text-xl font-semibold text-[#07074D]">
                    Drop files here
                  </span>
                  <span className="mb-1 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-3 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              Public wallet address
            </label>
            <input
              disabled
              value={address}
              name="address"
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="0xfd87..."
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="flex lg:flex-row md:flex-row justify-evenly flex-col mb-3">
            <div className="mx-1">
              <label
                htmlFor="text"
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                First name
              </label>
              <input
                disabled={isLoading ? "disabled" : ""}
                value={earnerProfile.fname}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="fname"
                id=""
                placeholder="Jane"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mx-1 mt-2 lg:mt-0 md:mt-0">
              <label
                htmlFor="text"
                className="mb-1 block text-base font-medium text-[#07074D]"
              >
                Last name
              </label>
              <input
                disabled={isLoading ? "disabled" : ""}
                value={earnerProfile.lname}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="lname"
                id=""
                placeholder="Doe"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="mb-1 block text-base font-medium text-[#07074D]"
            >
              About
            </label>
            <textarea
              disabled={isLoading ? "disabled" : ""}
              value={earnerProfile.about}
              onChange={(e) => handleInputChange(e)}
              name="about"
              id=""
              className="mt-0 p-2 w-full rounded-lg align-top sm:text-sm border border-dashed border-[#e0e0e0]  text-base font-medium"
              rows="4"
              placeholder="Write about yourself..."
            ></textarea>
          </div>

          <div>
            <button
              type="button"
              onClick={() => handleSubmitButtonClick()}
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
