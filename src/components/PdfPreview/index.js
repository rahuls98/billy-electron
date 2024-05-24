import "./style.css";
import InvoiceBaseData from "./data.json";
import VerticalSpace from "../VerticalSpace";
import TextLine from "../TextLine";
import Signature from "../../sign.png";

const PdfPreview = ({ bill }) => {
    const {
        invoiceMetadata,
        billingDetails,
        deliveryAddress,
        particulars,
        gst,
        totalInWords,
    } = bill;

    const getSubTotal = () => {
        if (particulars.length > 0) {
            return particulars?.reduce(
                (acc, particular) =>
                    acc + particular[3].value * particular[4].value,
                0
            );
        } else {
            return 0;
        }
    };

    const getTotalAmount = () => {
        let subTotal = getSubTotal();
        let cgstAmount = gst?.cgstCheck
            ? (Number(gst?.cgst) / 100) * subTotal
            : 0;
        let sgstAmount = gst?.sgstCheck
            ? (Number(gst?.sgst) / 100) * subTotal
            : 0;
        let igstAmount = gst?.igstCheck
            ? (Number(gst?.igst) / 100) * subTotal
            : 0;
        return subTotal + cgstAmount + sgstAmount + igstAmount;
    };

    return (
        <div className="pdf-preview-container">
            <div id="letter-head">
                <p id="letter-head-title">SHRISTI</p>
                <div id="letter-head-address">
                    {InvoiceBaseData["letter_head_address"].map((text, idx) => (
                        <TextLine key={idx} text={text} />
                    ))}
                </div>
            </div>
            <div id="invoice-metadata">
                <VerticalSpace size={15} />
                <div className="text-right">
                    <strong>ORIGINAL</strong>
                </div>
                <VerticalSpace size={15} />
                <div className="text-center">
                    <strong>TAX INVOICE</strong>
                </div>
                <VerticalSpace size={20} />
                <div id="provider-details">
                    <div>
                        {InvoiceBaseData["provider-details"].map(
                            (text, idx) => (
                                <TextLine key={idx} text={text} />
                            )
                        )}
                    </div>
                    <div>
                        <TextLine text={"Invoice No."} />
                        <TextLine text={"Invoice Dated"} />
                        <TextLine text={"Supplier Code"} />
                        <TextLine text={"Registration Dated"} />
                        <TextLine text={"Buyer Order No."} />
                        <TextLine text={"Buyer Order Dated"} />
                    </div>
                    <div>
                        <TextLine text={": " + invoiceMetadata?.invoiceNo} />
                        <TextLine text={": " + invoiceMetadata?.invoiceDated} />
                        <TextLine text={": " + invoiceMetadata?.supplierCode} />
                        <TextLine
                            text={": " + invoiceMetadata?.registrationDated}
                        />
                        <TextLine text={": " + invoiceMetadata?.buyerOrderNo} />
                        <TextLine
                            text={": " + invoiceMetadata?.buyerOrderDated}
                        />
                    </div>
                </div>
                <VerticalSpace size={20} />
                <div id="customer-details">
                    <div>
                        <h3>Billing Details</h3>
                        <TextLine
                            text={billingDetails?.customerName}
                            placeholderText={"Customer Name"}
                        />
                        <TextLine
                            text={billingDetails?.addressLine1}
                            placeholderText={"Address Line 1"}
                        />
                        <TextLine
                            text={billingDetails?.addressLine2}
                            placeholderText={"Address Line 2"}
                        />
                        <TextLine
                            text={billingDetails?.addressLine3}
                            placeholderText={"Address Line 3"}
                        />
                        <TextLine
                            text={billingDetails?.customerGstNumber}
                            placeholderText={"Customer GST Number"}
                        />
                    </div>
                    <div>
                        <h3>Delivery Address</h3>
                        <TextLine
                            text={deliveryAddress?.customerName}
                            placeholderText={"Customer Name"}
                        />
                        <TextLine
                            text={deliveryAddress?.addressLine1}
                            placeholderText={"Address Line 1"}
                        />
                        <TextLine
                            text={deliveryAddress?.addressLine2}
                            placeholderText={"Address Line 2"}
                        />
                        <TextLine
                            text={deliveryAddress?.addressLine3}
                            placeholderText={"Address Line 3"}
                        />
                    </div>
                </div>
                <VerticalSpace size={20} />
            </div>
            <div id="price-breakdown">
                <table>
                    <thead>
                        <tr>
                            <th width="5%">No.</th>
                            <th width="35%">Particulars</th>
                            <th width="15%">HSN/SAC</th>
                            <th width="10%">Unit sq. ft.</th>
                            <th width="15%">Unit Rate</th>
                            <th width="20%">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {particulars &&
                            particulars.map((particular) => (
                                <tr key={particular[0]?.value}>
                                    <td>{particular[0]?.value}</td>
                                    <td lang="en">{particular[1]?.value}</td>
                                    <td>{particular[2]?.value}</td>
                                    <td>{particular[3]?.value}</td>
                                    <td>
                                        {particular[4]?.value?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>
                                    <td>
                                        {(
                                            particular[3]?.value *
                                            particular[4]?.value
                                        ).toLocaleString("en-IN")}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <VerticalSpace size={20} />
                <table id="price-summation">
                    <tbody>
                        <tr>
                            <td width="80%">Sub Total</td>
                            <td width="20%">
                                {getSubTotal()?.toLocaleString("en-IN")}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    <u>Add:</u>
                                </strong>
                                <br />
                                <TextLine text={`CGST @ ${gst?.cgst}%`} />
                                <TextLine text={`SGST @ ${gst?.sgst}%`} />
                                <TextLine text={`IGST @ ${gst?.igst}%`} />
                            </td>
                            <td>
                                <br />
                                <TextLine
                                    text={
                                        gst?.cgstCheck
                                            ? (
                                                  (Number(gst?.cgst) / 100) *
                                                  getSubTotal()
                                              ).toLocaleString("en-IN")
                                            : ""
                                    }
                                    placeholderText={"-"}
                                />
                                <TextLine
                                    text={
                                        gst?.sgstCheck
                                            ? (
                                                  (Number(gst?.sgst) / 100) *
                                                  getSubTotal()
                                              ).toLocaleString("en-IN")
                                            : ""
                                    }
                                    placeholderText={"-"}
                                />
                                <TextLine
                                    text={
                                        gst?.igstCheck
                                            ? (
                                                  (Number(gst?.igst) / 100) *
                                                  getSubTotal()
                                              ).toLocaleString("en-IN")
                                            : ""
                                    }
                                    placeholderText={"-"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="highlight-cell">Total Amount</td>
                            <td className="highlight-cell">
                                ₹{getTotalAmount().toLocaleString("en-IN")}
                            </td>
                        </tr>
                        <tr>
                            <td className="highlight-cell">Rounded Amount</td>
                            <td className="highlight-cell">
                                ₹
                                {Math.round(getTotalAmount()).toLocaleString(
                                    "en-IN"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <TextLine
                                    text={totalInWords}
                                    placeholderText={"Total in words"}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <VerticalSpace size={50} />
            <div id="bank-and-signature">
                <div>
                    <TextLine text={"Bank Details"} />
                    <TextLine text={process.env.REACT_APP_BANK_ACCOUNT_NAME} />
                    <TextLine text={process.env.REACT_APP_BANK_ACCOUNT} />
                    <TextLine text={process.env.REACT_APP_BANK_BRANCH} />
                    <TextLine text={process.env.REACT_APP_BANK_IFSC} />
                </div>
                <div>
                    <TextLine text={"For SHRISTI"} />
                    <img alt="signature" src={Signature} width={100} />
                    <TextLine text={"Authorised signatory"} />
                </div>
            </div>
            <VerticalSpace size={20} />
        </div>
    );
};

export default PdfPreview;
