import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import UserContextProvider from "./UserContext";
import { Header } from "./Components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRoutes from "./Components/User/UserRoutes";
import Post from "./Components/Post/Post";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Header />
        <main className="AppBoddy">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="login/*" element={<NotFound />} />

            <Route
              path="conta/*"
              element={<ProtectedRoute outlet={<UserRoutes />} />}
            />
            <Route path="post/:id" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
