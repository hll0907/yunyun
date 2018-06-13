<template>
  <section>
      <section>
        <van-tabs v-model="active">
            <van-tab>
                <div slot="title" @click="getquanbudata">
                   全部
                </div>
                 <!-- <section style="height:2px;">&nbsp;</section> -->
                 <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                 <div style="background:#ffffff;border:0.5px solid #f1f1f1;padding:2px;">
                    <div v-if="quanbudata.length==0" style="text-align:center;color:#999">
                         <img src="../../assets/icon/icon_datakong.png" style="width:100%"/>
                    </div>
                    <div v-else v-for="(r, key) in quanbudata" :key="key" track-ty='key'>
                        <div style="margin:12px;">
                        <van-row>
                            <van-col span="12" style="font-size:18px;">{{r.title}}</van-col>
                            <van-col span="12">
                                <div style="text-align:right;font-size:18px;">
                                    <span v-if="r.ptype==2||r.ptype==0" style="color:green">+{{r.integral}}</span>
                                    <span v-if="r.ptype==1||r.ptype==3" style="color:red">-{{r.integral}}</span>
                                </div></van-col>
                        </van-row>
                        <van-row>
                            <div style="font-size:14px;margin-top:5px;">{{r.note}}</div>
                        </van-row>
                        <van-row>
                            <van-col style="color:#999;font-size:14px;margin-top:5px;">创建时间{{r.create_at}}</van-col>
                        </van-row>
                        </div>
                        <section style="height:5px;background:#f1f1f1;"></section>
                    </div>
                    <div style="color:#999;text-align:center;" v-if="quanbudata.length!=0">{{messages}}</div>
                 </div>
                 </van-pull-refresh>
            </van-tab>
           
           <van-tab>
                <div slot="title" @click="getjianglidata">
                   订单奖励
                </div>
                 <!-- <section style="height:2px;">&nbsp;</section> -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div style="background:#ffffff;border:0.5px solid #f1f1f1;padding:2px;">
                        <div v-if="jianglidata.length==0" style="text-align:center;color:#999">
                            <img src="../../assets/icon/icon_datakong.png" style="width:100%"/>
                        </div>
                        <div v-else v-for="(r, key) in jianglidata" :key="key" track-ty='key'>
                            <div style="margin:12px;">
                            <van-row>
                                <van-col span="12" style="font-size:18px;">{{r.title}}</van-col>
                                <van-col span="12">
                                    <div style="text-align:right;font-size:18px;">
                                        <span v-if="r.ptype==2||r.ptype==0" style="color:green">+{{r.integral}}</span>
                                        <span v-if="r.ptype==1||r.ptype==3" style="color:red">-{{r.integral}}</span>
                                    </div></van-col>
                            </van-row>
                            <van-row>
                                <div style="font-size:14px;margin-top:5px;">{{r.note}}</div>
                            </van-row>
                            <van-row>
                                <van-col  style="color:#999;font-size:14px;margin-top:5px;">创建时间{{r.create_at}}</van-col>
                            </van-row>
                            </div>
                            <section style="height:5px;background:#f1f1f1;"></section>
                        </div>
                        <div style="color:#999;text-align:center;" v-if="jianglidata.length!=0">{{messages}}</div>
                    </div>
                </van-pull-refresh>
            </van-tab>

            <van-tab>
                <div slot="title" @click="getshouyidata">
                   收益
                </div>
                 <!-- <section style="height:2px;">&nbsp;</section> -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div style="background:#ffffff;border:0.5px solid #f1f1f1;padding:2px;">
                        <div v-if="shouyidata.length==0" style="text-align:center;color:#999">
                            <img src="../../assets/icon/icon_datakong.png" style="width:100%"/>
                        </div>
                        <div v-else v-for="(r, key) in shouyidata" :key="key" track-ty='key'>
                            <div style="margin:12px;">
                            <van-row>
                                <van-col span="12" style="font-size:18px;">{{r.title}}</van-col>
                                <van-col span="12">
                                    <div style="text-align:right;font-size:18px;">
                                        <span v-if="r.ptype==2||r.ptype==0" style="color:green">+{{r.integral}}</span>
                                        <span v-if="r.ptype==1||r.ptype==3" style="color:red">-{{r.integral}}</span>
                                    </div></van-col>
                            </van-row>
                            <van-row>
                                <div style="font-size:14px;margin-top:5px;">{{r.note}}</div>
                            </van-row>
                            <van-row>
                                <van-col  style="color:#999;font-size:14px;margin-top:5px;">创建时间{{r.create_at}}</van-col>
                            </van-row>
                            </div>
                            <section style="height:5px;background:#f1f1f1;"></section>
                        </div>
                        <div style="color:#999;text-align:center;" v-if="shouyidata.length!=0">{{messages}}</div>
                    </div>
                </van-pull-refresh>
            </van-tab>

             <van-tab>
                <div slot="title" @click="gettixiandata">
                   提现
                </div>
                 <!-- <section style="height:2px;">&nbsp;</section> -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div style="background:#ffffff;border:0.5px solid #f1f1f1;padding:2px;">
                        <div v-if="tixiandata.length==0" style="text-align:center;color:#999">
                           <img src="../../assets/icon/icon_datakong.png" style="width:100%"/>
                        </div>
                        <div v-else v-for="(r, key) in tixiandata" :key="key" track-ty='key'>
                            <div style="margin:12px;">
                            <van-row>
                                <van-col span="12" style="font-size:18px;">{{r.title}}</van-col>
                                <van-col span="12">
                                    <div style="text-align:right;font-size:18px;">
                                        <span v-if="r.ptype==2||r.ptype==0" style="color:green">+{{r.integral}}</span>
                                        <span v-if="r.ptype==1||r.ptype==3" style="color:red">-{{r.integral}}</span>
                                    </div></van-col>
                            </van-row>
                            <van-row>
                                <div style="font-size:14px;margin-top:5px;">{{r.note}}</div>
                            </van-row>
                            <van-row>
                                <van-col  style="color:#999;font-size:14px;margin-top:5px;">创建时间{{r.create_at}}</van-col>
                            </van-row>
                            </div>
                            <section style="height:5px;background:#f1f1f1;"></section>
                        </div>
                        <div style="color:#999;text-align:center;" v-if="tixiandata.length!=0">{{messages}}</div>
                    </div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
      </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      active: 0,
      quanbudata: {}, //全部
      jianglidata: {}, //订单奖励
      shouyidata: {}, //收益
      tixiandata: {}, //提现
      messages: "",
      lengths: "",
      isLoading: true,
      currentname: "全部"
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getParams();
    this.getquanbudata();
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.data;
      // 将数据放在当前组件的数据内
      this.active = routerParams;
    },
    onRefresh() {
      // 下拉刷新
      setTimeout(() => {
        if (this.currentname == "全部") {
          this.getquanbudata();
        } else if (this.currentname == "订单奖励") {
          this.getjianglidata();
        } else if (this.currentname == "收益") {
          this.getshouyidata();
        } else if (this.currentname == "提现") {
          this.gettixiandata();
        }
        this.$toast("数据刷新成功");
        this.isLoading = false;
      }, 500);
    },
    getquanbudata() {
      // 缓存指针
      let _this = this;
      _this.currentname = "全部";
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        let page = 1;
        let sw = true;
        let orderStatus = 0;
        this.$axios
          .get(
            _this.url +
              "/integral/records?userId=" +
              _this.id +
              "&type=" +
              orderStatus +
              "&page=" +
              page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.quanbudata = response.data.result.list;
              _this.lengths = _this.quanbudata.length;
              page += 1;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // 注册scroll事件并监听
        // window.addEventListener
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
          if (_this.currentname == "全部") {
            if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
              //alert("到达底部");
              //如果开关打开则加载数据
              if (sw == true) {
                // 将开关关闭
                sw = false;
                _this.$axios
                  .get(
                    _this.url +
                      "/integral/records?userId=" +
                      _this.id +
                      "&type=" +
                      orderStatus +
                      "&page=" +
                      page++
                  )
                  .then(function(response) {
                    // 将新获取的数据push到vue中的data，就会反应到视图中了
                    var lengths = response.data.result.list.length;
                    for (var i = 0; i < lengths; i++) {
                      _this.quanbudata.push(response.data.result.list[i]);
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
                  });
              }
              if (sw == false) {
                // console.log("正在加载中");
                _this.messages = "正在加载中....";
              }
            }
          }
        });
      }
    },
    getjianglidata() {
      // 缓存指针
      let _this = this;
      _this.currentname = "订单奖励";
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        let page = 1;
        let sw = true;
        let orderStatus = 1;
        this.$axios
          .get(
            _this.url +
              "/integral/records?userId=" +
              _this.id +
              "&type=" +
              orderStatus +
              "&page=" +
              page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.jianglidata = response.data.result.list;
              _this.lengths = _this.jianglidata.length;
              page += 1;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // 注册scroll事件并监听
        // window.addEventListener
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
          if (_this.currentname == "订单奖励") {
            if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
              //alert("到达底部");
              //如果开关打开则加载数据
              if (sw == true) {
                // 将开关关闭
                sw = false;
                _this.$axios
                  .get(
                    _this.url +
                      "/integral/records?userId=" +
                      _this.id +
                      "&type=" +
                      orderStatus +
                      "&page=" +
                      page++
                  )
                  .then(function(response) {
                    // 将新获取的数据push到vue中的data，就会反应到视图中了
                    var lengths = response.data.result.list.length;
                    for (var i = 0; i < lengths; i++) {
                      _this.jianglidata.push(response.data.result.list[i]);
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
                  });
              }
              if (sw == false) {
                // console.log("正在加载中");
                _this.messages = "正在加载中....";
              }
            }
          }
        });
      }
    },
    getshouyidata() {
      // 缓存指针
      let _this = this;
      _this.currentname = "收益";
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        let page = 1;
        let sw = true;
        let orderStatus = 2;
        this.$axios
          .get(
            _this.url +
              "/integral/records?userId=" +
              _this.id +
              "&type=" +
              orderStatus +
              "&page=" +
              page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.shouyidata = response.data.result.list;
              _this.lengths = _this.shouyidata.length;
              page += 1;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // 注册scroll事件并监听
        // window.addEventListener
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
          if (_this.currentname == "收益") {
            if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
              //alert("到达底部");
              //如果开关打开则加载数据
              if (sw == true) {
                // 将开关关闭
                sw = false;
                _this.$axios
                  .get(
                    _this.url +
                      "/integral/records?userId=" +
                      _this.id +
                      "&type=" +
                      orderStatus +
                      "&page=" +
                      page++
                  )
                  .then(function(response) {
                    // 将新获取的数据push到vue中的data，就会反应到视图中了
                    var lengths = response.data.result.list.length;
                    for (var i = 0; i < lengths; i++) {
                      _this.shouyidata.push(response.data.result.list[i]);
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
                  });
              }
              if (sw == false) {
                // console.log("正在加载中");
                _this.messages = "正在加载中....";
              }
            }
          }
        });
      }
    },
    gettixiandata() {
      // 缓存指针
      let _this = this;
      _this.currentname = "提现";
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        let page = 1;
        let sw = true;
        let orderStatus = 3;
        this.$axios
          .get(
            _this.url +
              "/integral/records?userId=" +
              _this.id +
              "&type=" +
              orderStatus +
              "&page=" +
              page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              _this.tixiandata = response.data.result.list;
              _this.lengths = _this.tixiandata.length;
              page += 1;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // 注册scroll事件并监听
        // window.addEventListener
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
          if (_this.currentname == "提现") {
            if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
              //alert("到达底部");
              //如果开关打开则加载数据
              if (sw == true) {
                // 将开关关闭
                sw = false;
                _this.$axios
                  .get(
                    _this.url +
                      "/integral/records?userId=" +
                      _this.id +
                      "&type=" +
                      orderStatus +
                      "&page=" +
                      page++
                  )
                  .then(function(response) {
                    // 将新获取的数据push到vue中的data，就会反应到视图中了
                    var lengths = response.data.result.list.length;
                    for (var i = 0; i < lengths; i++) {
                      _this.tixiandata.push(response.data.result.list[i]);
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
                  });
              }
              if (sw == false) {
                // console.log("正在加载中");
                _this.messages = "正在加载中....";
              }
            }
          }
        });
      }
    }
  }
};
</script>

<style>
.leftbox {
  text-align: center;
  float: left;
  border: 0.1rem solid #ffffff;
}
body {
  background: #f1f1f1;
}
</style>