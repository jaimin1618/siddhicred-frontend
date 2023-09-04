import { ethers, isAddress } from "ethers";
import _abi from "./SiddhiCred.json";
import requestAccounts from "./client";
import {
  checkIsMetamaskInstalled,
  MetaMaskAccountNotConnectedAlert,
} from "./alerts";

const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

async function requestAccountConnect() {
  await requestAccounts();
}

async function getAddress() {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }
  const address = signer.getAddress();
  return address;
}

async function getAdmin() {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const adminAddress = await contract.admin();
  return adminAddress;
}

/*==========================================
User/Default Role utilities
==========================================*/
async function getIssuerInfo(walletAddress) {
  if (!isAddress(walletAddress)) {
    return {
      Status: "Error",
      Message: "Error! Invalid public address!",
    };
  }

  try {
    const signer = await requestAccounts();

    if (signer === null) {
      MetaMaskAccountNotConnectedAlert();
      return null;
    }

    const contract = new ethers.Contract(address, abi, signer);
    const CID = await contract.getIssuerInfo(walletAddress);
    // console.log(CID);

    return {
      Status: "Success",
      Message: "Success! Issuer ContentHash Found successfully",
      IpfsHash: CID,
    };
  } catch (error) {
    if (process.env.REACT_APP_ENVIRONMENT === "development") console.log(error);
    return {
      Status: "Error",
      Message:
        "Error! Contract state read request for getting Issuer CID failed!",
    };
  }
}

async function balanceOf(walletAddress) {}
async function getWalletAddressRole(walletAddress) {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const walletAddressRole = await contract.getWalletAddressRole(walletAddress);
  return walletAddressRole;
}

async function ownerOf(tokenId) {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const walletAddress = await contract.ownerOf(tokenId);
  return walletAddress;
}

async function countIssuedCertificates(walletAddress) {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const balance = await contract.balanceOf(walletAddress);
  return balance;
}

async function getUserTokenIds() {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const tokenIds = await contract.tokensOfOwner();
  return tokenIds;
}

async function tokenURI(tokenId) {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const uri = await contract.tokenURI(tokenId);
  return uri;
}

async function totalSupply() {
  const signer = await requestAccounts();

  if (signer === null) {
    MetaMaskAccountNotConnectedAlert();
    return null;
  }

  const contract = new ethers.Contract(address, abi, signer);
  const total = await contract.totalSupply();
  return total;
}

async function getFirstToken(walletAddress, IpfsHash) {
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

    if (signer === null) {
      MetaMaskAccountNotConnectedAlert();
      return null;
    }

    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.getFirstToken(walletAddress, IpfsHash);
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
    Message:
      "You have successfully minted your first certificate. Issue to you by yourself 😎.",
  };
}

async function registerEarner(IpfsHash) {
  let status;

  try {
    const signer = await requestAccounts();

    if (signer === null) {
      MetaMaskAccountNotConnectedAlert();
      return null;
    }

    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.registerEarner(IpfsHash);
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
    Message: "Your earner account is register successfully!",
  };
}

async function getEarnerAccountInfo(walletAddress) {
  let IpfsHash = "";

  try {
    const signer = await requestAccounts();

    if (signer === null) {
      MetaMaskAccountNotConnectedAlert();
      return null;
    }

    const contract = new ethers.Contract(address, abi, signer);
    IpfsHash = await contract.getEarnerAccountInfo(walletAddress);
  } catch (e) {
    if (process.env.ENVIRONMENT === "development")
      console.error("Error occured: ", e);

    return {
      Status: "Error",
      Message: "Transaction failed due to some problem, Please try again later",
    };
  }

  return {
    Status: "Success",
    IpfsHash,
  };
}

async function updateEarnerInfo(IpfsHash) {
  let status;

  try {
    const signer = await requestAccounts();

    if (signer === null) {
      MetaMaskAccountNotConnectedAlert();
      return null;
    }

    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.updateEarnerInfo(IpfsHash);
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
    Message: "Your earner account details has been updated successfully!",
  };
}

const _ = {
  getAddress,
  getAdmin,
  getIssuerInfo,
  balanceOf,
  getWalletAddressRole,
  ownerOf,
  countIssuedCertificates,
  getUserTokenIds,
  tokenURI,
  totalSupply,
  getFirstToken,
  requestAccountConnect,
  checkIsMetamaskInstalled,

  registerEarner,
  getEarnerAccountInfo,
  updateEarnerInfo,
};

export default _;
