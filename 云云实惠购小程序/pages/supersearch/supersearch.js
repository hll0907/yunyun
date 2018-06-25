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
    tianmaodata: [],
    zhinengtuijianpage: 1,
    jianglizuigaopage: 1,
    youhuizuidapage: 1,
    xiaoliangzuigaopage: 1,
    tianmaopage: 1
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
    } else if (that.data.currentTab == 4) {
      that.tianmaosearch();
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
    } else if (tabindexs == 4) {
      that.tianmaosearch();
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
      } else if (tabindex == 4) {
        that.tianmaosearch();
      }
    }
  },
  //点击跳转到商品详情
  bindViewTap: function(e) {
    var productId = e.currentTarget.dataset.id;
    // var title = e.currentTarget.dataset.title;
    let str = JSON.stringify(e.currentTarget.dataset.item);
    let item = encodeURIComponent(str)
    console.log(item)
    wx.navigateTo({
      url: '../superpagedetail/superpagedetail?productId=' + productId + "&item=" + item
    });
    // console.log(productId)
  },
  //综合排序
  zhinengtuijiansearch: function(e) {
    var that = this;
    //请求搜索http://shg.yuf2.cn:8080/shg-api/api/product/super-search?platform=1&pageNo=1&pageSize=20&sort=tk_rate_des&q=%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim()
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
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
  //综合排序商品上拉加载更多
  zhinengtuijianloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
        data: {
          pageNo: ++that.data.zhinengtuijianpage,
          pageSize: 10,
          sort: 'tk_rate_des',
          q: that.data.inputValue.trim()
        },
        header: {},
        method: 'GET',
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
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
  //综合排序商品下拉刷新
  zhinengtuijianrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim()
      },
      header: {},
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            zhinengtuijiandata: PIC,
            zhinengtuijianpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //销量最高
  jianglizuigaosearch: function(e) {
    var that = this;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'total_sales_des',
        q: that.data.inputValue.trim()
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
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
  //销量最高商品上拉加载更多
  jianglizuigaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
        data: {
          pageNo: ++that.data.jianglizuigaopage,
          pageSize: 10,
          sort: 'total_sales_des',
          q: that.data.inputValue.trim()
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
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
  //销量最高商品下拉刷新
  jianglizuigaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'total_sales_des',
        q: that.data.inputValue.trim()
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
  //仅看有券
  youhuizuidasearch: function(e) {
    var that = this;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isCoupon: true
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
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
  //仅看有券商品上拉加载更多
  youhuizuidaloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
        data: {
          pageNo: ++that.data.youhuizuidapage,
          pageSize: 10,
          sort: 'tk_rate_des',
          q: that.data.inputValue.trim(),
          isCoupon: true
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
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
  //仅看有券商品下拉刷新
  youhuizuidarefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isCoupon: true
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
  //海外商品
  xiaoliangzuigaosearch: function(e) {
    var that = this;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isOverseas: true
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
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
  //海外商品上拉加载更多
  xiaoliangzuigaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
        data: {
          pageNo: ++that.data.xiaoliangzuigaopage,
          pageSize: 10,
          sort: 'tk_rate_des',
          q: that.data.inputValue.trim(),
          isOverseas: true
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            // console.log(res.data.result)
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
  //海外商品下拉刷新
  xiaoliangzuigaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isOverseas: true
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
  //天猫优先
  tianmaosearch: function(e) {
    var that = this;
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isTmall: true
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        // console.log(res)
        that.setData({
          tianmaodata: res.data.result,
          hidden: true
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },
  //天猫优先上拉加载更多
  tianmaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
        data: {
          pageNo: ++that.data.tianmaopage,
          pageSize: 10,
          sort: 'tk_rate_des',
          q: that.data.inputValue.trim(),
          isTmall: true
        },
        header: {},
        method: 'GET',
        dataType: '',
        success: function(res) {
          // console.log(res)
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              tianmaodata: that.data.tianmaodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.tianmaopage)
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }, 1000)
  },
  //天猫优先下拉刷新
  tianmaorefesh: function() {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: 'http://shg.yuf2.cn/shg-api/api/product/super-search?platform=2',
      data: {
        pageNo: 1,
        pageSize: 10,
        sort: 'tk_rate_des',
        q: that.data.inputValue.trim(),
        isTmall: true
      },
      header: {},
      method: 'GET',
      dataType: '',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            tianmaodata: PIC,
            tianmaopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
})