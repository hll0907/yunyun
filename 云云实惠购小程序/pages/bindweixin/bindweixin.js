const app = getApp()

Page({
  data: {
   weixinimgurl:'',
  },
  onLoad: function() {
    var that = this;
    var time=new Date;
    console.log(Date.parse(time))
    wx.request({
      url: app.globalData.dataurl + '/user/' + app.globalData.userId,
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function (res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            weixinimgurl: res.data.result.wxMoneyQrcode + '?time' + Date.parse(time),
          });
        }
      }
    })
  },
  onSubmit:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          weixinimgurl: tempFilePaths
        })
        wx.uploadFile({
          url: 'https://shg.yuf2.cn/shg-api/api/user/bind-wxmoney?userId=790714', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'qrcode',
          success: function (res) {
            console.log(res)
            //do something
            wx.showToast({
              title: '上传成功',
              icon: 'succes',
              duration: 4000,
              mask: true
            })
            wx.navigateTo({
              url: '../setting/setting'
            })
          }
        })
      }
    })
  } 
})