'use strict';

require('./index.css');

var _mm = require('util/mm.js');

// _mm.request({
//   url:'/api/product/list.do?keyword=1',
//   success:function(res){
//     console.log(res);
//   },
//   error:function(errMsg){
//     console.log(errMsg);
//   }
// })

var html = '<div>{{data}}</div>';
var data={
  data: "mayuyu"
};
console.log(_mm.renderHtml(html,data));