var wxCharts = require("../pages/dist/wxcharts");
var  app = getApp()
//
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate() - 1;

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("-");
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
//登录
function getLogin(data,callback){
  wx.request({
    url: "https://miniapp.qcast.cn/api/auth/login",
    header: {},
    data: {
      name: data.userName,
      password:data.passWord,
    },
    method: "post",
    success: function(res) {
      if (res.data.code == 0) {
        var data = res.data.data;
        app.token=data.access_token;
        callback(data);
      }
    },
    fail: function(e) {}
  });
}
//获取昨天数据
function getDayData(callback) {
  console.log(app)
  wx.request({
    url: "https://miniapp.qcast.cn/data/day",
    header: {},
    data: {
      rom: 0,
      token:app.token
    },
    method: "GET",
    success: function(res) {
      if (res.data.code == 0) {
        var data = res.data.data;
        callback(data);
      }
    },
    fail: function(e) {}
  });
}
//获取本周和上周数据
function getWeekDate() {
  wx.request({
    url: "https://miniapp.qcast.cn/data/week",
    header: {},
    data: {
      rom: 0,
      token:app.token
    },
    method: "GET",
    success: function(res) {
      if (res.data.code == 0) {
        var data = res.data.data;
        callback(data);
      }
    },
    fail: function(e) {}
  });
}
//获取本月和上月数据
function month() {
  wx.request({
    url: "https://miniapp.qcast.cn/data/month",
    header: {},
    data: {
      rom: 0,
      token:app.token
    },
    method: "GET",
    success: function(res) {
      if (res.data.code == 0) {
        var data = res.data.data;
        callback(data);
      }
    },
    fail: function(e) {}
  });
}
// 画柱状图和折线图
function canvesMake(column_data,line_data,dates_data) {
  var that = this;
  var windowWidth = 320;
  try {
    var res = wx.getSystemInfoSync();
    windowWidth = res.windowWidth;
  } catch (e) {
    console.error("getSystemInfoSync failed!");
  }
  var columnChart = new wxCharts({
    canvasId: "columnCanvas",
    type: "column",
    animation: true,
    categories:dates_data,
    series: [
      {
        name: "活跃终端数",
        data: column_data,
        format: function(val, name) {
          return  "";
        }
      }
    ],
    yAxis: {
      format: function(val) {
        return val + "";
      },
      title: "",
      min: 0
    },
    xAxis: {
      disableGrid: false,
      type: "calibration"
    },
    width: windowWidth,
    height: 200
  });
  new wxCharts({
    canvasId: "lineCanvas",
    type: "line",
    categories: dates_data,
    series: [
      {
        name: "新增激活终端数",
        data: line_data,
        format: function(val) {
          return  "";
        }
      }
    ],
    yAxis: {
      title: "",
      format: function(val) {
        return val.toFixed(0);
      },
      min: 0
    },
    width: windowWidth, // 屏幕超出15px
    height: windowWidth / 2
  });
}
function getActive(endTime,callback) {
  wx.request({
    url: "https://miniapp.qcast.cn/data/chart",
    data: {
      rom: "0",
      s: "2018-01-05",
      e: endTime,
      token:app.token
    },
    method: "get",
    header: {},
    success: function(res) {
      var data=res.data.data;
      callback(data)
      console.log(data);
    },
    fail: function(res) {}
  });
}
module.exports = {
  getDayData: getDayData,
  canvesMake: canvesMake,
  formatTime: formatTime,
  getActive: getActive,
  getLogin:getLogin
};
