import "./App.css";
import { useState } from "react";
import Editor from "./layouts/Editor";
import Preview from "./layouts/Preview";
import DataTable from "./layouts/DataTable";

function App() {
    const [page, setPage] = useState(0);

    const viewHandler = () => {
        switch (page) {
            case 0:
                return <Editor setPage={setPage} />;
            case 1:
                return <Preview setPage={setPage} print={true} />;
            case 2:
                return <DataTable setPage={setPage} />;
            default:
                return null;
        }
    };

    return (
        <div className="App">
            {page !== 1 ? (
                <div className="navbar">
                    <span
                        className={page === 0 ? "active" : ""}
                        onClick={() => setPage(0)}
                    >
                        Editor
                    </span>
                    <span
                        className={page === 2 ? "active" : ""}
                        onClick={() => setPage(2)}
                    >
                        Database
                    </span>
                </div>
            ) : null}
            {viewHandler()}
        </div>
    );
}

export default App;
