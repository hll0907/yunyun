<template>
<div>
    <section>
        <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
            <div>
                <!-- 无数据的情况 -->
                <div v-if='rowlength==0'>
                    <img src="../../assets/icon/icon_datakong.png" class="goods-imgurl"/>
                    <!-- <div style="text-align:center">暂无数据哦...</div> -->
                </div>
                    <!-- list列表 -->
                <div v-else>
                        <van-list> 
                            <van-row>
                            <div v-for="(r, key) in articles" :key="key" @click="JumpPageDetails(r.productId)">
                                <div v-if="(key+1)%2==1">
                                    <van-col span="12" class="img_border" >
                                        <van-cell-group>
                                        <img :src="r.mainPic" class="goods-imgurl">
                                        <div class="good_name" style="height:0.8rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                        <div>
                                            <span>
                                                <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                            </span>
                                            <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                        </div>
                                        <div style="height:0.8rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                            <span class="salenumber_style">已拼{{r.salesNum}}件</span>                       
                                        </div>
                                        </van-cell-group>
                                    </van-col>
                                </div>
                                <div v-else>
                                    <van-cell-group>
                                        <van-col span="12" class="img_border" >
                                         <van-cell-group>
                                            <img :src="r.mainPic" class="goods-imgurl">
                                              <div class="good_name" style="height:0.8rem;">
                                                  <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                              <div>
                                                <span>
                                                 <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                                </span>
                                                <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                              </div>
                                              <div style="height:0.8rem">
                                              <span class="price_style">￥{{r.price}}</span>
                                              <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                              <span class="salenumber_style">已拼{{r.salesNum}}件</span>
                                              </div>
                                          </van-cell-group>                                    
                                        </van-col>
                                    </van-cell-group>
                                </div>
                            </div>  
                            </van-row>
                        </van-list>
                </div>
            </div>
        </van-pull-refresh> 
    </section>
</div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      isLoading: true,
      url: "https://shg.yuf2.cn/shg-api/api/product/",
      articles: {},
      urlKey: "",
      rowlength: 0,
    };
  },
  mounted() {
    this.getbranddata();
  },
  methods: {
    getbranddata() {
      // 缓存指针
      let _this = this;
      // 设置一个开关来避免重负请求数据
      let sw = true;
      let page=1;
      // 此处使用node做了代理
      this.$axios
        .get(_this.url + "/brand")
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.articles = response.data.result;
          // console.log(_this.articles);
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          page+=1;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onRefresh() {
      // 下拉刷新
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 跳转商品详情页
    JumpPageDetails(productId) {
      var goodsId = productId;
      this.$router.push({
        path: "/shg",
        name: "PageDetails",
        query: {
          goodsId: goodsId
        },
        params: {
          data: this.value
        }
      });
    }
  },
};
</script>
<style lang="less">
@import "../../common/css/search.css";
@import "../../common/css/fontface.css";
.searchBar {
  .isFixed {
    position: fixed;
    z-index: 999;
    width: 100%;
  }
}
</style>