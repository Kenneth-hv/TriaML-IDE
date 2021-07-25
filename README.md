# **System Installation**

## **For Windows**

Normal installation, *no build required*:

1. Download the latest release of TriaML for Windows from the [Github repository](https://github.com/Kenneth-hv/TriaML-IDE).
2. Execute the downloaded file.
3. Use TriaML.

Building the app from source code:

1. Install [Node.JS](https://nodejs.org/en/download/).
2. Node-pty requirements:
    1. Execute: npm install --global --production windows-build-tools
    2. Or install [VS Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2017) and [Python](https://www.python.org/downloads/).
3. Clone the [Github repository](https://github.com/Kenneth-hv/TriaML-IDE) on your computer.
4. Download all app dependencies and build with npm. Execute on source code root directory:

    ```bash
    npm install
    # ... then ...
    npm build
    ```

5. Built binaries end up in the dist_electron sub directory.

## **For Linux and MacOS:**

Building the app from source code, required:

1. Install [Node.JS](https://nodejs.org/en/download/)
2. Node-pty requirements:
    1. For Linux (apt): 

        ```bash
        sudo apt install -y make python build-essentia
        ```

    2. For MacOS: install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the Mac App Store.
3. Clone the [Github repository](https://github.com/Kenneth-hv/TriaML-IDE) on your computer.
4. Download all app dependencies and build with npm. Execute on source code root directory:

    ```bash
    npm install
    # ... then ...
    npm build
    ```

5. Built binaries end up in the dist_electron sub directory.

# **Software Architecture Description**

## **System’s Context Diagram**

The following diagram explains by itself the interaction between the different components of the system, giving an idea of how it works.

<img alt="Delta" src="https://raw.githubusercontent.com/Kenneth-hv/TriaML-IDE/main/src/assets/img/sistContextDiagram.png">


## **General Architectural Representation**

TriaML architecture is divided into two processes:

<img alt="Delta" src="https://raw.githubusercontent.com/Kenneth-hv/TriaML-IDE/main/src/assets/img/architecturalRepresentation.png">

**Main Process**

Runs *Electron* which creates the main window, defines the background functionalities. Communicates with the Renderer process via IPC (Inter-process communication) library provided by Electron. This file also contains the Node-pty manager that forks terminal processes from the operating system.

**Renderer Process**

Runs the user interface and the main application logic. The Vue.Js plugin Vuex allows state management and fulfills the function of a controller between the Vue.Js components (GUI) and the TriaML logic and state.

- **App**
    - **TriaML**: This is the main class of the application. It handles most of the methods related to the preferences, the currently selected tool and visual parts of the IDE, apart from that it has as an attribute the TabFileManager.
    - **TabFileManager**: The tab manager is a class that has all tabs open at a time in the application. It also has an identifier that makes one of them visible and links all side tabs to the code in the editor.
    - **TabFile**: The tab is a single class that contains all information related to one specific file open or created at a specific time on the system. That includes the access and routes to files, state of compilation and results of it for possible display in the side tabs.
    - **FileManager**: Single class in charge of executing the open and save file methods of the system it is running on.
    - **TerminalProcess**: Class in charge of sending messages via IPC to the terminal to execute in the cases where it is needed.
    - **TerminalCommands**: Creates all the needed commands that are sent to the terminal process to compile, and run all Triangle programs.
- **Vuex**:
    - **Vuex State Management: Located in src/state/index.ts. This component is the one in charge of managing the state of the application, also acting as a link between the view and the logic of the application.**
- **Vue**
    - **Main.ts**: This works as the Renderer process entry point.
    - **App.vue**: Vue root Component.
    - **Vue components:**
        - All the components used by App.vue root components are located in src/components.
        - Each of these have their own functionality implemented.
    - **Important libraries used in the Vue components:**
        - *Monaco Editor*: This is an open source embedded editor that can be implemented and configured based on its [documentation](https://microsoft.github.io/monaco-editor/). It is included by the Vue component named CodeEditor.vue.

- *[Xterm](https://invisible-island.net/xterm/)*

As described by its creators it is a terminal emulator for the X Window System that makes possible the usage of a terminal for those programs that can’t manipulate the system ones directly. It is included by the Vue component named Terminal.vue.