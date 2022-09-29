import React, { ChangeEvent, ChangeEventHandler, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PHOTO_POST, POST } from "../../api";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Form/Button";
import Input from "../Form/Input";
import InputFile from "../Form/InputFile";
import styles from "./CreatePost.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/themes/default";
import Select from "../Form/Select";

const CreatePost = () => {
  const [file, setFile] = React.useState<FileList | null>();
  const [coment, setComent] = React.useState<string>("");
  const [categoria, setCategoria] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  //let currentValue = props.curentValue || "DEFAULT";

  const title = useForm("length");
  const navigate = useNavigate();

  const { data, login } = React.useContext(UserContext);

  function handleTextArea({ target }: ChangeEvent<HTMLTextAreaElement>) {
    if (target.value.length <= 280) setComent(target.value);
  }

  async function handlesubmit(event: FormEvent) {
    event.preventDefault();
    if (title.value.length && file?.length && categoria.length && login) {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      const post = {
        title: title.value,
        id_tag: categoria,
        id_user: data.id,
        content: coment,
      };
      if (token) {
        const { url, options } = POST(post, token);
        const response = await fetch(url, options);
        const NewPost = await response.json();
        if (response.ok) {
          const convertedFile = new FormData();
          convertedFile.append("avatar", file[0]);
          const { url, options } = PHOTO_POST(NewPost.id, convertedFile, token);
          const photoResponse = await fetch(url, options);
          if (photoResponse.ok) {
            setLoading(false);
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              title: "Postagem Criada!",
              html: "Sua postagem foi criada com sucesso!",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setTimeout(() => {
              navigate("/conta");
            }, 1500);
          }
        }
      }
      setLoading(false);
      setError(
        "Hummmm, parece que alguma coisa deu errado... Tente novamente mais tarde!"
      );
    } else {
      setError("Preencha os campos corretamente!");
    }
  }

  return (
    <section className="limitGrid">
      <h2 className="title">Adicionar Post</h2>
      <form onSubmit={handlesubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <Input label="Título" name="titulo" type="text" {...title} />
            <Select
              values={["Filmes", "Jogos", "Livros"]}
              setValue={setCategoria}
              name="Categoria"
            />
            <label htmlFor="coment" className={styles.label}>
              Escreva uma Legenda:<span> (Maximo de 280 caracteres)</span>
              <textarea
                name="coment"
                value={coment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleTextArea(e)
                }
                className={styles.textarea}
              ></textarea>
              <span className={styles.span}>{coment.length}</span>
            </label>
          </div>
          <div className={styles.side}>
            <InputFile
              name="file"
              accept=".jpg, .jpeg,.png "
              setFile={setFile}
              file={file}
            />
          </div>
        </div>
        {!loading ? (
          <Button text="Enviar" />
        ) : (
          <Button text="Enviando..." disabled={true} />
        )}
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};

export default CreatePost;
