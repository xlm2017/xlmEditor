const { smart, merge } = require('webpack-merge')
const CommonConf = require('./webpack.common')
const { distPath } = require('./myPath')

// TypeError: smart is not a function
module.exports = merge(CommonConf, {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: distPath,
        libraryTarget: 'umd',
        // 模块显示在外面的名字, 重新执行命令行,watch更新不到
        library: 'xlmEditor',
        libraryExport: 'default',
    },
    // devtool: 'source-map',
})
