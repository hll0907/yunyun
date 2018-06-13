<template>
    <section>
        <van-nav-bar title="提交订单" />
        <section style="height:50px;"></section>
        <van-cell-group>
            <van-field label="订单号"  type="number" required v-model="orderId" placeholder="请输入您的淘宝订单号" />
        </van-cell-group>
        <br>
        <div style="text-align:center;color:red;font-size:0.4rem;">系统订单录入存在一定延时，请下单后10分钟在提交</div>
        <div style="margin:20px;">
        <van-button type="default" size="large" style="background:red;color:#ffffff" @click="sumbitOrder">提交订单</van-button>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      url: "https://shg.yuf2.cn/shg-api/api/",
      orderId: "",
      userId: 0
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.userId = dataJson.userId;
  },
  methods: {
    sumbitOrder() {
      let _this = this;
      if (_this.userId == "") {
        _this.$toast("当前您还未登录哦");
        // http://shg.yuf2.cn:8080/shg-api/api/order/submit_order?userId=337466&orderNo=22232
      } else {
        // 此处使用node做了代理
        if (_this.orderId == "" || _this.orderId == null) {
          _this.$toast("您还未输入您的订单号");
          return;
        }
        if (_this.orderId.length < 16) {
          _this.$toast("您输入订单号有误");
          return;
        }

        this.$axios
          .post(
            _this.url +
              "/order/submit_order?userId=" +
              _this.userId +
              "&orderNo=" +
              _this.orderId
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.$toast(response.data.message);
            } else {
              _this.$toast(response.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
      }
    }
  }
};
</script>
<style>
body {
  background: #f1f1f1;
}
</style>

