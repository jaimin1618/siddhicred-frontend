import React, { useState } from "react";

import Interface from "../../utilities/contract";
import { toast } from "react-toastify";

const CreateIssuer = () => {
  const [issuerAddr, setIssuerAddr] = useState("");

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
    <div className="flex bg-gray-200 h-screen justify-center">
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
  );
};

export default CreateIssuer;
