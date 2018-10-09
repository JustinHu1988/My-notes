const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')

module.exports = {
  entry: {
    seed: resolvePath('./src/main.js'),
    cashier: resolvePath('./example/tw-cashier/js/main.js')
  },
  output: {
    path: resolvePath('dist')
  },
  resolve: {
    alias: {
      Seed: resolvePath('Seed')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolvePath('dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|jpe?g|gif|ico)$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: 'index.html', chunks: ['seed'] }),
    new HtmlWebpackPlugin({
      template: 'example/tw-cashier/index.html',
      chunks: ['cashier'],
      filename: 'twcashier.html'
    }),
    new Es3ifyPlugin()
  ],
  mode: 'development'
}

function resolvePath(dir) {
  return path.resolve(__dirname, dir)
}
