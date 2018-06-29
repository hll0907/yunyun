const app = getApp()

Page({
  data: {
    userId:'',
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
    otherInfo: ''
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        })
      }
    })
  }, // 手机号部分
  inputPhoneNum: function(e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function(phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
      return false
    }
  },

  showSendMsg: function() {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function() {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
  sendMsg: function() {
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/send_message?mobile=' + that.data.phoneNum,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000,
              mask: true
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 2000,
              mask: true
            })
          }
        }
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  // 密码部分
  addOtherInfo: function(e) {
    this.setData({
      otherInfo: e.detail.value
    })
    this.activeButton()
  },
  // 验证码
  addCode: function(e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  // 按钮
  activeButton: function() {
    let {
      phoneNum,
      code,
      otherInfo
    } = this.data
    if (phoneNum && code && otherInfo) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },
  onSubmit: function () {
    this.checkPhone()
  },
  checkPhone:function(){
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/mobile_auth?phoneNum=' + that.data.phoneNum,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            that.savePhone();
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 2000,
              mask: true
            })
          }
        }
      }
    })
  },
  savePhone:function(){
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/user/bind_phone_number?userId=' + that.data.userId + '&phoneNum=' + that.data.phoneNum + '&code=' + that.data.code + '&password=' + that.data.otherInfo,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000,
              mask: true
            })
            wx.navigateTo({
              url: '../setting/setting'
            });
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 2000,
              mask: true
            })
            wx.navigateTo({
              url: '../setting/setting'
            });
          }
        }
      }
    })
  }
})