import styles from "./Login.module.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";
import NotFound from "./NotFound";

const Login = () => {
  return (
    <section className={styles.login}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </section>
  );
};

export default Login;
