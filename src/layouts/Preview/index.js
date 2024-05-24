import { useEffect, useContext } from "react";
import PdfPreview from "../../components/PdfPreview";
import { invoiceDataContext } from "../../contexts/invoiceDataContext";

const Preview = ({ setPage, print }) => {
    const { createBillForPreview } = useContext(invoiceDataContext);

    useEffect(() => {
        if (print) {
            window.print();
            setPage(0);
        }
    }, [setPage, print]);

    return (
        <>
            <PdfPreview bill={createBillForPreview()} />
        </>
    );
};

export default Preview;
