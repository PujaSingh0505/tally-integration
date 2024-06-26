import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LedgerCreationForm from './pages/create-ledger';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/ledger-creation" element={<div><LedgerCreationForm/></div>}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
