//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: "", //搜索框输入的值  
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    isHideLoadMore: false,
    hasRefesh: false,
    hidden: false,
    zhinengtuijiandata: [],
    jianglizuigaodata: [],
    youhuizuidadata: [],
    xiaoliangzuigaodata: [],
    zhinengtuijianpage: 1,
    jianglizuigaopage: 1,
    youhuizuidapage: 1,
    xiaoliangzuigaopage: 1
  },
  //获取输入框的输入信息
  bindInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //清楚输入框数据
  clearInput: function() {
    this.setData({
      inputValue: ""
    })
  },
  //搜索
  setSearchStorage: function() {
    //let data;
    var that = this;
    console.log(that.data.currentTab)
    if (that.data.currentTab == 0) {
      that.zhinengtuijiansearch();
    } else if (that.data.currentTab == 1) {
      that.jianglizuigaosearch();
    } else if (that.data.currentTab == 2) {
      that.youhuizuidasearch();
    } else if (that.data.currentTab == 3) {
      that.xiaoliangzuigaosearch();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    var keyword = options.keyword;
    that.setData({
      inputValue: keyword
    })
    that.zhinengtuijiansearch();
    // console.log(keyword)
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '【@我】快来使用云云实惠购',
      path: '/pages/login/login',
      imageUrl: ''
    }
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
      that.zhinengtuijiansearch();
    } else if (tabindexs == 1) {
      that.jianglizuigaosearch();
    } else if (tabindexs == 2) {
      that.youhuizuidasearch();
    } else if (tabindexs == 3) {
      that.xiaoliangzuigaosearch();
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
        that.zhinengtuijiansearch();
      } else if (tabindex == 1) {
        that.jianglizuigaosearch();
      } else if (tabindex == 2) {
        that.youhuizuidasearch();
      } else if (tabindex == 3) {
        that.xiaoliangzuigaosearch();
      }
    }
  },
  //点击跳转到商品详情
  bindViewTap: function(e) {
    var productId = e.currentTarget.dataset.id;
    // console.log(productId);
    // console.log(that.data.banner)
    wx.navigateTo({
      url: '../pinpagedetail/pinpagedetail?productId=' + productId
    });
    // console.log(productId)
  },
  //智能推荐
  zhinengtuijiansearch: function(e) {
    var that = this;
    //请求搜索
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
        if (res.data.result.length < 10) {
          that.setData({
            nulldata: true
          })
        }
        that.setData({
          zhinengtuijiandata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //智能推荐商品上拉加载更多
  zhinengtuijianloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          keyword: that.data.inputValue.trim(),
          page: ++that.data.zhinengtuijianpage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        header: {},
        method: 'GET',
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            if (res.data.result == '') {
              that.setData({
                nulldata: true
              })
            }
            // console.log(res.data.result)
            that.setData({
              zhinengtuijiandata: that.data.zhinengtuijiandata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.zhinengtuijianpage)
        }
      })
    }, 1000)
  },
  //智能推荐商品下拉刷新
  zhinengtuijianrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          // console.log(res.data)
          // console.log(res.data.result)
          // console.log(res.data.result.length)
          var PIC = res.data.result;
          that.setData({
            zhinengtuijiandata: PIC,
            zhinengtuijianpage: 1,
            hasRefesh: false,
            hidden: true,
          });
          // console.log(that.data.page)
          // console.log(PIC)
        }
      }
    })
  },
  //奖励最高
  jianglizuigaosearch: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 2,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
        if (res.data.result.length < 9) {
          that.setData({
            jianglizuigaonulldata: true
          })
        }
        that.setData({
          jianglizuigaodata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //奖励最高商品上拉加载更多
  jianglizuigaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          keyword: that.data.inputValue.trim(),
          page: ++that.data.jianglizuigaopage,
          pageSize: 10,
          sortType: 2,
          withCoupon: false
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            if (res.data.result == '') {
              that.setData({
                jianglizuigaonulldata: true
              })
            }
            // console.log(res.data.result)
            that.setData({
              jianglizuigaodata: that.data.jianglizuigaodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.jianglizuigaopage)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },
  //奖励最高商品下拉刷新
  jianglizuigaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 2,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            jianglizuigaodata: PIC,
            jianglizuigaopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //优惠最大
  youhuizuidasearch: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 8,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
        if (res.data.result.length < 9) {
          that.setData({
            youhuizuidanulldata: true
          })
        }
        that.setData({
          youhuizuidadata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //优惠最大商品上拉加载更多
  youhuizuidaloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          keyword: that.data.inputValue.trim(),
          page: ++that.data.youhuizuidapage,
          pageSize: 10,
          sortType: 8,
          withCoupon: false
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            if (res.data.result == '') {
              that.setData({
                youhuizuidanulldata: true
              })
            }
            // console.log(res.data.result)
            that.setData({
              youhuizuidadata: that.data.youhuizuidadata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.youhuizuidapage)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },
  //优惠最大商品下拉刷新
  youhuizuidarefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 8,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            youhuizuidadata: PIC,
            youhuizuidapage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //销量最高
  xiaoliangzuigaosearch: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 6,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
        if (res.data.result.length < 9) {
          that.setData({
            xiaoliangzuigaonulldata: true
          })
        }
        that.setData({
          xiaoliangzuigaodata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //销量最高商品上拉加载更多
  xiaoliangzuigaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          keyword: that.data.inputValue.trim(),
          page: ++that.data.xiaoliangzuigaopage,
          pageSize: 10,
          sortType: 6,
          withCoupon: false
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            if (res.data.result == '') {
              that.setData({
                xiaoliangzuigaonulldata: true
              })
            }
            that.setData({
              xiaoliangzuigaodata: that.data.xiaoliangzuigaodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.xiaoliangzuigaopage)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },
  //销量最高商品下拉刷新
  xiaoliangzuigaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        keyword: that.data.inputValue.trim(),
        page: 1,
        pageSize: 10,
        sortType: 6,
        withCoupon: false
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            xiaoliangzuigaodata: PIC,
            xiaoliangzuigaopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
})