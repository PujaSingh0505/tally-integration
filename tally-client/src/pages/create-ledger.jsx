import React, { useState } from 'react';
import axios from 'axios';

const LedgerCreationForm = () => {
  const [ledger, setLedger] = useState({
    name: '',
    alias: '',
    mailingName: '',
    address: '',
    state: 'Jharkhand',
    country: 'India',
    pincode: '',
    provideBankDetails: false,
    pan: '',
    registrationType: 'Regular',
    gstin: '',
    additionalGstDetails: false,
    openingBalance: '',
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
    setLedger({
      ...ledger,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ledger Details:", ledger);
    axios
      .post("http://localhost:8000/ledger", ledger)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ledger Creation</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={ledger.name}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Alias:
        <input
          type="text"
          name="alias"
          value={ledger.alias}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Under:
        <input type="text" name="under" value={ledger.under} readOnly />
      </label>
      <br />
      <h3>Mailing Details</h3>
      <label>
        Name:
        <input
          type="text"
          name="mailingName"
          value={ledger.mailingName}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={ledger.address}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        State:
        <input type="text" name="state" value={ledger.state} readOnly />
      </label>
      <br />
      <label>
        Country:
        <input type="text" name="country" value={ledger.country} readOnly />
      </label>
      <br />
      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={ledger.pincode}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <h3>Banking Details</h3>
      <label>
        Provide bank details:
        <input
          type="checkbox"
          name="provideBankDetails"
          checked={ledger.provideBankDetails}
          onChange={handleChange}
        />
      </label>
      <br />
      <h3>Tax Registration Details</h3>
      <label>
        PAN/IT No.:
        <input
          type="text"
          name="pan"
          value={ledger.pan}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Registration type:
        <input type="text" name="registrationType" value={ledger.registrationType} readOnly />
      </label>
      <br />
      <label>
        GSTIN/UIN:
        <input
          type="text"
          name="gstin"
          value={ledger.gstin}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Set/Alter additional GST details:
        <input
          type="checkbox"
          name="additionalGstDetails"
          checked={ledger.additionalGstDetails}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Opening Balance:
        <input
          type="text"
          name="openingBalance"
          value={ledger.openingBalance}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={ledger.date}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Bank Name:
        <input
          type="text"
          name="bankName"
          value={ledger.bankName}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Narration:
        <input
          type="text"
          name="narration"
          value={ledger.narration}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={ledger.amount}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Ledger Name:
        <input
          type="text"
          name="ledgerName"
          value={ledger.ledgerName}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Ledger Group:
        <input
          type="text"
          name="ledgerGroup"
          value={ledger.ledgerGroup}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <label>
        Company:
        <input
          type="text"
          name="company"
          value={ledger.company}
          onChange={handleChange}
          
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LedgerCreationForm;
