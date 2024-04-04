const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Client-side webpack configuration
module.exports = {
	entry: path.resolve('./client/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html',
			filename: 'index.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
};
