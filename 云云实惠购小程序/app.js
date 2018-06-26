//app.js
App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: function (res) {
        var code = res.code; 
        console.log(code)
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              // userInfo 只存储个人的基础数据
              wx.setStorageSync('userInfo', res.userInfo);
              console.log(res.userInfo)
              // 只获取openid的话，自己就可以
              // that.getOpenid(code);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //http://shg.yuf2.cn:8080/shg-api/api/product/pdd/list
    pinduoduogoodurl: 'https://shg.yuf2.cn/shg-api/api/product/pdd/list',
    taobaogoodurl: 'https://shg.yuf2.cn/shg-api/api/product/other/list?',
    taobaocollectionurl: 'https://shg.yuf2.cn/shg-api/api/product/my_collect',
    taobaodelcollectionurl: 'https://shg.yuf2.cn/shg-api/api/product/uncollect',
    userId: 790714,
    dataurl: 'https://shg.yuf2.cn/shg-api/api/'
  }
})