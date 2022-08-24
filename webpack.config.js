const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'Tes':'./src/index.ts',
        'Tes.min': './src/index.ts' 
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        library:{
            name: "Tes",
            type: 'umd'
        },
        clean: true
    },
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({//production默认打开
              include: /\.min\.js$/
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: []
}