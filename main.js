const { app, BrowserWindow } = require("electron");
const path = require("path");

app.disableHardwareAcceleration();

app.commandLine.appendSwitch("no-sandbox");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-dev-shm-usage");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true
    });

    win.webContents.openDevTools();

    win.loadFile(path.join(__dirname, "index.html"));

    win.webContents.on("did-finish-load", () => {
        console.log("✅ Page loaded");
    });

    win.webContents.on("did-fail-load", (e, code, desc, url) => {
        console.log("❌ Load failed");
        console.log(code, desc, url);
    });

    win.webContents.on("render-process-gone", (e, details) => {
        console.log("Renderer crashed:", details);
    });
}

app.whenReady().then(createWindow);
