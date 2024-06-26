const axios = require("axios");
const xml2js = require("xml2js");

async function createPaymentVoucher(voucherData) {
    const tallyURL = "http://localhost:9000"; 
   
    const xmlRequest = `
  <ENVELOPE>
    <HEADER>
        <TALLYREQUEST>Import Data</TALLYREQUEST>
    </HEADER>
    <BODY>
        <IMPORTDATA>
            <REQUESTDESC>
                <REPORTNAME>Vouchers</REPORTNAME>
            </REQUESTDESC>
            <REQUESTDATA>
                <TALLYMESSAGE xmlns:UDF="TallyUDF">
                    <VOUCHER VCHTYPE="Payment" ACTION="Create">
                        <DATE>20240401</DATE>
                        <VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>
                        <VOUCHERNUMBER>PV006</VOUCHERNUMBER>
                        <PARTYLEDGERNAME>Bank Accounts</PARTYLEDGERNAME>
                        <NARRATION>Payment for invoice INV123</NARRATION>
                        <ALLLEDGERENTRIES.LIST>
                            <LEDGERNAME>Bank</LEDGERNAME>
                            <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                            <AMOUNT>-5000</AMOUNT>
                        </ALLLEDGERENTRIES.LIST>
                        <ALLLEDGERENTRIES.LIST>
                            <LEDGERNAME>Bank</LEDGERNAME>
                            <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                            <AMOUNT>5000</AMOUNT>
                        </ALLLEDGERENTRIES.LIST>
                    </VOUCHER>
                </TALLYMESSAGE>
            </REQUESTDATA>
        </IMPORTDATA>
    </BODY>
  </ENVELOPE>`;
   
    try {
      const response = await axios.post(tallyURL, xmlRequest, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
   
      console.log("Create Payment Voucher Response:", response.data);
    } catch (error) {
      console.error("Error creating payment voucher:", error);
    }
  }
   
  // Call the function to create the payment voucher
  createPaymentVoucher();
