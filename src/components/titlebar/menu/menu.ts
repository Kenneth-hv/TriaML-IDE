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
        command: "",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.file.quit",
        command: "",
      },
    ],
  },
  {
    title: "menu.edit",
    items: [
      {
        title: "menu.edit.undo",
      },
      {
        title: "menu.edit.redo",
      },
      {
        title: "spacer",
      },
      {
        title: "menu.edit.cut",
      },
      {
        title: "menu.edit.copy",
      },
      {
        title: "menu.edit.paste",
      },
    ],
  },
  {
    title: "menu.run",
    items: [
      {
        title: "menu.run.run",
      },
      {
        title: "menu.run.compile",
      },
    ],
  },
  {
    title: "menu.view",
    items: [
      {
        title: "menu.view.zoomin",
      },
      {
        title: "menu.view.zoomout",
      },
      {
        title: "menu.view.restorezoom",
      },
    ],
  },
  {
    title: "menu.help",
    items: [
      {
        title: "menu.help.about",
      },
    ],
  },
];

export default menu_elements;