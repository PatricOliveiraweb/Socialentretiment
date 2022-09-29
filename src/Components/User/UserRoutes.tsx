import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import CreatePost from "../Post/CreatePost";
import UserHeader from "./UserHeader";
import UserHome from "./UserHome";

const UserRoutes = () => {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/novapostagem" element={<CreatePost />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
