import { ethers } from "ethers";
import _abi from "./SiddhiCred.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

// Meta Mask and Wallet functions
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

const _ = { requestAccounts, getOwner, getAddress };

export default _;
