const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: './.env' });

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'source-map' : 'eval-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/', // This ensures assets (like your JavaScript bundle) are always served from the root
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3333,
    open: true,
    hot: true,
    historyApiFallback: true, // fall back to index.tsx when no route is available
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: prod
          ? [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          : ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@/types': path.resolve(__dirname, 'src/types/'),
      '@/enums': path.resolve(__dirname, 'src/enums/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    prod && new MiniCssExtractPlugin(),
  ],
};
