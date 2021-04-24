module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals:['node-pty'] // this excludes the node-pty from the front end
    }
  },
}