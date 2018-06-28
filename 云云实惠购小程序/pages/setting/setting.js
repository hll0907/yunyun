const app = getApp()

Page({
  data: {
    usetId: 0,
    userdata: [],
    phone: ''
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
        that.getuserdata();
      }
    })
  },
  // onShow: function() {
  //   this.getuserdata();
  // },
  getuserdata: function() {
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/' + that.data.userId,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            userdata: res.data.result,
            phone: res.data.result.phone
          });
        }
      }
    })
  },
  usersetting: function() {
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/' + that.data.userId + '/update/nickname',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            that.getuserdata();
          }
          wx.showToast({
            title: '信息同步成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },
  showphone: function() {
    wx.showModal({
      title: '云云实惠购提示您',
      showCancel: false,
      confirmText: '我知道了',
      content: this.data.phone + '\r\n 如需更换手机号码，请联系官方客服',
    })
  },
  bindphone: function() {
    wx.navigateTo({
      url: '../bindphone/bindphone'
    })
  },
  showylh: function() {
    wx.navigateTo({
      url: '../bindylh/bindylh'
    })
  },
  bindalipay: function() {
    wx.navigateTo({
      url: '../bindalipay/bindalipay'
    })
  },
  bindweixin: function() {
    wx.navigateTo({
      url: '../bindweixin/bindweixin'
    })
  }
})