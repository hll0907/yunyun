const app = getApp()

Page({
  data: {
    userId: '',
    userdata: [],
    whiteIntegral: 0,
    alipaybuttontype: 'default',
    weixinbuttontype: 'default',
    ylhbuttontype: 'default',
    inputvalue: 0,
    money: 0,
    withdrawtype: '支付宝',
    ylhPhone: '',
    ylhId: ''
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
        console.log(res.data)
        that.getintegral()
      }
    })
    that.onclickalipay();
  },
  getintegral: function() {
    var that = this;
    console.log(that.data.userId)
    wx.request({
      url: app.globalData.dataurl + '/integral/total?userId=' + that.data.userId,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            whiteIntegral: res.data.result.whiteIntegral,
            userdata: res.data.result,
            ylhId: res.data.result.ylhId,
            ylhPhone: res.data.result.ylhPhone
          });
        }
      }
    })
  },
  onclicktotal: function() {
    var that = this;
    var integral = that.data.whiteIntegral;
    var money = that.data.money;
    if (integral < 3500) {
      wx.showModal({
        title: '云云实惠购提示您',
        showCancel: false,
        confirmText: '我知道了',
        content: '您的积分少于3500积分哦',
      })
    } else {
      var totalintertal = integral - (integral % 700)
      that.setData({
        inputvalue: totalintertal,
        money: totalintertal / 700
      })
    }
    console.log(totalintertal)
  },
  inputfocus: function(e) {
    var that = this;
    let moneyNum = e.detail.value;
    var integral = that.data.whiteIntegral;
    if (integral < 3500) {
      wx.showModal({
        title: '云云实惠购提示您',
        showCancel: false,
        confirmText: '我知道了',
        content: '您的积分少于3500积分哦',
      })
    } else if (moneyNum > integral) {
      wx.showModal({
        title: '云云实惠购提示您',
        showCancel: false,
        confirmText: '我知道了',
        content: '您输入的积分少于可提现积分余额哦',
        success: function(res) {
          if (res.confirm) {
            that.setData({
              inputvalue: 0,
              money: 0
            })
          }
        }
      })
    } else {
      that.setData({
        money: (moneyNum - (moneyNum % 700)) / 700
      })
    }
  },
  onclickalipay: function() {
    var that = this;
    that.setData({
      alipaybuttontype: 'primary',
      weixinbuttontype: 'default',
      ylhbuttontype: 'default',
      withdrawtype: '支付宝'
    })
    // console.log(that.data.withdrawtype)
  },
  onclickweixin: function() {
    var that = this;
    that.setData({
      alipaybuttontype: 'default',
      weixinbuttontype: 'primary',
      ylhbuttontype: 'default',
      withdrawtype: '微信钱包'
    })
    // console.log(that.data.withdrawtype)

  },
  onclickylh: function() {
    var that = this;
    that.setData({
      alipaybuttontype: 'default',
      weixinbuttontype: 'default',
      ylhbuttontype: 'primary',
      withdrawtype: '云联账户'
    })
    // console.log(that.data.withdrawtype)
  },
  //申请提现
  onclickcash: function() {
    var cashtype = this.data.withdrawtype
    if (cashtype == '支付宝') {
      this.alipaycash();
    } else if (cashtype == '微信钱包') {
      this.weixincash();
    } else {
      this.ylhcash()
    }
    // console.log(cashtype)
  },
  alipaycash: function() {
    var that = this;
    //integral/extract/alipay?userId=790714&integral=2000
    wx.request({
      url: app.globalData.dataurl + '/integral/extract/alipay?userId=' + that.data.userId + '&integral=' + that.data.inputvalue,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showModal({
              title: '云云实惠购提示您',
              showCancel: false,
              confirmText: '我知道了',
              content: res.data.message,
            })
            that.getintegral();
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
  },
  weixincash: function() {
    var that = this;
    //integral/extract/alipay?userId=790714&integral=2000
    wx.request({
      url: app.globalData.dataurl + '/integral/extract/wechat?userId=' + that.data.userId + '&integral=' + that.data.inputvalue,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showModal({
              title: '云云实惠购提示您',
              showCancel: false,
              confirmText: '我知道了',
              content: res.data.message,
            })
            that.getintegral();

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
  },
  ylhcash: function() {
    var that = this;
    //http://shg.yuf2.cn:8080/shg-api/api/integral/submit_extract?userId=790714&integral=2000&ylhId=11&ylhPhone=11
    wx.request({
      url: app.globalData.dataurl + '/integral/submit_extract?userId=' + that.data.userId + '&integral=' + that.data.inputvalue + '&ylhId=' + that.data.ylhId + '&ylhPhone=' + that.data.ylhPhone,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            wx.showModal({
              title: '云云实惠购提示您',
              showCancel: false,
              confirmText: '我知道了',
              content: res.data.message,
            })
            that.getintegral();
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
  },
  onclickcashrecord: function() {
    wx.navigateTo({
      url: '../cashrecord/cashrecord'
    })
  }
})