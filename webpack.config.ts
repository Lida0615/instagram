import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        clean: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
