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
                args[0].title = "Clinton River Traffic";
                return args;
            })
    },
}
