var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');
var path = require('path');

module.exports = {
    entry: { //配置入口文件，有几个写几个
        lc: './js/src/modules/learning_center/index.js',
        ls: './js/src/modules/learning_system/index.js',
        tc: './js/src/modules/teaching_center/index.js',
        review: './js/src/modules/review/index.js',
        purchased: './js/src/modules/purchased/purchased.js',
        p_detail: './js/src/modules/count_analyze/count_analyze.js',
        oraltest: './js/src/modules/oraltest/index.js',
        upgrade: './js/src/modules/upgrade/upgrade.js',
        accounting: './js/src/modules/upgrade/accounting.js',
        // vendor: ['./js/src/lib/layer/layer.js']
        vendor: ['jquery', 'lodash']
    },
    output: {
        path: 'js/dist', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/static/js/dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].js?v=[chunkhash:8]',            //每个页面对应的主js的生成配置
        chunkFilename: '[name].js'   //chunk生成的配置
    },
    // devtool: 'cheap-module-source-map',
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            // {
            //     test: /\.js$/,
            //     loader: "source-map-loader",
            //     exclude: /node_modules/
            // }
        ],
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'underscore-template-loader',
                query: {
                    engine: 'lodash',
                    attributes: []
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                loader: 'url?name=images/[name].[ext]&limit=8192'
                // loader: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/"
            }
        ]
    },
    watchOptions: {
        poll: 1000
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, './js/src/public'),
            // layer: path.resolve(__dirname, './js/src/lib/layer/layer.js'),
            layerDir: path.resolve(__dirname, './js/src/lib/layer')
        }
    },
    eslint: {
        failOnWarning: false,
        failOnError: true,
        configFile: './.eslintrc'
    },
    externals: {
        // jquery: 'jQuery',
        // lodash: '_',
        async: 'async',
        echarts: 'echarts',
        cyberplayer: 'cyberplayer',
        clipboard: 'Clipboard',
        laydate: 'laydate'
        // layer: 'layer'
    },
    plugins: [
        failPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            // names: ['common', 'vendor'],
            // name: 'common', // 将公共模块提取
            names: ['common', 'vender'],
            // chunks: ['lc','ls','tc','review', 'purchased', 'p_detail','oraltest'], //提取哪些模块共有的部分
            minChunks: 4 // 提取至少n个模块共有的部分
        }),
        new ExtractTextPlugin('css/[name].css?v=[chunkhash:8]'),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_system/views/main.php'),
            template: 'views/main_blue.php',
            chunks: ['common', 'ls'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/main.php'),
            template: 'views/main_white.php',
            chunks: ['common', 'lc'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/oral_main.php'),
            template: 'views/main_white.php',
            chunks: ['common', 'oraltest'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/purchased_main.php'),
            template: 'views/main_white.php',
            chunks: ['common', 'purchased'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/purchased_detail_main.php'),
            template: 'views/main_white.php',
            chunks: ['common', 'p_detail'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_system/views/review_page.php'),
            template: 'views/review_main.php',
            chunks: ['common', 'review'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/teaching_center/views/main.php'),
            template: 'views/main_white.php',
            chunks: ['common', 'tc'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/upgrade/views/upgrade.php'),
            template: 'views/upgrade_main.php',
            chunks: ['upgrade'],
            inject:'body',
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/upgrade/views/accounting.php'),
            template: 'views/upgrade_main.php',
            chunks: ['accounting', 'vendor'],
            inject:'body',
        }),
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     except: ['$', 'exports', 'require']
        // })
    ]
};
