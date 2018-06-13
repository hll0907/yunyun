<template>
  <div>
      <section>
          <van-tabs>
            <van-tab>
                <div slot="title" @click="getfrienddata">
                    <span v-if="totals==0">我的好友</span>
                    <span v-else>我的好友{{totals}}</span>
                </div>
                
                <div>
                    <div v-if="NorNumbers == 0">
                    <div style="text-align:center;"><img src="../../assets/icon/icon_datakong.png" style="width:100%"/></div>
                    </div>
                    <div v-else style="background:#ffffff" v-for="(r, key) in frienddata" :key="key">
                      <div >
                        <van-row>
                            <van-col span="5">
                              <div class="imgs" v-if="r.imageUrl!=''">
                                <img :src="r.imageUrl"/>
                              </div > 
                              <div class="imgs" v-else>
                                <img src="../../assets/icon/icon_head.png"/>
                              </div >  
                            </van-col>
                            <van-col span="6">
                                <div style="margin-top:35%;font-size:18px;">{{r.nickName}}</div>
                            </van-col>
                            <van-col span="12">
                                <div style="text-align:right;margin-top:14%;color:red;" @click="JumpPersonal(r.userId)">
                                  <van-icon name="e630"/>
                                  <div style="font-size:14px;">查 看</div>
                                  </div>
                            </van-col>
                        </van-row>
                      </div>
                      </div>
                      <div style="text-align:center;"><div style="margin-top:10px;">&nbsp;{{messages}}</div></div>                        
                </div>
            </van-tab>
       </van-tabs>
      </section>
  </div>
</template>
<script>
import icon_nickname from "../../assets/icon/icon_head.png";
export default {
  data() {
    return {
      userId: 0,
      url: "https://shg.yuf2.cn/shg-api/",
      imageURL: icon_nickname,
      frienddata: {},
      messages: "",
      NorNumbers: "",
      totals: 0
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.userId = dataJson.userId;
    // console.log(this.userId);
    this.getfrienddata();
  },
  methods: {
    //http://shg.blpev.cn:8080/shg-api/personal/seefriends?userId=337466&page=1&pageSize=10
    getfrienddata() {
      // 缓存指针
      let _this = this;
      let page = 1;
      let sw = true;
      let pageSize = 10;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .get(
            _this.url +
              "/personal/seefriends?userId=" +
              _this.userId +
              "&page=" +
              page +
              "&pageSize=" +
              pageSize
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            var lengths = response.data.result.list.length;
            // console.log(response.data.result);
            _this.NorNumbers = lengths;
            _this.frienddata = response.data.result.list;
            _this.totals = response.data.result.total;
            // alert(_this.totals);
            page += 1;
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
          });
        window.addEventListener("scroll", function() {
          var a =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
          var b =
            document.documentElement.scrollTop == 0
              ? document.body.scrollTop
              : document.documentElement.scrollTop;
          var c =
            document.documentElement.scrollTop == 0
              ? document.body.scrollHeight
              : document.documentElement.scrollHeight;
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "/personal/seefriends?userId=" +
                    _this.userId +
                    "&page=" +
                    page++ +
                    "&pageSize=" +
                    pageSize
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.list.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.frienddata.push(response.data.result.list[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
                  if (lengths == 0 || lengths == null) {
                    _this.messages =
                      "---------------------------我也是有底线的---------------------------";
                  }
                })
                .catch(function(error) {
                  console.log(error);
                  _this.$toast("网络异常错误...");
                });
            }
            if (sw == false) {
              _this.messages = "正在加载中...";
            }
          }
        });
      }
    },
    JumpPersonal(id) {
      this.$router.push({
        path: "/shg",
        name: "personal",
        query: {
          friendId: id
        }
      });
    }
  }
};
</script>
<style>
@import "../../common/css/fontface.css";

body {
  background: #f1f1f1;
}
.imgs {
  background: #ffffff;
  height: 1.5rem;
  margin: 15px;
  text-align: center;
}
.imgs img {
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0px auto;
}
</style>

