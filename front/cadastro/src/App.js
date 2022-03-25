import React from 'react';
import './App.css';
import CadastroConteiner from './components/CadastroConteiner'
import CadastroMovimentacao from './components/CadastroMovimentacao'
import Relatorio from './components/Relatorio'
import { Routes, Route, Outlet, Link} from 'react-router-dom'

export default function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CadastroConteiner />} />
          <Route path="movimentacao" element={<CadastroMovimentacao />} />
          <Route path="relatorio" element={<Relatorio />} />

          
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className='menu'>
      
      <nav>
        <ul className='position-menu'>
          <li>
            <Link to="/">Conteiner</Link>
          </li>
          <li>
            <Link to="/movimentacao">Movimentacao</Link>
          </li>
          <li>
            <Link to="/relatorio">Relatório</Link>
          </li>
          
        </ul>
      </nav>

      <hr />

      
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
