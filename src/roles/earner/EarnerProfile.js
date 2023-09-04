import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import User from "../../context/User";
import Interface from "../../utilities/contract/index";

const EarnerProfile = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const { address } = useContext(User);
  const [certificateCount, setCertificateCount] = useState(0);
  const [earnerProfile, setEarnerProfile] = useState(null);

  useEffect(() => {
    // required and important variables
    if (!address) return;

    // functions
    const getCertificateCount = async (address) => {
      const count = await Interface.Public.countIssuedCertificates(address);
      return parseInt(count);
    };

    const getUserContentHash = async (address) => {
      const cid = await Interface.Public.getEarnerAccountInfo(address);
      return cid;
    };

    const getUserIpfsContent = async (IpfsHash) => {
      const httpRes = await axios.get(GATEWAY + IpfsHash);
      const json = httpRes.data;
      return json;
    };

    // main
    const main = async () => {
      const count = await getCertificateCount(address);
      setCertificateCount(count);

      const res = await getUserContentHash(address);
      // return console.log(res);
      const earnerContent = await getUserIpfsContent(res.IpfsHash);
      console.log(earnerContent);
      setEarnerProfile(earnerContent);
    };
    main();
  }, [address]);

  return (
    <div>
      <div className="bg-slate-50 py-5 text-lg font-sans font-bold">
        Number of earned certificates: {certificateCount}
      </div>
      <div className="flex flex-col lg:flex-row py-10 px-16">
        <div className="lg:w-1/3 flex justify-center">
          {/* image */}

          <div className="relative w-64 h-64 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <img
              className="absolute w-64 h-64 text-gray-400 -left-1"
              src={earnerProfile && earnerProfile.profileImageURL}
            />
            <svg
              className="absolute w-64 h-64 text-gray-400 -left-1"
              // fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path> */}
            </svg>
          </div>
        </div>
        <div className="lg:w-2/3 flex justify-start">
          {/* Info */}
          <div className="flex flex-col w-full lg:items-start  md:items-start items-center justify-center h-full lg:px-10 md:px-10 sm:px-3 mt-2">
            {/* name */}
            <div className="lg:text-5xl md:text-5xl my-1 text-4xl font-serif">
              {earnerProfile && earnerProfile.firstName}{" "}
              {earnerProfile && earnerProfile.lastName}
            </div>
            {/* location */}
            <div className="font-bold lg:my-2 md:my-2 my-2">
              {/* Ahmedabad, India */}
              Joined on
              {earnerProfile &&
                new Date(earnerProfile.dateOfJoiningPlatform).toDateString()}
            </div>
            {/* linkedin | Share */}
            {/* <div className="my-1">{earnerProfile && earnerProfile.about}</div> */}
            <div className="my-1">LinkedIn | Share</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnerProfile;
