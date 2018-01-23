
Page({
  data: {
    itemId: '',
    ListName:'',
    pic_album:'',
    update_time:'',
    total_song_num:'',
    songlist:[],
    items:["周杰伦","刘德华","桂纶镁","李白","周杰伦","刘德华","桂纶镁","李白","周杰伦","刘德华","桂纶镁","李白","周杰伦","刘德华","桂纶镁","李白"]
  },
  onLoad: function (e) {
    var that= this  
    this.setData({
        itemId:e.id
    })
    that.getTopitem()
  },
    getTopitem: function() {
    var that = this;
    wx.request({
      url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
      header: {},
      data: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf - 8',
        outCharset: 'utf - 8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: that.data.itemId,
        _: 1516537150138
      },
      success: function(res) {
        var ListName=res.data.topinfo.ListName;
        var pic_album=res.data.topinfo.pic_album;
        var total_song_num=res.data.total_song_num;
        var update_time=res.data.update_time;
        var songlist= res.data.songlist;
        that.setData({
            ListName:ListName,
            pic_album:pic_album,
            update_time:update_time,
            total_song_num:total_song_num,
            songlist:songlist
        })

        console.log(songlist);
      },
      fail: function(e) {}
    });
  },
  play_item:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../play/play?id='+e.currentTarget.dataset.id
    })
  }
})