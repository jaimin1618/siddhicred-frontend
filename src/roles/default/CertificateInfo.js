import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Interface from "../../utilities/contract/index";

const CertificateInfo = () => {
  const GATEWAY = process.env.REACT_APP_IPFS_PUBLIC_GATEWAY;
  const [certificate, setCertificate] = useState(null);
  const [certificateIssuer, setCertificateIssuer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    const getTokenURI = async (tokenId) => {
      const uri = await Interface.Public.tokenURI(id);
      return uri;
    };

    const getTokenIPFSContent = async (tokenURI) => {
      const httpRes = await axios.get(GATEWAY + tokenURI);
      const ipfsContent = httpRes.data;
      return {
        ...ipfsContent,
        tokenId: id,
      };
    };

    const main = async () => {
      if (!id) return;
      const tokenId = parseInt(id);

      if (isNaN(tokenId)) {
        alert("Invalid tokenID");
        navigate("/");
        return;
      }

      const uri = await getTokenURI(tokenId);
      const result = await getTokenIPFSContent(uri);
      console.log(result);
      setCertificate(result);
      setCertificateIssuer(result?.issuedBy);
    };

    main();
  }, [id]);

  // certificate params to show
  // image DONE
  // name DONE
  // issued by | issuer contact email | issuer profile image
  // issue date | expiry date
  // decscri
  //

  return (
    <section class="background-radial-gradient mt-24">
      {/* <style>
      .background-radial-gradient {
        background-color: hsl(218, 41%, 15%);
        background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
          radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
      }
    </style> */}

      <div class="px-6 py-12 text-center md:px-12 lg:text-left">
        <div class="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <div class="mt-12 lg:mt-0">
              <h1 class="mt-0 mb-0 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,100%,75%)]">
                {certificate && certificate.name
                  ? certificate.name
                  : "Not Found"}{" "}
                <br />
                <p class="text-black text-xl mt-3">
                  About certificate:{" "}
                  {certificate && certificate.description
                    ? certificate.description
                    : "Not Found"}{" "}
                </p>
                <p class="text-black text-xl mt-3">
                  Issued on:{" "}
                  {certificate && certificate.issueDate
                    ? new Date(certificate.issueDate).toDateString()
                    : "Not Found"}
                </p>
              </h1>
              <div className="bg-gray-100 mt-3 p-6 rounded-sm shadow-md">
                <h1 class="mt-0 mb-0  font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,100%,75%)]">
                  <span class="text-[hsl(218,91%,30%)] text-xl">
                    Issuer Details
                  </span>
                </h1>
                <div>
                  <p className="flex justify-center">
                    <img
                      src={
                        certificateIssuer && certificateIssuer.profileImageURL
                      }
                      class="w-32 rounded-full"
                      alt="Avatar"
                    />
                  </p>
                  <div className="flex-col mt-3 mb-3">
                    <p>
                      <span className="font-medium">
                        Issued by (organization){" "}
                      </span>
                      {certificate && certificateIssuer.organizationName}
                    </p>
                    <p>
                      <span className="font-medium">
                        Issuer contact: (organization){" "}
                      </span>

                      {certificate && certificateIssuer.contact}
                    </p>
                    <p>
                      <span className="font-medium">
                        Issuer (name) (organization){" "}
                      </span>

                      {certificate && certificateIssuer.issuerName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-12 lg:mb-0">
              <img
                src={
                  certificate && certificate.imageURL
                    ? certificate.imageURL
                    : "/images/notfound.png"
                }
                class="w-full rounded-lg shadow-lg dark:shadow-black/20"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateInfo;
