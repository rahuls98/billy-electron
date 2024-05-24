import "./style.css";

const PdfPreviewControls = ({ printHandler, uploadHandler }) => {
    return (
        <div id="pdf-preview-controls-container">
            <button onClick={printHandler}>Print</button>
            <button onClick={uploadHandler}>Upload</button>
        </div>
    );
};

export default PdfPreviewControls;
