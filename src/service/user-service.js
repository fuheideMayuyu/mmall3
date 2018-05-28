'use strict';

var _mm = require('util/mm.js');

var _user = {
  // 检查登录状态
  checkLogin:function(resolve,reject){
    _mm.request({
      url:_mm.getServerUrl('/api/user/get_user_info.do'),
      method:'POST',
      success:resolve,
      error:reject
    })
  },
  // 退出登录
  logout:function(resolve,reject){
    _mm.request({
      url:_mm.getServerUrl('/api/user/logout.do'),
      method:'POST',
      success:resolve,
      error:reject
    })
  }
};

module.exports = _user;