<template>
  <section style="background:#ffffff;">
    <section>
     <div style="height:25px;font-size:14px;"><span style="margin:10px;">头像与昵称</span></div>
    </section>
    <section style="background:#ffffff;">
      <van-card :title="nickname" :thumb="imageURL">
        <div slot="footer">
          <van-button @click="Jumpsynchronization">同步微信头像昵称</van-button>
        </div>
      </van-card>
    </section>
      <section style="height:5px;background:#f1f1f1;"></section>
    <section>
      <van-cell-group>
        <div> 
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
                 <van-cell is-link>
                  <template slot="title">
                    <span v-if="phone==''" @click="JumpBindingPhone">去绑定手机号</span>
                    <span v-else @click="showphone">{{phone}}</span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </div>
      </van-cell-group>
    </section>
    <section>
      <!-- <van-cell-group>
            <div> 
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
                 <van-cell is-link>
                  <template slot="title">
                    <span v-if="weixinnumber==''" @click="JumpBindingWeixin">去绑定支付宝账号</span>
                    <span v-else @click="showweixin">{{weixinnumber}}</span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </div>
      </van-cell-group> -->
      <van-cell-group>
            <div> 
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>云联账号</span>
                  </template>
                </van-cell>
              </van-col>
              <div>
              <van-col span="12">
                <div style="text-align:right;">
                 <van-cell is-link>
                  <template slot="title">
                    <span v-if="ylhId==''" @click="JumpBindingylh">去绑定云联账号</span>
                    <span v-else @click="showylh">{{ylhId}}</span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </div>
      </van-cell-group>
    </section>
    <section style="height:10px;background:#f1f1f1;"></section>
    <section>
      <van-cell-group>
            <div> 
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>微信收款二维码</span>
                  </template>
                </van-cell>
              </van-col>
              <div >
              <van-col span="12">
                <div style="text-align:right;" @click="JumpBindingWeixinmoneyScan">
                 <van-cell is-link>
                  <template slot="title">
                    <div v-if="wxMoneyQrcode=='?time='+times">未添加</div>
                    <div style="text-align:right;" v-else >
                      <!-- <van-cell>
                        <template slot="title">
                          <span ><img :src="wxMoneyQrcode" style="width:10%;height:0.4rem;" /></span>
                        </template>
                      </van-cell> -->
                      已添加
                    </div>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
            </div>
      </van-cell-group>
      <van-cell-group>
        <div> 
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>支付宝收款二维码</span>
                  </template>
                </van-cell>
              </van-col>
              <div >
              <van-col span="12">
                <div style="text-align:right;" @click="JumpBindingAlipaymoneyScan">
                 <van-cell is-link>
                  <template slot="title">
                    <span v-if="alipay=='?time='+times||alipayscan != 'http'">未添加</span>
                    <span v-else>
                      <!-- <van-cell>
                        <template slot="title">
                          <span ><img :src="alipay" style="width:10%;height:0.4rem;" /></span>
                        </template>
                      </van-cell> -->
                      已添加
                    </span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
          </div>
      </van-cell-group>
    </section>
    
      <van-dialog v-model="phoneshow" :show-confirm-button="false" title="我的手机号" :close-on-click-overlay="true" >
        <div style="height:0.5rem"></div>
        <div style="text-align:center;font-size:1.0rem;">{{phone}}</div>
        <div style="text-align:center;color:#ff0000">如需更换手机号,请您联系官方客服</div>
        <br>
      </van-dialog>
      <van-dialog v-model="alipayshow" :show-confirm-button="false" title="我的支付宝收钱二维码" :close-on-click-overlay="true">
        <div style="height:0.5rem"></div>
        <div style="text-align:center;"><img :src="alipay" style="width:80%"/></div>
        <div style="text-align:center;color:#ff0000">如需更换支付宝收钱二维码,请您联系官方客服</div>
        <br>
      </van-dialog>
      <van-dialog v-model="ylhshow" :show-confirm-button="false" title="我的云联账户" :close-on-click-overlay="true">
        <div style="height:0.5rem"></div>
        <div style="text-align:center;font-size:1.0rem;">{{ylhId}}</div>
        <div style="text-align:center;color:#ff0000">如需更换云联账户,请您联系官方客服</div>
      </van-dialog>
       <van-dialog v-model="moneyshow" :show-confirm-button="false" title="我的微信收钱二维码" :close-on-click-overlay="true">
        <div style="text-align:center;"><img :src="wxMoneyQrcode" style="width:80%"/></div>
        <div style="text-align:center;color:#ff0000">如需更换微信收钱二维码,请您联系官方客服</div>
      </van-dialog>
  </section>
</template>
<script>
import icon_nickname from "../../assets/icon/icon_head.png";
import fansVue from "./fans.vue";

export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      phone: "",
      nickname: "",
      alipay: "",
      ylhId: "",
      imageURL: icon_nickname,
      wxMoneyQrcode: "",
      wxQrcode: "",
      phoneshow: false,
      alipayshow: false,
      moneyshow: false,
      ylhshow: false,
      times: "",
      alipayscan: ""
    };
  },
  mounted() {
    this.id = sessionStorage.getItem("userId");
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
        _this.times = times;
        this.$axios
          .get(_this.url + "/user/" + _this.id)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.userdata = response.data.result;
            _this.nickname = _this.userdata.nickName;
            _this.phone = _this.userdata.phone;
            _this.alipay = _this.userdata.alipay + "?time=" + times;
            // alert(_this.alipay)
            _this.alipayscan = _this.alipay.substring(0, 4);
            _this.ylhId = _this.userdata.ylhId;
            _this.wxMoneyQrcode =
              _this.userdata.wxMoneyQrcode + "?time=" + times;
            if (_this.userdata.headPic == "") {
              _this.imageURL = _this.imageURL;
            } else {
              _this.imageURL = _this.userdata.imageUrl;
            }
            // console.log(_this.userdata);
            // console.log(_this.wxMoneyQrcode);
            // console.log(_this.wxQrcode);
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
      }
    },
    Jumpsynchronization() {
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理/user/337466/update/nickname
        this.$axios
          .post(_this.url + "/user/" + _this.id + "/update/nickname")
          .then(function(response) {
            if (response.data.code == 1) {
              _this.getUserData();
              _this.$toast("微信头像和昵称同步成功");
            } else {
              _this.$toast("微信头像和昵称同步失败了");
            }
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("微信头像和昵称同步失败了");
          });
      }
    },
    //支付宝账号
    showweixin() {
      this.alipayshow = true;
    },
    //手机号
    showphone() {
      this.phoneshow = true;
    },
    //云联账号
    showylh() {
      this.ylhshow = true;
    },
    JumpMoneyShowScan() {
      this.moneyshow = true;
    },
    JumpAlipayShowScan() {
      this.alipayshow = true;
    },
    JumpBindingPhone() {
      this.$router.push({
        path: "/shg",
        name: "bindingnumber",
        params: {
          phone: this.phone
        }
      });
    },
    JumpBindingWeixin() {
      this.$router.push({
        path: "/shg",
        name: "bindingalipay",
        params: {
          weixinnumber: this.alipay
        }
      });
    },
    JumpBindingylh() {
      this.$router.push({
        path: "/shg",
        name: "bindingylh",
        params: {
          ylhId: this.ylhId
        }
      });
    },
    JumpBindingAlipaymoneyScan() {
      this.$router.push({
        path: "/shg",
        name: "bindingalipayscan"
      });
    },
    JumpBindingWeixinmoneyScan() {
      this.$router.push({
        path: "/shg",
        name: "bindingmoneyscan"
      });
    }
  }
};
</script>

<style>
</style>