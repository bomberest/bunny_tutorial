const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
module.exports = {

  //context directory is src
  context: path.join(__dirname, 'src'),

  //entry file of the project,(relative to context)
  entry: ['./index.js'],
  output: {

    //distribution directory
    path: path.resolve(__dirname, 'dist'),

    /**
     * webpack will import the file for the index.html automatically,though the js file does not exist on disk.
     * the js file will generated after webpack build the project, and the js will inserted at index.html automatically.
     * [hash:8] means unique 8 digit hash generated everytime.
     **/
    filename: 'game.[hash].js',
    clean: true
  },
  target: 'web',

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        // Now we apply rule for static files
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf|mp3|ogg|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          context: 'public',
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        }
      }
    ],
  },

  plugins: [

    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
      options: {
        concurrency: 100,
      },
    }),

    //copy html to dist and insert the js reference.
    new HtmlPlugin({
      file: path.join(__dirname, 'dist', 'index.html'),
      template: './index.html'
    })
  ]
}