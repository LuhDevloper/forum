import express from "express";
import conexao from "../DB/dbConnection.js";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const portRunning = 3000;
const saltHash = 10;

app.use(express.json());
app.use(cors({
    origin: 'https://forum-lac-three.vercel.app',  // Substitua pela URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Se estiver lidando com cookies ou autenticação
  }));

// Rota de login
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const horario = new Date();
    const dataConvertida = horario.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    const query = "SELECT * FROM users WHERE username = ?";

    conexao.execute(query, [username], async (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];

        try {
            if (!user.password) {
                return res.status(500).json({ message: 'Senha não cadastrada no banco.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Senha incorreta',
                    user: {
                        id: user.id,
                        username: user.username,
                        data: dataConvertida
                    }
                });
            }    
            return res.status(200).json({
                message: 'Login bem-sucedido',
                user: {
                    id: user.id,
                    username: user.username,
                    data: dataConvertida
                }
            });

        } catch (error) {
            console.error("Erro ao comparar senha:", error);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    });
});

// Rota de cadastro
app.post('/auth/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    try {
        const senhaHash = await bcrypt.hash(password, saltHash);
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";

        conexao.execute(query, [username, senhaHash], (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar usuário:", err);
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }

            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        });

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});
app.get('/api/post/popular', (req, res) =>{
    const sql = "SELECT * FROM posts ORDER BY likes DESC";
    conexao.query(sql, (err, results) =>{
        if (err) {
            console.error('Erro ao buscar posts populares:', err);
            return res.status(500).json({ message: 'Erro ao buscar posts populares' });
          }
          res.status(200).json(results);
    });
});
app.get('/api/post/:id', (req, res) => {
    const id = req.params.id; // Acessando o id corretamente
    const sql = `SELECT * FROM posts WHERE id = ${id}`; // Corrigindo o SQL
    
    conexao.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar posts populares:', err);
            return res.status(500).json({ message: 'Erro ao buscar posts populares' });
        }
        
        // Enviando a resposta com os resultados da consulta
        res.status(200).json(result); // "results" estava com erro (não existe no seu código), então use "result"
    });
});

// Iniciar o servidor
app.listen(portRunning, () => {
    console.log(`Servidor iniciado na porta ${portRunning}`);
});
