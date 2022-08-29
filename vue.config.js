//vue.config.js
module.exports = {
    configureWebpack: {
      devtool: 'source-map',
      optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000,
        }
      }      
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                if(process.env.VUE_APP_REGION=='clinton') {
                  args[0].title = "Clinton River Traffic";
                } else if(process.env.VUE_APP_REGION=='qc') {
                  args[0].title = "QC River Traffic";
                }
                return args;
            })
    }
}
