const { defineConfig } = require("@vue/cli-service");
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = defineConfig({
  publicPath:"/vue2-demo",
  parallel: false, 
  // disable the host check on sandbox
  devServer: {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    plugins: [
      ScriptSetup({}),
    ]
  },
});
