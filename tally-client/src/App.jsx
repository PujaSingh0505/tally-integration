import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LedgerCreationForm from './pages/create-ledger';
import VoucherCreationForm from './pages/create-voucher';
import LedgerNameBox from './pages/getData';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/ledger-creation" element={<div><LedgerCreationForm/></div>}/>
      <Route path="/voucher-creation" element={<div><VoucherCreationForm/></div>}/>
      <Route path="/get-data" element={<div><LedgerNameBox/></div>}/>
    </Routes>
    </BrowserRouter> 
  )
}

export default App
