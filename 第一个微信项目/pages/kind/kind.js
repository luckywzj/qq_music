//index.js
//获取应用实例

Page({
  data: {
    img: "../img/jiantou.png",
    area: ["30天终端活跃数", "累计激活终端数"]
  },

  onLoad: function() {},
  //类型选择
  bindPickerChange: function(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },
  active: function(event) {
    wx.navigateTo({
      url: "../customer/customer"
    });
  }
});
