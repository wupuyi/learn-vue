const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        main: './main'
    },
    output: {
        // webpack 3.x文档写法
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // { exclude: Condition }：排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|tff)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    plugins: [
        // 重命名提取后的css文件
        new ExtractTextPlugin('main.css')
    ]
};

module.exports = config;