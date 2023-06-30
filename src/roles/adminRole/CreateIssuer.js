import React, { useState, useContext } from "react";
import { toast } from "react-toastify";

import Interface from "../../utilities/contract";
import User from "../../context/User";
import IssuerTemplate from "../../";

const CreateIssuer = () => {
  const { address } = useContext(User);
  const [issuerAddr, setIssuerAddr] = useState("");
  const [profile, setProfile] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    return;
  };

  const handleClick = async () => {
    const res = await Interface.Admin.createIssuer(
      issuerAddr,
      `ipfs://${issuerAddr}`
    );

    if (res.Status === "Error") {
      toast.error(res.Message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    } else if (res.Status === "Success") {
      toast.success(res.Message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-5/6 p-3 bg-gray-100 flex items-center justify-center mt-24">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 md:mt-14 sm:mt-14">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              {/* profile picture upload */}
              <div className="text-gray-600">
                <img
                  src="/notfound.png"
                  class="bg-red-400 w-1/2 m-auto rounded-full"
                  alt="Avatar"
                />
                <div class="flex justify-center mt-8">
                  <div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                    <div class="m-4">
                      <label class="inline-block mb-2 text-gray-500">
                        Upload Profile Picture
                      </label>
                      <div class="flex items-center justify-center w-full">
                        <label class="flex flex-col w-full h-24 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                          <div class="flex flex-col items-center justify-center pt-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Attach a file
                            </p>
                          </div>
                          <input name="file" type="file" class="opacity-0" />
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
                      name="organizationName"
                      type="text"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={profile.organizationName}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">
                      Issuer Name (from organization)
                    </label>
                    <input
                      type="text"
                      name="issuerName"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={profile.issuerName}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Issuer Public Address</label>
                    <input
                      name="issuerAddress"
                      type="text"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      // disabled
                      value={profile.issuerAddress}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Contact Email Address</label>
                    <input
                      name="issuerContactEmail"
                      value={profile.issuerContactEmail}
                      type="text"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Organization Website</label>
                    <input
                      name="issuerOrganizationWebsite"
                      profile={profile.issuerOrganizationWebsite}
                      type="text"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value=""
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">Country</label>
                    <input
                      name="country"
                      value={profile.country}
                      type="text"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      // value=""
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded">
                        Create Issuer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://www.buymeacoffee.com/dgauderman"
          target="_blank"
          className="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a>
      </div>
    </div>
  );
};

export default CreateIssuer;

/**
 * 
 *   <div className="flex bg-gray-200 h-screen justify-center">
      <form className="w-full max-w-sm flex">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none bg-gray-300 rounded-sm"
            type="text"
            placeholder="0xf39Fd6e..."
            aria-label="Issuer Public Wallet Address"
            onChange={(e) => setIssuerAddr(e.target.value)}
            value={issuerAddr}
          />
          <button
            onClick={() => handleClick()}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Create issuer
          </button>
        </div>
      </form>
    </div>
 */
