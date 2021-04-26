//"use strict";

import { app, protocol, BrowserWindow, Menu, MenuItem, webFrame, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import os from "os";
import pty from 'node-pty';

var window: BrowserWindow;

const isDevelopment = process.env.NODE_ENV !== "production";
const shell = os.platform() == "win32" ? "powershell.exe" : "bash";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 512,
    minHeight: 410,
    frame: false,
    backgroundColor: "#2b2b2b",
    icon: "./src/assets/logo.png",
    webPreferences: {
      enableRemoteModule: true,
      devTools: true,
      nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    //if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    window.loadURL("app://./index.html");
  }

  window.on('unmaximize', () => {
    window.webContents.send("SET_WINDOW_MAXIMIZED", false);
  });

  window.on('maximize', () => {
    window.webContents.send("SET_WINDOW_MAXIMIZED", true);
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();

});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}



ipcMain.on("ZOOM_IN", () => {
  console.log("hi");
  // webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
});

ipcMain.on("ZOOM_OUT", () => {
  // webFrame.setZoomLevel(webFrame.getZoomLevel() - 1);
});

// NODE PTY TERMINAL MANAGER
var terminals: any = {};

ipcMain.on("TERMINAL_INIT", (_event, id: number) => {
  terminals[id] = require('node-pty').spawn(shell, [], {
    name: 'xterm-color',
    cols: 100,
    rows: 60,
    cwd: process.env.HOME,
    env: process.env as { [key: string]: string; }
  });

  terminals[id].on('data', (data: any) => {
    window.webContents.send("TERMINAL_OUTPUT_ID_" + id.toString(), data,);
  })
});

ipcMain.on("TERMINAL_INPUT", (_event, data, id) => {
  terminals[id].write(data);
});

ipcMain.on("TERMINAL_KILL", (_event, id) => {
  terminals[id].kill();
  terminals[id] = null;
});