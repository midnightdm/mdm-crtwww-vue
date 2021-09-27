//vue.config.js
module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Clinton River Traffic Logs";
                return args;
            })
    },


}
