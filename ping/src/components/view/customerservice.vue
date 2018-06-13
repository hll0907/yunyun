<template>
    <section>
        <section>
            <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
        </section>
        <section>
            <div style="text-align:center;">
            <div style="margin:1.0rem;">
                <img :src="customerScan" alt="暂无上传" style="width:8.0rem;height:8.0rem;border:1px solid #999;"/>
            </div>
            <div style="margin:20px;">
            </div>
            <section style="font-size:0.4rem;">
                <div>长按可识别二维码,加客服微信,进行详细咨询,<br>请提供下方您的用户ID,长按可复制哦</div>
                <br>
                <div  v-clipboard:copy="userId"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">您的账户ID:&nbsp;{{userId}}</div>
            </section>
        </div>
        </section>
    </section>
</template>
<script>
import notice from "../../assets/icon/icon_notices.png";
import scan from "../../assets/icon/icon_scan.png";

export default {
  data() {
    return {
      userId: 0,
      url: "https://shg.yuf2.cn/shg-api/api/v1/wechat/kf-url",
      notice_icon: notice,
      nitice: "客服工作时间 周一至周日【9:00-21:00】节假日除外。",
      scan: scan,
      customerScan: scan,
      customerdata: {}
    };
  },
  mounted() {
    this.getParams();
    this.getData();
  },
  methods: {
    onCopy: function(e) {
      this.$toast("您的账户ID已复制成功:" + e.text);
    },
    onError: function(e) {
      console.log("无法复制文本！");
      this.$toast("您的账户ID复制失败了哦");
    },
    getParams() {
      // 取到路由带过来的参数
      var userIds = this.$route.params.userId;
      // 将数据放在当前组件的数据内
      this.userId = userIds;
    },
    getData() {
      let _this = this;
      // 此处使用node做了代理
      this.$axios
        .get(_this.url)
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.customerdata = response.data.result;
          _this.customerScan = _this.customerdata.kfUrl;
          // console.log(_this.customerScan);
          if (_this.customerScan == "") {
            _this.customerScan = _this.scan;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>

