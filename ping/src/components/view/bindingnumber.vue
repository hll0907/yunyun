<template>
  <section>
    <section>
        <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
    </section>
    <van-cell-group>
        <van-field label="手机号" v-model="phonenumber" type="tel" required placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell-group >
        <van-field center v-model="sms" label="短信验证码" required placeholder="请输入短信验证码" icon="clear" @click-icon="sms = ''">
        <van-button slot="button" size="small" type="primary" @click="sendMessage">发送验证码</van-button>
        </van-field>
    </van-cell-group>
    <van-cell-group>
        <van-field label="密码" v-model="password" type="password" required placeholder="请输入您的密码(除汉字和特殊符号)" />
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
      nitice: "请认真核对您的手机号哦",
      notice_icon: notice,
      phonenumber: "",
      sms: "",
      password: ""
    };
  },
  mounted() {
    // this.getParams();
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
  },
  methods: {
    SaveUserData() {
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (_this.phonenumber == "") {
          _this.$toast("请输入手机号码");
          return;
        }
        if (!reg.test(_this.phonenumber)) {
          _this.$toast("手机格式不正确");
          return;
        }
        this.$axios
          .post(_this.url + "/user/mobile_auth?phoneNum=" + _this.phonenumber)
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              // _this.$toast(response.data.message + "22222222222222");
              _this.bindphone();
            } else {
              _this.$toast(response.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    bindphone() {
      // 此处使用node做了代理
      let _this = this;
      this.$axios
        .post(
          _this.url +
            "/user/bind_phone_number?userId=" +
            _this.id +
            "&phoneNum=" +
            _this.phonenumber +
            "&code=" +
            _this.sms +
            "&password=" +
            _this.password
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          if (response.data.code == 1) {
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
    },
    sendMessage() {
      let _this = this;
      this.$axios
        .post(_this.url + "/user/send_message?mobile=" + _this.phonenumber)
        .then(function(response) {
          // 将得到的数据放到vue中的data
          if (response.data.code == 1) {
            _this.$toast("短信发送成功,请注意查收");
            _this.$router.push({
              path: "/shg",
              name: "bindingnumber"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getParams() {
      // 取到路由带过来的参数
      var phone = this.$route.params.phone;
      // 将数据放在当前组件的数据内
      this.phonenumber = phone;
    },
    Cancel() {
      this.$router.push({
        path: "/shg",
        name: "setting"
      });
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>
