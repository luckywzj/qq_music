//index.js  
//获取应用实例测试 
var wxCharts = require('../dist/wxcharts');

var app = getApp();
var columnChart = null;
var lineChart = null;

var chartData = {
  main: {
      title: '总成交量',
      data: [15, 20, 45, 37,22,120,98,65,34,98,65,34],
      categories: ['2012', '2013', '2014', '2015','2016','2017','2018','2019','2010','2018','2019','2010']
  }
};
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    dates: '2016年11月08日',
    area:['全部品牌','小芒果','万利达','微星视到','盒天下','迪优美特',"英菲克"]  ,

    chartTitle: '总成交量',
    isMainChartDisplay: true,
    imgpull:"../img/pull.png",
    stardate:"2016年11月08日",
    enddate:"2017年11月08日"
  },
  //类型选择
  bindPickerChange:function(e){  
    this.setData({  
        areaIndex: e.detail.value  
    })  
  } ,
  onLoad: function () {
    wx.setNavigationBarTitle({  
      title: '终端广告数据',  
    })  
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
   //  点击日期组件确定事件  
  bindStarDate: function (e) {
    console.log(e.detail.value)
   this.setData({
    stardate: e.detail.value
   })
  },
  bindEndDate: function (e) {
    console.log(e.detail.value)
   this.setData({
    enddate: e.detail.value
   })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
   
    columnChart = new wxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        animation: true,
        categories: chartData.main.categories,
        series: [{
            name: '活跃终端数',
            data: chartData.main.data,
            format: function (val, name) {
                return val.toFixed(1) + '万';
            }
        }],
        yAxis: {
            format: function (val) {
                return val + '万';
            },
            title: '',
            min: 0
        },
        xAxis: {
            disableGrid: false,
            type: 'calibration'
        },
        width: windowWidth,
        height: 200,
    });
    new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: ['1','2', '3', '4', '5', '6', '7','8','9', '10', '11', '12'],
          series: [
            {
            name: '新增激活终端数',
            data: [0.10,0.15, 0.2, 0.45, 0.37, 0.4, 0.8,0.60, 0.2, 0.45, 0.37, 0.4],
            format: function (val) {
              return val.toFixed(2) + '万';
            }
          }],
          yAxis: {
            title: '',
            format: function (val) {
              return val.toFixed(2);
            },
              min: 0
            },
              width: windowWidth,// 屏幕超出15px
              height: windowWidth/2
    });
            
    
}
})


