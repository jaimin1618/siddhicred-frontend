import { ethers, isAddress } from "ethers";
import _abi from "./SiddhiCred.json";
import axios from "axios";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

/*==========================================
More needed utility function other than contract interaction
==========================================*/
const validateIPFSHash = async (cid) => {
  // to be: implemented later
};

/*==========================================
Basic Wallet and Wallet address functions
==========================================*/
async function requestAccounts() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  } else {
    alert("Install Metamask Wallet to run the application");
  }
}

async function getOwner() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const owner = await contract.owner();
  console.log(owner);
}

async function getAddress() {
  const signer = await requestAccounts();
  const address = signer.getAddress();
  return address;
}

async function getAdmin() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const adminAddress = await contract.admin();
  return adminAddress;
}

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
    Message: "Issuer created successfull",
  };
}
async function removeIssuer(walletAddress, tokenId) {}
async function updateIssuer(walletAddress, tokenId) {}

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

/*==========================================
User/Default Role utilities
==========================================*/
async function getIssuerInfo(walletAddress) {}
async function balanceOf(walletAddress) {}
async function getWalletAddressRole(walletAddress) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const walletAddressRole = await contract.getWalletAddressRole(walletAddress);
  console.log(walletAddressRole);
  return walletAddressRole;
}

async function ownerOf(tokenId) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const walletAddress = await contract.ownerOf(tokenId);
  return walletAddress;
}

async function countIssuedCertificates(walletAddress) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const balance = await contract.balanceOf(walletAddress);
  return balance;
}

const _ = {
  createIssuer,
  requestAccounts,
  getOwner,
  getAddress,
  getWalletAddressRole,
  getAdmin,
  issueCertificate,
  ownerOf,
  countIssuedCertificates,
  burnCertificate,
};

export default _;
