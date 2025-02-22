import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Corrigido: importando Navigate também
import App from '../App/App';
import Login from '../LoginPage/Login';
import Profile from '../Profile/Profile';
import PostDetail from '../PostDetail/PostDetail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Envolvendo a aplicação com Router */}
      <Routes>  {/* Usando o componente Routes para gerenciar as rotas */}
        <Route path="/" element={<Navigate to="/auth/login" />} />  {/* Redirecionando / para /auth/login */}
        <Route path="/home" element={<App />} />  {/* Definindo a rota para a página inicial */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
