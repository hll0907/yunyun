<template>
<!-- 提现 -->
  <section>
      <section>
        <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
        <van-cell-group>
         <van-cell title="可提现积分余额" />
        </van-cell-group>
        <van-cell-group style="height:2.0rem;">
        <van-cell>
            <template slot="title">
                <div style="text-align:center;font-size:26px;margin-top:0.4rem;">
                  <van-icon name="e610" style="color:#ffd600;"/>
                  <span>{{money}}</span>
                </div>
            </template>
        </van-cell>
        </van-cell-group>
      </section>
        <van-cell-group>
            <van-row>
                <van-cell>
                  <template slot="title">
                    <span>请选择提现方式</span>
                  </template>
                </van-cell>
            </van-row>
          <van-row>
            <van-col span="8">
              <van-button type="primary" v-if="type=='支付宝'" style="width:100%" @click="onclickalipay">支付宝</van-button>
               <van-button type="default" v-else style="width:100%" @click="onclickalipay">支付宝</van-button>
            </van-col>
            <van-col span="8">
              <van-button type="primary" v-if="type=='微信'" style="width:100%" @click="onclickweixin">微信钱包</van-button>
              <van-button type="default" v-else style="width:100%" @click="onclickweixin">微信钱包</van-button>
            </van-col>
            <van-col span="8">
              <van-button type="primary" v-if="type=='云联惠'" style="width:100%" @click="onclickylh">云联账户</van-button>
              <van-button type="default" v-else style="width:100%" @click="onclickylh">云联账户</van-button>
            </van-col>
          </van-row>
          <van-row>
             <section style="height:5px;"></section>
            <van-col span="8">
              <div type="default" style="text-align:center;">(700积分=1元)</div>
            </van-col>
            <van-col span="8">
              <div type="default" style="text-align:center;">(700积分=1元)</div>
            </van-col>
            <van-col span="8">
              <div type="default" style="text-align:center;">(1积分=1白积分)</div>
            </van-col>
          </van-row>
           <section style="height:10px;"></section>
        </van-cell-group>

      <section style="height:10px;"></section>
      <section>
        <van-cell-group>
            <van-field center v-model="number" label="积分" placeholder="请输入积分" type="number" v-on:input="myFocus">
              <div slot="button" style="color:#d81e06;" @click="JumpTotalMoney">全部提现 </div>
            </van-field>
          <van-cell-group v-if="type=='微信'"                                                 >
           <van-row>
              <van-col span="12">
                <van-cell >
                  <template slot="title">
                    <span>微信收钱码</span>
                  </template>
                </van-cell>
              </van-col>
              <div @click="JumpBindingMoneysacn">
                <van-col span="12">   
                  <span style="text-align:right;" >
                  <van-cell is-link >
                    <template slot="title">
                      <span v-if="wxMoneyQrcode=='?time='+times">未添加</span>
                      <span style="text-align:right;" v-else >已添加</span>
                    </template>
                  </van-cell>
                  </span>
                  <!-- <van-cell is-link>
                    <template slot="title">
                      <span ><img :src="wxMoneyQrcode" style="width:10%;height:0.4rem;" /></div>
                    </template>
                  </van-cell> -->
                </van-col>
              </div>
            </van-row>
          </van-cell-group>

        <van-cell-group v-if="type=='支付宝'">
            <van-row>
              <van-col span="12">
                <van-cell>
                  <template slot="title">
                    <span>支付宝收钱二维码</span>
                  </template>
                </van-cell>
              </van-col>
              <div @click="Jumpalipay">
              <van-col span="12">
                <div style="text-align:right;" >
                 <van-cell is-link>
                  <template slot="title">
                    <span  v-if="alipay=='?time='+times||alipayscan!='http'" >未添加</span>
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
        </van-cell-group>

        <van-cell-group v-if="type=='云联惠'">
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
                <div style="text-align:right;" >
                 <van-cell is-link>
                  <template slot="title">
                    <span v-if="ylhId==''" @click="Jumpylh">未添加</span>
                    <span v-else @click="showylh">{{ylhId}} ></span>
                  </template>
                </van-cell>
                </div>
              </van-col>
              </div>
            </van-row>
        </van-cell-group>

        <div v-if="type=='云联惠'" style="height:0.6rem;margin-top:5px;">
          <span style="font-size:16px;margin:15px;">到账积分</span>
          <span style="margin:0px 0px 0px 15px;color:red;">{{(number/100)*100}}.00 积分</span>
        </div>

        <div v-else style="height:0.6rem;margin-top:5px;">
          <span style="font-size:16px;margin:15px;">到账金额</span>
          <span style="margin:0px 0px 0px 15px;color:red;">{{(number-(number%700))/700}}.00元</span>
        </div>
        <van-field center  label="手续费" placeholder="免收手续费"  disabled :error="true"/>
        </van-cell-group>
      </section>
      <section>
            <!-- <van-cell :title="titledesc" style="font-size:10px;"/> -->
            <div v-if="type=='云联惠'" style="margin:10px;color:#999">温馨提示:需整百提现</div>
            <div v-else style="margin:10px;color:#999">{{titledesc}}</div>
            <div style="text-align:center;">
                  <div style="margin:0px 15px 0px 15px;" >
                    <van-button type="default" v-if="type=='云联惠'" size="large" disabled >此功能暂时无法使用</van-button>
                    <van-button type="default" v-else size="large" style="background:#d81e06;color:#ffffff" @click="JumpCash">申请提现</van-button>
                  </div>
                  <div style="font-size:16px;margin-top:10px;color:red;" @click="JumpDeti">查看提现记录<van-icon name="arrow" style="font-size:14px;" /></div>
                   <!-- <section style="height:10px;"></section> -->
            </div>
      </section>
      <van-dialog v-model="moneyshow" :show-confirm-button="false" title="我的微信收钱二维码" :close-on-click-overlay="true">
        <div style="text-align:center;"><img :src="wxMoneyQrcode" style="width:80%"/></div>
        <div style="text-align:center;color:#ff0000">如需更换微信收钱二维码,请您联系官方客服</div>
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
  </section>
</template>
<script>
import notice from "../../assets/icon/icon_notices.png";
export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      userdata: {},
      wxMoneyQrcode: "",
      alipay: "",
      ylhId: "",
      nitice:
        "积分满3500可提现,每天可成功兑换一次,提现审核时间为9:00-21:00,审核成功后客服会根据您提供的提现方式,进行打款操作",
      notice_icon: notice,
      number: "",
      money: 0,
      titledesc: "温馨提示:需700的倍数可提现",
      times: "",
      moneyshow: false,
      type: "支付宝",
      ylhPhone: "",
      alipayshow: false,
      ylhshow: false,
      alipayscan: ""
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
    JumpAlipayShowScan() {
      this.alipayshow = true;
    },
    //云联账号
    showylh() {
      this.ylhshow = true;
    },
    JumpMoneyShowScan() {
      this.moneyshow = true;
    },
    onclickalipay() {
      this.type = "支付宝";
    },
    onclickweixin() {
      this.type = "微信";
    },
    onclickylh() {
      this.type = "云联惠";
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
          .get(_this.url + "/integral/total?userId=" + _this.id)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.userdata = response.data.result;
            _this.money = _this.userdata.whiteIntegral;
            _this.ylhId = _this.userdata.ylhId;
            _this.ylhPhone = response.data.result.ylhPhone;
            _this.alipay = _this.userdata.alipay + "?time=" + times;
            _this.alipayscan = _this.alipay.substring(0, 4);
            _this.wxMoneyQrcode =
              _this.userdata.wxMoneyQrcode + "?time=" + times;
            //console.log(_this.userdata);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    myFocus() {
      if (this.money < 3500) {
        this.$toast("您的积分还未到达3500哦");
        this.number = "";
      } else if (this.number > this.money) {
        this.$toast("您输入的积分超过了可提现积分的余额");
        this.number = "";
      }
    },
    JumpTotalMoney() {
      this.number = this.money - this.money % 700;
      if (this.money < 3500) {
        this.$toast("满3500积分才能提现哦");
        this.number = "";
      }
    },
    JumpBindingMoneysacn() {
      this.$router.push({
        path: "/shg",
        name: "bindingmoneyscan2"
      });
    },
    Jumpalipay() {
      this.$router.push({
        path: "/shg",
        name: "bindingalipayscan2"
      });
    },
    Jumpylh() {
      this.$router.push({
        path: "/shg",
        name: "bindingylh2",
        params: {
          ylhId: this.ylhId
        }
      });
    },
    JumpCash() {
      if (this.money < 3500) {
        this.$toast("满3500积分才能提现哦");
      } else if (this.number < 3500) {
        this.$toast("您输入的积分要大于或等于3500");
        this.number = "";
      } else {
        if (this.type == "支付宝") {
          this.tixianalipay();
        } else if (this.type == "微信") {
          this.tixianweixin();
        } else if (this.type == "云联惠") {
          this.tixianyunlianhui();
        }
      }
    },
    tixianalipay() {
      // 缓存指针
      let _this = this;
      // alert(_this.type + "1");
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/integral/extract/alipay?userId=" +
              _this.id +
              "&integral=" +
              _this.number
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.$toast("提现成功,请等待审核");
              _this.getUserData();
            } else {
              _this.$toast(response.data.message);
              _this.getUserData();
            }
            // console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    tixianweixin() {
      // alert(this.type + "2");
      // 缓存指针
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/integral/extract/wechat?userId=" +
              _this.id +
              "&integral=" +
              _this.number
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.$toast("提现成功,请等待审核");
              _this.getUserData();
            } else {
              _this.$toast(response.data.message);
              _this.getUserData();
            }
            // console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    tixianyunlianhui() {
      // alert(this.type + "3");
      // 缓存指针
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/integral/submit_extract?userId=" +
              _this.id +
              "&integral=" +
              _this.number +
              "&ylhId=" +
              _this.ylhId +
              "&ylhPhone=" +
              _this.ylhPhone
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            // console.log(response);
            if (response.data.code == 1) {
              _this.$toast("提现成功,请等待审核");
              _this.getUserData();
            } else {
              _this.$toast(response.data.message);
              _this.getUserData();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    JumpDeti() {
      this.$router.push({
        path: "/shg",
        name: "commissions",
        params: {
          data: 3
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
@import "../../common/css/fontface.css";
body {
  background: #f1f1f1;
}
</style>
