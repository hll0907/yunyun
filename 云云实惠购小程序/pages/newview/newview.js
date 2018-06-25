// pages/newview/newview.js
var wxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    urls:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var urls=options.url;
      var that=this;
      // console.log(urls)
      wx.request({
        url: urls,
        method:'GET',
        header: { 'content-Type': 'application/json' },
        success:function(res){
          // console.log(res.data);
          wxParse.wxParse('article','html',res.data,that,5)
          console.log(urls)
        }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})