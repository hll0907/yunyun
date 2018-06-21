//网络访问
function getbanner(callback) {
  wx.request({
    url: 'http://shg.yuf2.cn:8080/shg-api/api/index/banner',
    data: {
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
        // console.log(res)
      }
    }
  })
}

module.exports = {
  getbanner: getbanner
}