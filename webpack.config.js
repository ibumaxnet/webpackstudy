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
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/my.css',
		}),
		new HtmlWebpackPlugin({
			template: ('../templates/index.html'),
		}),
		new CleanWebpackPlugin(),
	],
}
