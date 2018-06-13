<template>
  <div style="background:#ffffff;">
      <section>
          <van-tabs v-model="active">
            <van-tab>
                <div slot="title">
                    <span @click="getcommissiondata">积分提现记录</span>
                </div>
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list>
                    <section style="background:#ffffff;">
                    <div v-if="lengths==''||lengths==0" style="text-align:center;color:#999">
                       <img src="../../assets/icon/icon_datakong.png" style="width:100%"/>
                    </div>
                    <div v-else v-for="(r, key) in recordsdata" :key="key" >
                        <div style="margin:12px;">
                        <van-row>
                            <van-col span="12" v-if="r.status==0" style="font-size:18px;">申请驳回</van-col>
                            <van-col span="12" v-if="r.status==1" style="font-size:18px;">申请中</van-col>
                            <van-col span="12" v-if="r.status==2" style="font-size:18px;">发放成功</van-col>
                            <van-col span="12">
                                <div style="text-align:right;font-size:18px;">
                                   <span v-if="r.status==1||r.status==2" style="color:red">-{{r.integral}}</span>
                                    <span v-else style="color:green">+{{r.integral}}</span>
                                </div></van-col>
                        </van-row>
                        <van-row>
                            <div style="font-size:14px;margin-top:5px;">{{r.note}}</div>
                        </van-row>
                        <van-row>
                            <van-col span="12" style="color:#999;margin-top:5px;">提交时间{{r.created_at}}</van-col>
                            <van-col span="12"><div style="text-align:right;margin-top:5px;">更新时间：{{r.updatedAt}}</div></van-col>
                        </van-row>
                        </div>
                        <section style="height:5px;background:#f1f1f1;"></section>
                    </div>
                </section>
                <div style="color:#999;text-align:center;" v-if="lengths!=0">{{messages}}</div>
                </van-list>
                </van-pull-refresh>
            </van-tab>
           
        </van-tabs>
      </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      id: 0,
      url: "https://shg.yuf2.cn/shg-api/api/",
      recordsdata: {},
      isLoading: true,
      lengths: "",
      messages: ""
    };
  },
  mounted() {
    this.getParams();
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.id = dataJson.userId;
    this.getcommissiondata();
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
        this.getcommissiondata();
        this.$toast("数据刷新成功");
        this.isLoading = false;
      }, 500);
    },
    getcommissiondata() {
      // 缓存指针
      let _this = this;
      if (_this.id == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        // 此处使用node做了代理
        let page = 1;
        let sw = true;
        this.$axios
          .get(
            _this.url + "/integral/extract?userId=" + _this.id + "&page=" + page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            if (response.data.code == 1) {
              page += 1;
              _this.recordsdata = response.data.result.list;
              _this.lengths = response.data.result.list.length;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // 注册scroll事件并监听
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
                      "/integral/extract?userId=" +
                      _this.id +
                      "&page=" +
                      page++
                  )
                  .then(function(response) {
                    // 将得到的数据放到vue中的data
                    if (response.data.code == 1) {
                      var lengths = response.data.result.list.length;
                      for (var i = 0; i < lengths; i++) {
                        _this.recordsdata.push(response.data.result.list[i]);
                      }
                    }
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
                _this.messages = "正在加载中....";
              }
            }
        });
      }
    }
  }
};
</script>
<style lang="less">
body {
  background: #f1f1f1;
}
.leftbox {
  text-align: center;
  float: left;
  border: 0.1rem solid #ffffff;
}
</style>