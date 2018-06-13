<template>
  <section>
     <section class="back_img">
          <div style="height:30px;text-align:right;">
          </div>
          <div style="text-align:center;">
            <div v-if="userdata.imageUrl==''||userdata.imageUrl==null">
                <img src="../../assets/icon/icon_head.png" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
             <div v-else>
                <img :src="imageUrl" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
            <div>
                <span style="font-size:18px;">{{userdata.nickName}}</span>
                <!-- <div>用户ID：{{userdata.userId}}</div> -->
            </div>
          </div>
      </section>
      <section>
          <!-- 手机号 -->
        <van-cell-group>
           <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>手机号</span>
                  </template>
                </van-cell>
              </van-col>
              <div>
              <van-col span="12">
                <div style="text-align:right;">
                 <van-cell>
                  <template slot="title">
                    <span v-if="phone==''">未添加</span>
                    <span v-else @click="callPhone">{{phone}} ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>
        <!-- 微信号 -->
        <van-cell-group>
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>支付宝账号</span>
                  </template>
                </van-cell>
              </van-col>
              <div>
              <van-col span="12">
                <div style="text-align:right;">
                 <van-cell>
                  <template slot="title">
                    <span v-if="alipay==''">未添加</span>
                    <span v-else 
                    v-clipboard:copy="alipay"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    {{alipay}} ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>
        <!-- 微信收钱码 -->
        <van-cell-group>
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>微信收钱码</span>
                  </template>
                </van-cell>
              </van-col>
              <div>
              <van-col span="12">
                <div style="text-align:right;"  v-if="wxMoneyQrcode=='?time='+times">
                 <van-cell>
                  <template slot="title">
                    <span>未添加</span>
                  </template>
                </van-cell>
                </div>
                <div style="text-align:right;" v-else @click="JumpMoneyShowScan">
                 <van-cell>
                  <template slot="title">
                    <span ><img :src="wxMoneyQrcode" style="width:10%;" /> ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>
        <!-- 查看他的好友 -->
        <van-cell-group>
          <div @click="onclickfriend">
           <van-row >
                <van-cell is-link value="去查看">
                  <template slot="title">
                    <span>他的好友</span>
                  </template>
                </van-cell>
            </van-row>
            </div>
        </van-cell-group>
      </section>
      <van-dialog v-model="moneyshow" :show-confirm-button="false" title="我的收钱二维码" :close-on-click-overlay="true">
        <div style="text-align:center;"><img :src="wxMoneyQrcode" style="width:80%"/></div>
      </van-dialog>
  </section>
</template>
<script>
import { Dialog } from "vant";
import fansVue from "./fans.vue";

export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      friendId: "",
      phone: "",
      alipay: "",
      imageUrl: "",
      userdata: {},
      wxMoneyQrcode: "",
      moneyshow: false,
      times: ""
    };
  },
  mounted() {
    // this.id = sessionStorage.getItem("userId");
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getParams();
    this.getUserData();
  },
  methods: {
    onCopy: function(e) {
      // console.log("你刚刚复制: " + e.text);
      this.$toast("支付宝账号已复制成功:" + e.text);
    },
    onError: function(e) {
      console.log("无法复制文本！");
      this.$toast("支付宝账号复制失败了哦");
    },
    callPhone() {
      window.location.href = "tel:" + this.phone;
    },
    getParams() {
      var keyword = window.location.href;
      this.friendId = decodeURI(
        keyword.substring(keyword.indexOf("?friendId=") + 10, keyword.length)
      );
      // alert(this.friendId)
    },
    JumpMoneyShowScan() {
      this.moneyshow = true;
    },
    getUserData() {
      // 缓存指针
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        var time = new Date();
        var times = Date.parse(time);
        _this.times = times;
        this.$axios
          .get(_this.url + "/user/" + _this.friendId)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.userdata = response.data.result;
            _this.imageUrl = _this.userdata.imageUrl;
            _this.phone = _this.userdata.phone;
            _this.alipay = _this.userdata.alipay;
            _this.wxMoneyQrcode =
              _this.userdata.wxMoneyQrcode + "?time=" + times;
            // console.log(_this.userdata);
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
      }
    },
    // 查看好友的好友
    onclickfriend() {
      this.$router.push({
        path: "/shg",
        name: "friend",
        query: {
          userId: this.friendId
        },
        params: {
          userId: this.friendId
        }
      });
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>
<style>
.back_img {
  /* background-image: url("../../assets/icon/icon_personalbg.png"); */
  width: 100%;
  height: 100%;
  margin: auto;
}
body {
  background: #f1f1f1;
}
</style>
