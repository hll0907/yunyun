const app = getApp()

Page({
  data: {
    swiperCurrent: 0,
    detail: [],
    imagesdata: [],
    productIds: '',
    islike: false,
    userId: 790714,
    couponUrls: '',
    convert_urls: '',
    shopname: '',
    logoUrls: ''
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
              imagesdata: res.data.result.images
            });
          }else{
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

  },
  onclickdelLike: function(e) {
    var that = this;
  },
  onclickBuy: function(e) {
    var that = this;
    // that.onclickconvert_url();
    // that.onclickconvert_url();
  },
})