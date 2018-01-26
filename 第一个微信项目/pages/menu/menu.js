//index.js
//获取应用实例

Page({
  data: {
    img: "../img/jiantou.png"
  },

  onLoad: function() {},
  active: function(event) {
    wx.navigateTo({
      url: "../customer/customer"
    });
  },
  kind: function(event) {
    wx.navigateTo({
      url: "../kind/kind"
    });
  },
  advert: function(event) {
    wx.navigateTo({
      url: "../advert/advert"
    });
  }
});
