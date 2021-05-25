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

import { ITheme } from "xterm";

export const terminalThemes: { [themeName: string]: ITheme } = {
  dark: {
    foreground: "#cccccc",
    background: "#1e1e1e",
    cursor: "#cccccc",
    cursorAccent: "#cccccc",
    selection: "#cccccc",
  },
  light: {
    foreground: "#000000",
    background: "#ffffff",
    cursor: "#000000",
    cursorAccent: "#000000",
    selection: "#000000",
  },
  black: {
    foreground: "#ffffff",
    background: "#000000",
    cursor: "#ffffff",
    cursorAccent: "#ffffff",
    selection: "#ffffff",
  },
  blue: {
    foreground: "#ffffff",
    background: "#0c173b",
    cursor: "#ffffff",
    cursorAccent: "#ffffff",
    selection: "#ffffff",
  },
  
  base: {
    foreground: "",
    background: "",
    cursor: "",
    cursorAccent: "",
    selection: "",
    black: "",
    red: "",
    green: "",
    yellow: "",
    blue: "",
    magenta: "",
    cyan: "",
    white: "",
    brightBlack: "",
    brightRed: "",
    brightGreen: "",
    brightYellow: "",
    brightBlue: "",
    brightMagenta: "",
    brightCyan: "",
    brightWhite: "",
  },
};