const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV ? process.env.NODE_ENV !== 'production' : true

module.exports = {
  target: 'electron-renderer',
  entry: {
    renderer: './src/index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/')
  },
  node: {
    __dirname: true
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: isDev
        }
      },
      {
        test: /\.s?css$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|ttf|eot)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
