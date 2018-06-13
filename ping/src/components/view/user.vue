<template>
  <div>
      <section>
          <div style="height:30px;text-align:right;">
              <!-- <span style="margin:20px;font-size:0.5rem;" @click="jumpPhone">绑定手机号</span> -->
          </div>
          <div style="text-align:center;">
            <div v-if="userdata.imageUrl==''||userdata.imageUrl==null">
                <img src="../../assets/icon/icon_head.png" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
             <div v-else>
                <img :src="headurl" style="width:2.0rem;height:2.0rem;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"/>
            </div>
            <div>
                <span style="font-size:18px;">{{userdata.nickName}}</span>
                <div>我的ID:{{id}}</div>
                <div>我的好友:{{userdata.invitedNum}}</div>
            </div>
          </div>
          <div style="height:10px;"></div>
      </section>
        <div @click="JumpSetting"> 
                <van-cell-group>
                    <van-cell icon="e6a4" title="账户设置" is-link style="color:red;" />
                </van-cell-group>
        </div>
        <section style="height:5px;">&nbsp;</section>
        <section>
            <div>
              <van-cell-group>
                  <van-cell title="可提现积分" icon="e610" :value="whiteIntegral" label="点击去提现" @click="JumpPutforwards" is-link style="color:red;"/>
                  <van-cell title="积分记录" icon="e600" @click="Jumpcommission" is-link style="color:red;"/>
                </van-cell-group>
                  <section style="height:5px;">&nbsp;</section>
                <van-cell-group>
                 <van-cell title="我的订单" icon="e609" is-link style="color:red;" @click="JumpOrder"/>
                  <van-cell title="提交订单" icon="e726" is-link style="color:red;" @click="sumbitOrder"/>
                </van-cell-group>
                <section style="height:5px;">&nbsp;</section>
                <van-cell-group>
                  <van-cell title="我的推荐人"  icon="e637" @click="jumpRecommendation" is-link style="color:red;"/>
                   <van-cell title="我的好友"  icon="e60b" @click="jumpFans" is-link style="color:red;"/>
                   <van-cell title="专属推广海报"  icon="e60a" @click="jumpPosterUrl" is-link style="color:red;"/>
                </van-cell-group>
                 <van-cell-group>
                   <van-cell title="官方客服"  icon="e604" @click="jumpTeam" is-link style="color:red;"/>
                </van-cell-group>
            </div>
        </section>
        <section style="height:50px;">&nbsp;</section>
        <van-dialog v-model="postUrlshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:80%;">
          <div style="height:2px;">&nbsp;</div>
        <div style="text-align:center;"><img :src="posterUrl" style="width:98%"/></div>
        </van-dialog>
        
   <!-- 底部标签 -->
    <div>
    <van-row>
      <van-goods-action>
            <van-goods-action-mini-btn style="width:25%;" @click="jumpIndex">
                <div style="text-align:center;">
                  <!-- <van-icon name="e606"/> -->
                  <img src="../../assets/icon/icons_index.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">首页</span></div>
                </div>
            </van-goods-action-mini-btn>
              <van-goods-action-mini-btn style="width:25%;" @click="JumpVip">
              <div style="text-align:center;">
                  <!-- <van-icon name="e607"/> -->
                  <img src="../../assets/icon/icon_search.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">超级搜</span></div>
              </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;" @click="JumpLove">
              <div style="text-align:center;">
                  <!-- <van-icon name="e619"/> -->
                  <img src="../../assets/icon/icons_love.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">收藏</span></div>
              </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;">
                <div style="text-align:center;color:red;">
                  <!-- <van-icon name="e6a4"/> -->
                  <img src="../../assets/icon/icons_my_current.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">我的</span></div>
                </div>
            </van-goods-action-mini-btn>
        </van-goods-action>
    </van-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      userdata: {},
      headurl: "",
      refereId: "",
      posterUrl: "",
      postUrlshow: false,
      whiteIntegral: "",
      posttimes:''
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getUserPost();
    this.getUserData();
  },
  methods: {
    Jumpcommission() {
      this.$router.push({
        path: "/shg",
        name: "commissionorder"
      });
    },
    JumpPutforwards() {
      this.$router.push({
        path: "/shg",
        name: "putforwards"
      });
    },
    sumbitOrder() {
      this.$router.push({
        path: "/shg",
        name: "sumbitorder"
      });
    },
    getUserPost() {
      // /v1/wechat/{userId}/poster
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        var time = new Date();
        var times = Date.parse(time);
        _this.posttimes=times;
        this.$axios
          .get(_this.url + "/v1/wechat/" + _this.id + "/poster/")
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.posterUrl = response.data.result+"?time=" + times;
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
      }
    },
    getUserData() {
      // 缓存指针
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .get(_this.url + "/user/" + _this.id)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.userdata = response.data.result;
            _this.headurl = _this.userdata.imageUrl;
            _this.refereId = _this.userdata.refereId;
            _this.whiteIntegral = _this.userdata.whiteIntegral;
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
      }
    },
    jumpIndex() {
      this.$router.push({
        path: "/shg",
        name: "indexs"
      });
    },
    JumpVip() {
      this.$router.push({
        path: "/shg",
        name: "vip"
      });
    },
    JumpLove() {
      this.$router.push({
        path: "/shg",
        name: "love"
      });
    },
    JumpSetting() {
      this.$router.push({
        path: "/shg",
        name: "setting"
      });
    },
    jumpRecommendation() {
      this.$router.push({
        path: "/shg",
        name: "personalReferee",
        params: {
          refereId: this.refereId
        }
      });
    },
    jumpFans() {
      this.$router.push({
        path: "/shg",
        name: "fans"
      });
    },
    jumpPosterUrl() {
      if (this.posterUrl == "?time="+this.posttimes || this.posterUrl == null) {
        this.$toast("暂时不能查看您的专属推广海报，请及时联系客服进行解决");
      } else {
        this.postUrlshow = true;
      }
    },
    JumpOrder() {
      this.$router.push({
        path: "/shg",
        name: "viprecord",
        params: {
          userId: this.id
        }
      });
    },
    jumpTeam() {
      // this.$toast("此功能暂未上线");
      this.$router.push({
        path: "/ping",
        name: "customerservice",
        params: {
          userId: this.id
        }
      });
    }
  }
};
</script>
<style>
@import "../../common/css/user.css";
@import "../../common/css/fontface.css";
body {
  background: #f1f1f1;
}
</style>

