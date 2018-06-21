const app = getApp()

Page({
  data: {
    swiperCurrent: 0,
    detail: [],
    imagesdata: [],
    detailImagesdata: [],
    productIds: '',
    islike: false,
    userId: 790714,
    couponUrls: '',
    convert_urls: '',
    shopname: '',
    logoUrls: ''
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      detail: options,
      // productIds: res.data.result.productId,
      // couponUrls: res.data.result.couponUrl,
      // shopname: res.data.result.title,
      // logoUrls: res.data.result.mainPic
    });
    wx.request({
      url: 'http://shg.yuf2.cn:8080/shg-api/api/product/images?productId=' + productIds,
      method: 'GET',
      success: function (res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          that.setData({
            imagesdata: res.data.result.images,
            detailImagesdata: res.data.result.detailImages,
          });
        }
      }
    })

  },
  showtip: function (e) {
    wx.showModal({
      title: '购物须知',
      showCancel: false,
      confirmText: '我知道了',
      content: '1、购买下单付款在淘宝，产品问题请咨询淘宝商家\r\n 2、付款后，请到个人中心提交订单，提交订单成功并确认收货，等待系统奖励积分\r\n 3、付款时请勿使用红包支付，使用红包支付会导致订单提交不成功，积分无法奖励\r\n 4、通过系统直接下单，请勿使用其他平台或商家给你的连接下单，会导致无法获得积分奖励\r\n 5、系统提示的奖励是购买一件的积分奖励，多买多奖\r\n',
    })
  },
  onclickaddLike: function (e) {
    var that = this;
    var productId = that.data.productIds;
    // console.log(productId);
    // console.log(that.data.userId);
    wx.request({
      url: 'http://shg.yuf2.cn:8080/shg-api/api/product/collect?userId=' + that.data.userId + '&productId=' + productId,
      method: 'POST',
      success: function (res) {
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
  onclickdelLike: function (e) {
    var that = this;
    var productId = that.data.productIds;
    // console.log(productId);
    wx.request({
      url: 'http://shg.yuf2.cn:8080/shg-api/api/product/uncollect?userId=' + that.data.userId + '&productIds=' + productId,
      method: 'POST',
      success: function (res) {
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
          // console.log(res.data)
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
  onclickBuy: function (e) {
    var that = this;
    that.onclickconvert_url();
    that.onclickconvert_url();

  },
  onclickconvert_url: function (e) {
    var that = this;
    var couponUrl = that.data.couponUrls;
    var productId = that.data.productIds;
    // console.log(couponUrl);
    wx.request({
      url: 'http://shg.yuf2.cn:8080/shg-api/api/product/convert_url?productId=' + productId + '&couponUrl=' + couponUrl,
      method: 'POST',
      success: function (res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          that.setData({
            convert_urls: res.data.result,
          })
          that.maketaobaocommand();
          // console.log(that.data.convert_urls)
        }
      }
    })
  },
  maketaobaocommand: function (e) {
    var that = this;
    var shopname = that.data.shopname;
    var logoUrl = that.data.logoUrls;
    var convert_url = that.data.convert_urls;
    wx.request({
      url: 'http://shg.yuf2.cn:8080/shg-api/api/product/tpwd?text=' + shopname + '&url=' + convert_url + '&logoUrl=' + logoUrl,
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          if (res.data.code == 1) {
            wx.setClipboardData({
              data: res.data.result,
              success: function (res) {
                wx.showToast({
                  title: '淘口令复制成功',
                  icon: 'succes',
                  duration: 0,
                  mask: true
                })
                wx.showModal({
                  title: '云云实惠购提示您',
                  content: '淘口令已复制成功，打开手机淘宝去购买',
                  showCancel: false,
                  confirmText: '去购买',
                  confirmColor: 'red',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('确定')
                    }
                  }
                })
              }
            });
          } else {
            wx.showToast({
              title: '淘口令复制失败',
              icon: 'succes',
              duration: 0,
              mask: true
            })
            wx.showModal({
              title: '云云实惠购提示您',
              content: '淘口令复制失败,请点击确定重新生成',
              showCancel: false,
              confirmText: '点击刷新',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定')
                  that.onclickBuy();
                }
              }
            })
          }
        }
      }
    })
  }
})