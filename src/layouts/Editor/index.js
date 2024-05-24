import PdfPreview from "../../components/PdfPreview";
import PdfPreviewControls from "../../components/PdfPreviewControls";
import InvoiceForm from "../../components/InvoiceForm";
import "./style.css";
import { useContext } from "react";
import { invoiceDataContext } from "../../contexts/invoiceDataContext";

const Editor = ({ setPage }) => {
    const {
        invoiceMetadata,
        billingDetails,
        deliveryAddress,
        particulars,
        gst,
        totalInWords,
        handleWriteDataToDb,
    } = useContext(invoiceDataContext);

    const bill = {
        invoiceMetadata,
        billingDetails,
        deliveryAddress,
        particulars,
        gst,
        totalInWords,
    };

    const handlePrint = () => {
        setPage(1);
    };

    const handleUpload = () => {
        handleWriteDataToDb();
        setPage(2);
    };

    return (
        <div id="editor-container">
            <div id="editor-form">
                <InvoiceForm />
            </div>
            <div id="editor-pdf-preview" className="collapsable">
                <PdfPreviewControls
                    printHandler={handlePrint}
                    uploadHandler={handleUpload}
                />
                <div id="pdf-preview">
                    <PdfPreview bill={bill} />
                </div>
            </div>
        </div>
    );
};

export default Editor;
