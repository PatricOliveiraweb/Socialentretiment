import React from "react";
import styles from "./NotFound.module.css";
import errorImage from "../Assets/error.webp";

const NotFound = () => {
  return (
    <section className="limitGrid">
      <div className={styles.erroGrid}>
        <div>
          <h2 className={styles.erroSubtitle}>
            Ops, Paraece que tivemos algum problema...
          </h2>
          <h1 className={styles.erroTitle}>404</h1>
          <h2 className={styles.erroSubtitle}>Pagina não encontrada!</h2>
        </div>
        <img src={errorImage} alt="Imagem de error" />
      </div>
    </section>
  );
};

export default NotFound;
