const app = getApp()

Page({
  data: {
    userId:0,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
  },
  onLoad: function() {
    var that=this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        })
        console.log(res.data)
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
        console.log('phoneNum：' + this.data.phoneNum)
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
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
    } = this.data
    console.log(code)
    if (phoneNum && code) {
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
  onSubmit: function() {
    this.savePhone()
  },
  savePhone: function() {
    var that = this;
    //bind_ylh?userId=790714&ylhId=11&ylhPhone=11
    wx.request({
      url: app.globalData.dataurl + '/user/bind_ylh?userId=' + that.data.userId + '&ylhId=' + that.data.code + '&ylhPhone=' + that.data.phoneNum,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 4000,
              mask: true
            })
            wx.navigateTo({
              url: '../setting/setting'
            });
          } else {
            wx.showModal({
              title: '云云实惠购提示您',
              content: res.data.message,
              showCancel: false,
              confirmText: '我知道了',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../setting/setting'
                  });
                  console.log('确定')
                }
              }
            })
          }
        }
      }
    })
  }
})