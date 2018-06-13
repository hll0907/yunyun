<template>
  <section>
     <section class="back_img" >
          <div style="height:30px;text-align:right;">
              <!-- <span style="margin:20px;font-size:0.5rem;" @click="jumpPhone">绑定手机号</span> -->
          </div>
          <div style="text-align:center;">
            <div v-if="userdata.imageUrl==''||userdata.imageUrl==null">
                <img :src="icon_heads" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
             <div v-else>
                <img :src="headurl" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
            <div>
                <span style="font-size:18px;">{{nickName}}</span>
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
                    <span v-if="alipaynumber==''">未添加</span>
                    <span v-else 
                    v-clipboard:copy="alipaynumber"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">{{alipaynumber}} ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>
        <van-cell-group>
           <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>邀请码</span>
                  </template>
                </van-cell>
              </van-col>
              <div>
              <van-col span="12">
                <div style="text-align:right;">
                 <van-cell>
                  <template slot="title">
                    <span v-if="invitationCode==''">未添加</span>
                    <span v-else>{{invitationCode}} ></span>
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
                <div style="text-align:right;" v-if="wxMoneyQrcode=='?times='+times||wxMoneyQrcode==''">
                 <van-cell>
                  <template slot="title">
                    <span>未添加</span>
                  </template>
                </van-cell>
                </div>
                <div style="text-align:right;" v-else  @click="JumpMoneyShowScan">
                 <van-cell>
                  <template slot="title">
                     <span ><img :src="wxMoneyQrcode" style="width:10%;"/> ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>
        
      </section>

      <van-dialog v-model="moneyshow" :show-confirm-button="false" title="我的收钱二维码" :close-on-click-overlay="true">
        <div style="text-align:center;"><img :src="wxMoneyQrcode" style="width:80%"/></div>
      </van-dialog>
  </section>
</template>
<script>
import icon_heads from "../../assets/icon/icon_heads.png";
export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      phone: "",
      alipaynumber: "",
      refereId: "",
      headurl: "",
      nickName:'',
      userdata: {},
      wxMoneyQrcode: "",
      invitationCode: "",
      sacnshow: false,
      moneyshow: false,
      times: "",
      icon_heads:icon_heads
    };
  },
  mounted() {
    this.getParams();
    this.getUserData();
  },
  methods: {
    onCopy: function(e) {
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
      // 取到路由带过来的参数
      var refereId = this.$route.params.refereId;
      // 将数据放在当前组件的数据内
      this.refereId = refereId;
      // this.refereId=0;
    },
    JumpScanShowScan() {
      this.sacnshow = true;
    },
    JumpMoneyShowScan() {
      this.moneyshow = true;
    },
    getUserData() {
      // 缓存指针
      let _this = this;
      // 此处使用node做了代理
      this.$axios
        .get(_this.url + "/user/" + _this.refereId)
        .then(function(response) {
          // 将得到的数据放到vue中的data
          if (response.data.code == 1) {
            _this.userdata = response.data.result;
            _this.nickName=_this.userdata.nickName;
            _this.headurl = _this.userdata.imageUrl;
            _this.phone = _this.userdata.phone;
            _this.alipaynumber = _this.userdata.alipay;
            _this.wxMoneyQrcode = _this.userdata.wxMoneyQrcode;
            _this.invitationCode = _this.userdata.invitationCode;
          } else if (response.data.code == 0) {
            // _this.$toast("您暂时没有推荐人信息哦");
             _this.headurl = "../../assets/icon/icon_heads.png";
            _this.phone = "";
            _this.alipaynumber = "";
            _this.wxMoneyQrcode = "";
            _this.invitationCode = "";
            _this.nickName="云云实惠购官方";
          }
        })
        .catch(function(error) {
          console.log(error);
          _this.$toast("网络异常错误...");
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
  width: 100%;
  height: 100%;
  margin: auto;
}
body {
  background: #f1f1f1;
}
</style>
