/*
 * @Author: zhenjiang 
 * @Date: 2018-01-19 23:06:22 
 * @Last Modified by: wang
 * @Last Modified time: 2018-01-19 23:39:46
 */

var app = getApp();
Page({
  data: {
    latitude: "",
    longitude: "",
    city:"",
    formatted_address:"",
    weather:{
      type:'',
      fl:'',
      fx:'',
      low:'',
      high:''
    },
    region: ['', '', ''],

  },
  onLoad: function () {
    this.getLocation();
  },
  getLocation: function(e) {
    var page=this  
    console.log(e);
    var that = this;
    wx.getLocation({
      type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        var longitude=res.longitude  
        var latitude=res.latitude  
        page.loadCity(longitude,latitude),
        console.log(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      }
    });
  },
  loadCity:function(longitude,latitude){  
    var page =this  
    wx.request({  
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=ucrf8G3skjLO3F7bwVKGAzGFGNZeb6Qz&location='+latitude+','+longitude+'&output=json',  
      data: {},  
      header:{  
        'Content-Type':'application/json'  
      },  
      success: function(res){  
        // success  province
        console.log(res.data.result.addressComponent.province);  
        console.log(res.data.result.addressComponent.district);  
        var province=res.data.result.addressComponent.province;
        var district=res.data.result.addressComponent.district;
        var formatted_address=res.data.result.formatted_address;   
        var city=province+"·"+district;
        page.setData({city:city});  
        page.setData({formatted_address:formatted_address});  
        page.loadWeather(district);
      },  
      fail: function() {  
        // fail  
      },  
      complete: function() {  
        // complete  
      }  
    })  
  },
  loadWeather:function(district){  
    var page = this
    wx.request({  
      url: 'http://www.sojson.com/open/api/weather/json.shtml?city='+district,  
      data: {},  
      header:{  
        'Content-Type':'application/json'  
      }, 
      success: function(res){ 
        var date = new  Date() ;
        console.log(date)
        var data = res.data.data.forecast[0]
        var type =data.type;
        var fl =data.fl;
        var fx =data.fx;
        var low =data.low.replace("低温","");
        var high =low+"-"+data.high.replace("高温","");
        page.setData({
          weather:{
            type:type,
            fl:fl,
            fx:fx,
            low:low,
            high:high
          }
        })

       console.log(type)
      },
      fail: function(res){  }
    })
  },
  bindRegionChange: function (e) {
    var that=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      city:e.detail.value[2]
    })
    that.loadWeather(e.detail.value[2]);
  }
  
});
