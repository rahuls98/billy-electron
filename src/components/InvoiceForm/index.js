import { useContext, useState } from "react";
import { invoiceDataContext } from "../../contexts/invoiceDataContext";
import VerticalSpace from "../VerticalSpace";

const InvoiceForm = () => {
    const {
        invoiceMetadata,
        billingDetails,
        deliveryAddress,
        particulars,
        handleSetParticulars,
        handleAddParticular,
        handleDeleteParticular,
        gst,
        totalInWords,
        setTotalInWords,
    } = useContext(invoiceDataContext);
    const [deliveryAddressFieldsSeen, setDeliveryAddressFieldsSeen] =
        useState(true);

    const handleSameDeliveryAddress = (e) => {
        setDeliveryAddressFieldsSeen(!e.currentTarget.checked);
        deliveryAddress.setCustomerName(billingDetails.customerName);
        deliveryAddress.setAddressLine1(billingDetails.addressLine1);
        deliveryAddress.setAddressLine2(billingDetails.addressLine2);
        deliveryAddress.setAddressLine3(billingDetails.addressLine3);
    };

    return (
        <div>
            <div>
                <label htmlFor="invoice-no">Invoice Number</label>
                <input
                    id="invoice-no"
                    type="text"
                    value={invoiceMetadata.invoiceNo}
                    onChange={(e) =>
                        invoiceMetadata.setInvoiceNo(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="invoice-dated">Invoice Dated</label>
                <input
                    id="invoice-dated"
                    type="text"
                    value={invoiceMetadata.invoiceDated}
                    onChange={(e) =>
                        invoiceMetadata.setInvoiceDated(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="supplier-code">Supplier Code</label>
                <input
                    id="supplier-code"
                    type="text"
                    value={invoiceMetadata.supplierCode}
                    onChange={(e) =>
                        invoiceMetadata.setSupplierCode(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="registration-dated">Registration Dated</label>
                <input
                    id="registration-dated"
                    type="text"
                    value={invoiceMetadata.registrationDated}
                    onChange={(e) =>
                        invoiceMetadata.setRegistrationDated(
                            e.currentTarget.value
                        )
                    }
                />
            </div>
            <div>
                <label htmlFor="buyer-order-number">Buyer Order Number</label>
                <input
                    id="buyer-order-number"
                    type="text"
                    value={invoiceMetadata.buyerOrderNo}
                    onChange={(e) =>
                        invoiceMetadata.setBuyerOrderNo(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="buyer-order-dated">Buyer Order Dated</label>
                <input
                    id="buyer-order-dated"
                    type="text"
                    value={invoiceMetadata.buyerOrderDated}
                    onChange={(e) =>
                        invoiceMetadata.setBuyerOrderDated(
                            e.currentTarget.value
                        )
                    }
                />
            </div>
            <VerticalSpace size={10} />
            <hr />
            <h2>Billing Address</h2>
            <div>
                <label htmlFor="billing-customer-name">Customer Name</label>
                <input
                    id="billing-customer-name"
                    type="text"
                    value={billingDetails.customerName}
                    onChange={(e) =>
                        billingDetails.setCustomerName(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="billing-address-line-1">Address Line 1</label>
                <input
                    id="billing-address-line-1"
                    type="text"
                    value={billingDetails.addressLine1}
                    onChange={(e) =>
                        billingDetails.setAddressLine1(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="billing-address-line-2">Address Line 2</label>
                <input
                    id="billing-address-line-2"
                    type="text"
                    value={billingDetails.addressLine2}
                    onChange={(e) =>
                        billingDetails.setAddressLine2(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="billing-address-line-3">Address Line 3</label>
                <input
                    id="billing-address-line-3"
                    type="text"
                    value={billingDetails.addressLine3}
                    onChange={(e) =>
                        billingDetails.setAddressLine3(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="billing-customer-gst-number">
                    Customer GST Number
                </label>
                <input
                    id="billing-customer-gst-number"
                    type="text"
                    value={billingDetails.customerGstNumber}
                    onChange={(e) =>
                        billingDetails.setCustomerGstNumber(
                            e.currentTarget.value
                        )
                    }
                />
            </div>
            <VerticalSpace size={10} />
            <hr />
            <h2>Delivery Address</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    id="delivery-same-as-billing"
                    type="checkbox"
                    onClick={(e) => handleSameDeliveryAddress(e)}
                />
                <label
                    style={{ margin: "0 0 0 10px" }}
                    htmlFor="delivery-same-as-billing"
                >
                    Delivery Address same as Billing Address
                </label>
            </div>
            {deliveryAddressFieldsSeen ? (
                <div>
                    <div>
                        <label htmlFor="delivery-customer-name">
                            Customer Name
                        </label>
                        <input
                            id="delivery-customer-name"
                            type="text"
                            value={deliveryAddress.customerName}
                            onChange={(e) =>
                                deliveryAddress.setCustomerName(
                                    e.currentTarget.value
                                )
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="delivery-address-line-1">
                            Address Line 1
                        </label>
                        <input
                            id="delivery-address-line-1"
                            type="text"
                            value={deliveryAddress.addressLine1}
                            onChange={(e) =>
                                deliveryAddress.setAddressLine1(
                                    e.currentTarget.value
                                )
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="delivery-address-line-2">
                            Address Line 2
                        </label>
                        <input
                            id="delivery-address-line-2"
                            type="text"
                            value={deliveryAddress.addressLine2}
                            onChange={(e) =>
                                deliveryAddress.setAddressLine2(
                                    e.currentTarget.value
                                )
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="delivery-address-line-3">
                            Address Line 3
                        </label>
                        <input
                            id="delivery-address-line-3"
                            type="text"
                            value={deliveryAddress.addressLine3}
                            onChange={(e) =>
                                deliveryAddress.setAddressLine3(
                                    e.currentTarget.value
                                )
                            }
                        />
                    </div>
                </div>
            ) : null}
            <VerticalSpace size={10} />
            <hr />
            <h2>Particulars</h2>
            {particulars &&
                particulars.map((row, ridx) => {
                    return (
                        <div key={ridx}>
                            <h3>Item {ridx + 1}</h3>
                            {row.slice(1).map((col, cidx) => {
                                return (
                                    <div key={cidx}>
                                        <label
                                            htmlFor={`r${ridx}-c${cidx + 1}`}
                                        >
                                            {col.label}
                                        </label>
                                        <input
                                            id={`r${ridx}-c${cidx + 1}`}
                                            type="text"
                                            value={col.value}
                                            onChange={(e) =>
                                                handleSetParticulars(
                                                    e.currentTarget.id,
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

            <VerticalSpace size={20} />
            <div style={{ display: "flex", justifyContent: "right" }}>
                <button onClick={handleAddParticular}>Add</button>
                <button onClick={handleDeleteParticular}>Delete</button>
            </div>
            <VerticalSpace size={10} />
            <hr />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    id="cgst-checkbox"
                    checked={gst.cgstCheck}
                    onChange={(e) => gst.setCgstCheck(e.currentTarget.checked)}
                />
                <label htmlFor="cgst-checkbox" style={{ marginTop: 0 }}>
                    CGST
                </label>
            </div>
            <input
                type="text"
                placeholder="%"
                disabled={!gst.cgstCheck}
                value={gst.cgst}
                onChange={(e) => gst.setCgst(e.currentTarget.value)}
            />
            <VerticalSpace size={10} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    id="sgst-checkbox"
                    checked={gst.sgstCheck}
                    onChange={(e) => gst.setSgstCheck(e.currentTarget.checked)}
                />
                <label htmlFor="sgst-checkbox" style={{ marginTop: 0 }}>
                    SGST
                </label>
            </div>
            <input
                type="text"
                placeholder="%"
                disabled={!gst.sgstCheck}
                value={gst.sgst}
                onChange={(e) => gst.setSgst(e.currentTarget.value)}
            />
            <VerticalSpace size={10} />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    id="igst-checkbox"
                    checked={gst.igstCheck}
                    onChange={(e) => gst.setIgstCheck(e.currentTarget.checked)}
                />
                <label htmlFor="igst-checkbox" style={{ marginTop: 0 }}>
                    IGST
                </label>
            </div>
            <input
                type="text"
                placeholder="%"
                disabled={!gst.igstCheck}
                value={gst.igst}
                onChange={(e) => gst.setIgst(e.currentTarget.value)}
            />
            <VerticalSpace size={10} />
            <hr />
            <label htmlFor="total-in-words">Total in words</label>
            <input
                id="total-in-words"
                type="text"
                value={totalInWords}
                onChange={(e) => setTotalInWords(e.currentTarget.value)}
            />
        </div>
    );
};

export default InvoiceForm;
