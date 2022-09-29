import React from "react";
import { POST_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Loading";
import FeedList from "./FeedList";

const Feed = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = POST_GET();
      const { response, json } = await request(url, options);
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

export default Feed;
