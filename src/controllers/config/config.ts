export const defaultConfig: Config = {
  "enviroment": {
    "compiler": {
      "type": "string",
      "value": ""
    },
    "tam": {
      "type": "string",
      "value": ""
    },
    "disassembler": {
      "type": "string",
      "value": ""
    },
    "cygwin": {
      "type": "string",
      "value": ""
    }
  },
  "display": {
    "theme": {
      "type": "select",
      "selected": "Dark",
      "options": ["Dark", "Light"]
    },
    "language": {
      "type": "select",
      "selected": "English",
      "options": ["English", "Spanish", "Deutsch", "French"]
    }
  }
};

export type Config = {
  enviroment: {
    compiler: ConfigStringSetting
    tam: ConfigStringSetting
    disassembler: ConfigStringSetting
    cygwin: ConfigStringSetting
  }
  display: {
    theme: ConfigSelectSetting
    language: ConfigSelectSetting
  }
}

type ConfigStringSetting = {
  type: String
  value: String
}

type ConfigSelectSetting = {
  type: String
  selected: String
  options: String[]
}