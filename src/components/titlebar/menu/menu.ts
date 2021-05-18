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