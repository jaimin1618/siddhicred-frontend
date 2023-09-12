import React, { useContext } from "react";
import { Link } from "react-scroll";
import Interface from "../../utilities/contract/index";
import User from "../../context/User";
import { ROLES } from "../../constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Banner = () => {
  const { setAccount, setRole } = useContext(User);
  const navigate = useNavigate();

  const connectMetamask = async () => {
    const check = Interface.Public.checkIsMetamaskInstalled();
    if (!check) return;

    const setAccountAndAccessRole = async () => {
      const address = await Interface.Public.getAddress();
      if (!address) return;
      setAccount(address);
      const role = await Interface.Public.getWalletAddressRole(address);
      if (!role) return;
      setRole(role);

      localStorage.setItem("user", JSON.stringify({ address, role }));

      if (role === ROLES.GUEST) {
        // rediect to register page.
        Swal.fire({
          title: "Oops...you still haven't registered an earner account! 😅.",
          text: 'Click on "Register Now" button below, it will send you to registration page.',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Register Now",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          }
        });
      } else {
        // just refresh the page
        // window.location.href = "/";
      }

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
    };

    setAccountAndAccessRole();
  };

  return (
    <section id="banner" className="">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            SiddhiCred - A Platform for NFT certificates issuance
            <strong className="font-extrabold text-orange-700 sm:block">
              Transform certificate issuing with power of blockchain
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            A platform empowering for certificate earners and certificate
            issuing organizations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => connectMetamask()}
              className="block w-full rounded bg-orange-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/get-started"
            >
              Get Started
            </button>

            <Link
              smooth
              spy
              to="features"
              className="block w-full rounded px-12 py-3 text-sm font-medium text-orange-600 shadow hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
