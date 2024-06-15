const path = require('node:path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EsbuildPlugin } = require('esbuild-loader');

module.exports = env => {
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'app.js'),
    output: {
      path: path.resolve(__dirname, 'build'),

      filename: '[name].[contenthash].js',
      clean: true,
    },
    optimization: {
      minimizer: [
        new EsbuildPlugin({
          target: 'es2022',
          css: true,
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2022',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          port: 5000,
          open: true,
        }
      : undefined,
  };
};
