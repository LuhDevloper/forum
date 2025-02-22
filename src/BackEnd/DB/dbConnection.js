import mysql from "mysql2";


const hostnameDb = 'localhost';
const usernameDb = 'root';
const passwordDb = '';
const dbNameHost = 'forum';

const conexao = mysql.createConnection({
    host: hostnameDb,
    user: usernameDb,
    password: passwordDb,
    database: dbNameHost
});

conexao.connect((err) => {
    if (err) {
        console.error('Erro de conexão: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com id ' + conexao.threadId);
});

export default conexao;