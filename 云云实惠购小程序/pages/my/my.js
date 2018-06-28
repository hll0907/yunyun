//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userdata: [],
    userId: 0
  },
  onLoad: function() {
    var that=this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
        console.log(res.data)
        that.getuserdata()
      }
    })
  },
  //账户设置
  usersetting: function() {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  //提现
  onclickwithdraw: function() {
    wx.navigateTo({
      url: '../withdraw/withdraw'
    })
  },
  //积分记录
  onclickIntegral: function() {
    wx.navigateTo({
      url: '../integralrecord/integralrecord'
    })
  },
  //我的订单
  onclickorder: function() {
    wx.navigateTo({
      url: '../orderrecord/orderrecord'
    })
  },
  //提交订单
  onclicksubmitorder: function() {
    wx.navigateTo({
      url: '../submitorder/submitorder'
    })
  },
  //我的推荐人
  onclickreferee: function() {
    wx.navigateTo({
      url: '../referee/referee'
    })
  },
  //我的好友
  onclickfriend: function() {
    wx.navigateTo({
      url: '../friend/friend'
    })
  },
  // //我的客服
  // onclickcustomerService: function() {
  //   wx.navigateTo({
  //     url: '../customerService/customerService'
  //   })
  // },
  onShow: function() {
    this.getuserdata()
  },
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
            userdata: res.data.result
          });
        }
      }
    })
  }
})