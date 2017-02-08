const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Helpers
const clean = plugins => plugins.filter(x => !!x);

module.exports = (options = {}) => {
  const isProduction = !!options.production;

  return {
    devtool: isProduction ? 'source-map' : 'eval',
    entry: `${__dirname}/src/index.js`,
    output: {
      path: `${__dirname}/dist`,
      publicPath: '/',
      filename: '[name].[hash:8].js',
    },
    performance: !isProduction ? false : {
      hints: 'warning',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            { loader: 'babel-loader' },
            {
              loader: 'eslint-loader',
              query: {
                configFile: '.eslintrc',
                failOnError: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: `css-loader?sourceMap&minimize=${isProduction}`,
          }),
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    plugins: clean([
      new HtmlPlugin({
        inject: true,
        template: 'src/index.html',
      }),

      new ExtractTextPlugin({
        filename: '[name].[hash:8].css',
      }),

      isProduction && new webpack.optimize.OccurrenceOrderPlugin(),

      isProduction && new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      isProduction && new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ]),
  };
};
