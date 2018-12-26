'use strict';

const path = require('path');

const webpack = require('webpack');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');

const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {
    mode,

    entry: isProduction ?
        path.join(__dirname, './src/index.js') :
        [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            path.join(__dirname, './src/index.js')
        ],

    output: {
        path: path.join(__dirname, './dist/'),
        publicPath: '/',
        filename: isProduction ? '[name]-[hash].min.js' : '[name].js',
        chunkFilename: isProduction ? '[name]-[hash].min.js' : '[name].js',
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    externals: {},
    plugins: [
        new FriendlyErrorsPlugin(),
        new ImageminPlugin({
            disable: !isProduction,
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/app.html'),
            inject: true,
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name]-[hash].min.css' : '[name].css',
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, '/dist')
        ], {
            root: __dirname,
            verbose: false,
            allowExternal: true,
        }),
        new WebpackBuildNotifierPlugin({
            title: 'Webpack Build',
            logo: path.resolve('./img/favicon.png'),
            suppressSuccess: true
        })
    ],
    performance: {
        hints: false
    },
    devtool: 'eval',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        compress: true,
        port: 8080,
        hot: true,
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: '.eslintrc',
                            formatter: require('eslint-friendly-formatter'),
                            failOnWarning: false,
                            failOnError: false
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: isProduction ? MiniCssExtractLoader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction,
                            ident: 'postcss',
                            plugins: [
                                autoprefixer({ browsers: ['>2%'] })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: isProduction ? MiniCssExtractLoader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction,
                            ident: 'postcss',
                            plugins: [
                                autoprefixer({ browsers: ['>2%'] })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                include: /node_modules/,
                use: [
                    {
                        loader: isProduction ? MiniCssExtractLoader : 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/img/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/media/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(html|hbs)$/,
                exclude: [/node_modules/, /dist/],
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            }
        ]
    }
};
