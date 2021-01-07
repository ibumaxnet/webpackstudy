const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/js/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.js',
	},
	module: {
		rules:[
			{
				test: /\.(css|scss|sass)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(png|jpg)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false,
							name: 'images/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.pug/,
				use: [
					{
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
		new MiniCssExtractPlugin({
			filename: './css/my.css',
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
