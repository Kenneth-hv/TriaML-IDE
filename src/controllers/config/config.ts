// Copyright 2021 Tecnológico de Costa Rica
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
      "options": ["Dark", "Black", "Blue", "Light"]
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