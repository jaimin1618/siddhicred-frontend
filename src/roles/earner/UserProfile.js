import React, { useContext, useEffect, useState } from "react";
import User from "../../context/User";

import Interface from "../../utilities/contract/index";

const UserProfile = () => {
  const { address } = useContext(User);
  const [certificateCount, setCertificateCount] = useState(0);
  const [profile, setProfile] = useState({
    publicWalletAddress: "",
    fullName: "",
    age: "",
    employmentStatus: "",
    domainKnowledge: "blockchain, web, internet",
    skills: "nodejs, reactjs, solidity",
    email: "",
    phone: "",
    about: "",
    lookingForProfessionalOpportunity: "",
  });

  useEffect(() => {
    // required and important variables
    if (!address) return;

    // functions
    const getCertificateCount = async (address) => {
      const count = await Interface.Public.countIssuedCertificates(address);
      return parseInt(count);
    };

    const getUserIPFSContent = async (address) => {};

    // main
    const main = async () => {
      const count = await getCertificateCount(address);
      setCertificateCount(count);
    };
    main();
  });

  return (
    <div className="flex justify-center items-center ">
      <div className=" max-w-2xl overflow-hidden sm:rounded-lg mt-10 -mb-0 p-4">
        <div className="px-4 py-0 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl underline-offset-8 underline text-lg text-gray-500 font-bold mb-3">
            Number of owned certificate: {certificateCount}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Mickael Poulaz
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                technologies
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                React JS
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                m.poul@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Salary</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                $10,000
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
