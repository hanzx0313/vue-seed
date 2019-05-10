var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

// define the different HOST between development and production environment
//一个开发用后端URL前缀，一个生产用后端URL前缀
//TODO 因为目前没有生产用的后端URL，所以都写成了一样的。
var DEV_HOST = JSON.stringify('http://localhost:8080/system')
var PUB_HOST = JSON.stringify('http://localhost:8080/system')

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.js',
            '@': resolve('src'),
            bus: resolve('src/bus'),
            comp: resolve('src/components'),
            mock: resolve('src/mock'),
            directives: resolve('src/directives'),
            filters: resolve('src/filters'),
            mixins: resolve('src/mixins'),
            pages: resolve('src/pages')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/vue-particles')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            },
            {
                test: /\.mp3(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('audio/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
        HOST: process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST
      })
      ]
}
