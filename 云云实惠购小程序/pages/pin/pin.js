//index.js
//导入js  
//获取应用实例
const app = getApp()

Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    jinxuandata: [],
    shuiguodata: [],
    muyingdata: [],
    meizhuangdata: [],
    fushidata: [],
    baihuodata: [],
    xiebaodata: [],
    meishidata: [],
    dianqidata: [],
    jiafangdata: [],
    page: 1,
    shuiguopage: 1,
    muyingpage: 1,
    meizhuangpage: 1,
    fushipage: 1,
    baihuopage: 1,
    xiebaopage: 1,
    meishipage: 1,
    dianqipage: 1,
    jiafangpage: 1,
    isHideLoadMore: false,
    hasRefesh: false,
    hidden: false,
    sercherStorage: [],
    inputValue: "", //搜索框输入的值  
    StorageFlag: false, //显示搜索记录标志位
  },
  onLoad: function() {
    var that = this;
    //  获取系统信息 
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.onclikjinxuan();
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '【@我】快来使用云云实惠购',
      path: '/pages/login/login',
      imageUrl: '/pages/images/icon_logo.png'
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
      that.onclikjinxuan();
    } else if (tabindexs == 1) {
      that.onclikshuiguo();
    } else if (tabindexs == 2) {
      that.onclikmeishi();
    } else if (tabindexs == 3) {
      that.onclikfushi();
    } else if (tabindexs == 4) {
      that.onclikmuying();
    } else if (tabindexs == 5) {
      that.onclikbaihuo();
    } else if (tabindexs == 6) {
      that.onclikmeizhuang();
    } else if (tabindexs == 7) {
      that.onclikxiebao();
    } else if (tabindexs == 8) {
      that.onclikdianqi();
    } else if (tabindexs == 9) {
      that.onclikjiafang();
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
        that.onclikjinxuan();
      } else if (tabindex == 1) {
        that.onclikshuiguo();
      } else if (tabindex == 2) {
        that.onclikmeishi();
      } else if (tabindex == 3) {
        that.onclikfushi();
      } else if (tabindex == 4) {
        that.onclikmuying();
      } else if (tabindex == 5) {
        that.onclikbaihuo();
      } else if (tabindex == 6) {
        that.onclikmeizhuang();
      } else if (tabindex == 7) {
        that.onclikxiebao();
      } else if (tabindex == 8) {
        that.onclikdianqi();
      } else if (tabindex == 9) {
        that.onclikjiafang();
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
  //精选商品
  onclikjinxuan: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          // console.log(res.data)
          // console.log(res.data.result)
          // console.log(res.data.result.length)
          var PIC = res.data.result;
          that.setData({
            jinxuandata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //精选商品上拉加载更多
  jinxuanloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          page: ++that.data.page,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              jinxuandata: that.data.jinxuandata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          console.log(that.data.page)
        }
      })
    }, 1000)
  },
  //精选商品下拉刷新
  jinxuanrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        // console.log(res.data);
        if (res.statusCode == 200) {
          // console.log(res.data)
          // console.log(res.data.result)
          // console.log(res.data.result.length)
          var PIC = res.data.result;
          that.setData({
            jinxuandata: PIC,
            page: 1,
            hasRefesh: false,
            hidden: true,
          });
          // console.log(that.data.page)
          // console.log(PIC)
        }
      }
    })
  },
  //水果商品
  onclikshuiguo: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 13,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            shuiguodata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //水果商品上拉加载更多
  shuiguoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 13,
          page: ++that.data.shuiguopage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              shuiguodata: that.data.shuiguodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
          // console.log(that.data.page)
        }
      })
    }, 1000)
  },
  //水果商品下拉刷新
  shuiguorefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 13,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            shuiguodata: PIC,
            page: 1,
            hasRefesh: false,
            hidden: true,
          });
          // console.log(that.data.page)
          // console.log(PIC)
        }
      }
    })
  },
  //美食商品
  onclikmeishi: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 1,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            meishidata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //美食商品上拉加载更多
  meishiloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 1,
          page: ++that.data.meishipage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              meishidata: that.data.meishidata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //美食商品下拉刷新
  meishirefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 1,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            meishidata: PIC,
            meishipage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //服饰商品
  onclikfushi: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 14,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            fushidata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //服饰商品上拉加载更多
  fushiloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 14,
          page: ++that.data.fushipage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              fushidata: that.data.fushidata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //服饰商品下拉刷新
  fushirefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 14,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            fushidata: PIC,
            fushipage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //母婴商品
  onclikmuying: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 4,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            muyingdata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //母婴商品上拉加载更多
  muyingloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 4,
          page: ++that.data.muyingpage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              muyingdata: that.data.muyingdata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //母婴商品下拉刷新
  muyingrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 4,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            muyingdata: PIC,
            muyingpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //百货商品
  onclikbaihuo: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 15,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            baihuodata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //百货商品上拉加载更多
  baihuoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 15,
          page: ++that.data.baihuopage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              baihuodata: that.data.baihuodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //百货商品下拉刷新
  baihuorefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 15,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            baihuodata: PIC,
            baihuopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //美妆商品
  onclikmeizhuang: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 16,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            meizhuangdata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //美妆商品上拉加载更多
  meizhuangloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 16,
          page: ++that.data.meizhuangpage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              meizhuangdata: that.data.meizhuangdata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //美妆商品下拉刷新
  meizhuangrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 16,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            meizhuangdata: PIC,
            meizhuangpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //鞋包商品
  onclikxiebao: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 1281,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            xiebaodata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //鞋包商品上拉加载更多
  xiebaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 1281,
          page: ++that.data.xiebaopage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              xiebaodata: that.data.xiebaodata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //鞋包商品下拉刷新
  xiebaorefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 1281,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            xiebaodata: PIC,
            xiebaopage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //电器商品
  onclikdianqi: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 18,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            dianqidata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //电器商品上拉加载更多
  dianqiloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 18,
          page: ++that.data.dianqipage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              dianqidata: that.data.dianqidata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //电器商品下拉刷新
  dianqirefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 18,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            dianqidata: PIC,
            dianqipage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //家纺商品
  onclikjiafang: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 818,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            jiafangdata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //家纺商品上拉加载更多
  jiafangloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.pinduoduogoodurl,
        data: {
          categoryId: 818,
          page: ++that.data.jiafangpage,
          pageSize: 10,
          sortType: 0,
          withCoupon: false
        },
        method: 'GET',
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              jiafangdata: that.data.jiafangdata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //家纺商品下拉刷新
  jiafangrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    wx.request({
      url: app.globalData.pinduoduogoodurl,
      data: {
        categoryId: 818,
        page: 1,
        pageSize: 10,
        sortType: 0,
        withCoupon: false
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            jiafangdata: PIC,
            jiafangpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //获取输入框的输入信息
  bindInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.openLocationsercher();
  },
  //清除输入框数据
  clearInput: function() {
    this.setData({
      inputValue: ""
    })
  },
  //清楚缓存历史并关闭历史搜索框
  clearSearchStorage: function() {
    wx.removeStorageSync('searchData')
    this.setData({
      sercherStorage: [],
      StorageFlag: false,
    })
  },
  //点击缓存搜索列表
  tapSercherStorage: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.id);
    for (var j = 0; j < that.data.sercherStorage.length; j++) {
      if (j == index) {
        //将所选的搜索历史加到搜素框
        this.setData({
          inputValue: that.data.sercherStorage[j].name,
          StorageFlag: false,
        })
      }
    }
    if (this.data.inputValue != '') {
      //请求搜索记录
    }

  },
  //打开历史记录列表
  openLocationsercher: function(e) {
    this.setData({
      sercherStorage: wx.getStorageSync('searchData') || [], //调用API从本地缓存中获取数据
      StorageFlag: true,
      listFlag: true,
    })
  },
  //添加搜索记录并搜索
  setSearchStorage: function() {
    //let data;
    var that = this;
    //let localStorageValue = [];
    if (this.data.inputValue.trim() != '') {
      //将搜索记录更新到缓存
      var searchData = that.data.sercherStorage;
      // 如果搜索记录里面有重复的，要做删除操作
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i] == this.data.inputValue.trim()) {
          searchData.splice(i, 1);
          break;
        }
        // console.log(searchData.length)
      }
      // 如果超过8条搜索记录的话，删掉最旧的一条
      if (searchData.length >= 5) searchData.pop();
      // // console.log(searchData)
      searchData.push({
        id: searchData.length,
        name: that.data.inputValue
      })
      wx.setStorageSync('searchData', searchData);
      that.setData({
        StorageFlag: false,
      })
    }
    // console.log(that.data.inputValue)
    if (that.data.inputValue.trim() == '' || that.data.inputValue.trim() == null) {
      wx.showToast({
        title: '商品为空哦',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    } else {
      wx.navigateTo({
        url: '../pinsearch/pinsearch?keyword=' + that.data.inputValue.trim()
      })
      wx.showToast({
        title: '正在搜索中',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
  },
})