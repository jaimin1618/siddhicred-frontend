import { ethers } from "ethers";
import Swal from "sweetalert2";

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

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Metamask already connected!👍",
    });
  } catch (e) {
    if (process.env.REACT_APP_ENVIRONMENT === "development") console.log(e);

    Swal.fire({
      title: "Oops! account not connected👎",
      text: "Select and connect to Metamask account from Metamask pop-down.",
      icon: "warning",
    });

    // await provider.send("eth_requestAccounts", []);
    return null;
  }

  return signer;
}

export default requestAccounts;
