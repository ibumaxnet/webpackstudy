const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// production モード以外の場合、変数 enabledSourceMap は true
const enabledSourceMap = process.env.NODE_ENV !== 'production';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name]-[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
    	{
    		test: /\.ts|tsx/,
    		exclude: /node_modules/,
    		use: [
    			{
    				loader: 'ts-loader',
    			},
    		],
    	},
    	{
    		test: /\.vue/,
    		exclude: /node_modules/,
    		use: [
    			{
    				loader: 'vue-loader',
    			},
    		],
    	},
    	{
        test: /\.js/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
              ['@babel/preset-react'],
            ],
          },
        }, ],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              plugins: [
                require("autoprefixer")({
                  grid: true,
                })
              ],
              browserslist: [
                'last 2 versions',
                'ie >= 11',
                'Android >= 4',
                'iOS >= 8'
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
        	{
          	loader: 'file-loader',
          	options: {
          	  esModule: false,
          	  name: 'images/[name]-[hash].[ext]',
          	  publicPath: '/',
          	},
        	},
        	{
        		loader: 'image-webpack-loader',
        		options: {
        			mozjpeg: {
        				progressive: true,
        				quality: 65,
        			},
        		},
        	},
        ],
      },
      {
        test: /\.pug/,
        use: [{
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
  	new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name]-[hash].css',
    }),

    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/members/koisan.pug',
      filename: 'members/koisan.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
