/* eslint-disable one-var */
// webpack.config.js
const webpack = require('webpack')
const loaders = []

// ======== JS loaders ========
const regEx1 = `/\.js$/`,
  regEx2 = `/\.s[ac]ss$/i`,
  nodeMods = '/node_modules/'
let js_loaders

if (process.env.NODE_ENV === 'development') {
  js_loaders = {
    test: regEx1,
    loaders: ['react-hot', 'babel'],
    exclude: nodeMods
  }
} else {
  js_loaders = {
    test: regEx1,
    loaders: ['babel'],
    exclude: nodeMods
  }
}

loaders.push(js_loaders)

// ======== Development loaders ========
let es_lint

if (process.env.NODE_ENV === 'development') {
  es_lint = {
    test: regEx1,
    loader: 'eslint-loader',
    exclude: nodeMods
  }
  loaders.push(es_lint)
}

module.exports = {
  devtool: 'source-map',
  entry: './app.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  // ======== setting up sass ========
  module: {
    loaders: ({
      test: regEx2,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: {
              outputStyle: 'compressed'
            }
          }
        }
      ]
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET_SLUG': JSON.stringify(process.env.COSMIC_BUCKET_SLUG),
      'process.env.APP_URL': JSON.stringify(process.env.APP_URL),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    })
  ]
}
