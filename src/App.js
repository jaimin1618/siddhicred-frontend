import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { ROLES } from "./constants";
import Interface from "./utilities/contract/index";
console.log(Interface);

function App() {
  // connect the wallet and see, what's the role of current user
  const [role, setRole] = useState(ROLES.HOLDER);
  const [userAccount, setUserAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const setUserRole = async () => {
      const userAddr = await Interface.getAddress();
      setUserAccount(userAddr);

      const isIssuer = await Interface.getAddress(userAddr);
      console.log(isIssuer);
      const contractAdmin = process.env.REACT_APP_CONTRACT_OWNER;
      if (userAddr === contractAdmin) {
        setRole(ROLES.ADMIN);
      } else if (isIssuer) {
        setRole(ROLES.ISSUER);
      } else {
        setRole(ROLES.USER);
      }
    };
    setUserRole();
    // async function onAccountChange() {
    //   window.ethereum.on("accountsChanged", async function () {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const accounts = await provider.send("eth_requestAccounts", []);
    //     setUserAccount(accounts[0]);
    //     setUserRole();
    //     window.location.href = "/";
    //   });
    // }
    // onAccountChange();
  }, []);

  useEffect(() => {}, [role]);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Routes>
        <Route path="/" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
