// Copyright 2021 Tecnológico de Costa Rica

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//"use strict";

import { app, protocol, BrowserWindow, Menu, MenuItem, webFrame, ipcMain, globalShortcut, ipcRenderer } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import Store from "electron-store";
import os from "os";
import type * as pty from 'node-pty';
import electronLocalshortcut from "electron-localshortcut";

let window: BrowserWindow;

const isDevelopment = process.env.NODE_ENV !== "production";
const shell = os.platform() == "win32" ? "powershell.exe" : "bash";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

Store.initRenderer();

async function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 512,
    minHeight: 410,
    frame: false,
    backgroundColor: "#2b2b2b",
    icon: "./src/assets/img/logo.png",
    webPreferences: {
      enableRemoteModule: true,
      devTools: isDevelopment,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (!isDevelopment) {
    window.setMenu(null);
  }

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

  // Unregister CommandOrControl+R
  electronLocalshortcut.unregister(window, "CommandOrControl+R");
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

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

ipcMain.on("OPEN_EXTERNAL", (_, url) => {
  const command = 
  os.platform() == "win32" ? "start" : 
  os.platform() == "darwin" ? "open" : "xdg-open";
  require("child_process").execSync(`${command} ${url}`);
});

// NODE PTY TERMINAL MANAGER
const terminals: { [key: number]: pty.IPty } = {};

ipcMain.on("TERMINAL_INIT", (_event, id: number) => {
  terminals[id] = require('node-pty').spawn(shell, [], {
    name: 'xterm-color',
    cols: 300,
    rows: 60,
    cwd: process.env.HOME,
    env: process.env as { [key: string]: string; }
  }) as pty.IPty;

  terminals[id].on('data', (data: any) => {
    window.webContents.send("TERMINAL_OUTPUT_ID_" + id.toString(), data,);
  })
});

ipcMain.on("TERMINAL_INPUT", (_event, data, id) => {
  terminals[id].write(data);
});

ipcMain.on("TERMINAL_KILL", (_event, id) => {
  terminals[id].kill();
  delete terminals[id];
});

ipcMain.on("TERMINAL_CHANGE_SIZE", (_event, id, cols, rows) => {
  terminals[id].resize(cols, rows);
});

// Bind shortcuts

ipcMain.on('BIND_SHORTCUT', (_event, shortcut: string) => {
  // Replace Ctrl with CommandOrControl for MacOS support
  const fullShortcut = shortcut.replace('Ctrl', 'CommandOrControl');

  // Unregister shortcut for consistency 
  electronLocalshortcut.unregister(window, fullShortcut);

  electronLocalshortcut.register(window, fullShortcut, () => {
    window.webContents.send('SC_' + shortcut);
  });
});
