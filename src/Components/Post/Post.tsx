import React, { FormEvent } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GET_USER_BY_ID, POST_DELETE, POST_GET_BY_ID } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { IPost } from "../../Interfaces/Interfaces";
import { UserContext, UserType } from "../../UserContext";
import { ReactComponent as Delete } from "../../Assets/trash.svg";
import { ReactComponent as Edit } from "../../Assets/pen.svg";
import Loading from "../Loading";
import styles from "./Post.module.css";
import Image from "../Helper/Image";
import { PostComents } from "./PostComents";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/themes/default";

const Post = () => {
  const [post, setPost] = React.useState<IPost | null>(null);
  const [userPost, setUserPost] = React.useState<UserType | null>(null);
  const [idUser, setIdUser] = React.useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  let { id } = useParams();
  const { loading, request } = useFetch();
  const navigate = useNavigate();

  const { data, login } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchPost() {
      if (id) {
        const { url, options } = POST_GET_BY_ID(id);
        const { response, json } = await request(url, options);
        setIdUser(JSON.stringify(json.id_user));
        setPost(json);
      }
    }

    fetchPost();
  }, [request]);

  React.useEffect(() => {
    async function fetchAuthor() {
      if (idUser) {
        const user = await getUser(idUser);
        setUserPost(user);
      }
    }
    fetchAuthor();
  }, [idUser]);

  async function getUser(id: string): Promise<UserType | null> {
    const { url, options } = GET_USER_BY_ID(id);
    const user = await fetch(url, options);
    const json = await user.json();
    return json;
  }

  async function handleDelete() {
    if (login && post!.id_user == data.id) {
      const MySwal = withReactContent(Swal);
      await MySwal.fire({
        title: "Tem certeza que deseja deletar esse Post?",
        html: "Se confirmar não existe maneira de ser revertido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f0352",
        cancelButtonColor: "#CA221F",
        confirmButtonText: "Sim, quero deletar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = window.localStorage.getItem("token");
          if (token) {
            setDeleteLoading(true);
            const { url, options } = POST_DELETE(post!.id, token);
            const response = await fetch(url, options);
            if (response.ok) {
              setDeleteLoading(false);
              await MySwal.fire({
                title: "Postagem deletada",
                html: "Sua postagem foi deletada com sucesso!",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              setTimeout(() => {
                navigate(-1);
              }, 1500);
            }
          }
        }
      });
    }
  }

  if (loading) return <Loading />;
  else if (!post) return <p>Post Não encontrado!</p>;
  else
    return (
      <section className="limitGrid">
        <div className={styles.post}>
          <Image
            src={`http://localhost:3333/uploads/${post.image}`}
            alt={post.title}
          />
          <div className={styles.text}>
            <div className={styles.postTitle}>
              {post.id_user == data.id && login ? (
                <nav className={styles.nav}>
                  <button onClick={handleDelete} className={styles.button}>
                    <Delete />
                  </button>
                </nav>
              ) : (
                ""
              )}
              <span>@{userPost?.name}</span>
              <h2>{post.title}</h2>
              <p className={styles.tag}>{post.id_tag}</p>
              <p>{post.content}</p>
            </div>
            {id && <PostComents id_post={id} />}
          </div>
        </div>
      </section>
    );
};

export default Post;
