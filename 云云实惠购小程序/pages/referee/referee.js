// pages/referee/referee.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userdata: [],
    refereId: 0,
    code: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getuserdata();
  },
  getuserdata: function() {
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/' + app.globalData.userId,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            refereId: res.data.result.refereId
          });
          that.getfrienddata();
          // console.log(res.data.result.refereId)
        }
      }
    })
  },
  getfrienddata: function() {
    var that = this;
    // console.log(that.data.refereId)
    wx.request({
      url: app.globalData.dataurl + '/user/' + that.data.refereId,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            userdata: res.data.result,
            code: res.data.code
          });
          console.log(res.data.result)
        }
      }
    })
  }
})