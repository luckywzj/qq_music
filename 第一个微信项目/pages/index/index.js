//index.js
//获取应用实例
var util= require("../../utils/util")
Page({
  data: {
    items: [{ name: "USA", value: "记住登录信息" }],
    userName:'',
    passWord:''
  },
  // 记住密码
  checkboxChange: function(e) {
    console.log("checkbox发生change事件，携带value值为：", e.detail.value);
  },
  onLoad: function() {},

  primary: function(event) {
    console.log("name:"+this.data.userName+"word:"+this.data.passWord)
    util.getLogin(this.data,function(res){
      console.log(res)
    })
    wx.navigateTo({
      url: "../menu/menu"
    });
  },
  watchPassWord: function (event) {
    this.setData({
      passWord: event.detail.value
    })
  },
  userNameWord:function(event){
    this.setData({
      userName: event.detail.value
    })
    
  }
});
