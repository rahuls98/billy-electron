import { useState, createContext } from "react";
import { write } from "../utils/mongo";

export const invoiceDataContext = createContext({});

const InvoiceDataContextProvider = ({ children }) => {
    const [invoiceNo, setInvoiceNo] = useState("");
    const [invoiceDated, setInvoiceDated] = useState("");
    const [supplierCode, setSupplierCode] = useState("");
    const [registrationDated, setRegistrationDated] = useState("");
    const [buyerOrderNo, setBuyerOrderNo] = useState("");
    const [buyerOrderDated, setBuyerOrderDated] = useState("");
    const [billingCustomerName, setBillingCustomerName] = useState("");
    const [billingAddressLine1, setBillingAddressLine1] = useState("");
    const [billingAddressLine2, setBillingAddressLine2] = useState("");
    const [billingAddressLine3, setBillingAddressLine3] = useState("");
    const [billingCustomerGstNumber, setBillingCustomerGstNumber] =
        useState("");
    const [deliveryCustomerName, setDeliveryCustomerName] = useState("");
    const [deliveryAddressLine1, setDeliveryAddressLine1] = useState("");
    const [deliveryAddressLine2, setDeliveryAddressLine2] = useState("");
    const [deliveryAddressLine3, setDeliveryAddressLine3] = useState("");
    const [particulars, setParticulars] = useState([
        [
            {
                label: "No.",
                value: 1,
            },
            {
                label: "Particular",
                value: "",
            },
            {
                label: "HSN/SAC",
                value: "",
            },
            {
                label: "Unit sq. ft.",
                value: 0,
            },
            {
                label: "Unit Rate",
                value: 0,
            },
        ],
    ]);
    const [cgstCheck, setCgstCheck] = useState(true);
    const [cgst, setCgst] = useState(9);
    const [sgstCheck, setSgstCheck] = useState(true);
    const [sgst, setSgst] = useState(9);
    const [igstCheck, setIgstCheck] = useState(false);
    const [igst, setIgst] = useState(18);
    const [totalInWords, setTotalInWords] = useState("");

    const handleSetParticulars = (id, value) => {
        let [row, col] = id.split("-");
        row = Number(row.slice(1));
        col = Number(col.slice(1));
        let tempParticulars = [...particulars];
        let particular = tempParticulars[row];
        let field = particular[col];
        field.value = value;
        particular[col] = field;
        tempParticulars[row] = particular;
        setParticulars(tempParticulars);
    };

    const handleAddParticular = () => {
        let tempParticulars = [
            ...particulars,
            [
                {
                    label: "No.",
                    value: particulars.length + 1,
                },
                {
                    label: "Particular",
                    value: "",
                },
                {
                    label: "HSN/SAC",
                    value: "",
                },
                {
                    label: "Unit sq. ft.",
                    value: 0,
                },
                {
                    label: "Unit Rate",
                    value: 0,
                },
            ],
        ];
        setParticulars(tempParticulars);
    };

    const handleDeleteParticular = (id) => {
        let tempParticulars = [...particulars];
        tempParticulars.splice(particulars.length - 1, 1);
        setParticulars(tempParticulars);
    };

    const createBillForPreview = (data) => {
        return {
            invoiceMetadata: {
                invoiceNo: data?.invoiceNo || invoiceNo,
                invoiceDated: data?.invoiceDated || invoiceDated,
                supplierCode: data?.supplierCode || supplierCode,
                registrationDated: data?.registrationDated || registrationDated,
                buyerOrderNo: data?.buyerOrderNo || buyerOrderNo,
                buyerOrderDated: data?.buyerOrderDated || buyerOrderDated,
            },
            billingDetails: {
                customerName: data?.billingCustomerName || billingCustomerName,
                addressLine1: data?.billingAddressLine1 || billingAddressLine1,
                addressLine2: data?.billingAddressLine2 || billingAddressLine2,
                addressLine3: data?.billingAddressLine3 || billingAddressLine3,
                customerGstNumber:
                    data?.billingCustomerGstNumber || billingCustomerGstNumber,
            },
            deliveryAddress: {
                customerName:
                    data?.deliveryCustomerName || deliveryCustomerName,
                addressLine1:
                    data?.deliveryAddressLine1 || deliveryAddressLine1,
                addressLine2:
                    data?.deliveryAddressLine2 || deliveryAddressLine2,
                addressLine3:
                    data?.deliveryAddressLine3 || deliveryAddressLine3,
            },
            particulars: data?.particulars || particulars,
            gst: {
                cgst: data?.cgst || cgst,
                cgstCheck: data?.cgstCheck || cgstCheck,
                sgst: data?.sgst || sgst,
                sgstCheck: data?.sgstCheck || sgstCheck,
                igst: data?.igst || igst,
                igstCheck: data?.igstCheck || igstCheck,
            },
            totalInWords: data?.totalInWords || "",
        };
    };

    const handleWriteDataToDb = async () => {
        const data = {
            invoiceNo,
            invoiceDated,
            supplierCode,
            registrationDated,
            buyerOrderNo,
            buyerOrderDated,
            billingCustomerName,
            billingAddressLine1,
            billingAddressLine2,
            billingAddressLine3,
            billingCustomerGstNumber,
            deliveryCustomerName,
            deliveryAddressLine1,
            deliveryAddressLine2,
            deliveryAddressLine3,
            particulars,
            cgst,
            cgstCheck,
            sgst,
            sgstCheck,
            igst,
            igstCheck,
            totalInWords,
        };
        await write(data);
    };

    const setBillForEdit = (bill) => {
        setInvoiceNo(bill.invoiceMetadata.invoiceNo);
        setInvoiceDated(bill.invoiceMetadata.invoiceDated);
        setSupplierCode(bill.invoiceMetadata.supplierCode);
        setRegistrationDated(bill.invoiceMetadata.registrationDated);
        setBuyerOrderNo(bill.invoiceMetadata.buyerOrderNo);
        setBuyerOrderDated(bill.invoiceMetadata.buyerOrderDated);
        setBillingCustomerName(bill.billingDetails.customerName);
        setBillingAddressLine1(bill.billingDetails.addressLine1);
        setBillingAddressLine2(bill.billingDetails.addressLine2);
        setBillingAddressLine3(bill.billingDetails.addressLine3);
        setBillingCustomerGstNumber(bill.billingDetails.customerGstNumber);
        setDeliveryCustomerName(bill.deliveryAddress.customerName);
        setDeliveryAddressLine1(bill.deliveryAddress.addressLine1);
        setDeliveryAddressLine2(bill.deliveryAddress.addressLine2);
        setDeliveryAddressLine3(bill.deliveryAddress.addressLine3);
        setParticulars(bill.particulars);
        setCgstCheck(bill.gst.cgstCheck);
        setCgst(bill.gst.cgst);
        setSgstCheck(bill.gst.sgstCheck);
        setSgst(bill.gst.sgst);
        setIgstCheck(bill.gst.igstCheck);
        setIgst(bill.gst.igst);
        setTotalInWords(bill.totalInWords);
    };

    return (
        <invoiceDataContext.Provider
            value={{
                invoiceMetadata: {
                    invoiceNo,
                    setInvoiceNo,
                    invoiceDated,
                    setInvoiceDated,
                    supplierCode,
                    setSupplierCode,
                    registrationDated,
                    setRegistrationDated,
                    buyerOrderNo,
                    setBuyerOrderNo,
                    buyerOrderDated,
                    setBuyerOrderDated,
                },
                billingDetails: {
                    customerName: billingCustomerName,
                    setCustomerName: setBillingCustomerName,
                    addressLine1: billingAddressLine1,
                    setAddressLine1: setBillingAddressLine1,
                    addressLine2: billingAddressLine2,
                    setAddressLine2: setBillingAddressLine2,
                    addressLine3: billingAddressLine3,
                    setAddressLine3: setBillingAddressLine3,
                    customerGstNumber: billingCustomerGstNumber,
                    setCustomerGstNumber: setBillingCustomerGstNumber,
                },
                deliveryAddress: {
                    customerName: deliveryCustomerName,
                    setCustomerName: setDeliveryCustomerName,
                    addressLine1: deliveryAddressLine1,
                    setAddressLine1: setDeliveryAddressLine1,
                    addressLine2: deliveryAddressLine2,
                    setAddressLine2: setDeliveryAddressLine2,
                    addressLine3: deliveryAddressLine3,
                    setAddressLine3: setDeliveryAddressLine3,
                },
                particulars,
                handleSetParticulars,
                handleAddParticular,
                handleDeleteParticular,
                gst: {
                    cgstCheck,
                    setCgstCheck,
                    cgst,
                    setCgst,
                    sgstCheck,
                    setSgstCheck,
                    sgst,
                    setSgst,
                    igstCheck,
                    setIgstCheck,
                    igst,
                    setIgst,
                },
                totalInWords,
                setTotalInWords,
                createBillForPreview,
                setBillForEdit,
                handleWriteDataToDb,
            }}
        >
            {children}
        </invoiceDataContext.Provider>
    );
};

export default InvoiceDataContextProvider;
