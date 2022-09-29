import React from "react";
import styles from "./InputFile.module.css";
import { ReactComponent as DefaultImage } from "../../Assets/defaltImage.svg";

interface IFile {
  name: string;
  setFile: (target: FileList | null) => void;
  file: FileList | null | undefined;
  accept: string;
}

const InputFile = ({ name, setFile, file, accept }: IFile) => {
  const [preview, setPreview] = React.useState<string | null>();
  const [Error, SetError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    if (file[0].type != "image/jpeg" && file[0].type != "image/png") {
      SetError(
        "Formato Selecionado nao e valido.(formatos suportados : jpg,png"
      );
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file[0]);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <>
      <label htmlFor="file" className={styles.label}>
        Arquivo
        <input
          type="file"
          name={name}
          onChange={({ target }) => setFile(target.files)}
          accept={accept}
          className={styles.input}
        />
      </label>
      {preview ? (
        <img src={preview} className={styles.image} />
      ) : (
        <figure className={styles.defaultImage}>
          <DefaultImage />
        </figure>
      )}

      {Error && <p>{Error}</p>}
    </>
  );
};

export default InputFile;
