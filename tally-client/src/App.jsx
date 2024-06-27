import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LedgerCreationForm from './pages/create-ledger';
import VoucherCreationForm from './pages/create-voucher';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/ledger-creation" element={<div><LedgerCreationForm/></div>}/>
      <Route path="/voucher-creation" element={<div><VoucherCreationForm/></div>}/>

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
