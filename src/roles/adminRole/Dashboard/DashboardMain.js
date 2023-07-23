import React, { useEffect, useState } from "react";
import axios from "axios";

import StatusBar from "./StatusBar";
import IssuerTable from "./IssuerTable";
import Interface from "../../../utilities/contract/index";
import { ThreeDots } from "react-loader-spinner";

const DashboardMain = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [issuers, setIssuers] = useState([]);
  const [totalSupply, setTotalSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getIssuersAddress = async () => {
      const issuers = await Interface.Admin.getIssuersList();
      console.log(issuers);
      return issuers;
    };

    const getIssuerIPFSCid = async (addresses) => {
      const issuersCid = addresses.map(async (address, idx) => {
        const cid = await Interface.Public.getIssuerInfo(address);
        return cid;
      });

      return Promise.all(issuersCid);
    };

    const getIssuersIPFSContent = async (cidList) => {
      const ipfsContent = cidList.map(async (CID, idx) => {
        const httpRes = await axios.get(GATEWAY + CID.IpfsHash);
        return httpRes.data;
      });

      return Promise.all(ipfsContent);
    };

    const getTotalSupply = async () => {
      const total = await Interface.Public.totalSupply();
      setTotalSupply(parseInt(total));
    };

    const main = async () => {
      setIsLoading(true);
      // getting issuer content
      const issuersAddresses = await getIssuersAddress();
      const issuerIPFSCid = await getIssuerIPFSCid(issuersAddresses);
      const issuerContent = await getIssuersIPFSContent(issuerIPFSCid);
      console.log(issuerContent);
      setIssuers(issuerContent);

      setTimeout(() => setIsLoading(false), 2000);
      // setIsLoading(false);

      // getting total supply
      getTotalSupply();
    };

    main();
  }, []);

  const renderIssuers = () => {
    if (isLoading)
      return (
        <tr className="text-gray-700 dark:text-gray-400">
          <td colSpan={5} className="px-4 py-3 text-sm">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              className=""
              visible={true}
            />
          </td>
        </tr>
      );

    if (issuers && issuers.length > 0) {
      return issuers.map((issuer, idx) => (
        <tr key={idx} className="text-gray-700 dark:text-gray-400">
          <td className="px-4 py-3">
            <div className="flex items-center text-sm">
              {/* <!-- Avatar with inset shadow --> */}
              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    issuer.profileImageURL
                      ? issuer.profileImageURL
                      : "/images/dummyProfile.webp"
                  }
                  alt=""
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 rounded-full shadow-inner"
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <p className="font-semibold">{issuer.issuerName}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {issuer.address.substring(0, 10) + "..."}
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-sm">{issuer.organizationName}</td>
          <td className="px-4 py-3 text-sm">
            <a
              className="bg-blue-300 pt-2 pb-2 pl-3 pr-3 hover:bg-blue-500 font-semibold rounded-sm "
              target="_blank"
              href={issuer.website}
            >
              Link
            </a>
          </td>

          <td className="px-4 py-3 text-sm">
            {new Date(issuer.becameIssuerOn).toDateString()}
          </td>
          <td className="px-4 py-3 text-sm">
            <a
              className="bg-green-300 pt-2 pb-2 pl-3 pr-3 hover:bg-green-500 font-semibold rounded-sm "
              target="_blank"
              href={issuer.website}
            >
              View
            </a>
          </td>
        </tr>
      ));
    }

    return (
      <tr className="text-gray-700 dark:text-gray-400">No Issuer Found</tr>
    );
  };

  return (
    <div className="mt-24 flex flex-col flex-1 w-full bg-gray-100">
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Admin Dashboard
          </h2>
          {/* <!-- CTA --> */}

          {/* <!-- Cards --> */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {/* <!-- Card --> */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Issuers
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {issuers ? issuers.length : 0}
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total NFT Certificates issued
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {totalSupply}
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  New sales
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  376
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending contacts
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  35
                </p>
              </div>
            </div>
          </div>

          {/* <!-- New Table --> */}
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap mb-10 text-left">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Issuer</th>
                    <th className="px-4 py-3">Organization name</th>
                    <th className="px-4 py-3">Organization website</th>
                    {/* <th className="px-4 py-3">Status</th> */}
                    <th className="px-4 py-3">Created ON</th>
                    <th className="px-4 py-3">View More</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {renderIssuers()}
                  {/* {issuers &&
                    issuers.map((issuer, idx) => (
                      <tr
                        key={idx}
                        className="text-gray-700 dark:text-gray-400"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={
                                  issuer.profileImageURL
                                    ? issuer.profileImageURL
                                    : "/images/dummyProfile.webp"
                                }
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">
                                {issuer.issuerName}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {issuer.address.substring(0, 10) + "..."}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {issuer.organizationName}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <a
                            className="bg-blue-300 pt-2 pb-2 pl-3 pr-3 hover:bg-blue-500 font-semibold rounded-sm "
                            target="_blank"
                            href={issuer.website}
                          >
                            Link
                          </a>
                        </td>

                        <td className="px-4 py-3 text-sm">
                          {new Date(issuer.becameIssuerOn).toDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <a
                            className="bg-green-300 pt-2 pb-2 pl-3 pr-3 hover:bg-green-500 font-semibold rounded-sm "
                            target="_blank"
                            href={issuer.website}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))} */}
                </tbody>
              </table>
            </div>
            {/* <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span className="flex items-center col-span-3">
                Showing 21-30 of 100
              </span>
              <span className="col-span-2"></span>

              <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul className="inline-flex items-center">
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        1
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        2
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                        3
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        4
                      </button>
                    </li>
                    <li>
                      <span className="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        8
                      </button>
                    </li>
                    <li>
                      <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                        9
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div> */}
          </div>

          {/* <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Charts
          </h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Revenue
              </h4>
              <canvas id="pie"></canvas>
              <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                  <span>Shirts</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                  <span>Shoes</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                  <span>Bags</span>
                </div>
              </div>
            </div>
            <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
              <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Traffic
              </h4>
              <canvas id="line"></canvas>
              <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                  <span>Organic</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                  <span>Paid</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default DashboardMain;
