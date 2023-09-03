import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    Interface.Public.checkIsMetamaskInstalled();
    const user = localStorage.getItem("user");

    if (user) {
      const json = JSON.parse(user);
      setAccount(json.address);
      setRole(json.role);
    }
  }, []);

  useEffect(() => {
    // runs when user changes account from wallet

    async function onAccountChange() {
      // just refesh the page
      if (!window.ethereum) return;

      window.ethereum.on("accountsChanged", async function () {
        localStorage.clear("user");
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
          setAccount: setAccount,
          setRole: setRole,
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
