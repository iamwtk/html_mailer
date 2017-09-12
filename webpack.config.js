const path = require('path')
const bundleCSS = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')


module.exports = {
    context: path.join(__dirname, 'src'),
    entry: ['./client.js', './sass/main.scss'],
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'static/js/bundle.js',
        publicPath: '/app'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.s?css$/,
                loader: bundleCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                }),
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        outputPath: './static',
                        publicPath: '../'
                    }
                   
                 }]

            },
            {
                test: /\.json$/,
                loader: "json-loader" //JSON loader
      }

        ]
    },
    plugins: [
        new bundleCSS({
            filename: 'static/css/style.min.css',
            allChunks: true

        }),


    ]
};