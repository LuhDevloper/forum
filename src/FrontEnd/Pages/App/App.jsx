import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFire,FaNewspaper } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import styles from './App.module.css'
import avatar from '../../assets/img/avatares/test.jpg'
import Posts from '../Posts/Posts';
function App() {
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem('user'));  // Obtém o usuário do localStorage
  const [data, hora] = dataUser ? dataUser.horarioLogado.split(', ') : [];  // Se dataUser existir, divide a string
  const handleProfileUser = () =>{
    navigate('/profile');
  }
  return(
    <div className={styles.containerIndex}>
      <header className={styles.headerTop}>
        <h1 className={styles.logo}>Arcanjos do caos</h1>
        <nav className={styles.navBarMenu}>
        <ul className={styles.listMenu}>
          <li><a href="#">Populares <span className={styles.at}><FaFire /></span></a></li>
          <li><a href="#">Mais acessados <span><CiCirclePlus /></span></a></li>
          <li><a href="#">Noticia <span><FaNewspaper /></span></a></li>
        </ul>
        </nav>
        <div className={styles.infoProfile}>
          <figure>
            <img src={avatar} alt="avatar" />
          </figure>
          <span><button type="button" onClick={handleProfileUser}><span className={styles.at}>@</span>{dataUser.username}</button></span>
        </div>
      </header>
      <main className={styles.pageBody}>
      <Posts />
      </main>
    </div>
  );
}

export default App;
