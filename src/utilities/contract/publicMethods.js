import { ethers, isAddress } from "ethers";
import _abi from "./SiddhiCred.json";
import requestAccounts from "./client";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

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
    const contract = new ethers.Contract(address, abi, signer);
    const CID = await contract.getIssuerInfo(walletAddress);
    console.log(CID);

    return {
      Status: "Success",
      Message: "Success! Issuer CID Found successfully",
      IpfsHash: CID,
    };
  } catch (error) {
    console.log(error);
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
  const contract = new ethers.Contract(address, abi, signer);
  const walletAddressRole = await contract.getWalletAddressRole(walletAddress);
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

async function getUserTokenIds() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const tokenIds = await contract.tokensOfOwner();
  return tokenIds;
}

async function tokenURI(tokenId) {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const uri = await contract.tokenURI(tokenId);
  return uri;
}

async function totalSupply() {
  const signer = await requestAccounts();
  const contract = new ethers.Contract(address, abi, signer);
  const total = await contract.totalSupply();
  return total;
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
};

export default _;
