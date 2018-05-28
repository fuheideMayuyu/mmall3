'use strict';

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
  // 初始化
  init: function () {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    // 实现链式操作
    return this;
  },
  // 登录，注册事件
  bindEvent: function () {
    // 登录点击事件
    $('.js-login').click(function () {
      _mm.doLogin();
    });
    // 注册事件
    $('.js-register').click(function () {
      window.location.href = './register.html';
    });
    // 退出登录事件
    $('.js-logout').click(function () {
      // 调用退出登录封装方法
      _user.logout(function (res) {
        // 页面刷新，重新加载
        window.location.reload();
      }, function (errMsg) {
        _mm.errorTips(erMsg);
      });
    });
  },
  //加载用户信息
  loadUserInfo: function () {
    // 检查登录状态
    _user.checkLogin(function (res) {
      // 隐藏注册，登录按钮，显示以登录状态
      // .find寻找后代元素， .text:输出被选的元素的文本内容
      $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
    }, function (errMsg) {
      // do nothing
    })
  },
  // 加载购物车数量
  loadCartCount: function () {
    _cart.getCartCount(function (res) {
      $('.nav .cart-count').text(res || 0);
    }, function (errMsg) {
      $('.nav .cart-count').text(0);
    });
  }
};

module.exports = nav.init();