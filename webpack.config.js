const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: "./src/main.ts",
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        // assetModuleFilename: 'images/[hash][ext]'
    },
    devServer:{
        //根目录
        static: '/dist',
        //自动打开服务
        open: true
    },
    module:{
        rules:[
            {
                test: /\.ts$/,
                use:[
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node-modules/
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader', 'css-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'src/components')
                ]
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader', {
                        loader: 'css-loader',
                        options:{
                            modules: {
                                localIdentName: "[local]-[hash:base64:5]",
                            }
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, 'src/components')
                ]
            },
            {
                test: /\.html$/,
                use:{
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(tff|png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                generator:{
                    filename: 'static/[name][hash:8].[ext]'
                }
            }
        ]
    },
    resolve:{
        extensions: ['.ts', '.js', '.json']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //用于清理 dist 目录   也可以使用rimraf npm包
        // new CleanWebpackPlugin()
    ]
}