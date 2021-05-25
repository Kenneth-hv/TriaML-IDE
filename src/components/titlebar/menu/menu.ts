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

const menu_elements = [
  {
    title: "menu.file",
    items: [
      {
        title: "menu.file.newfile",
        command: "NEW_FILE",
        shortcut: "Ctrl+N",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.file.openfile",
        command: "OPEN_FILE",
        shortcut: "Ctrl+O",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.file.savefile",
        command: "SAVE_FILE",
        shortcut: "Ctrl+S",
      },
      {
        title: "menu.file.savefileas",
        command: "SAVE_FILE_AS",
        shortcut: "Ctrl+Shift+S",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.file.preferences",
        command: "OPEN_PREFERENCES",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.file.quit",
        command: "CLOSE",
      },
    ],
  },
  {
    title: "menu.run",
    items: [
      {
        title: "menu.run.run",
        command: "RUN",
        shortcut: "Ctrl+X",
      },
      {
        title: "menu.run.compile",
        command: "COMPILE",
        shortcut: "Alt+R",
      },
    ],
  },
  {
    title: "menu.view",
    items: [
      {
        title: "menu.view.zoomin",
        command: "ZOOM_IN"
      },
      {
        title: "menu.view.zoomout",
        command: "ZOOM_OUT"
      },
      {
        title: "menu.view.restorezoom",
        command: "ZOOM_DEFAULT"
      },
    ],
  },
  {
    title: "menu.help",
    items: [
      {
        title: "menu.help.about",
        command: "OPEN_ABOUT"
      },
    ],
  },
];

export default menu_elements;