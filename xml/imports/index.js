import axios from "axios";
import xml2js from "xml2js";

// Usage
const account = "Cash";
const date = "20240401";
const bankName = "Cash";
const narration = "Payment for watch from IDFC Bank";
const amount = 400.0;
const ledgerName = "Bank";
const ledgerGroup = "Fixed Assets";
const company = "CPS";
    
// Define createLedger function or import it if defined elsewhere
async function createLedger(ledgerName, ledgerGroup, company) {
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
                    <STATICVARIABLES>
                        <SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
                    </STATICVARIABLES>
                </REQUESTDESC>
                <REQUESTDATA>
                    <TALLYMESSAGE xmlns:UDF="TallyUDF">
                        <LEDGER NAME="${ledgerName}" ACTION="Create">
                            <NAME.LIST>
                                <NAME>${ledgerName}</NAME>
                            </NAME.LIST>
                            <PARENT>${ledgerGroup}</PARENT>
                            <ISBILLWISEON>No</ISBILLWISEON>
                            <AFFECTSSTOCK>No</AFFECTSSTOCK>
                            <OPENINGBALANCE>0</OPENINGBALANCE>
                        </LEDGER>
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

        const result = await xml2js.parseStringPromise(response.data);
        console.log("createLedger:", JSON.stringify(result, null, 2));

        if (result.ENVELOPE.BODY[0].DATA[0].LINEERROR) {
            throw new Error(`Create ledger failed: ${result.ENVELOPE.BODY[0].DATA[0].LINEERROR[0]}`);
        } else {
            console.log("Ledger created successfully.");
        }
    } catch (error) {
        console.error("Error:", error.message || error);
    }
}

createLedger(ledgerName, ledgerGroup, company)
    .then(() => importVoucherData(date, bankName, narration, amount, ledgerName, company))
    .catch((error) => console.error("Error:", error));
