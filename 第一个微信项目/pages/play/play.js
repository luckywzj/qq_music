
Page({
    onReady: function (e) {
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio');

    },
    onLoad: function (e) {
        var that= this;
        var app =getApp();
        console.log("app:"+app.songlist[1].Franking_value)
        console.log("id:"+e.id)
        var author='';
        var name='';
        var poster='';
        var src='';
        var singer='';
        for(var i=0;i<app.songlist.length;i++){
          if(app.songlist[i].data.songid==e.id){
            var songmid=app.songlist[i].data.songmid;
            console.log("songmid:"+songmid);
            singer=app.songlist[i].data.singer[0].name;
            var albumname=app.songlist[i].data.songname;
            var albummid=app.songlist[i].data.albummid
            poster='http://y.gtimg.cn/music/photo_new/T002R150x150M000' + albummid + '.jpg';
            name=albumname;
            src='http://ws.stream.qqmusic.qq.com/C100' + songmid + '.m4a?fromtag=38';

            console.log("albumname:"+albumname)
            // http://ws.stream.qqmusic.qq.com/C100' + mid + '.m4a?fromtag=38
           // http://ws.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?fromtag=38
                  //  http://y.gtimg.cn/music/photo_new/T002R150x150M000001QFnm139zKQN.jpg'
          }
        }
        this.setData({
            itemId:e.id,
            poster:poster,
            name:name,
            src:src,
            author:singer
        });
    
     
      },
    data: {
      itemId:"",
      progress: "",
      poster: '',
      name: '',
      author: '',
      src: '',
    },
    audioPlay: function () {
      this.audioCtx.play()
    },
    audioPause: function () {
      this.audioCtx.pause()
    },
    audio14: function () {
      this.audioCtx.seek(14)
    },
    audioStart: function () {
      this.audioCtx.seek(0)
    },
    MusicStart: function(e) {
        var progress = parseInt(e.detail.currentTime / e.detail.duration * 100);
        var that = this;
        that.setData({
          progress: progress
        });
        console.log("音乐播放进度为" + progress + "%");
      },
  })