import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa los componentes de tu aplicación
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import User from "./pages/Users/Users";
import Fines from "./pages/Fines/Fines";
import { Booklet } from './pages/Fines/Booklet';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="/usuarios" element={<User />} />
          <Route path="/multas" element={<Fines />} />
          <Route path="/boletas" element={<Booklet />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;