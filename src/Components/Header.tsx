import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Login } from "../Assets/login.svg";
import { UserContext } from "../UserContext";
import styles from "./Header.module.css";

export const Header = () => {
  const { data } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link to="/">
            <h1 className={styles.logo}>Logo</h1>
          </Link>
          {data.name ? (
            <Link to="/conta">
              {data.name} <Login />
            </Link>
          ) : (
            <Link to="/login">
              Login <Login />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
