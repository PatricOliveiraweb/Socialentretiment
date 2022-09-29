import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE } from "./api";
import { useNavigate } from "react-router-dom";

export type UserType = {
  id: string;
  name: string;
  email: string;
};
type PropsUserContext = {
  data: UserType;
  error: string;
  loading: boolean;
  login: boolean;
  userLogin: (email: string, password: string) => void;
  userLogout: () => void;

  //setData: React.Dispatch<React.SetStateAction<UserType>>;
};
const DEFAULT_USER: UserType = {
  id: "0",
  name: "",
  email: "",
};
const DEFAULT_VALUE = {
  data: DEFAULT_USER,
  error: "",
  loading: false,
  login: false,
  userLogin: () => {},
  userLogout: () => {},
};

const UserContext = React.createContext<PropsUserContext>(DEFAULT_VALUE);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<UserType>(DEFAULT_USER);
  const [login, setLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(DEFAULT_USER);
      setError("");
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      navigate("/login");
    },
    [navigate]
  );

  function getUser(user: UserType) {
    setData(user);
    setLogin(true);
  }
  async function userLogin(email: string, password: string) {
    try {
      setError("");
      setLoading(true);
      const { url, options } = TOKEN_POST({ email, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: Usuario Inválido!`);
      const data = await tokenRes.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user.id));
      getUser(data.user);
      navigate("/conta");
    } catch (err: any) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  // eslint-disable-next-line

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      const userid = window.localStorage.getItem("user");

      if (token && userid) {
        try {
          setError("");
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE(token, userid);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token Inválido");
          const data = await response.json();
          getUser(data);
        } catch (erro) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);
  return (
    <UserContext.Provider
      value={{ data, error, loading, login, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
export { UserContext };
