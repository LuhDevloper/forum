import { useState } from "react";
import styles from "./Profile.module.css";
import avatar from '../../assets/img/avatares/test.jpg'

function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const dataUser = JSON.parse(localStorage.getItem('user'));  // Obtém o usuário do localStorage

  return (
    <div className={styles.containerIndex}>
<main className={styles.infoUserProfile}>
  <div className={styles.avatarUser}>
    <figure>
      <img src={avatar} alt="Avatar do usuário" />
    </figure>
  </div>

  {/* Divisória Centralizada */}
  <div className={styles.divider}></div>

  <div className={styles.containerInfoUser}>
    <div className={styles.boxUsername}>
      <label htmlFor="username">Usuário:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={dataUser ? `@${dataUser.username}` : ""}
        disabled={isDisabled}
      />
      <button onClick={() => setIsDisabled(!isDisabled)}>
        {isDisabled ? "Editar" : "Salvar"}
      </button>
    </div>

    <div className={styles.boxPassword}>
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        name="password"
        id="password"
        value="********"
        disabled={isPasswordDisabled}
      />
      <button onClick={() => setIsPasswordDisabled(!isPasswordDisabled)}>
        {isPasswordDisabled ? "Editar" : "Salvar"}
      </button>
    </div>
  </div>
</main>

    </div>
  );
}

export default Profile;
