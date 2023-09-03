import { ethers } from "ethers";

/*==========================================
Basic Wallet and Wallet address functions
==========================================*/
async function requestAccounts() {
  let provider;
  if (window.ethereum === null) {
    alert("MetaMask wallet is not installed.");
    provider = await ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  let signer;

  try {
    signer = await provider.getSigner();
  } catch (e) {
    console.log(e);
    alert("Connect your metamask account with application");
    await provider.send("eth_requestAccounts", []);
  }

  return signer;
}

export default requestAccounts;
