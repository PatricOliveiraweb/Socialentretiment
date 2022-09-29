import React, { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Loading from "../Loading";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const email = useForm("email");
  const password = useForm();

  const { userLogin, error, loading, login } = React.useContext(UserContext);

  async function handlesubmit(e: FormEvent) {
    e.preventDefault();
    if (email.validation() && password.validation()) {
      await userLogin(email.value, password.value);
    }
  }
  if (login) return <Navigate to="/conta" />;
  if (loading) return <Loading />;
  else
    return (
      <form onSubmit={handlesubmit} className={styles.form}>
        <h2 className="title">Login</h2>
        <Input label="Usuário" name="usuario" type="text" {...email} />
        <Input label="Senha" name="senha" type="password" {...password} />
        <Button text="Entrar" />
        {error && <p className={styles.error}>{error}</p>}
      </form>
    );
};

export default LoginForm;
