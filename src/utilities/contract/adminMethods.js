import { ethers, isAddress } from "ethers";
import requestAccounts from "./client";
import _abi from "./SiddhiCred.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

/*==========================================
Admin Role utilities
==========================================*/
async function createIssuer(walletAddress, cid) {
  let status;

  // validate and sanitize inputs
  if (!isAddress(walletAddress)) {
    return {
      Status: "Error",
      Message: "Invalid Wallet address provided, provide valid wallet address",
    };
  }

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.createIssuer(walletAddress, cid);
    status = await tx.wait();
    if (!status) status = false;
  } catch (e) {
    if (process.env.ENVIRONMENT === "development")
      console.error("Error occured: ", e);
    status = false;
    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    Message: "Issuer created successfully",
  };
}

async function removeIssuer(walletAddress) {
  // validate
  if (!isAddress(walletAddress)) {
    return {
      Status: "Error",
      Message: "Invalid Wallet address provided, provide valid wallet address",
    };
  }

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.removeIssuer(walletAddress);
    await tx.wait();
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      console.error("Error occured: ", e);

    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    Message: `Issue with public address: ${walletAddress.substring(
      0,
      10
    )}... has been removed successfully`,
  };
}

async function updateIssuer(walletAddress, contentHash) {
  // validate
  if (!isAddress(walletAddress)) {
    return {
      Status: "Error",
      Message: "Invalid Wallet address provided, provide valid wallet address",
    };
  }

  try {
    const signer = await requestAccounts();
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.updateIssuer(walletAddress, contentHash);
    await tx.wait();
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development")
      console.error("Error occured: ", e);

    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    Message: `Issuer with public address: ${walletAddress.substring(
      0,
      10
    )}... has been updated successfully`,
  };
}

async function getIssuersList() {
  const signer = await requestAccounts();
  let issuers;
  try {
    const contract = new ethers.Contract(address, abi, signer);
    // console.log(contract);
    issuers = await contract.getIssuersList();
  } catch (e) {
    console.log("error: ", e);
  }
  return issuers;
}

const _ = {
  createIssuer,
  removeIssuer,
  updateIssuer,
  getIssuersList,
};

export default _;
