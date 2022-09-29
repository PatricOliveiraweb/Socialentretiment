import React from "react";
import { GET_COMENT, POST_COMENT } from "../../api";
import { IComent } from "../../Interfaces/Interfaces";
import styles from "./PostComents.module.css";
import { ReactComponent as SendIcon } from "../../Assets/send.svg";
import { UserContext } from "../../UserContext";

interface IPostcoments {
  id_post: string;
}

export const PostComents = ({ id_post }: IPostcoments) => {
  const [coments, setComents] = React.useState<IComent[] | null>(null);
  const [coment, setComent] = React.useState<string>("");

  const commentsSection = React.useRef<HTMLDivElement>(null);

  const { data, login } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchComent() {
      if (id_post) {
        const { url, options } = GET_COMENT(id_post);
        const user = await fetch(url, options);
        const json = await user.json();
        setComents(json);
      }
    }
    fetchComent();
  }, [id_post]);

  React.useEffect(() => {
    if (null !== commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [coments]);

  async function handdleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (id_post) {
      const newComent = {
        id_user: data.name,
        id_post: id_post,
        content: coment,
      };
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = POST_COMENT(newComent, token);
        const response = await fetch(url, options);
        const item = await response.json();
        if (response.ok) {
          setComents((comments) => [...(comments as IComent[]), item]);
          setComent("");
        }
      }
    }
  }
  return (
    <div className={styles.coments}>
      <div className={styles.content} ref={commentsSection}>
        {coments ? (
          coments.map((coment) => (
            <p key={coment.id}>
              <strong>{coment.id_user}: </strong>
              {coment.content}
            </p>
          ))
        ) : (
          <p>Sem comentarios ainda...</p>
        )}
      </div>
      {login ? (
        <form onSubmit={handdleSubmit}>
          <textarea
            name=""
            value={coment}
            onChange={({ target }) => setComent(target.value)}
          ></textarea>
          <button>
            <SendIcon />
          </button>
        </form>
      ) : (
        <p>
          <span>Faça login para fazer um comentario</span>
        </p>
      )}
    </div>
  );
};
