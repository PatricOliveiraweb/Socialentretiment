import FeedPhoto from "./FeedPhoto";
import styles from "./FeedList.module.css";
import { IPost } from "../../Interfaces/Interfaces";

interface IFeedlistProps {
  data: IPost[] | null;
}

const FeedList = ({ data }: IFeedlistProps) => {
  console.log(data);
  if (data?.length)
    return (
      <section className={styles.feedList}>
        {data.map((photo) => (
          <FeedPhoto
            key={photo.id}
            id={photo.id}
            image={photo.image}
            text={photo.content}
            title={photo.title}
          />
        ))}
      </section>
    );
  else
    return <p className={styles.notFoundPosts}>Não existem post disponivel</p>;
};

export default FeedList;
