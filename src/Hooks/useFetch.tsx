import React from "react";
import { IPost } from "../Interfaces/Interfaces";

const useFetch = () => {
  const [data, setData] = React.useState<IPost[] | null>(null);
  const [error, setError] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url: string, options: {}) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err: any) {
      json = null;
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
