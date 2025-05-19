//vue.config.js
const webpack = require('webpack');

module.exports = {
    configureWebpack: {
      mode: "production",
      devtool: 'source-map',
      optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000,
        }
      },
      plugins: [
        // Add the DefinePlugin with Vue feature flags
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: 'true',
          __VUE_PROD_DEVTOOLS__: 'false',
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        })
      ]      
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                if(process.env.VUE_APP_REGION=='clinton') {
                  args[0].title = "Clinton River Traffic";
                  args[0].base_url = "https://www.clintonrivertraffic.com/";
                } else if(process.env.VUE_APP_REGION=='qc') {
                  args[0].title = "QC River Traffic";
                  args[0].base_url = "https://www.qcrivertraffic.com/";
                }
                return args;
            })
    }
}
