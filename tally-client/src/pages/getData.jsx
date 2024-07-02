import { useState } from "react";
import axios from "axios";

const VoucherTable = ({ voucherData }) => {
  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">
                Voucher Date
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">
                Ledger Account
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">
                Voucher Type
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">
                Debit Amount
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">
                Credit Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {voucherData.ENVELOPE.DSPVCHDATE.map((date, index) => (
              <tr key={index}>
                <td className="w-1/5 py-3 px-4">{date}</td>
                <td className="w-1/5 py-3 px-4">
                  {voucherData.ENVELOPE.DSPVCHLEDACCOUNT[index]}
                </td>
                <td className="w-1/5 py-3 px-4">
                  {voucherData.ENVELOPE.DSPVCHTYPE[index]}
                </td>
                <td className="w-1/5 py-3 px-4">
                  {voucherData.ENVELOPE.DSPVCHDRAMT[index]}
                </td>
                <td className="w-1/5 py-3 px-4">
                  {voucherData.ENVELOPE.DSPVCHCRAMT[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LedgerNameBox = () => {
  const [ledgerName, setLedgerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [voucherData, setVoucherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setLedgerName(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Ledger Name:", ledgerName);

    try {
      const response = await axios.get(
        `http://localhost:8000/getData?ledgerName=${ledgerName}`
      );
      setVoucherData(response.data);
      
      setSubmitted(true);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {!submitted ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Enter Ledger Name
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="ledgerName"
              >
                Ledger Name
              </label>
              <input
                type="text"
                id="ledgerName"
                value={ledgerName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter ledger name"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      ) : (
        <VoucherTable voucherData={voucherData} />
        
      )}
    </div>
  );
};

export default LedgerNameBox;
