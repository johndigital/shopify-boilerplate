const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/js/main.js',
    optimization: {
        minimize: !devMode,
        minimizer: [new OptimizeCSSAssetsPlugin(), new TerserPlugin()],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'assets'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false, sourceMap: true },
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                // UNCOMMENT TO USE ASYNC/AWAIT
                                // { useBuiltIns: 'usage', corejs: 3 },
                            ],
                        ],
                    },
                },
            },
        ],
    },
}
