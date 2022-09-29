import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Exit } from "../../Assets/exit.svg";
import { ReactComponent as Home } from "../../Assets/home.svg";
import { ReactComponent as Add } from "../../Assets/add.svg";
import { UserContext } from "../../UserContext";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const { userLogout } = React.useContext(UserContext);
  function handleExit() {
    console.log("sair");
    userLogout();
  }
  return (
    <nav className={`${styles.nav} limitGrid`}>
      <ul>
        <li>
          <NavLink to="/conta">
            <Home />
          </NavLink>
        </li>
        <li>
          <NavLink to="/conta/novapostagem">
            <Add />
          </NavLink>
        </li>
        <li>
          <button onClick={handleExit}>
            <Exit />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserHeader;
