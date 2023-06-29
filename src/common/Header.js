import { useState, useEffect } from "react";
import {
  adminNavigations,
  issuerNavigations,
  defaultNavigations,
  ROLES,
} from "../constants";
// import Logo from "../media/Logo.png";
import { useNavigate } from "react-router";

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

  useEffect(() => {
    if (userRole === ROLES.ADMIN) setNavigation(adminNavigations);
    else if (userRole === ROLES.ISSUER) setNavigation(issuerNavigations);
    else setNavigation(defaultNavigations);
  }, [userRole]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="main-nav">
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div className="lg:flex lg:justify-between">
            <div className="flex justify-between">
              <div className="underline  underline-offset-8 mx-w-10 text-4xl font-bold capitalize text-gray-900 flex items-center">
                SiddhiCred
              </div>
              {/* <!-- mobile nav --> */}
              <div className="flex flex-row items-center py-4 lg:py-0">
                <div className="relative text-gray-900 hover:text-black block lg:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className={`menu-mobile py-3 px-6 border-b-2 border-transparent`}
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
                </div>
              </div>
            </div>

            <div className="flex flex-row">
              {/* <!-- nav menu --> */}
              <ul
                className={`${
                  isMenuOpen ? "hidden" : ""
                } navbar bg-white lg:bg-transparent w-full text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold`}
              >
                {navigation.map((nav, idx) => (
                  <li
                    onClick={() => navigate(nav.href)}
                    key={idx}
                    className="relative hover:text-black"
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      className="active block py-3 lg:py-7 px-6 my-1 rounded border-2 lg:border-transparent "
                    >
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
