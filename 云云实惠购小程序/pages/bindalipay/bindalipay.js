const app = getApp()

Page({
  data: {
    userId: '',
    alipayimgurl: '',
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
        console.log(res.data)
        that.getdata()
      }
    })

  },
  getdata: function() {
    var that = this;
    var time = new Date;
    console.log(Date.parse(time))
    wx.request({
      url: app.globalData.dataurl + '/user/' + that.data.userId,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            that.setData({
              alipayimgurl: res.data.result.alipay + '?time' + Date.parse(time),
            });
          }
        } else {
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function() {
        wx.showToast({
          title: '出错了',
          icon: 'loading',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  onSubmit: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          alipayimgurl: tempFilePaths
        })
        wx.uploadFile({
          url: 'https://shg.yuf2.cn/shg-api/api/user/bind-alipay?userId=' + that.data.userId, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'alipay',
          success: function(res) {
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