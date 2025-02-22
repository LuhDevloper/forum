import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import styles from './PostDetail.module.css';

function PostDetail() {
  // Pegando o id do post da URL
  const { id } = useParams();
  
  // Estado para armazenar os dados do post
  const [post, setPost] = useState(null);
  
  // Função para formatar números grandes
  const formatNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'; // Exibe como '1k', '2.5k'...
    }
    return number;
  };

  // Carregar os dados do post com o id
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fazendo a requisição para buscar os dados do post
        const response = await axios.get(`http://localhost:3000/api/post/${id}`);
        console.log(response);
        setPost(response.data[0]);  // Armazenando os dados no estado
      } catch (error) {
        console.log("Erro ao carregar post:", error);
      }
    };

    fetchPost();
  }, [id]); // O efeito é executado sempre que o id mudar

  // Exibindo os dados do post
  if (!post) return <div>Carregando...</div>;

  return (
    <div className={styles.containerPost}>
      <div className={styles.topicHeader}>
        <h1 className={styles.titleTopic}>{post.tittle}</h1>
      </div>
      <div className={styles.boxContent}>
        <p className={styles.contentText}>{post.content}</p>
        <div className={styles.detailsContainer}>
          <p><strong>Categoria:</strong> {post.category}</p>
          <p><strong>Autor:</strong> {post.author}</p>
          <div className={styles.likesCont}>
            <span>Curtidas:</span>
            <span className={styles.likeCount}>{formatNumber(post.likes)} <FaHeart /></span>
          </div>
          <div className={styles.viewsCont}>
            <span>Visualizações:</span>
            <span className={styles.viewCount}>{formatNumber(post.views)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
