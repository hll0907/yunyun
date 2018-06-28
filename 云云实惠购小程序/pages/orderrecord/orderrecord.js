const app = getApp()
Page({
  data: {
    userId:0,
    totalintegralrecorddata: [],
    orderintegralrecorddata: [],
    profitintegralrecorddata: [],
    cashintegralrecorddata:[],
    totalintegralrecordpage: 1,
    orderintegralrecordpage: 1,
    profitintegralrecordpage: 1,
    cashintegralrecordpage: 1,
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,

  },
  onLoad: function() {
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
    //  获取系统信息 
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.totalintegral()
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
      that.totalintegral();
    } else if (tabindexs == 1) {
      that.orderintegral();
    } else if (tabindexs == 2) {
      that.profitintegral();
    } else if (tabindexs == 3) {
      that.cashintegral();
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
        that.totalintegral();
      } else if (tabindex == 1) {
        that.orderintegral();
      } else if (tabindex == 2) {
        that.profitintegral();
      } else if (tabindex == 3) {
        that.cashintegral();
      }
    }
  },
  //待确认收货
  totalintegral: function() {
    var that = this;
    wx.request({
      url: app.globalData.dataurl + '/order/list',
      data: {
        userId: that.data.userId,
        status: 1,
        page: 1
      },
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.result.list);
        if (res.statusCode == 200) {
          that.setData({
            totalintegralrecorddata: res.data.result,
          });
        }
      }
    })
  },
  //待确认收货上拉加载更多
  totalintegralrecordFloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/order/list',
        data: {
          userId: that.data.userId,
          status: 2,
          page: ++that.data.totalintegralrecordpage
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result.list)
            that.setData({
              totalintegralrecorddata: that.data.totalintegralrecorddata.concat(res.data.result),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  },
  //待奖励
  orderintegral: function() {
    var that = this;
    //http://shg.yuf2.cn:8080/shg-api/api/integral/records?userId=790714&type=0&page=1
    wx.request({
      url: app.globalData.dataurl + '/order/list',
      data: {
        userId: that.data.userId,
        status: 2,
        page: 1
      },
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.result.list);
        if (res.statusCode == 200) {
          that.setData({
            orderintegralrecorddata: res.data.result,
          });
        }
      }
    })
  },
  //待奖励上拉加载更多
  orderintegralrecordFloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/order/list',
        data: {
          userId: that.data.userId,
          status: 1,
          page: ++that.data.orderintegralrecordpage
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result.list)
            that.setData({
              orderintegralrecorddata: that.data.orderintegralrecorddata.concat(res.data.result),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  },
  //已奖励
  profitintegral: function() {
    var that = this;
    //http://shg.yuf2.cn:8080/shg-api/api/integral/records?userId=790714&type=0&page=1
    wx.request({
      url: app.globalData.dataurl + '/order/list',
      data: {
        userId: that.data.userId,
        status: 3,
        page: 1
      },
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.result);
        if (res.statusCode == 200) {
          that.setData({
            profitintegralrecorddata: res.data.result,
          });
        }
      }
    })
  },
  //已奖励上拉加载更多
  profitintegralrecordFloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/order/list',
        data: {
          userId: that.data.userId,
          status: 3,
          page: ++that.data.profitintegralrecordpage
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result.list)
            that.setData({
              profitintegralrecorddata: that.data.profitintegralrecorddata.concat(res.data.result),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  },
  //已失效
  cashintegral: function () {
    var that = this;
    //http://shg.yuf2.cn:8080/shg-api/api/integral/records?userId=790714&type=0&page=1
    wx.request({
      url: app.globalData.dataurl + '/order/list',
      data: {
        userId: that.data.userId,
        status: 4,
        page: 1
      },
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.result.list);
        if (res.statusCode == 200) {
          that.setData({
           cashintegralrecorddata: res.data.result,
          });
        }
      }
    })
  },
  //已失效上拉加载更多
  cashintegralrecordFloadMore: function (e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/order/list',
        data: {
          userId: that.data.userId,
          status: 4,
          page: ++that.data.cashintegralrecordpage
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result.list)
            that.setData({
              cashintegralrecorddata: that.data.cashintegralrecorddata.concat(res.data.result),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  },
})