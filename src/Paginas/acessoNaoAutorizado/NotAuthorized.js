import React from "react";
import styles from "./NotAuthorized.module.css";

const NotAuthorized = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acesso Negado</h1>
      <p className={styles.message}>
        Você não tem permissão para acessar esta página. Por favor, entre em contato com o administrador do sistema caso precise de acesso.
      </p>
    </div>
  );
};

export default NotAuthorized;
