// pages/submitorder/submitorder.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  addorder: function(e) {
    let order = e.detail.value
    this.setData({
      order: order
    })
  },
  onSubmit: function() {
    var orders = this.data.order;
    if (orders.length < 16) {
      wx.showModal({
        title: '云云实惠购提示您',
        showCancel: false,
        confirmText: '我知道了',
        content: '您输入的订单号有误',
      })
    } else {
      // http://shg.yuf2.cn:8080/shg-api/api/order/submit_order?userId=790714&orderNo=1111
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/order/submit_order?userId=' + app.globalData.userId + '&orderNo=' + that.data.order,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.statusCode == 200) {
            if (res.data.code == 1) {
              wx.showModal({
                title: '云云实惠购提示您',
                showCancel: false,
                confirmText: '我知道了',
                content: res.data.message,
              })
            } else {
              wx.showModal({
                title: '云云实惠购提示您',
                showCancel: false,
                confirmText: '我知道了',
                content: res.data.message,
              })
            }
          }
        }
      })
    }
  }
})