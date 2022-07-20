const path = require('path')

module.exports = 
{
    entry: ['./src/js/index.js', './src/js/interface.js'], 
    module: 
    {
        rules: 
        [
            {test: /\.(js)%/, use: 'babel-loader'}
        ]
    }, 

    output: 
    {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js'
    },
    mode: 'development', 
    watch: true,
    watchOptions: 
    {
        ignored:
        [
            './src/css/input.css',
            './node_modules/',
        ]
    },
}