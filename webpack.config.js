var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: { //配置入口文件，有几个写几个
        lc: './js/src/modules/learning_center/index.js',
        ls: './js/src/modules/learning_system/index.js',
        review: './js/src/modules/review/index.js',
        purchased: './js/src/modules/purchased/purchased.js',
        p_detail: './js/src/modules/count_analyze/count_analyze.js',
        header: './js/src/public/header.js',
        oraltest: './js/src/modules/oraltest/index.js',
        vender: ['jquery', 'lodash']
    },
    output: {
        path: 'js/dist', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/static/js/dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: '[id].chunk.js',   //chunk生成的配置
        // sourceMapFilename: '[name].js.map'
    },
    // devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',
    module: {
        preLoaders: [
            // {
            //     test: /\.js$/,
            //     loader: "eslint-loader",
            //     exclude: /node_modules/
            // },
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
                loader: 'style-loader!css-loader'
            }

        ]
    },
    eslint: {
        failOnWarning: true,
        failOnError: true,
        configFile: './.eslintrc'
    },
    externals: {
        // jquery: 'jQuery',
        // lodash: '_',
        async: 'async',
        echarts: 'echarts',
        cyberplayer: 'cyberplayer',
        clipboard: 'Clipboard'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
            names: ["common", "vender"],
            // chunks: ['lc','ls','review', 'purchased', 'p_detail','oraltest','vender'], //提取哪些模块共有的部分
            minChunks: 4 // 提取至少n个模块共有的部分
            // minChunks: Infinity // 提取至少n个模块共有的部分
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_system/views/main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'ls'],
            inject:'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'lc'],
            inject:'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/oral_main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'oraltest'],
            inject:'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/purchased_main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'purchased'],
            inject:'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_center/views/purchased_detail_main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'p_detail'],
            inject:'body',
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_system/views/review_page.php'),
            template: 'views/review_main.php',
            chunks: ['vender', 'common', 'review'],
            inject:'body',
            hash: true
        }),
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: true
        // })
    ]
};