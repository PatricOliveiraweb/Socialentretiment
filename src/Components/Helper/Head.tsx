import React from "react";

interface IHead {
  title: string;
  image?: string;
  description?: string;
}
const Head = (props: IHead) => {
  React.useEffect(() => {
    document.title = props.title + " | Nome";
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", props.description || "");
    document
      .querySelector("meta[property='og:image']")
      ?.setAttribute("content", props.image || "");
  }, [props]);
  return <div></div>;
};

export default Head;
