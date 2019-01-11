'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: './src/js/download.js',
    output: {
        // publicPath: __dirname + "/dist/",
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: '[name].chunk.js',
    },
    mode: 'development',
    resolve: {
        alias: {
            $: path.resolve(__dirname, "src/js/zepto.min.js")
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            publicPath: '../'
                        }
                    },
                ]
            }, {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000, //当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
                        outputPath: 'images', // 指定打包后的图片位置
                        name: '[name].[ext]', //name:'[path][name].[ext]
                        publicPath: "../images/",
                    }
                }]
            },
        ]
    },
    plugins: [
        // new webpack.DedinePlugin({
        //     'process.env': {
        //         NODE_ENV: process.env
        //     }
        // }),
        new webpack.ProvidePlugin({
            $: "zepto", // npm
            zepto: "zepto" // 本地Js文件
        }),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html',
            favicon:'./src/images/mypanda.ico'
        }),
        // new extractTextPlugin({
        //     filename: 'css/style.css', //输出文件
        //     allChunks: true,
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './src/index.html',
        //     inject: true
        // }),
    ],
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 8818
    }
}