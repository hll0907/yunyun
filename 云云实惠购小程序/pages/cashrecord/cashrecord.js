const app = getApp()
Page({
  data: {
    cashrecorddata: [],
    cashrecordpage: 1,
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
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
    //http://shg.yuf2.cn:8080/shg-api/api/integral/extract?userId=337466&page=1
    wx.request({
      url: app.globalData.dataurl + '/integral/extract',
      data: {
        userId: app.globalData.userId,
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
            cashrecorddata: res.data.result.list,
          });
        }
      }
    })
  },
  //积分提现上拉加载更多
  cashrecordloadMore: function(e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: app.globalData.dataurl + '/integral/extract',
        data: {
          userId: app.globalData.userId,
          page: ++that.data.cashrecordpage
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            // console.log(res.data.result)
            that.setData({
              cashrecorddata: that.data.cashrecorddata.concat(res.data.result.list),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  },
})