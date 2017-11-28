import path from 'path';
import webpack from 'webpack';

import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html'
});

const ExtractTextPluginConfig =  new ExtractTextPlugin({
    filename: 'style.css'
});


const rootAssetPath = './assets';
const buildOutputPath = './src/dist';


let config = {
    context: path.join(__dirname, './src'),
    entry: [
        './index.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: [".js", ".json",".html", ".scss",".png",".css"]
    },
    module: {
        rules : [
            {
                test : /\.js$/,
                loader : "babel-loader",
                exclude : /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                      fallback: 'style-loader',
                      use: [
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        ident: 'postcss',
                                        plugins: (loader) => [
                                          require('postcss-import')({ root: loader.resourcePath }),
                                          require('postcss-cssnext')(),
                                          require('autoprefixer')(),
                                          require('cssnano')()
                                        ]
                                      }
                                },
                                'sass-loader'
                        ]
                    })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }

                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig
  ]
};

module.exports = config;
