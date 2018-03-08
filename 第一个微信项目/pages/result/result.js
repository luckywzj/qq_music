var app = getApp();
Page({
  data:{
     evaContent   : '',
     areaIndex:0,  
     area:['系统','METV直播','云视听·极光','银河奇异果','CIBN酷喵影视','其他应用']  ,
     picker :'',
     tip:'',
     userName:'',
     psw:''
  },
  //类型选择
  bindPickerChange:function(e){  
    this.setData({  
        areaIndex: e.detail.value  
    })  
  } ,
  onLoad:function(){
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //事件
  textBlur: function(e){
     if(e.detail&&e.detail.value.length>0){
       if(e.detail.value.length<12||e.detail.value.length>500){
          //app.func.showToast('内容为12-500个字符','loading',1200);
       }else{
          this.setData({
             evaContent : e.detail.value
          });
       }
     }else{
        this.setData({
           evaContent : ''
        });
        evaData.evaContent = '';
        app.func.showToast('请输入投诉内容','loading',1200);
     }
  },
  //提交事件
  evaSubmit:function(eee){
    this.setData({
      tip:eee.detail.value.evaContent,
      userName:eee.detail.value.ppp,
     
    })   ;
    var that = this;  
    wx.request({
        url: 'https://liaolongjun.duapp.com/ace/https.do', 
        data: {cur:1},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(json){
            wx.showModal({
                title: '提示',
                content: JSON.stringify(json.data),
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        }
    })
  },  
  formReset: function() {  
    console.log('form发生了reset事件');  
    this.modalTap2();  
  
  }
})