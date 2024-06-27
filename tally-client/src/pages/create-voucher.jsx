import React, { useState } from 'react';
import axios from 'axios';

const VoucherCreationForm = () => {
  const [voucher, setVoucher] = useState({
    date: '',
    bankName: '',
    narration: '',
    amount: '',
    ledgerName: '',
    ledgerGroup: '',
    company: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVoucher({
      ...voucher,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Voucher Details:",   voucher);
    axios
      .post("http://localhost:8000/voucher", voucher)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Voucher Creation</h2>
     
     
          value={voucher.mailingName}
          onChange={handleChange}
      
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={voucher.date}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Bank Name:
        <input
          type="text"
          name="bankName"
          value={voucher.bankName}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Narration:
        <input
          type="text"
          name="narration"
          value={voucher.narration}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={voucher.amount}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Ledger Name:
        <input
          type="text"
          name="ledgerName"
          value={voucher.ledgerName}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Ledger Group:
        <input
          type="text"
          name="ledgerGroup"
          value={voucher.ledgerGroup}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Company:
        <input
          type="text"
          name="company"
          value={voucher.company}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VoucherCreationForm;
