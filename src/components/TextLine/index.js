import "./style.css";

const TextLine = ({ text, placeholderText }) => {
    return (
        <>
            {text ? (
                <span className="text-line">{text}</span>
            ) : (
                <span className="text-line-placeholder">
                    <i>{placeholderText}</i>
                </span>
            )}
            <br />
        </>
    );
};
export default TextLine;
