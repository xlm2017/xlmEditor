/**
 * @description webpack 通用配置
 * @author wangfupeng
 */

const path = require('path')
const { srcPath } = require('./myPath')

module.exports = {
    entry: {
        xlmEditor: path.join(srcPath, 'main.ts'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                // 'babel-loader'
                use: ['ts-loader'],
                include: /src/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                // 打包svg生成hash.svg
                test: /\.(woff2?|eot|ttf|otf|svg`)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500 * 1024, // <=500kb 则使用 base64 （即，希望字体文件一直使用 base64 ，而不单独打包）
                        },
                    },
                ],
            },
            {
                test: /\.svg(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name].[ext]',
                            // outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        // 引入文件不用再加上后缀
        extensions: ['.ts', '.js', '.json', '.less', '.css'],
        alias: {
            // utils: path.join(srcPath, 'utils'),
            // style: path.join(srcPath, 'assets', 'style'),
            // '@': srcPath,
        },
    },
}
