'use strict';

require('./index.css');
var _mm = require('util/mm.js');

var header = {
  init: function () {
    this.bindEvent();
  },
  // 组件加载时，获取输入框信息
  onLoad: function () {
    var keyword = _mm.getUrlParam('keyword');
    if (keyword) {
      $('#search-input').val(keyword);
    }
  },
  bindEvent: function () {
    var _this = this;
    // 点击搜索按钮提交
    $('#search-btn').click(function () {
      _this.searchSubmit();
    });
    // 按下回车，提交搜索框,这里注意，点击事件和键盘事件并不是绑定的同一个元素
    $('#search-input').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    });
  },
  // 提交表单信息方法
  searchSubmit: function () {
    var keyword = $.trim($('#search-input').val());
    // 如果有keyword,否则返回首页
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _mm.goHome();
    }
  }
};

module.exports = header.init();