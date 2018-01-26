//index.js
//获取应用实例测试
var wxCharts = require("../dist/wxcharts");

var app = getApp();
var lineChart = null;
var util = require("../../utils/util.js");
Page({
  data: {
    winWidth: 0, //界面设置
    winHeight: 0,
    currentTab: 0, // tab切换
    dates: "2016年11月08日",
    area: [
      //产品类型
      "全部品牌",
      "小芒果",
      "万利达",
      "微星视到",
      "盒天下",
      "迪优美特",
      "英菲克"
    ],
    chart:{
      column_data:[],
      line_data:[],
      dates:[]
    },   
    chartTitle: "总成交量",
    isMainChartDisplay: true,
    imgpull: "../img/pull.png",
    stardate: "2016年11月08日", //趋势图开始日期
    enddate: "2017年11月08日", //趋势图结束日期
    yesday_total: "", //昨天累计激活终端数
    yesday_new: "", //昨天新增激活终端数
    yesday_active: "", //昨天终端活跃数
    befor_total: "", //前天累计激活终端数
    befor_new: "", //前天新增激活终端数
    befor_active: "", //前天终端活跃数
    yesday_percent: "", //昨天活跃度
    befor_percent: "" //前天活跃度
  },
  //类型选择
  bindPickerChange: function(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  onLoad: function() {
    var that = this;
   
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    //获取后台数据
    that.getData();
    var that= this;
    var date=new Date();
    var today=util.formatTime(date);  //当前日期前一天
    var activeList=[];
    var newList=[];
    var dates=[];
    util.getActive(today,function(data){
      for(var i=0;i<data.length;i++){
        var active=data[i].active;
        var newcustomer =data[i].new;
        var dat='';
        dates.push(dat);
        activeList.push(active);
        newList.push(newcustomer);
      }
      that.setData({
        column_data:activeList,
        line_data:newList,
        dates:dates
      })
    });
   
    
  },
  //  点击日期组件确定事件
  bindStarDate: function(e) {
    console.log(this.data.column_data);

    this.setData({
      stardate: e.detail.value,
    });

    util.canvesMake(this.data.column_data,this.data.line_data,this.data.dates)
    
  },
  bindEndDate: function(e) {
    console.log(e.detail.value);
    this.setData({
      enddate: e.detail.value
    });
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  onReady: function(e) {
    var that=this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error("getSystemInfoSync failed!");
    }
    
  },
  getData: function() {
    var that = this;
    util.getDayData(function(data) {
      var yesday = data.yesterday;
      var befor = data.before;
      var befor_percent = parseInt(befor.active / befor.total * 100) + "%";
      var yesday_percent = parseInt(yesday.active / yesday.total * 100) + "%";
      that.setData({
        yesday_total: yesday.total,
        yesday_new: yesday.new,
        yesday_active: yesday.active,
        befor_total: befor.total,
        befor_new: befor.new,
        befor_active: befor.active,
        yesday_percent: yesday_percent,
        befor_percent: befor_percent
      });
    });
  }
});
