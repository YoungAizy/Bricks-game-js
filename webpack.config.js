const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'js/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],

        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Falling Bricks Game',
            filename: 'index.html',
            template: 'index.html',
        }),
    ],
}