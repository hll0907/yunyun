//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userdata:''
  },
  onLoad: function() {
    var that=this;
    wx.request({
      url: app.globalData.dataurl+'/user/'+app.globalData.userId,
      method: 'GET',
      success: function (res) {
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