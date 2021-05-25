import { editor } from "monaco-editor"

export const themeMappings: { [theme: string]: { icons: string, css: string, editor: string, terminal: string } } = {
    dark: {
        icons: 'icons-white',
        css: 'dark',
        editor: 'vs-dark',
        terminal: 'dark',
    },
    black: {
        icons: 'icons-white',
        css: 'black',
        editor: 'vs-dark',
        terminal: 'black',
    },
    blue: {
        icons: 'icons-white',
        css: 'blue',
        editor: 'vs-dark',
        terminal: 'blue',
    },
    light: {
        icons: 'icons-black',
        css: 'light',
        editor: 'vs',
        terminal: 'light',
    }
};