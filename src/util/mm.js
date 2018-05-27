'use strict';

var _mm = {
  // 请求后端数据
  request:function(param){
    // 这一步是因为，ajax取不到外部的对象，因为this对象会随着调用而改变，
    // 所以用_this保存最初的 this对象,这时候 this 指向 __mm对象
    var _this=this;
    $.ajax({
      type:param.method || 'get',
      url:param.url||'',
      dataType:param.type||'json',
      data:param.data||'',
      // 数据请求成功
      success:function(res){
        // 请求成功
        if(0 === res.status){
          typeof param.success === 'function' && param.success(res.data,res.msg)
        }// 未登录，需要登录
        else if(10 === res.status){
          _this.doLogin();
        }
        // 请求数据错误
        else if(1 === res.status){
          typeof param.success === 'function' && param.error(res.msg)
        }
      },
      //数据请求失败
      error:function(err){
        typeof param.success === 'function' && param.error(err.statusText);
      }
    });
  },
  // 去登录
  doLogin:function(){
    // 全局跳转到登录页,在登录完成之后跳转回原页面
    // encodeURIComponent:对路径进行解码，防止路径因为被截断二无法跳转
    window.location.href = './login.html?redirect='+ encodeURIComponent(window.location.href);
  }
};

module.exports = _mm;