import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Corrigido: importando Routes também
import App from '../App/App';
import Login from '../LoginPage/Login';
import Profile from '../Profile/Profile';
import PostDetail from '../PostDetail/PostDetail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Envolvendo a aplicação com Router */}
      <Routes>  {/* Usando o componente Routes para gerenciar as rotas */}
        <Route path="/" element={<App />} />  {/* Definindo a rota para a página inicial */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
