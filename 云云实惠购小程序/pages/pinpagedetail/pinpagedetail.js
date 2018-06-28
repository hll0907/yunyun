const app = getApp()

Page({
  data: {
    swiperCurrent: 0,
    detail: [],
    imagesdata: [],
    productId: '',
    islike: false,
    userId: '',
    couponUrls: '',
    convert_urls: '',
    shopname: '',
    logoUrls: '',
    normalUrl: '',
    groupUrl: '',
    cantuanUrl: false,
    pintuanUrl: false
  },
  //轮播图的切换事件  
  swiperChange: function(e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  onLoad: function(options) {
    var productIds = options.productId;
    // console.log(productIds)
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        })
        console.log(res.data)
      }
    })
    wx.request({
      url: 'https://shg.yuf2.cn/shg-api/api/product/detail?productId=' + productIds + '&type=2',
      method: 'GET',
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          // console.log(res)
          // console.log(res.data.result)
          if (res.data.code == 1) {
            that.setData({
              detail: res.data.result,
              imagesdata: res.data.result.images,
              productId: res.data.result.productId
            });
          } else {
            wx.showToast({
              title: '商品已下架',
              icon: 'loading',
              duration: 2000,
              mask: true
            })
          }
        }
      }
    });
  },
  showtip: function(e) {
    wx.showModal({
      title: '购物须知',
      showCancel: false,
      confirmText: '我知道了',
      content: '1、该奖励为约奖，指通过优惠价购买一件商品的积分奖励，多买多得（根据实际付款金额），实际到帐积分有上下微小浮动属于正常现象。\r\n 2、必须通过系统进入直接拼团付款才有奖励，进入后先收藏，再通过拼多多收藏下单是无奖励的，如需收藏，请使用系统的收藏夹。',
    })
  },
  onclickaddLike: function(e) {
    var that = this;
    var productId = that.data.productId;
    console.log(productId);
    // console.log(that.data.userId);
    wx.request({
      url: 'https://shg.yuf2.cn/shg-api/api/product/collect?userId=' + that.data.userId + '&productId=' + productId + '&type=2',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            islike: true,
          })
          wx.showToast({
            title: res.data.message,
            icon: 'succes',
            duration: 2000,
            mask: true
          })
          // console.log(res.data)
        } else {
          that.setData({
            islike: false,
          })
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
            mask: true
          })
        }
      },
    })
  },
  onclickdelLike: function(e) {
    var that = this;
    var productId = that.data.productId;
    // console.log(productId);
    wx.request({
      url: 'https://shg.yuf2.cn/shg-api/api/product/uncollect?userId=' + that.data.userId + '&productIds=' + productId + '&type=2',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            islike: false,
          })
          wx.showToast({
            title: res.data.message,
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        } else {
          that.setData({
            islike: true,
          })
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
            mask: true
          })
          // console.log(res.data)
        }
      },
    })
  },
  onclicknormalUrl: function(e) {
    var that = this;
    var normalUrl = that.data.normalUrl;
    if (normalUrl == '') {
      that.convertUrl();
    } else {
      wx.navigateTo({
        url: '../pinCouponUrl/pinCouponUrl?CouponUrl=' + normalUrl
      });
    }

    // console.log(that.data.normalUrl)
  },
  onclickgroupUrl: function(e) {
    var that = this;
    var groupUrl = that.data.groupUrl;
    if (groupUrl == '') {
      that.convertUrl2();
    } else {
      wx.navigateTo({
        url: '../pinCouponUrl/pinCouponUrl?CouponUrl=' + groupUrl
      });
    }
  },
  convertUrl: function(e) {
    var that = this;
    var productIds = that.data.productId;
    console.log(productIds)
    wx.request({
      url: 'https://shg.yuf2.cn/shg-api/api/product/pdd-convert-url?productId=' + productIds + '&userId=' + that.data.userId,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        // console.log(res.data.result)
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            that.setData({
              normalUrl: res.data.result.normalShortUrl,
            });
            wx.navigateTo({
              url: '../pinCouponUrl/pinCouponUrl?CouponUrl=' + that.data.normalUrl
            });

          } else {
            wx.showToast({
              title: '失败了哦',
              icon: 'loading',
              duration: 2000,
              mask: true
            })
          }
        }
        // console.log(that.data.normalUrl)
        // console.log(that.data.groupUrl)
      }
    });
  },
  convertUrl2: function(e) {
    var that = this;
    var productIds = that.data.productId;
    wx.request({
      url: 'https://shg.yuf2.cn/shg-api/api/product/pdd-convert-url?productId=' + productIds + '&userId=' + that.data.userId,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        // console.log(res.data.result)
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            that.setData({
              groupUrl: res.data.result.groupShortUrl
            });
            wx.navigateTo({
              url: '../pinCouponUrl/pinCouponUrl?CouponUrl=' + that.data.groupUrl
            });
          } else {
            wx.showToast({
              title: '失败了哦',
              icon: 'loading',
              duration: 2000,
              mask: true
            })
          }
        }
      }
    });
  }
})