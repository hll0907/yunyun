<template>
  <section>
    <section>
        <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
    </section>
    <section style="text-align:left;width:100%;height:100%">
      <img src="../../assets/icon/icon_alplay.png"/>
    </section>   
    <van-cell-group>
        <van-field label="支付宝账号" v-model="alipaynumber" type="tel" required placeholder="请输入支付宝账号" />
    </van-cell-group>
   <div style="margin:20px;">
    <van-button size="large" type="default" @click="SaveUserData" style="background:red;color:#ffffff;">确认保存</van-button>
    <div style="height:10px;"></div>
    <van-button size="large" type="default" @click="Cancel">取消</van-button>
   </div>
  </section>
</template>
<script>
import notice from "../../assets/icon/icon_notices.png";
import qs from "qs";
export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      nitice: "请认真核对您的支付宝账号哦",
      notice_icon: notice,
      alipaynumber: ""
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getParams();
  },
  methods: {
    SaveUserData() {
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/user/bind-alipay?userId=" +
              _this.id +
              "&alipay=" +
              _this.alipaynumber
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.$toast(response.data.message);
              _this.$router.push({
                path: "/shg",
                name: "putforwards"
              });
            }else{
              _this.$toast(response.data.message);
              _this.$router.push({
                path: "/shg",
                name: "putforwards"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getParams() {
      // 取到路由带过来的参数
      var phone = this.$route.params.weixinnumber;
      // 将数据放在当前组件的数据内
      this.alipaynumber = phone;
    },
    Cancel() {
      this.$router.push({
        path: "/shg",
        name: "putforwards"
      });
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>
