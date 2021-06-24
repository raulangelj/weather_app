const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /.(jsx?)$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/images/icons8-partly-cloudy-day.gif',
      templateContent: `
      <html>
        <head>
        <title>Weather web aplication</title>
          <meta charset="UTF-8">
        </head>
        <body>
          <div id="root" />
        </body>
      </html>
      `,
    }),
    new MiniCssExtractPlugin(),
  ],
}
