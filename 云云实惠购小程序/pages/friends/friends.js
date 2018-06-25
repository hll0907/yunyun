// pages/friend/friend.js
const app = getApp();
Page({
  data: {
    frienddata: [],
    friendpage: 1,
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    friendId:''
  },
  onLoad: function (options) {
    var that = this;
    var friendId = options.friendId;
    //  获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    that.setData({
      friendId: friendId
    })
    that.getfrienddata()
  },
  getfrienddata: function () {
    var that = this;
    wx.request({
      //http://shg.yuf2.cn:8080/shg-api/personal/seefriends?userId=22380&page=1&pageSize=10
      url: 'https://shg.yuf2.cn/shg-api/personal/seefriends',
      data: {
        userId: that.data.friendId,
        page: 1,
        pageSize: 10
      },
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            frienddata: res.data.result.list
          });
          console.log(res.data.result.list)
        }
      }
    })
  },
  //好友上拉加载更多
  friendloadMore: function (e) {
    setTimeout(() => {
      // console.log('加载更多')
      var that = this;
      wx.request({
        url: 'https://shg.yuf2.cn/shg-api/personal/seefriends',
        data: {
          userId: that.data.friendId,
          page: ++that.data.friendpage,
          pageSize: 10
        },
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          if (res.statusCode == 200) {
            console.log(res.data.result.list)
            that.setData({
              frienddata: that.data.frienddata.concat(res.data.result.list),
              isHideLoadMore: false,
            });
          }
          // console.log(that.data.cashrecordpage)
        }
      })
    }, 1000)
  }
})