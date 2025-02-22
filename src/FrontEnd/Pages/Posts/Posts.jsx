import { useState, useEffect } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import styles from "./Posts.module.css";

function Posts() {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularPostResponse = await axios.get("http://localhost:3000/api/post/popular");
        setPopularPosts(popularPostResponse.data);
      } catch (error) {
        console.log("Erro ao buscar posts populares:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <article className={styles.containerPost}>
      <div className={styles.topic}>
        <header className={styles.headerTopic}>
          <h2>
            Populares <span className={styles.at}><FaFire /></span>
          </h2>
        </header>
        <ul>
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <li key={post.id}>
                <div className={styles.boxContent}>
                  <Link to={`/post/${post.id}`} className={styles.link}>
                    <h3 className={styles.titleTopicContent}>{post.tittle}</h3>
                    <div className={styles.contentText}>
                      <span className={styles.textContent}>{post.content}</span>
                      <span className={styles.likesCont}>
                        <FaHeart /> {post.likes}
                      </span>
                    </div>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <li>Carregando...</li>
          )}
        </ul>
      </div>
    </article>
  );
}

export default Posts;
