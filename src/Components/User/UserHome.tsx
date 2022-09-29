import React from "react";
import { POST_GET_BY_USER } from "../../api";
import useFetch from "../../Hooks/useFetch";
import FeedList from "../Feed/FeedList";
import Loading from "../Loading";

const UserHome = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const token = window.localStorage.getItem("token");
      const userid = window.localStorage.getItem("user");
      if (token && userid) {
        const { url, options } = POST_GET_BY_USER(token, userid);
        const { response, json } = await request(url, options);
      }
    }
    fetchPhotos();
  }, [request]);

  if (loading) return <Loading />;
  else
    return (
      <section className="limitGrid">
        <FeedList data={data} />
      </section>
    );
};

export default UserHome;
