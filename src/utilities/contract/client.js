import { ethers } from "ethers";
import _abi from "./SiddhiCred.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

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

export default requestAccounts;
