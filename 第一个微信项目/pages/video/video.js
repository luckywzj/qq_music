var util = require("../../utils/util.js");
Page({
  data: {
    playUrl: "",
    room_id: ""
  },
  onLoad: function(e) {
    console.log(e);
    this.setData({
      room_id: e.room_id
    });
  },
  onReady: function() {
    this.getPlayUrl(this.data.room_id);
  },
  getPlayUrl: function(id) {
    var that = this;
    var time = Date.parse(new Date()) / 1000;
    var authstr = "room/" + id + "?aid=wp&cdn=ws&client_sys=wp&time=" + time;
    var auth = util.MD5(authstr + "zNzMV1y4EMxOHS6I5WKm");
    var getPlayUrl =
      "https://capi.douyucdn.cn/api/v1/" + authstr + "&auth=" + auth;
    wx.request({
      url: getPlayUrl,
      header: {},
      data: {},
      success: function(res) {
        var playUrl = res.data.data.hls_url;
        console.log(playUrl);
        that.setData({
          playUrl: playUrl
        });
      },
      fail: function(e) {}
    });
  }
});
