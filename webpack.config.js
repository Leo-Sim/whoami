const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.tsx'
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
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