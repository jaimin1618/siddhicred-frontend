import { useState, useEffect, useContext } from "react";
import {
  adminNavigations,
  issuerNavigations,
  defaultNavigations,
  ROLES,
} from "../constants";
// import Logo from "../media/Logo.png";
import { useNavigate } from "react-router";
import Interface from "../utilities/contract/index";
import User from "../context/User";
import Swal from "sweetalert2";

/*==========================

      <nav className="nav font-semibold text-sm underline underline-offset-4">
        <ul className="flex items-center">
          {navigation.map((el, index) => (
            <li
              onClick={() => navigate(el.path)}
              key={index}
              className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer"
            >
              <a>{el.linkName}</a>
            </li>
          ))}
        </ul>
      </nav>

      <h1 onClick={() => navigate("/")} className="w-4/12 mx-5">
        <button className="w-full">
          <img className="bg-white rounded-md m-2" src={Logo} />
        </button>
      </h1>

==========================*/

const Header = ({ userRole, isMenuOpen, setIsMenuOpen }) => {
  const [navigation, setNavigation] = useState([]);
  const navigate = useNavigate();
  const { setAccount, setRole } = useContext(User);

  useEffect(() => {
    if (userRole === ROLES.ADMIN) setNavigation(adminNavigations);
    else if (userRole === ROLES.ISSUER) setNavigation(issuerNavigations);
    else setNavigation(defaultNavigations);
  }, [userRole]);

  const connectMetamask = async () => {
    const check = Interface.Public.checkIsMetamaskInstalled();
    if (!check) return;
    Interface.Public.alertMetamaskConnected();
    await Interface.Public.requestAccountConnect();

    const setAccountAndAccessRole = async () => {
      const address = await Interface.Public.getAddress();
      setAccount(address);
      const role = await Interface.Public.getWalletAddressRole(address);
      setRole(role);
      localStorage.setItem("user", JSON.stringify({ address, role }));

      if (role === ROLES.GUEST) {
        // rediect to register page.
        Swal.fire({
          title: "Oops...you still haven't registered an earner account! 😅.",
          text: "Click on \"Register Now\" button below, it will send you to registration page.",
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
        window.location.href = "/";
      }
    };

    setAccountAndAccessRole();
  };

  return (
    <header className="top-0 left-0 right-0 z-40 bg-white">
      <nav className="main-nav flex">
        <div className="container xl:max-w-6xl mx-auto px-0">
          <div className="lg:flex lg:justify-between">
            <div className="flex justify-between">
              <div className="underline underline-offset-4 mx-w-10 text-xl font-bold capitalize text-black flex items-center px-3 lg:px-0">
                SiddhiCred
              </div>
              {/* <!-- mobile nav --> */}
              <div className="flex flex-row items-center py-4 lg:py-0 px-3">
                <div className="relative text-gray-900 hover:text-black lg:hidden flex">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className={`menu-mobile py-2 px-2 border-b-1 rounded-sm border-transparent bg-white`}
                  >
                    <span className="sr-only">Mobile menu</span>
                    {isMenuOpen ? (
                      <svg
                        className="open h-8 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="close bi bi-x-lg h-8 w-8"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => connectMetamask()}
                    className="relative text-white "
                  >
                    <span
                      className="bg-blue-500 pt-2 pb-2 pl-3 pr-3 mx-1 hover:bg-blue-700 font-semibold rounded-sm hover:cursor-pointer"
                      target="_blank"
                      // href={issuer.website}
                    >
                      Connect
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row">
              {/* <!-- nav menu --> */}
              <ul
                className={`${
                  isMenuOpen ? "hidden" : ""
                } navbar lg:bg-transparent w-full text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold mt-0 pt-0`}
              >
                {navigation.map((nav, idx) => (
                  <li
                    onClick={() => navigate(nav.href)}
                    key={idx}
                    className="relative hover:underline hover:underline-offset-8 text-black text-xl lg:text-sm"
                  >
                    <span
                      href=""
                      style={{ cursor: "pointer" }}
                      className="active block py-1 lg:py-4 px-3 rounded-sm lg:border-transparent "
                    >
                      {nav.name}
                    </span>
                  </li>
                ))}
                <li
                  onClick={() => connectMetamask()}
                  className="relative text-white hidden lg:block"
                >
                  <span
                    className="bg-blue-500 pt-2 pb-2 pl-3 pr-3 hover:bg-blue-700 font-semibold rounded-sm hover:cursor-pointer"
                    target="_blank"
                    // href={issuer.website}
                  >
                    Connect
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
