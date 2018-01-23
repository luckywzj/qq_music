Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext("myAudio");
    this.getTabpic();
  },
  data: {
    imgUrls: [],
    DtList:[],
    hotSong:[],
    topLIst:{
      topTitle:[],
      topPic:[],
      singernameList1:[],
      singernameList2:[],
      singernameList3:[],
      top_id:[]
    },
   
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentTab: 0,
    progress: "",
    poster:
      "https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx.jpg?max_age=2592000",
    name: "等你下课",
    author: "杰伦",
    src:
      "http://dl.stream.qqmusic.qq.com/C400001J5QJL1pRQYB.m4a?vkey=05A98160E5246257153CE79282351E931D548E0976B2E148C018FE7A6ADC429F94AF196946ED2257A9F128500632A0BED15EC5B263FD1505&guid=1517411984&uin=2089210838&fromtag=66"
  },
  audioPlay: function() {
    this.audioCtx.play();
  },
  audioPause: function() {
    this.audioCtx.pause();
  },
  audio14: function() {
    this.audioCtx.seek(14);
  },
  audioStart: function() {
    this.audioCtx.seek(0);
  },

  MusicStart: function(e) {
    var progress = parseInt(e.detail.currentTime / e.detail.duration * 100);
    var that = this;
    that.setData({
      progress: progress
    });
    console.log("音乐播放进度为" + progress + "%");
  },
  /**
   * 滑动切换tab
   */
  bindChange: function(e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if(e.detail.current==1){
      that.getToplist()
    }
  },
  /**
   * 点击tab切换
   */
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
  /**
   * 获得轮播图
   */
  getTabpic: function() {
    var page = this;
    wx.request({
      url:
        "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1516351586680",
      data: {},
      header: {
        "referer":"https://m.y.qq.com",
        "Content-Type": "application/json",
        "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
      },
      success: function(res) {
        console.log(res.data.data);
        var data = res.data.data;
        var picList=[];
        var DtList=[];
        var hotSong=[];
        for (var i = 0; i < data.slider.length; i++) {
          var picimg = data.slider[i].picUrl;
          picList.push(picimg)
        }
        for (var x = 0; x < data.radioList.length; x++) {
          var dtimg = data.radioList[x].picUrl;
          DtList.push(dtimg)
        }
        for (var y = 0; y< data.songList.length; y++) {
          var hotimg = data.songList[y].picUrl;
          console.log(hotimg)
          hotSong.push(hotimg)
        }

        page.setData({
          imgUrls: picList,
          DtList:DtList,
          hotSong:hotSong
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },
  getToplist:function(){
    var that=this
    wx.request({
      url:"https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1516467246678",
      data:{},
      header:{},
      success:function(res){
        var topList= res.data.data.topList;
        var topTitle=[];
        var songList=[];
        var topPic=[];
        var top_id=[]
        for(var i=0;i<topList.length;i++){
          var Title = topList[i].topTitle;
          var pic = topList[i].picUrl
          var id=topList[i].id
          top_id.push(id)
          topTitle.push(Title)
          topPic.push(pic)
        }
        // for(var i=0;i<topList.length;i++){
        //   var songList = topList[i].songList;
        //   songList.push(songList)
        // }
        var singernameList1=[];
        var singernameList2=[];
        var singernameList3=[];
        for(var j=0;j<topList.length;j++){
          var singername1=topList[j].songList[0].singername;
          var songname1=topList[j].songList[0].songname;
          var singername2=topList[j].songList[1].singername;
          var songname2=topList[j].songList[1].songname;
          var singername3=topList[j].songList[2].singername;
          var songname3=topList[j].songList[2].songname;
          songname1=songname1+"-"+singername1
          songname2=songname2+"-"+singername2
          songname3=songname3+"-"+singername3
          singernameList1.push(songname1)
          singernameList2.push(songname2)
          singernameList3.push(songname3)
        }
        console.log(singernameList1)
        that.setData({
          topTitle:topTitle,
          topPic:topPic,
          singernameList1:singernameList1,
          singernameList2:singernameList2,
          singernameList3:singernameList3,
          top_id:top_id
        })
        console.log(topTitle)
      },
      fail:function(){

      }
    })
  },
  topChange:function(e){
    var that=this;
    console.log("ee")
    // that.getTopItem(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../Topitem/Topitem?id='+e.currentTarget.dataset.id
    })
  },
  getTopItem:function(id){
    wx.request({
      url:"https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid="+id+"&_=1516537150138",
      header:{},
      data:{},
      success:function(res){
        console.log(res)
      },
      fail:function(){

      }
    })
  }
});
