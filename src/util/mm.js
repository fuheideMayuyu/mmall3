'use strict';

var Hogan = require('hogan.js');

var conf = {
  serverHost: ''
};
var _mm = {
  // 请求后端数据
  request: function (param) {
    // 这一步是因为，ajax取不到外部的对象，因为this对象会随着调用而改变，
    // 所以用_this保存最初的 this对象,这时候 this 指向 __mm对象
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      // 数据请求成功
      success: function (res) {
        // 请求成功
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data, res.msg)
        } // 未登录，需要登录
        else if (10 === res.status) {
          _this.doLogin();
        }
        // 请求数据错误
        else if (1 === res.status) {
          typeof param.success === 'function' && param.error(res.msg)
        }
      },
      //数据请求失败
      error: function (err) {
        typeof param.success === 'function' && param.error(err.statusText);
      }
    });
  },

  // 获取服务器地址，通过方法封装，当接口地址改变时，不用一个个去改
  getServerUrl: function (path) {
    return conf.serverHost + path;
  },
  // 获取url参数: ?之后的参数
  // decodeURIComponent url解码
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null
  },

  // 渲染html的方法
  renderHtml: function (htmlTemplate, data) {
    // 模板编译
    var template = Hogan.compile(htmlTemplate),
      // 模板渲染
      result = template.render(data);
    // 输出结果
    return result;
  },

  // 成功提示
  successTips: function (msg) {
    alert(mag || '操作成功！')
  },

  // 错误提示
  errorTips: function (msg) {
    alert(msg || '您的操作不对哦~')
  },

  // 验证手机号、邮箱、非空验证
  // $.trim去除两端空格
  validata: function (value, type) {
    var value = $.trim(value);
    // 非空验证
    // require是自定义的字符串，可以想取什么取什么
    if ('require' === type) {
      // 将value强制转换成 bool类型
      return !!value;
    }
    //手机号验证
    if ('phone' === type) {
      // test() 方法用于检测一个字符串是否匹配某个模式.
      return /^1\d{10}$/.test(value);
    }
    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },

  // 去登录
  doLogin: function () {
    // 全局跳转到登录页,在登录完成之后跳转回原页面
    // encodeURIComponent:对路径进行解码，防止路径因为被截断二无法跳转
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },

  // 回到首页
  goHome: function () {
    window.location.href = './index.html';
  }
};

module.exports = _mm;