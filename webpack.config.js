const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    mode: 'development',
    entry:"./src/index.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        assetModuleFilename: '[name][ext]'
    },
    devServer:{
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpeg|jpg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(ico)$/,
                use: ['file-loader?name=[name].[ext]']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "Weatherish",
            favicon: './src/assets/favicon.ico',
            filename: "index.html",
            template: "src/template.html"
        })
    ]
    


}