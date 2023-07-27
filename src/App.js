import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";

import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Main from "./roles/Main";
import { ROLES } from "./constants";
import Interface from "./utilities/contract/index";
import User from "./context/User";

const App = () => {
  // connect the wallet and see, what's the role of current user
  const [role, setRole] = useState(ROLES.HOLDER);
  const [account, setAccount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const setAccessRole = async () => {
      const address = await Interface.Public.getAddress();
      setAccount(address);
      const role = await Interface.Public.getWalletAddressRole(address);
      // console.log(role);

      if (role === ROLES.ADMIN) setRole(ROLES.ADMIN);
      else if (role === ROLES.ISSUER) setRole(ROLES.ISSUER);
      else setRole(ROLES.USER);
    };

    setAccessRole();
  }, [account]);

  useEffect(() => {
    // runs when user changes account from wallet
    async function onAccountChange() {
      window.ethereum.on("accountsChanged", async function () {
        let provider;
        if (window.ethereum === null) {
          alert("MetaMask wallet is not installed.");
          provider = await ethers.getDefaultProvider();
        } else {
          provider = new ethers.BrowserProvider(window.ethereum);
        }

        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        window.location.href = "/";
      });
    }
    onAccountChange();
  }, []);

  return (
    <div className="App">
      <User.Provider
        value={{
          address: account,
          role,
        }}
      >
        <ToastContainer />
        <Header
          userRole={role}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Main />
        <Footer />
      </User.Provider>
    </div>
  );
};

export default App;
