import "./App.css";
import { useEffect } from "react";
const { ipcRenderer } = window.require("electron");

function App() {
    useEffect(() => {
        ipcRenderer
            .invoke("readInvoiceAndCustomerNames")
            .then((data) => console.log(data));
    }, []);

    return <div className="App">Billy says hi!</div>;
}

export default App;
