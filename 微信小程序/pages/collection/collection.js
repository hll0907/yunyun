//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    isHideLoadMore: false,
    hasRefesh: false,
    hidden: false,
    taobaodata: [],
    taobaopage: 1,
    pinduoduodata: [],
    pinduoduopage: 1
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.taobaocollection();
  },
  onShow: function () {
    this.taobaocollection();
  },
  //  滑动切换tab 
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    var tabindexs = e.detail.current;
    // console.log(tabindexs);
    if (tabindexs == 0) {
      that.taobaocollection();
    } else if (tabindexs == 1) {
      that.pinduoduocollection();
    }
  },
  // 点击tab切换 
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      var tabindex = e.target.dataset.current;
      // console.log(tabindex);
      if (tabindex == 0) {
        that.taobaocollection();
      } else if (tabindex == 1) {
        that.pinduoduocollection();
      }
    }
  },
  //淘宝收藏商品
  taobaocollection: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.taobaocollectionurl,
      data: {
        userId: app.globalData.userId,
        page: 1,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: '',
      success: function(res) {
        // console.log(res)
        that.setData({
          taobaodata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //淘宝收藏商品上拉加载更多
  taobaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.taobaocollectionurl,
        data: {
          userId: app.globalData.userId,
          page: ++that.data.taobaopage,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              taobaodata: that.data.taobaodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.taobaopage)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },
  //淘宝收藏商品下拉刷新
  taobaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.taobaocollectionurl,
      data: {
        userId: app.globalData.userId,
        page: 1,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: '',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            taobaodata: PIC,
            taobaopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //收藏商品点击跳转到商品详情
  bindViewTap: function (e) {
    var productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../pagedetail/pagedetail?productId=' + productId
    });
  },
  bindgooddel:function(e){
    var productId = e.currentTarget.dataset.id;
    // console.log(productId)
    var that = this;
    wx.request({
      url: app.globalData.taobaodelcollectionurl,
      data: {
        userId: app.globalData.userId,
        productIds: productId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: '',
      success: function (res) {
        // console.log(res)
        wx.showToast({
          title: res.data.message,
          icon: 'succes',
          duration: 2000,
          mask: true
        })
        that.taobaocollection();
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },
  pinduoduocollection:function(){
    console.log("拼多多商品收藏")
  }
})