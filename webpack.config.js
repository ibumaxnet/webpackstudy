const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.js',
	},
	module: {
		rules:[
			{
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
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
			template: ('./src/templates/index.html'),
		}),
		new CleanWebpackPlugin(),
	],
}
