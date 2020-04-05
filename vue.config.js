module.exports = {
  devServer: {
    host: "workaround.local",
    disableHostCheck: true
  },
  pwa: {
    name: "Workaround",
    themeColor: "#3c3c3c",
    msTileColor: "#f0f0f0",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black"
    // workboxPluginMode: 'InjectManifest',
  }
};
