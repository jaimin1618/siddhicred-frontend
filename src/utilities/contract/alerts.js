import Swal from "sweetalert2";

function checkIsMetamaskInstalled() {
  if (window.ethereum == null) {
    Swal.fire({
      title: "Oops...don't 👎 have Metamask wallet.",
      text: "Metamask wallet is required to interact with the app, please add the extension using the below link.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Download Metamask",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "https://metamask.io/download/";
      }
    });
    return false;
  }
  return true;
}

function MetaMaskAccountNotConnectedAlert() {
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
    icon: "error",
    title: "No Metamask account selected/connected!👎",
  });
}

export { MetaMaskAccountNotConnectedAlert, checkIsMetamaskInstalled };
