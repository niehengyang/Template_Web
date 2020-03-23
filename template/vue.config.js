
const path = require('path');
let devServerMethod = require('./env.js');
devServer = devServerMethod.devServer();
module.exports = {
    devServer,         //代理
    lintOnSave: false, // 关闭eslint
    publicPath: '/',
    assetsDir:'static',
    // 打包后的文件夹名
    outputDir: 'dist',
    css: {
        loaderOptions: {
            sass: {
                data: `@import '~css/app.scss';
        @import '~css/mixin.scss';`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '~css': path.resolve('./src/assets/css'),
                '~images': path.resolve('./src/assets/images')
            }
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/views/index/admin.js',
            // 模板来源
            template: 'src/views/index/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Login Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        login: {
            // page 的入口
            entry: 'src/views/login/admin.js',
            // 模板来源
            template: 'src/views/login/index.html',
            // 在 dist/index.html 的输出
            filename: process.env.NODE_ENV === 'production' ? 'login/index.html' : 'login.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Login Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        },
        admin: {
            // page 的入口
            entry: 'src/views/admin/admin.js',
            // 模板来源
            template: 'src/views/admin/index.html',
            // 在 dist/index.html 的输出
            filename: process.env.NODE_ENV === 'production' ? 'admin/index.html' : 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        }


    },
}
