const webpack = require("webpack");
const { resolve } = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    },
    entry: [
        // "react-hot-loader/patch", // activate HMR for React
        "webpack-dev-server/client?http://localhost:21345",// bundle the client for webpack-dev-server and connect to the provided endpoint
        "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
        "./index.tsx" // the entry point of our app
    ],
    output: {
        filename: "bundle.js", // the output bundle
        path: resolve(__dirname, "build"),
        publicPath: "/" // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, "src"),
    devtool: "source-map",

    devServer: {
        hot: true, // enable HMR on the server
        contentBase: resolve(__dirname, "build"), // match the output path
        publicPath: "/", // match the output `publicPath`,
        https: false,
        lazy: false,
        overlay: true,
        port: 21345,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    "awesome-typescript-loader"
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    // 'svg-fill-loader/encodeSharp',
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            // {
            //     test: /\.svg$/,
            //     use: [
            //     'svg-url-loader', // or url-loader
            //     {
            //         loader: 'svg-fill-loader',
            //         options: {
            //             selector: 'path,circle' // `selector` option will be used for all images processed by loader
            //         }
            //     }
            // ]}

        ],
    },

    plugins: [
        new CheckerPlugin(),
        new StyleLintPlugin(),
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new SWPrecacheWebpackPlugin(
        //     {
        //         cacheId: 'movie-organizer',
        //         filename: 'movie-organizer-service-worker.js',
        //         maximumFileSizeToCacheInBytes: 4194304,
        //         minify: true,
        //         runtimeCaching: [
        //             {
        //                 handler: 'cacheFirst',
        //                 urlPattern: /[.]svg$/,
        //             }],
        //     }
        // ),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '95-100'
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Movie Organizer',
            filename: 'index.html',
            template: 'index.html'
        }),
        // new FaviconsWebpackPlugin({
        //     // Your source logo
        //     logo: './assets/logo.png',
        //     // The prefix for all image files (might be a folder or a name)
        //     prefix: 'icons-[hash]/',
        //     // Emit all stats of the generated icons
        //     emitStats: false,
        //     // The name of the json containing all favicon information
        //     statsFilename: 'iconstats-[hash].json',
        //     // Generate a cache file with control hashes and
        //     // don't rebuild the favicons until those hashes change
        //     persistentCache: true,
        //     // Inject the html into the html-webpack-plugin
        //     inject: true,
        //     // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        //     background: '#fff',
        //     // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        //     title: 'Webpack App',
        //
        //     // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        //     icons: {
        //         android: true,
        //         appleIcon: true,
        //         appleStartup: true,
        //         coast: false,
        //         favicons: true,
        //         firefox: true,
        //         opengraph: false,
        //         twitter: false,
        //         yandex: false,
        //         windows: false
        //     }
        // }),
        new webpack.SourceMapDevToolPlugin(),

    ],
    performance: {
        hints: false
    }
};