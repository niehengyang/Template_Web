/* 环境配置 */

module.exports.devServer = function () {
    return devServer = {
        proxy: {
            '^/api': {
                target: 'http://zhigao.io',
                changeOrigin: true
            },
            '^/storage':{
                target: 'http://zhigao.io',
            }
        }
    }

}