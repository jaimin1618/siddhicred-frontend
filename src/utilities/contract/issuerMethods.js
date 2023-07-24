import { ethers, isAddress } from "ethers";
import _abi from "./SiddhiCred.json";
import requestAccounts from "./client";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

/*==========================================
Issuer Role utilities
==========================================*/
async function issueCertificate(walletAddress, cid) {
  let status;

  // validate and sanitize inputs
  if (!isAddress(walletAddress)) {
    return {
      Status: "Error",
      Message: "Invalid Wallet address provided, provide valid wallet address",
    };
  }

  if (cid === "") {
    return {
      Status: "Error",
      Message: "Empty CID string in input, provide valid CID string",
    };
  }

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.issueCertificate(walletAddress, cid);
    const txReceipt = await tx.wait();
    console.log("txReceipt: ", txReceipt);
    console.log(txReceipt.toJSON());

    // const [transferEvent] = txReceipt.events;
    // console.log("transferEvent: ", transferEvent);
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      console.error("Error occured: ", e);

    status = false;
    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    Message: `Certificate issued to ${walletAddress} with tokenId: ${0}`,
  };
}

async function burnCertificate(tokenId) {
  let status;

  if (isNaN(tokenId) || tokenId < 0) {
    return {
      Status: "Error",
      Message: "Invalid input for tokenId, tokenId must be a Positive Number",
    };
  }

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.burnCertificate(tokenId);
    await tx.wait();
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      console.error("Error occured: ", e);

    status = false;
    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    Message: `Certificate with tokenId ${tokenId} burned/revoked successfully`,
  };
}

const getIssuedTokenList = async () => {
  const signer = await requestAccounts();
  let tokens;
  try {
    const contract = new ethers.Contract(address, abi, signer);
    tokens = await contract.getIssuedTokenList();
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development") console.log(e);
    return {
      Status: "Error",
      Message: "Failed to find issued tokens, Server Error!",
    };
  }

  return {
    Status: "Success",
    Message: `${tokens.length} issued tokens found`,
    Data: tokens,
  };
};

const _ = {
  getIssuedTokenList,
  issueCertificate,
  burnCertificate,
};

export default _;
