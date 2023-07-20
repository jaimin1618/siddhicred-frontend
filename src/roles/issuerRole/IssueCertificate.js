import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { isAddress } from "ethers";

import IPFS from "../../utilities/ipfs/pinata";
import User from "../../context/User";
import Interface from "../../utilities/contract/";
import { Certificate } from "../../utilities/templates";

const IssueCertificate = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const { address, role } = useContext(User);
  const [issuerInfo, setIssuerInfo] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    description: "",
    issuedToName: "",
    issuedToPublicAddress: "",
  });
  const [mintInfo, setMintInfo] = useState({
    walletAddress: "",
    ipfsHash: "",
  });

  const handleFileChange = (e) => {
    setCertificateImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  const uploadCertificateImage = async () => {
    const image = new FormData();
    const fileName = `siddhicred-certificate-${info.name}-issuedBy-${address}`;

    // other image metadata and version
    const metadata = JSON.stringify({
      name: fileName,
    });
    const options = JSON.stringify({
      cidVersion: 0,
    });

    image.append("file", certificateImage);
    image.append("pinataMetadata", metadata);
    image.append("pinataOptions", options);

    // Now, upload on IPFS and return CID & status
    const res = await IPFS.pinFile(image);

    return res;
  };

  const validateInput = () => {
    let error = null;

    if (!certificateImage) {
      error = "Certificate image is required.";
      return error;
    }

    for (let k in info) {
      if (info[k] === "" || info[k].length === 0) {
        error = `${k} is required.`;
        break;
      }

      if (k !== "description" && info[k].length > 255) {
        error = `${k} must not be more than 255 characters long`;
        break;
      }

      if (k === "description" && info[k].length > 500) {
        error = `${k} must not be more than 500 characters long`;
        break;
      }

      if (k === "issuedToPublicAddress") {
        if (!isAddress(info[k])) {
          error = "Invalid public address! provide valid public address";
          break;
        }
      }
    }

    return error;
  };

  const handleButtonClick = async () => {
    // handle input validations
    const validationError = validateInput();
    console.log(validationError);
    if (validationError) {
      toast.warn(validationError, {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    // upload certificate image
    const imageUpload = await uploadCertificateImage();

    // IF: profile image upload fails
    if (imageUpload.Status === "Error") {
      toast.error(
        "Error! Failed to upload Certificate Image/picture to IPFS.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: 3000,
        }
      );

      return;
    }

    // IF: profile image upload success
    toast.success("Success! Certificate Image/picture uploaded successfully.", {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
    });

    // create Certificate template with CID of certificate image
    const infoJson = {
      ...info,
      imageURL: GATEWAY + imageUpload.IpfsHash,
      issuer: issuerInfo,
      issued: {
        name: info.issuedToName,
        address: info.issuedToPublicAddress,
      },
    };
    setInfo(infoJson);

    const certificate = new Certificate(infoJson);
    const uploadJson = await IPFS.pinJson(certificate);

    // IF: Json upload fails
    if (uploadJson.Status === "Error") {
      toast.error("Error! Uploading new Certificate content to IPFS failed.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    // get IPFS uploaded certificate CID
    // IF: profile image upload success
    toast.success(
      "Success! Certificate Content uploaded to IPFS successfully.",
      {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      }
    );

    // save it on blockchain issued to walletAddress and IpfsHash
    const res = await Interface.Issuer.issueCertificate(
      info.issuedToPublicAddress,
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
    }
  };

  useEffect(() => {
    const getIssuerInfo = async () => {
      if (!address) return;
      const res = await Interface.Public.getIssuerInfo(address);

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
      setIssuerInfo(json);

      if (process.env.REACT_APP_ENVIRONMENT === "development")
        toast.success(res.Message, {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: 1000,
        });
    };

    getIssuerInfo();
  }, [address]);

  return (
    <div className="h-5/6 p-3 bg-gray-100 font-medium flex items-center justify-center mt-24">
      <div className="container max-w-screen-lg mx-auto">
        <div className="">
          <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 md:mt-14 sm:mt-14">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
              {/* <div className="bg-blue-300">Main</div> */}
              <div className="m-auto">
                <img
                  src={
                    certificateImage
                      ? URL.createObjectURL(certificateImage)
                      : "/images/notfound.png"
                  }
                  className="max-w-full h-auto"
                  alt="image"
                />
              </div>

              <div className="lg:col-span-2">
                <div className="mb-3">
                  <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                  >
                    Certificate image
                  </label>
                  <input
                    onChange={(e) => handleFileChange(e)}
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    name="file"
                    id="certificateImage"
                  />
                </div>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3">
                    <label htmlFor="address">Certificate name (Title)</label>
                    <input
                      onChange={(e) => handleInputChange(e)}
                      name="name"
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={info.name}
                      placeholder="Micro-controllers and IoT certified"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Issued to (Holder name)</label>
                    <input
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      name="issuedToName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={info.issuedToName}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="full_name">
                      Issued to (public address)
                    </label>
                    <input
                      onChange={(e) => handleInputChange(e)}
                      name="issuedToPublicAddress"
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="0xf39Fd6e51..."
                      value={info.issuedToPublicAddress}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label>Certificate description </label>
                    <textarea
                      onChange={(e) => handleInputChange(e)}
                      name="description"
                      value={info.description}
                      type="text"
                      className="h-24 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="More information about organization..."
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        onClick={() => handleButtonClick()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded"
                      >
                        Issue Certificate
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

export default IssueCertificate;
