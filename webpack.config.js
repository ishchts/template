const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = true;

const setLoader = (loader = ['css-loader']) => {
  const initLoader = [
      {
          loader: MiniCssExtractPlugin.loader,
          options: {
              hmr: isDev,
              reloadAll: true,
          }
      },
      ...loader
  ];

  return initLoader;
}

module.exports = {
  entry: {
    bundle: './assets/js/index.js',
    style: './assets/scss/style.scss'
  },
  output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name].js',
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: setLoader('css-loader')
        },
        {
            test: /\.s[ac]ss$/,
            use: setLoader(['css-loader', 'sass-loader']),
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: ['file-loader']
        },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    })
  ]
}