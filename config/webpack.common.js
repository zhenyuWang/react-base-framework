const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const TersetWebpackPlugin = require('terser-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].[chunkhash:4].js',
    path: path.join(__dirname, '../dist'),
  },
  cache: {
    type: 'filesystem',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new WebpackBar(),
    new MiniCssPlugin(),
    new CssMinimizerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: [MiniCssPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
            },
          },
        ],
      },
      {
        test: /\.ott$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TersetWebpackPlugin({
        extractComments: false,
        minify: TersetWebpackPlugin.esbuildMinify,
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  stats: {
    modules: false,
  },
};
