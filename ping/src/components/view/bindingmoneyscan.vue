<template>
  <section>
    <section>
        <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
    </section>
    <section>
        <div style="text-align:center;">
         <div style="margin:1.0rem;">
            <img :src="wxMoneyQrcode" alt="暂无上传" style="width:8.0rem;height:8.0rem;"/>
        </div>
        <div style="margin:20px;">
           <van-uploader accept="image/jpeg,image/png,image.jpg" multiple :after-read="onRead">
          <van-button size="large" type="default" style="width:8.0rem;background:red;color:#ffffff">上传微信二维码</van-button>
          </van-uploader>
        </div>
        <section style="height:10px;"></section>
        <!-- <div>如何正确操作▶</div> -->
      </div>
    </section>
  </section>
</template>
<script>
import notice from "../../assets/icon/icon_notices.png";
import scan from "../../assets/icon/icon_scan.png";

import qs from "qs";

export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      nitice: "微信收款二维码是用于提取打款，请认真上传",
      notice_icon: notice,
      filepath: "",
      scan: scan,
      wxMoneyQrcode: ""
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getUserData();
  },
  methods: {
    getUserData() {
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        var time = new Date();
        var times = Date.parse(time);
        this.$axios
          .get(_this.url + "/user/" + _this.id)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.userdata = response.data.result;
            _this.wxMoneyQrcode =
              _this.userdata.wxMoneyQrcode + "?time=" + times;
            if (_this.wxMoneyQrcode == "?time=" + times) {
              _this.wxMoneyQrcode = _this.scan;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onRead(file) {
      var windowURL = window.URL || window.webkitURL;
      this.filepath = file.file; //创建图片文件的url
      this.wxMoneyQrcode = windowURL.createObjectURL(this.filepath);
      let formdatas = new FormData();
      formdatas.append("qrcode", this.filepath);
      // console.log(this.filepath);
      // console.log(formdatas);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let _this = this;
      this.$axios
        .post(
          _this.url + "/user/bind-wxmoney?userId=" + _this.id,
          formdatas,
          config
        )
        .then(function(response) {
          //做处理
          // console.log(response.data.code);
          if (response.data.code == 1) {
            _this.$toast("二维码上传成功");
            _this.$router.push({
              path: "/shg",
              name: "setting"
            });
          } else {
            _this.$toast(response.data.message);
            _this.$router.push({
              path: "/shg",
              name: "setting"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
body {
  background: #f1f1f1;
}
</style>

