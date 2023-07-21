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
    const setAccessRole = async () => {
      const address = await Interface.Public.getAddress();
      setAccount(address);
      const role = await Interface.Public.getWalletAddressRole(address);

      if (role === ROLES.ADMIN) setRole(ROLES.ADMIN);
      else if (role === ROLES.ISSUER) setRole(ROLES.ISSUER);
      else setRole(ROLES.USER);

      const count = await Interface.Public.countIssuedCertificates(address);
    };

    setAccessRole();
  }, [account]);

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
