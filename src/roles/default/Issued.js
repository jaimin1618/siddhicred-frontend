import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Interface from "../../utilities/contract/";
import User from "../../context/User";
import { ThreeDots } from "react-loader-spinner";

const Issued = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [searchKey, setSearchKey] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSearchReset = () => {
  //   setSearchKey("");
  //   handleSearch();
  // };

  // const handleSearch = () => {
  //   const searchedTokens = tokenList.filter((token) => {
  //     const regex = new RegExp(searchKey, "i");
  //     return regex.test(token.name);
  //   });

  //   setTokenList(searchedTokens);
  // };

  useEffect(() => {
    const getTokenIds = async () => {
      const tokenIds = await Interface.Public.getUserTokenIds();
      const ids = tokenIds.map((id) => parseInt(id, 10));
      return ids;
    };

    const getTokenURIs = async (ids) => {
      const uri = await ids.map(async (id) => {
        const tokenURI = await Interface.Public.tokenURI(id);
        return { tokenURI, tokenId: id };
      });
      return Promise.all(uri);
    };

    const getTokenIPFSContent = (tokens) => {
      console.log(tokens);
      const ipfsContent = tokens.map(async (token, idx) => {
        const httpRes = await axios.get(GATEWAY + token.tokenURI);
        console.log(httpRes.data);
        return {
          ...httpRes.data,
          tokenId: token.tokenId,
        };
      });

      return Promise.all(ipfsContent);
    };

    const main = async () => {
      setIsLoading(true);
      const ids = await getTokenIds();
      const tokens = await getTokenURIs(ids);
      const certificates = await getTokenIPFSContent(tokens || []);
      console.log(certificates);
      setTokenList(certificates || []);
      setIsLoading(false);
      // setTimeout(() => setIsLoading(false), 3000);
      // setIsLoading(false);
    };

    main();
  }, []);

  const renderCertificates = () => {
    if (isLoading) {
      return (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      );
    }

    if (tokenList && tokenList.length > 0) {
      return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
          {tokenList.map((token, idx) => (
            <div key={idx} className="mt-4">
              <a onClick={() => navigate("/certificate/" + token.tokenId)}>
                <img
                  className="hover:grow hover:shadow-md h-2/3"
                  src={token.imageURL ? token.imageURL : "/images/notfound.png"}
                  height="300px"
                  width="300px"
                />
                <div className="pt-1 pb-1 flex-col items-center justify-between align-middle h-1/4 bg-gray-500 rounded-b-sm">
                  <p className="w-full h-1/2">{token.name.substring(0, 15)}</p>
                  <p className="h-1/2 w-full text-gray-900">
                    {new Date(token.issueDate).toDateString()}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        className="mb-4 w-full rounded-lg bg-warning-100 px-6 py-5 text-base bg-yellow-500"
        role="alert"
      >
        No Certificates Found!
      </div>
    );
  };

  return (
    <section className="bg-white mt-24 py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-2 pb-6">
        <nav id="store" className="w-full z-30 top-0 px-3 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              // href="#"
            >
              Your Issued Certificates
            </a>

            {/* <div className="mt-6 mb-3 w-full">
              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    onChange={(e) => setSearchKey(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search certificates..."
                    required
                  />
                  <button
                    onClick={() => handleSearchReset()}
                    type="button"
                    className="text-white absolute right-24 bottom-2.5 bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => handleSearch()}
                    type="button"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div> */}

            {/* <div className="flex items-center" id="store-nav-content">
              <a
                className="pl-3 inline-block no-underline hover:text-black"
                href="#"
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </a>

              <a
                className="pl-3 inline-block no-underline hover:text-black"
                href="#"
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                </svg>
              </a>
            </div> */}
          </div>
        </nav>
      </div>
      <div className="lg:p-5 md:p-3 sm:p-1 flex justify-center">
        {renderCertificates()}
      </div>
    </section>
  );
};

export default Issued;
