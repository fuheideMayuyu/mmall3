### 项目目录
-src
|-image 图片
----banner 轮播图
----floor 商品图
----icon 加载图标
|-page 页面js文件
----common 通用css、js

|-service 服务器相关文件
|-util
----mm.js 功能封装
|-view 页面html文件
----layout 通用页面

### webpack 相关配置(webpack1.15.0)
- 初始化项目文件 npm init
- 下载webpack npm install webpack@1.15.0 (需要先全局安装)
- 创建webpack.config.js文件,在里面进行webpack相关配置
- entry:入口文件配置(在高版本中会有些不同)
```
 entry:{
    'common':['./src/page/common/index.js'],
    'index':['./src/page/index/index.js'],
    'login':['./src/page/login/index.js'],
  }
```
- output：出口文件配置(在高版本中会有些不同),需要特别注意的是，如果这里没有配置publicPath,那么webpack-dev-server无法正常使用
```
 output:{
    path:'./dist',
    publicPath:'/dist',
    filename:'js/[name].js'
  }
```
- devServer: webpack-dev-server配置,这里只是简单的使用了几个常用配置
```
  devServer:{
    open:true
  }
```
- js文件、css文件、html文件、图片、字体等文件的编译都需要相关的loader，在module模块中配置，这里就不细说了
- 在plugins模块里配置相应插件可以将 js文件、css文件、html文件的个性化处理
- new webpack.optimize.CommonsChunkPlugin : 将独立通用的js模块抽离到一个单独得我文件夹，在webpack4.0当中被弃用，可以使用SplitChunksPlugin插件，这个插件与plugins平级，不再是一个子模块
- new ExtractTextPlugin：将css文件单独打包，在webpack4中也不能很好的支持，可以使用mini-css-extract-plugin
-  new HtmlWebpackPlugin：处理html模板，实现相应的 HTML 自动引用相应的js、css文件
-  相关命令启动方式，可以在package.json中配置
-  环境变量配置
```
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
```
- resole 路径配置

### 关于跨域 jsonp和 webpack proxy代理
- 因为后端接口格式不是jsonp格式，所以不能使用jsonp的方式跨域。
- proxy配置
```
 proxy:{
      '/api':{
        // 指定代理的地址
        target:'http://happymmall.com',
        pathRewrite:{'^/api': ''},
        // 改变源代码的url
        changeOrigin:true,
        // 安全性
        secure:false
      }
    },
// url 请求以 api开头
 url:'/api/product/list.do?keyword=1',

```
### 接口地址变化
```
原地址：
target:'http://happymmall.com',
新地址：
target:'http://test.happymmall.com',
```
#### 登录页面逻辑
```
1.初始化
 page={
  init:function(){

  }
};
$(function(){
  page.init();
})
2.注册登录点击事件
3.因为登录需要提交表单，编写提交表单方法
4.提交表单时需要字段验证，编写字段验证方法
```