module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: [
        'node-pty'
      ]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'lang',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },
}
