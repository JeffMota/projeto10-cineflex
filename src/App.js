import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import MoviesList from './components/MoviesList';
import SeatSelect from './components/SeatSelect';
import SessionSelect from './components/SessionSelect';
import Success from './components/Success';

function App() {
  const [successObject, setSuccessObject] = useState([])
  const [back, setBack] = useState(true)
  const [id, setId] = useState([])

  return (
    <BrowserRouter >
      <Header back={back}/>
      <Routes>
        <Route path='/' element={<MoviesList setBack={setBack}/>}/>
        <Route path='/sessoes/:idFilme' element={<SessionSelect setBack={setBack} setId={setId}/>}/>
        <Route path='/assentos/:idSessao' element={<SeatSelect setSuccessObject={setSuccessObject} setBack={setBack} idAnt={id}/>}/>
        <Route path='/sucesso' element={<Success successObject={successObject} setBack={setBack}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
