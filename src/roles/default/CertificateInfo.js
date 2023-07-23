import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Interface from "../../utilities/contract/index";

const CertificateInfo = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [certificate, setCertificate] = useState(null);
  const { id } = useParams();
  const [tokenId, setTokenId] = useState(null);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const getTokenURI = async (tokenId) => {
  //       const uri = await Interface.Public.tokenURI(id);
  //       return uri;
  //     };

  //     const getTokenIPFSContent = async (tokenURI) => {
  //       const httpRes = await axios.get(GATEWAY + tokenURI);
  //       const ipfsContent = httpRes.data;
  //       return {
  //         ...ipfsContent,
  //         tokenId: id,
  //       };
  //     };

  //     const main = async () => {
  //       try {
  //         const _tokenId = parseInt(id);
  //         setTokenId(_tokenId);
  //       } catch (error) {
  //         alert("Invalid tokenID");
  //         navigate("/issued");
  //       }

  //       if (!tokenId) return;
  //       const uri = await getTokenURI(tokenId);
  //       const result = await getTokenIPFSContent(uri);
  //       console.log(result);
  //       setCertificate(result);
  //     };
  //     main();
  //   }, [tokenId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg bg-neutral-100 p-6 text-neutral-700 shadow-lg dark:bg-neutral-600 dark:text-neutral-200 dark:shadow-black/30">
        <h2 className="mb-5 text-3xl font-semibold">Hello world!</h2>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-6 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-30" />
        <p className="mb-4">
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default CertificateInfo;
