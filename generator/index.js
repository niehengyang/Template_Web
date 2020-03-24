// generator
module.exports = (api, options, rootOptions) => {
  // 删除 vue-cli3 默认的 /src 和 /public 目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "axios": "^0.19.0",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "babel-polyfill": "^6.26.0",
      "core-js": "^2.6.5",
      "echarts": "^4.2.1",
      "element-ui": "^2.12.0",
      "font-awesome": "4.7.0",
      "image-webpack-loader": "^6.0.0",
      "lodash": "^4.17.4",
      "v-charts": "^1.19.0",
      "vue": "^2.6.10",
      "vue-baidu-map": "^0.21.22",
      "vue-i18n": "^8.14.0",
      "vue-router": "^3.0.3",
      "vuex": "^3.0.1",
      "xlsx": "^0.15.1"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^3.11.0",
      "@vue/cli-service": "^3.11.0",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "image-webpack-loader": "^6.0.0",
      "node-sass": "^4.9.0",
      "sass-loader": "^7.1.0",
      "vue-template-compiler": "^2.6.10"
    }
  });
  // 根据自定义模板生成项目结构
  api.render('../template/template_pc')

  // 判断模板样式
  if (options.style == '顶部导航栏模板') {

    // 注入对应文件
    api.render({
      './src/components/Head.vue': '../template/template_pc_style/HeadTop.vue'
    });

  } else if (options.style == '侧边导航栏模板') {

    // 注入对应文件
    api.render({
      './src/components/Head.vue': '../template/template_pc_style/HeadLeft.vue'
    });

  }
}
