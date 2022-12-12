import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import MoviesList from './components/MoviesList';
import SeatSelect from './components/SeatSelect';
import SessionSelect from './components/SessionSelect';
import Success from './components/Success';

function App() {
  const [successObject, setSuccessObject] = useState([])

  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path='/' element={<MoviesList />}/>
        <Route path='/sessoes/:idFilme' element={<SessionSelect />}/>
        <Route path='/assentos/:idSessao' element={<SeatSelect setSuccessObject={setSuccessObject}/>}/>
        <Route path='/sucesso' element={<Success successObject={successObject}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
