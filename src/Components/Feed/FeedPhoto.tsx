import { NavLink } from "react-router-dom";
import Image from "../Helper/Image";
import styles from "./FeedPhoto.module.css";

interface IPhoto {
  image: string | undefined;
  text?: string;
  title: string;
  id: string;
}

const FeedPhoto = ({ image, text, id, title }: IPhoto) => {
  return (
    <NavLink to={`/post/${id}`} className={styles.feedPhoto}>
      <Image src={`http://localhost:3333/uploads/${image}`} alt={title} />
      <div className={styles.subtitle}>
        {title && <h2 className="title">{title}</h2>}
      </div>
    </NavLink>
  );
};

export default FeedPhoto;
