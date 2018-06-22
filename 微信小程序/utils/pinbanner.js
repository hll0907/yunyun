//网络访问
function getbanner(callback) {
  wx.request({
    url: 'http://ptk.baolinzhe.com/ptk/api/v1/banner/list',
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