var util = require("../../utils/util.js");
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    playUrl: "",
    img: [],
    imgUrls: [
      "https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx.jpg?max_age=2592000",
      "https://rpic.douyucdn.cn/amrpic-180207/19223_1755.jpg",
      "https://cs-op.douyucdn.cn/vod-cover/2018/02/07/c93ec89350a56b724e2d0361bffaa942.jpg"
    ],
    room_list: [
      "https://www.douyu.com/19223",//3q
      "https://www.douyu.com/lvyou",//囧
      "https://www.douyu.com/2267291",//17
      "https://www.douyu.com/dasima"//大司马
    ]
  },
  onLoad: function() {
    this.getShowStatus();
    var that = this;
    var room_list = this.data.room_list;
    for (var i = 0; i < room_list.length; i++) {
      that.getShowStatus(room_list[i]);
    }
  },
  getShowStatus: function(url) {
    var that = this;
    var url = url.replace("www", "m");
    wx.request({
      url: url,
      header: {},
      data: {},
      success: function(res) {
        var status = "";
        if (res.data.indexOf("isLive") > -1) {
          status = res.data.match(/isLive: (\d+),/)[1];
        } else if (res.data.indexOf("roomstatus") > -1) {
          status = res.data.match(/roomstatus: (\d+),/)[1];
        }
        //直播状态  0不在直播  1在播
        var room_id = res.data.match(/ room_id: (\d+),/)[1];
        var roomName = res.data.match(/roomName: "(.*?)",/)[1];
        var status_title = "";
        var videoSrc = "";
        if (status == "1") {
          videoSrc = res.data.match(/roomSrc: "(.*?)"/);
          if (videoSrc.length > 1) {
            videoSrc = videoSrc[1];
          } else {
            videoSrc =
              "https://shark.douyucdn.cn/app/douyu-mobile/m-douyu/res/offline.jpg?v=2.0.28";
          }
          videoSrc = videoSrc.replace("\\", "");
          videoSrc = videoSrc.replace(/\\/g, "");
          status_title = "在播";
        } else if (status == "0") {
          videoSrc = res.data.match(/videoSrc":"(.*?)"/)[1];
          status_title = "不在播";
          videoSrc = videoSrc.replace("\\", "");
          videoSrc = videoSrc.replace(/\\/g, "");
        }
        var anchor = {};
        anchor["room_id"] = room_id;
        anchor["roomName"] = roomName;
        anchor["status_title"] = status_title;
        anchor["videoSrc"] = videoSrc;
        that.data.img.push(anchor);
        that.setData({
          img: that.data.img
        });
        console.log(that.data.img);
      },
      fail: function(e) {}
    });
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
  },
  play_view: function(e) {
    var room_id = e.currentTarget.dataset.id;
    console.log(room_id);
    wx.navigateTo({
      url: "../video/video?room_id=" + room_id
    });
  }
});
