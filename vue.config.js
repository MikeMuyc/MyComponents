const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@axios',resolve('src/axios'))
            .set('assets',resolve('src/assets'))
            .set('json',resolve('src/json'))
            .set('components',resolve('src/components'))
            .set('style',resolve('src/style'))
            .set('store',resolve('src/store'))
            .set('pages',resolve('src/pages'))
            .set('plugins',resolve('src/plugins'))
    },
    /*pages: {
        index: {
            entry: "src/main.js",
            template: "index.html"
        }
    },*/
    devServer: {
        port:8096,
        /*proxy: {
            "/api": {
                target: "http://localhost:8666/",     // 访问数据的计算机域名
                changOrigin: true ,                     //开启代理
                pathRewrite: {
                    "^/api": "http://localhost:8666/"
                }

            }
        }*/
    },
}
