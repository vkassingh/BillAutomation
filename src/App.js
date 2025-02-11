import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./style.css"; // Import CSS

const App = () => {
  const pdfRef = useRef();

  const data = {
    invoice: {
      number: "2024-25/01",
      date: "13/08/2024",
      place_of_supply: "Sample City",
      reverse_charge: "N",
    },
    party: {
      gstin: "09AMYPK1749C1ZO",
      trade_name: "M/S NEERAJ INDUSTRIES",
      principal_address: {
        address1: "PRATAP GANJ",
        city: "Kanpur Nagar",
        state: "UP",
        pincode: "208022",
      },
      shipping_address: {
        address1: "E 83/A, Panki Site 5",
        city: "Kanpur Nagar",
        state: "UP",
        pincode: "208022",
      },
    },
    items: [
      {
        description: "UNWROUGHT LEAD",
        hsn_code: 7801,
        qty: 1899.9,
        unit: "Kgs",
        price: 184,
      },
    ],
    tax_rate: 18,
  };

  const taxableAmount = data.items[0].qty * data.items[0].price;
  const totalTax = (taxableAmount * data.tax_rate) / 100;
  const grandTotal = taxableAmount + totalTax;

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="container">
      <h2 className="title">Tax Invoice</h2>

      <div ref={pdfRef} className="invoice-box">
        <h3 className="company-title">Sample Bill Company</h3>
        <p className="company-info">S-1 S-1 Sample City, State-001100</p>

        <div className="section">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <b>Invoice No:</b> {data.invoice.number}
                </td>
                <td>
                  <b>Date:</b> {data.invoice.date}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Place of Supply:</b> {data.invoice.place_of_supply}
                </td>
                <td>
                  <b>Reverse Charge:</b> {data.invoice.reverse_charge}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Billing Details */}
        <div className="flex-container">
          <div className="flex-item">
            <h4>Bill to:</h4>
            <p>{data.party.trade_name}</p>
            <p>
              {data.party.principal_address.address1},{" "}
              {data.party.principal_address.city}
            </p>
            <p>
              {data.party.principal_address.state} -{" "}
              {data.party.principal_address.pincode}
            </p>
            <p>
              <b>GSTIN:</b> {data.party.gstin}
            </p>
          </div>
          <div className="flex-item">
            <h4>Shipping Address:</h4>
            <p>
              {data.party.shipping_address.address1},{" "}
              {data.party.shipping_address.city}
            </p>
            <p>
              {data.party.shipping_address.state} -{" "}
              {data.party.shipping_address.pincode}
            </p>
            <p>
              <b>GSTIN:</b> {data.party.gstin}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.hsn_code}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>â‚¹{item.price.toFixed(2)}</td>
                <td>â‚¹{(item.qty * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tax Calculation */}
        <table className="table">
          <thead>
            <tr>
              <th>Tax Rate</th>
              <th>Taxable Amt</th>
              <th>IGST</th>
              <th>Total Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.tax_rate}%</td>
              <td>â‚¹{taxableAmount.toFixed(2)}</td>
              <td>0</td>
              <td>â‚¹{totalTax.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Grand Total */}
        <h3 className="total-amount">Grand Total: â‚¹{grandTotal.toFixed(2)}</h3>

        <button onClick={downloadPDF} className="button">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default App;
