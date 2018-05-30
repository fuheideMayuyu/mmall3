'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function () {
    $('.error-item').hide().find('.err-msg').text('');
  }
};
var page = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init: function () {
    this.onLoad();
    this.bindEvent();
  },
  // 显示第一步
  onLoad: function () {
    this.loadStepUsername();
  },
  // 找回密码事件
  bindEvent: function () {
    var _this = this;
    // 输入用户名，下一步，点击事件
    $('#submit-username').click(function () {
      // 获取用户名
      var username = $.trim($('#username').val());
      // 用户名存在
      if (username) {
        // 验证通过
        _user.getQuestion(username, function (res) {
            _this.data.username = username;
            _this.data.question = res;
            _this.loadStepQuestion();
          },
          // 验证不通过
          function (errMsg) {
            formError.show(errMsg);
          });
      }
      // 用户名不存在
      else {
        formError.show('请输入用户名');
      }
    });

    // 输入问题答案，下一步，点击事件
    $('#submit-question').click(function () {
      var answer = $.trim($('#answer').val());
      // 密码提示问题答案存在
      if (answer) {
        // 检查密码提示问题答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        }, function (errMsg) {
          formError.show(errMsg);
        });
      }
      // 用户名不存在
      else {
        formError.show('请输入密码提示问题答案');
      }
    });

    // 输入新密码后的按钮点击
    $('#submit-password').click(function () {
      var password = $.trim($('#password').val());
      // 密码不为空
      if (password && password.length >= 6) {
        // 检查密码提示问题答案
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function (res) {
          window.location.href = './result.html?type=pass-reset';
        }, function (errMsg) {
          formError.show(errMsg);
        });
      }
      // 密码为空
      else {
        formError.show('请输入不少于6位的新密码');
      }
    });
  },
  // 加载输入用户名这一步
  loadStepUsername: function () {
    $('.step-username').show();
  },
  // 加载输入密码提示问题答案这一步
  // .siblings:遍历
  loadStepQuestion: function () {
    formError.hide();
    $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
  },
  // 加载输入password的一步
  loadStepPassword: function () {
    // 清除错误提示
    formError.hide();
    // 做容器的切换
    $('.step-question').hide()
      .siblings('.step-password').show();
  }
};

$(function () {
  page.init();
})