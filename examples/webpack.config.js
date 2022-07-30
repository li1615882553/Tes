const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    let entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    } else if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry + 'x')) {
      entries[dir] = ['webpack-hot-middleware/client', entry + 'x']
    }
    return entries;
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  { pragma: 'createElement' },   //将React.createElement 改为 createElement   替代编译JXS表达式时使用的函数
                ],
              ],
              plugins: ['../src/plugins/transform-jsx']
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    mainFiles: ['index'],
    alias:{
      "@component": path.resolve(__dirname, "../src/components")
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}