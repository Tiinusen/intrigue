module.exports = {
    lintOnSave: true,
    chainWebpack: config => config.plugins.delete('named-chunks'),
    devServer: {
        disableHostCheck: true
    }
};