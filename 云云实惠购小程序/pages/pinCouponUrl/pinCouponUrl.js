// pages/pinCouponUrl/pinCouponUrl.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var urls = options.CouponUrl;
    var that = this;
    that.setData({
      couponUrl: urls
    })
    // console.log(urls)
  },
})