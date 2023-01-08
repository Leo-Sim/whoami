const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    name: "WhoAmI",
    entry: [
        './src/index.tsx'
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
        // path: __dirname + "/dist",
        // publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: 'public/favicon.ico'
        })

    ]
};