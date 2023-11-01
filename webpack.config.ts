import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'


type BuildMode = "development" | "production"

interface BuildEnv {
    mode: BuildMode,
    port: number,
}

export default (env: BuildEnv) => {
    const mode = env.mode || "development"
    const port = env.port || 3000
    const isDev = mode === "development"

    const config = {
        mode: mode,
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: {
            filename: "[name].[contenthash].js",
            path: path.resolve(__dirname, "build"),
            clean: true,
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
            new webpack.ProgressPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin()



        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' :
                        MiniCssExtractPlugin.loader,
                        // "style-loader",
                        
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                                    localIdentName: isDev ? '[path][name]_[local]--[hash:base64:5]' : "[hash:base64:8]"
                                },
                            },
                        },
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? {
            port: port,
            open: true,
            hot: true,
        } : undefined,
    };
    return config
}