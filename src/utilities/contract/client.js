import { ethers } from "ethers";
import _abi from "./SiddhiCred.json";
const address = process.env.REACT_APP_CONTRACT_ADDRESS;
const abi = _abi.abi;

/*==========================================
Basic Wallet and Wallet address functions
==========================================*/
async function requestAccounts() {
  let provider;
  if (window.ethereum === null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = await ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  // const url = "http://127.0.0.1:8545/";
  // provider = new ethers.JsonRpcProvider(url);

  const s = await provider.getSigner();

  return s;
}

export default requestAccounts;
