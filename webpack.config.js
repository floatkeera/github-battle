var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); // has properties to set the node env to production

var config ={
	mode: 'development',
	entry:['babel-polyfill', 'whatwg-fetch', './app/index.js'],
	output:{
		path: path.resolve(__dirname, 'dist'), //going to resolve to output at /dist
		filename: 'index_bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [
     		{ test: /\.(js)$/, use: 'babel-loader' }, //babel is a code transformer - need to transpile ES6 to older forms
     		{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
     		]
    },
    devServer:{
    	historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
    	template: 'app/index.html'
    })],
};

if(process.env.NODE_ENV == 'production'){
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env' : {
				'NODE_ENV' : JSON.stringify('production') // this will make React build specifically for production
				// in the package.json file it only sets node_env in the config file so we need to set the node environment
				// in the compiled code
			}
		})
	);

}

module.exports = config;