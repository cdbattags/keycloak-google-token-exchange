const path = require('path')
const webpack = require('webpack')

const workingDirectory = process.cwd()

/**
 * `..` Since this config file is in the config folder so we need
 * to resolve path in the top level folder.
 */
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    entry: {
        'bundle': resolve('./app/app.js')
    },
    output: {
        filename: '[name].js',
        // Folder where the output of webpack's result go.
        path: resolve('./app'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('app/scripts')
                ],
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.vue', '.js', '.json'],
    }
}
