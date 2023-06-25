import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Main from "./roles/Main";
import { ROLES } from "./constants";
import Interface from "./utilities/contract/index";

function App() {
  // connect the wallet and see, what's the role of current user
  const [role, setRole] = useState(ROLES.HOLDER);
  const [account, setAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const setAccessRole = async () => {
      const userAddr = await Interface.getAddress();
      setAccount(userAddr);
      const role = await Interface.getWalletAddressRole(userAddr);

      if (role === ROLES.ADMIN) setRole(ROLES.ADMIN);
      else if (role === ROLES.ISSUER) setRole(ROLES.ISSUER);
      else setRole(ROLES.USER);

      const count = await Interface.countIssuedCertificates(userAddr);
      console.log(count);
    };

    setAccessRole();
  }, [account]);

  return (
    <div className="App">
      <ToastContainer />
      <Header
        userRole={role}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
