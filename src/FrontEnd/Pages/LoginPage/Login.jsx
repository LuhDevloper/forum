import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

function Login() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [messageApi, setMessageApi] = useState(""); // Combina sucesso e erro em um único estado
  const [isError, setIsError] = useState(false); // Controle para saber se é erro ou sucesso
  const navigate = useNavigate();

  const handleForm = async (e) => {
    const urlApi = 'http://localhost:3000/auth/login';
    e.preventDefault(); // Impede o envio do formulário
    
    try {
      const response = await axios.post(urlApi, {
        username: username,
        password: password
      });
  
      // Armazenar o usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: response.data.user.id,
        username: response.data.user.username,
        horarioLogado: response.data.user.data
      }));
  
      // Mensagem de sucesso
      setMessageApi(response.data.message);
      navigate('/home');
      setIsError(false); // Sucesso, então não é erro
  
    } catch (error) {
      // Caso ocorra um erro (como senha incorreta)
      if (error.response && error.response.data) {
        setMessageApi(error.response.data.message); // Mensagem de erro vinda do backend
      } else {
        setMessageApi('Erro desconhecido!'); // Para erros que não tem resposta do backend
      }
      setIsError(true); // Falha, então é erro
    }
  };

  return (
    <div className={styles.containerIndex}>
      <form method="POST" className={styles.formLogin} onSubmit={handleForm}>
        <h1 className={styles.titleForm}>Log In</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          required
        />

        {/* Exibição da mensagem */}
        {messageApi && (
          <span className={isError ? styles.failLogin : styles.sucessLogin}>
            {messageApi}
          </span>
        )}

        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default Login;
