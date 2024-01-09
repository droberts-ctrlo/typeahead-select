/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: "./index.html", to: "./index.html" }] })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: "ts-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.s[ca]ss$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "dist")
    }
}