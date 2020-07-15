const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    watch: true,
    entry: {
        index: './src/index.js',
        speakit: './src/speakit/index.js',
        sprint: './src/sprint/index.js',
        about: './src/about/index.js',
        savannah: './src/savannah/index.js',
        audiocall: './src/audiocall/index.js',
        statistics: './src/statistics/index.js',
        dictionary: './src/dictionary/index.js',
        setting: './src/setting-page/index.js',
        authorization: './src/authorization/index.js',
        cardpage: './src/card-page/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { minimize: true },
                }],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,

                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/',
                    },
                }],
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css',
        }),
        new CopyWebPackPlugin({
            patterns: [
                { from: 'src/assets/images/', to: './assets/images' },
                { from: 'src/assets/audio/', to: './assets/audio' }
            ],
        }),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'],
        }),
        new HtmlWebPackPlugin({
            filename: 'speakit.html',
            template: './src/speakit/speakit.html',
            chunks: ['speakit'],
        }),
        new HtmlWebPackPlugin({
            filename: 'sprint.html',
            template: './src/sprint/sprint.html',
            chunks: ['sprint'],
        }),
        new HtmlWebPackPlugin({
            filename: 'about.html',
            template: './src/about/about.html',
            chunks: ['about'],
        }),
        new HtmlWebPackPlugin({
            filename: 'authorization.html',
            template: './src/authorization/authorization.html',
            chunks: ['authorization'],
        }),
        new HtmlWebPackPlugin({
            filename: 'audiocall.html',
            template: './src/audiocall/audiocall.html',
            chunks: ['audiocall'],
        }),
        new HtmlWebPackPlugin({
            filename: 'dictionary.html',
            template: './src/dictionary/dictionary.html',
            chunks: ['dictionary'],
        }),
        new HtmlWebPackPlugin({
            filename: 'savannah.html',
            template: './src/savannah/savannah.html',
            chunks: ['savannah'],
        }),
        new HtmlWebPackPlugin({
            filename: 'setting.html',
            template: './src/setting-page/setting-page.html',
            chunks: ['setting'],
        }),
        new HtmlWebPackPlugin({
            filename: 'statistics.html',
            template: './src/statistics/statistics.html',
            chunks: ['statistics'],
        }),
        new HtmlWebPackPlugin({
            filename: 'savannah.html',
            template: './src/savannah/savannah.html',
            chunks: ['savannah']
        }),
        new HtmlWebPackPlugin({
          filename: 'cardpage.html',
          template: './src/card-page/cardpage.html',
          chunks: ['cardpage'],
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        port: 5500,
        contentBase: path.join(__dirname, 'dist'),
    },
};
