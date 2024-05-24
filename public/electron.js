const path = require("path");
const { app, BrowserWindow } = require("electron");

const isMac = process.platform === "darwin";

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });

    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
    mainWindow.maximize();
    mainWindow.show();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (!isMac) app.quit();
});
