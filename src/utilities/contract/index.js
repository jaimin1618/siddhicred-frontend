import { ethers } from "ethers";
import _abi from "./SiddhiCred.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

// Meta Mask and Wallet functions

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
async function createIssuer(walletAddress, tokenId) {}
async function removeIssuer(walletAddress, tokenId) {}
async function updateIssuer(walletAddress, tokenId) {}

/*==========================================
Issuer Role utilities
==========================================*/
async function issueCertificate(walletAddress, tokenURI) {}
async function burnCertificate(tokenId) {}

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

const _ = {
  requestAccounts,
  getOwner,
  getAddress,
  getWalletAddressRole,
  getAdmin,
};

export default _;
