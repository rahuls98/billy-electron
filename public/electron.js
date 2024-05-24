const path = require("path");
const { app, BrowserWindow } = require("electron");
const { connectToAtlas, disconnectFromAtlas } = require("./mongodb");

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

app.on("ready", () => {
    connectToAtlas();
    createWindow();
});

app.on("window-all-closed", () => {
    disconnectFromAtlas();

    if (!isMac) app.quit();
});
