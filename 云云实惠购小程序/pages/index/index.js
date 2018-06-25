//index.js
//导入js  
var util = require('../../utils/util.js')
var banner = require('../../utils/banner.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    slider: [],
    swiperCurrent: 0,
    banner: [],
    url: '',
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    jinxuandata: [],
    jiadiandata: [],
    muyingdata: [],
    meizhuangdata: [],
    neiyidata: [],
    nanzhuangdata: [],
    nvzhuangdata: [],
    meishidata: [],
    jujiadata: [],
    xiebaodata: [],
    page: 1,
    jiadianpage: 1,
    muyingpage: 1,
    meizhuangpage: 1,
    neiyipage: 1,
    nanzhuangpage: 1,
    nvzhuangpage: 1,
    meishipage: 1,
    jujiapage: 1,
    xiebaopage: 1,
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
    //网络访问，获取轮播图的图片  
    // util.getRecommend(function(data) {
    //   that.setData({
    //     slider: data.data.slider
    //   })
    // });
    banner.getbanner(function(data) {
      that.setData({
        banner: data.result,
        url: data.result[0].url
      });
    });
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
  //轮播图点击跳转
  onclikUrl: function(event) {
    var that = this;
    // console.log(that.data.banner)
    wx.navigateTo({
      url: '../newview/newview?url=' + that.data.url
    });
    console.log(that.data.url)
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
      that.onclikjiadian();
    } else if (tabindexs == 2) {
      that.onclikmuying();
    } else if (tabindexs == 3) {
      that.onclikmeizhuang();
    } else if (tabindexs == 4) {
      that.onclikneiyi();
    } else if (tabindexs == 5) {
      that.oncliknanzhuang();
    } else if (tabindexs == 6) {
      that.oncliknvzhuang();
    } else if (tabindexs == 7) {
      that.onclikmeishi();
    } else if (tabindexs == 8) {
      that.onclikjujia();
    } else if (tabindexs == 9) {
      that.onclikxiebao();
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
        that.onclikjiadian();
      } else if (tabindex == 2) {
        that.onclikmuying();
      } else if (tabindex == 3) {
        that.onclikmeizhuang();
      } else if (tabindex == 4) {
        that.onclikneiyi();
      } else if (tabindex == 5) {
        that.oncliknanzhuang();
      } else if (tabindex == 6) {
        that.oncliknvzhuang();
      } else if (tabindex == 7) {
        that.onclikmeishi();
      } else if (tabindex == 8) {
        that.onclikjujia();
      } else if (tabindex == 9) {
        that.onclikxiebao();
      }
    }
  },
  //点击跳转到商品详情
  bindViewTap: function(e) {
    var productId = e.currentTarget.dataset.id;
    // console.log(productId);
    // console.log(that.data.banner)
    wx.navigateTo({
      url: '../pagedetail/pagedetail?productId=' + productId
    });
    // console.log(productId)
  },
  //精选商品
  onclikjinxuan: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'page=' + that.data.page + '&pageRows=' + pageRows + '&sortType=time',
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
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'page=' + (++that.data.page) + '&pageRows=' + pageRows + '&sortType=time',
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
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'page=1&pageRows=' + pageRows + '&sortType=time',
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
  //家电商品
  onclikjiadian: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=10&page=' + that.data.jiadianpage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            jiadiandata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //家电商品上拉加载更多
  jiadianloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=10&page=' + (++that.data.jiadianpage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              jiadiandata: that.data.jiadiandata.concat(res.data.result),
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
  //家电商品下拉刷新
  jiadianrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=10&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            jiadiandata: PIC,
            jiadianpage: 1,
            hasRefesh: false,
            hidden: true,
          });
          // console.log(that.data.page)
          // console.log(PIC)
        }
      }
    })
  },
  //母婴商品
  onclikmuying: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=4&page=' + that.data.muyingpage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=4&page=' + (++that.data.muyingpage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
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
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=4&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
  //美妆商品
  onclikmeizhuang: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=5&page=' + that.data.meizhuangpage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=5&page=' + (++that.data.meizhuangpage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
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
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=5&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
  //内衣商品
  onclikneiyi: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=3&page=' + that.data.neiyipage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            neiyidata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //内衣商品上拉加载更多
  neiyiloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=3&page=' + (++that.data.neiyipage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              neiyidata: that.data.neiyidata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //内衣商品下拉刷新
  neiyirefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=3&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            neiyidata: PIC,
            neiyipage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //男装商品
  oncliknanzhuang: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=2&page=' + that.data.nanzhuangpage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            nanzhuangdata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //男装商品上拉加载更多
  nanzhuangloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=2&page=' + (++that.data.nanzhuangpage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              nanzhuangdata: that.data.nanzhuangdata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //男装商品下拉刷新
  nanzhuangrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=2&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            nanzhuangdata: PIC,
            nanzhuangpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //女装商品
  oncliknvzhuang: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=1&page=' + that.data.nvzhuangpage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            nvzhuangdata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //女装商品上拉加载更多
  nvzhuangloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=1&page=' + (++that.data.nvzhuangpage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              nvzhuangdata: that.data.nvzhuangdata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //女装商品下拉刷新
  nvzhuangrefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=1&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            nvzhuangdata: PIC,
            nvzhuangpage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //美食商品
  onclikmeishi: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=8&page=' + that.data.meishipage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=8&page=' + (++that.data.meishipage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
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
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=8&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
  //居家商品
  onclikjujia: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=6&page=' + that.data.jujiapage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          // console.log(res.data.result)
          var PIC = res.data.result;
          that.setData({
            jujiadata: PIC,
            hidden: true
          });
        }
      }
    })
  },
  //居家商品上拉加载更多
  jujialoadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=6&page=' + (++that.data.jujiapage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
        success: function(res) {
          if (res.statusCode == 200) {
            that.setData({
              jujiadata: that.data.jujiadata.concat(res.data.result),
              isHideLoadMore: false,
              hidden: true,
              hasRefesh: false,
            });
          }
        }
      })
    }, 1000)
  },
  //居家商品下拉刷新
  jujiarefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=6&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
      success: function(res) {
        if (res.statusCode == 200) {
          var PIC = res.data.result;
          that.setData({
            jujiadata: PIC,
            jujiapage: 1,
            hasRefesh: false,
            hidden: true,
          });
        }
      }
    })
  },
  //鞋包配饰商品
  onclikxiebao: function(e) {
    var that = this;
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=7&page=' + that.data.xiebaopage + '&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
  //鞋包配饰商品上拉加载更多
  xiebaoloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      var pageRows = 10;
      wx.request({
        url: app.globalData.taobaogoodurl + 'tagId=7&page=' + (++that.data.xiebaopage) + '&pageRows=' + pageRows + '&sortType=time',
        method: 'GET',
        header: { 'content-Type': 'application/json' },
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
  //鞋包配饰商品下拉刷新
  xiebaorefesh: function(e) {
    // console.log('加载更多')
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var pageRows = 10;
    wx.request({
      url: app.globalData.taobaogoodurl + 'tagId=7&page=1&pageRows=' + pageRows + '&sortType=time',
      method: 'GET',
      header: { 'content-Type': 'application/json' },
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
        url: '../search/search?keyword=' + that.data.inputValue.trim()
      })
      wx.showToast({
        title: '正在搜索中',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
  },
  onclicksuperSearch: function() {
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
        url: '../supersearch/supersearch?keyword=' + that.data.inputValue.trim()
      })
      wx.showToast({
        title: '正在搜索中',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
  }
})