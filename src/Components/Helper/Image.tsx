import React from "react";
import Styles from "./Image.module.css";

interface IImage {
  alt: string;
  src: string;
}
const Image = ({ alt, src }: IImage) => {
  const [skeleton, setEskeleton] = React.useState<boolean>(true);
  function handleLoad({ target }: any) {
    setEskeleton(false);
    target.style.opacity = 1;
  }
  return (
    <div className={Styles.wrapper}>
      {skeleton && <div className={Styles.skeleton}></div>}
      <img alt={alt} onLoad={handleLoad} className={Styles.img} src={src} />
    </div>
  );
};

export default Image;
