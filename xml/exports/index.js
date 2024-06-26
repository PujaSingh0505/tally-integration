const axios = require("axios");
const xml2js = require("xml2js");

async function fetchVoucherData() {
  const tallyURL = "http://localhost:9000";
  const xmlRequest = `
  <ENVELOPE>
    <HEADER>
      <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
      <EXPORTDATA>
        <REQUESTDESC>
          <REPORTNAME>Ledger Vouchers</REPORTNAME>
          <STATICVARIABLES>
            <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
            <LEDGERNAME>Furniture</LEDGERNAME>
          </STATICVARIABLES>
        </REQUESTDESC>
      </EXPORTDATA>
    </BODY>
  </ENVELOPE>`;

  try {
    const response = await axios.post(tallyURL, xmlRequest, {
      headers: {
        "Content-Type": "application/xml",
      },
    });

    const result = await xml2js.parseStringPromise(response.data);
    console.log("Voucher Data:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

async function sendVoucherData() {
  const tallyURL = "http://localhost:9000";
  const xmlRequest = `
  <ENVELOPE>
    <HEADER>
      <TALLYREQUEST>Import Data</TALLYREQUEST>
    </HEADER>
    <BODY>
      <IMPORTDATA>
        <REQUESTDESC>
          <REPORTNAME>All Masters</REPORTNAME>
        </REQUESTDESC>
        <REQUESTDATA>
          <TALLYMESSAGE xmlns:UDF="TallyUDF">
            <VOUCHER>
              <DATE>20240614</DATE>
              <NARRATION>Payment for Tax</NARRATION>
              <VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>
              <VOUCHERNUMBER>124</VOUCHERNUMBER>
              <PARTYLEDGERNAME>Fixed Deposit</PARTYLEDGERNAME>
              <LEDGERENTRIES.LIST>
                <LEDGERNAME>Tax Payment</LEDGERNAME>
                <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                <AMOUNT>2000</AMOUNT>
              </LEDGERENTRIES.LIST>
              <LEDGERENTRIES.LIST>
                <LEDGERNAME>Cash</LEDGERNAME>
                <ISDEEMEDPOSITIVE>Yes</ISDEEMPOSITIVE>
                <AMOUNT>-2000</AMOUNT>
              </LEDGERENTRIES.LIST>
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

    console.log("Data successfully sent:", response.status);
  } catch (error) {
    console.error("Error sending voucher data:", error);
  }
}

fetchVoucherData(); 
sendVoucherData();

