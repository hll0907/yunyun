// pages/newview/newview.js
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
      that.setData({
        urls:urls
      })
  },
})