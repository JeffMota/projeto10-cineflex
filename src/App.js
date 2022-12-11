import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import MoviesList from './components/MoviesList';
import SessionSelect from './components/SessionSelect';

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path='/' element={<MoviesList />}/>
        <Route path='/sessoes/:idFilme' element={<SessionSelect />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
