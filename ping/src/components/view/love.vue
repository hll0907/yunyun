<template>
  <section>
    <section>
      <van-notice-bar :text="nitice" :left-icon="notice_icon"/>
    </section>
    <section>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div>
          <!-- 无数据的情况 -->
          <div v-if='rowlength==0'>
            <img src="../../assets/icon/icon_love_null.png" style="width:100%;height:100%;"/>
            <!-- <div style="text-align:center;">暂无收藏哦.....</div> -->
          </div>
          <div v-else>
          <van-list>
              <section v-for="(r, key) in articles" :key="key" track-ty='key'>
                <div>
                  <van-card>
                      <div slot="thumb">
                        <img :src="r.mainPic" style="width:100%;height:100%;"/>
                      </div>
                      <div slot="title">
                        <span style="font-size:12px;" @click="JumpPageDetails(r.productId)">
                          <span class="good_name"><van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</span></span>
                      </div>
                      <div slot="desc">
                        <span style="color:#999;font-size:10px;">已售{{r.salesNum}}件&nbsp;&nbsp;&nbsp;
                          <van-tag plain  style="color: #fa2509;font-size:8px;">约奖:{{r.integral}} 积分</van-tag>
                        </span>
                      </div>
                       <div slot="tags" style="text-align:left;">
                              <span style="font-size:16px;color:red">￥{{r.price}}</span>
                              <span style="font-size:12px;text-decoration:line-through;color:#999">￥{{r.originPrice}}</span>
                              <van-tag type="danger">优惠券{{r.couponPrice}}元</van-tag>
                      </div>
                      <div slot="footer" style="text-align:right;">
                        <section style="text-align:center;" @click="JumpDelCollect(r.productId)">
                        <img src="../../assets/icon/icon_del.png" style="width:0.4rem;"/>
                        <span style="font-size:14px;color:#999">删除</span>
                        </section>
                      </div>
                  </van-card>
                  </div>
                  
                  <section style="height:10px;"></section>
              </section>
              <div style="text-align:center;font-size:14px;background:#f1f1f1;">
                <div style="text-align:center;"><div>&nbsp;{{messages}}</div></div>                        
               </div>
            </van-list>
          </div>
        </div>
      </van-pull-refresh>
    </section>
    <!-- 底部标签 -->
    <div>
        <van-row>
            <van-goods-action>
            <van-goods-action-mini-btn style="width:25%;" @click="JumpIndex">
                <div style="text-align:center;">
                <img src="../../assets/icon/icons_index.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">首页</span></div>
                </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;" @click="JumpVip">
              <div style="text-align:center;">
                  <img src="../../assets/icon/icon_search.png" style="width:0.7rem;"/>
                   <div><span style="font-size:14px;">超级搜</span></div>
              </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;" >
              <div style="text-align:center;color:red;">
                  <img src="../../assets/icon/icons_love_current.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">收藏</span></div>
              </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;" @click="JumpUser">
                <div style="text-align:center;">
                  <img src="../../assets/icon/icons_my.png" style="width:0.7rem;"/>
                  <div><span style="font-size:14px;">我的</span></div>
                </div>
            </van-goods-action-mini-btn>
        </van-goods-action>
        </van-row>
    </div>
    <section style="height:50px;"></section>
  </section>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { Loading } from "vant";
import noshopPic from "../../assets/icon/icon_noshopPic.png";
import notice from "../../assets/icon/icon_notices.png";
export default {
  data() {
    return {
      isLoading: false,
      url: "https://shg.yuf2.cn/shg-api/api/",
      userId: 0,
      nitice: "如未发现新收藏的商品,请下拉刷新即可",
      notice_icon: notice,
      articles: {},
      rowlength: "",
      messages: "",
      noshopPic: noshopPic,
      offHeight: ""
    };
  },
  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.userId = dataJson.userId;
    this.getCollectdata();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getCollectdata();
        this.count++;
      }, 500);
    },
    JumpVip() {
      this.$router.push({
        path: "/shg",
        name: "vip"
      });
    },
    JumpIndex() {
      this.$router.push({
        path: "/shg",
        name: "indexs"
      });
    },
    JumpUser() {
      this.$router.push({
        path: "/shg",
        name: "user"
      });
    },
    getCollectdata() {
      // 缓存指针
      let _this = this;
      if (_this.userId == "") {
        _this.$toast("当前您还未登录哦");
      } else {
        let page = 1;
        let sw = true;
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/product/my_collect?userId=" +
              _this.userId +
              "&page=" +
              page
          )
          .then(function(response) {
            // 将得到的数据放到vue中的data
            _this.articles = response.data.result;
            var lengths = response.data.result.length;
            _this.rowlength = lengths;
            page += 1;
            if (lengths == 10) {
              _this.messages = "我已经到底了";
            }
          })
          .catch(function(error) {
            console.log(error);
            _this.$toast("网络异常错误...");
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
            //alert("到达底部");
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .post(
                  _this.url +
                    "/product/my_collect?userId=" +
                    _this.userId +
                    "&page=" +
                    page++
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.articles.push(response.data.result[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
                  if (lengths == 0 || lengths == null) {
                    _this.messages = "我已经到底了";
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
    JumpDelCollect(productIds) {
      Dialog.confirm({
        title: "确认删除",
        message: "确定删除您的收藏吗?",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          // 缓存指针
          let _this = this;
          // 此处使用node做了代理
          this.$axios
            .post(
              _this.url +
                "/product/uncollect?userId=" +
                _this.userId +
                "&productIds=" +
                productIds
            )
            .then(function(response) {
              if (response.data.code == 1) {
                _this.getCollectdata();
                _this.$toast(response.data.message);
                console.log(response.data.message);
              }
            })
            .catch(function(error) {
              console.log(error);
              _this.$toast("网络异常错误...");
            });
        })
        .catch(() => {
          // on cancel
        });
    }, // 跳转商品详情页
    JumpPageDetails(goodsId) {
      var goodsId = goodsId;
      this.$router.push({
        path: "/shg",
        name: "PageDetails",
        query: { goodsId: goodsId }
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

.good_name {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.25rem;
}
</style>
