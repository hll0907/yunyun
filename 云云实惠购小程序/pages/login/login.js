// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: "",
    userId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    if (wx.getSetting) {
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                // console.log(res)
                //用户已经授权过
                that.userlogin()
                that.setData({
                  userInfo: res.userInfo
                })
                // console.log("============================================")
                // console.log(that.data.userInfo)
              },
              fail: function() {
                this.bindGetUserInfo();
              }
            })
          }
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '云云实惠购提示您',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    wx.checkSession({
      success: function() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("session_key")
      },
      fail: function() {
        // session_key 已经失效，需要重新执行登录流程
        that.userlogin();
      }
    })
  },
  bindGetUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      wx.getUserInfo({
        success: function(res) {
          // console.log(res)
          //用户已经授权过
          that.userlogin()
          that.setData({
            userInfo: res.userInfo
          })
          // console.log("---------------------------------------------------")
          // console.log(that.data.userInfo)
        },
        fail: function() {
          this.bindGetUserInfo();
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '云云实惠购提示您',
        content: '您还未授权哦',
        showCancel: false,
        confirmText: '去授权',
        confirmColor: 'red',
        success: function(res) {
          if (res.confirm) {
            console.log('用户拒绝了')
          }
        }
      })
    }
  },
  userlogin: function() {
    // 登录
    wx.login({
      success: function(res) {
        var code = res.code;
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function(res) {
              // console.log(res)
              wx.request({
                url: 'https://shg.yuf2.cn/shg-api/api/v1/wechat/weixin-access',
                data: {
                  code: code,
                  userdata:res.rawData
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                success: function(res) {
                  // console.log(res.data.result)
                  // console.log(res.data)
                  // 4.解密成功后 获取自己服务器返回的结果
                  if (res.data.code == 1) {
                    if (res.data.result.userData.userId != '' || res.data.result.sessionKey != '') {
                      wx.switchTab({
                        url: '../../pages/index/index',
                      })
                      wx.setStorageSync('userId', res.data.result.userData.userId)
                    } else {
                      wx.showModal({
                        title: '云云实惠购提示您',
                        content: '您还未授权哦',
                        showCancel: false,
                        confirmText: '去授权',
                        confirmColor: 'red',
                        success: function(res) {
                          if (res.confirm) {
                            console.log('确定')
                          }
                        }
                      })
                    }
                  } else {
                    wx.showModal({
                      title: '云云实惠购提示您',
                      content: '您还未授权哦',
                      showCancel: false,
                      confirmText: '去授权',
                      confirmColor: 'red',
                      success: function(res) {
                        if (res.confirm) {
                          console.log('确定')
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})