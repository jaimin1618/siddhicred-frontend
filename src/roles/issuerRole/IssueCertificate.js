import React, { useContext, useState } from "react";

import Interface from "../../utilities/contract/";


const IssueCertificate = () => {
  const [mintInfo, setMintInfo] = useState({
    walletAddress: "",
    ipfsHash: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMintInfo({
      ...mintInfo,
      [name]: value,
    });
  };

  const handleButtonClick = async () => {
    const res = await Interface.Issuer.issueCertificate(
      mintInfo.walletAddress,
      mintInfo.ipfsHash
    );

    console.log(res);
  };

  return (
    <div className="flex bg-gray-200 h-screen justify-center items-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Issue to (public address)
            </label>
            <input
              onChange={(e) => handleChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="walletAddress"
              type="text"
              name="walletAddress"
              placeholder="0xf39Fd6e..."
              value={mintInfo.walletAddress}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Certificate IPFS Hash
            </label>
            <input
              onChange={(e) => handleChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="ipfsHash"
              name="ipfsHash"
              type="text"
              placeholder="ipfs://..."
              value={mintInfo.ipfsHash}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleButtonClick()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Issue Certificate
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default IssueCertificate;
