const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [path.join(__dirname, '../node_modules')]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
    // resolve: {
    //     extensions: ['.json', '.js', '.jsx', '.css']
    // },
    // devtool: 'source-map',
    // devServer: {
    //     publicPath: path.join('/dist/')
    // }
};
