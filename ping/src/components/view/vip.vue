<template>
  <section style="">
    <div style="position:absolute;background:#ffffff">
        <div style="position:fixed;z-index:999;width:100%">
          <van-cell-group>
            <van-search v-model="keyWord" show-action @search="Search"  placeholder="搜索您要搜索的宝贝">
              <van-button slot="action" @click="Search" type="danger" size="small">搜索</van-button>
            </van-search>
          </van-cell-group>
        </div> 
    </div>
    <section style="height:50px;"></section>
    <section>
      <van-tabs v-model="active">
        <van-tab>
        <div slot="title" @click="superSearch">
          综合排序
        </div>
        <van-list>
          <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
          <div>
            <!-- 无数据的情况 -->
          <div v-if='rowlength==0||keyWord==""'>
            <img src="../../assets/icon/icon_good_search.png" style="width:100%;height:100%"/>
          </div>
            <!-- list列表 -->
          <div v-else>
              <van-list> 
                <van-row>
                  <div v-for="(r, key) in articles" :key="key" @click="JumpPageDetails(r.productId,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNum,r.couponSurplus,r.couponEnd)">
                    <div v-if="(key+1)%2==1">
                      <van-col span="12" class="img_border" >
                        <van-cell-group>
                          <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                            <img v-else :src="r.mainPic" class="goods-imgurl">
                            <div class="good_name" style="height:0.9rem;">
                              <van-tag type="danger">{{r.source}}</van-tag> {{r.title}}</div>
                              <div>
                                <span>
                                  <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                </span>
                                  <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                              </div>
                              <div style="height:0.9rem">
                                <span class="price_style">￥{{r.price}}</span>
                                <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                <span class="salenumber_style">已售{{r.salesNum}}件</span>                       
                              </div>
                        </van-cell-group>
                      </van-col>
                    </div>
                    <div v-else>
                      <van-cell-group>
                          <van-col span="12" class="img_border" >
                              <van-cell-group>
                                  <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                                      <div class="good_name" style="height:0.9rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                      <div>
                                        <span>
                                          <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                        </span>
                                        <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                      </div>
                                      <div style="height:0.9rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                        <span class="salenumber_style">已售{{r.salesNum}}件</span>
                                      </div>
                              </van-cell-group>                                    
                          </van-col>
                        </van-cell-group>
                      </div>
                  </div>  
                </van-row>
                <div style="text-align:center;font-size:16px;background:#ffffff;color:#999;">{{messages}}</div>
              </van-list>
          </div>
          </div>
          </van-pull-refresh>  
        </van-list>
        </van-tab>

        <van-tab>
        <div slot="title" @click="daysaleSearch">
          销量最高
        </div>
        <van-list>
          <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
          <div>
            <!-- 无数据的情况 -->
          <div v-if='rowlength==0'>
            <img src="../../assets/icon/icon_good_search.png" style="width:100%;height:100%"/>
              <!-- <div style="text-align:center">暂无数据哦...</div> -->
          </div>
            <!-- list列表 -->
          <div v-else>
              <van-list> 
                <van-row>
                  <div v-for="(r, key) in daysaledata" :key="key" @click="JumpPageDetails(r.productId,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNum,r.couponSurplus,r.couponEnd)">
                    <div v-if="(key+1)%2==1">
                      <van-col span="12" class="img_border" >
                        <van-cell-group>
                           <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                           <img v-else :src="r.mainPic" class="goods-imgurl">
                            <div class="good_name" style="height:0.9rem;">
                              <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                              <div>
                                <span>
                                  <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                </span>
                                  <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                              </div>
                              <div style="height:0.9rem">
                                <span class="price_style">￥{{r.price}}</span>
                                <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                <span class="salenumber_style">已售{{r.salesNum}}件</span>                       
                              </div>
                        </van-cell-group>
                      </van-col>
                    </div>
                    <div v-else>
                      <van-cell-group>
                          <van-col span="12" class="img_border" >
                              <van-cell-group>
                                   <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                                      <div class="good_name" style="height:0.9rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                      <div>
                                        <span>
                                          <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                        </span>
                                        <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                      </div>
                                      <div style="height:0.9rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                        <span class="salenumber_style">已售{{r.salesNum}}件</span>
                                      </div>
                              </van-cell-group>                                    
                          </van-col>
                        </van-cell-group>
                      </div>
                  </div>  
                </van-row>
                <div style="text-align:center;font-size:16px;background:#ffffff;color:#999;">{{messages}}</div>
              </van-list>
          </div>
          </div>
          </van-pull-refresh>  
        </van-list>
        </van-tab>

        <van-tab>
        <div slot="title" @click="onlyqSearch">
          仅看有券
        </div>
        <van-list>
          <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
          <div>
            <!-- 无数据的情况 -->
          <div v-if='rowlength==0'>
            <img src="../../assets/icon/icon_good_search.png" style="width:100%;height:100%"/>
              <!-- <div style="text-align:center">暂无数据哦...</div> -->
          </div>
            <!-- list列表 -->
          <div v-else>
              <van-list> 
                <van-row>
                  <div v-for="(r, key) in onlyqdata" :key="key" @click="JumpPageDetails(r.productId,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNum,r.couponSurplus,r.couponEnd)">
                    <div v-if="(key+1)%2==1">
                      <van-col span="12" class="img_border" >
                        <van-cell-group>
                           <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                            <div class="good_name" style="height:0.9rem;">
                              <van-tag type="danger">{{r.source}}</van-tag> {{r.title}}</div>
                              <div>
                                <span>
                                  <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                </span>
                                  <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                              </div>
                              <div style="height:0.9rem">
                                <span class="price_style">￥{{r.price}}</span>
                                <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                <span class="salenumber_style">已售{{r.salesNum}}件</span>                       
                              </div>
                        </van-cell-group>
                      </van-col>
                    </div>
                    <div v-else>
                      <van-cell-group>
                          <van-col span="12" class="img_border" >
                              <van-cell-group>
                                   <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                                      <div class="good_name" style="height:0.9rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                      <div>
                                        <span>
                                          <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                        </span>
                                        <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                      </div>
                                      <div style="height:0.9rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                        <span class="salenumber_style">已售{{r.salesNum}}件</span>
                                      </div>
                              </van-cell-group>                                    
                          </van-col>
                        </van-cell-group>
                      </div>
                  </div>  
                </van-row>
                <div style="text-align:center;font-size:16px;background:#ffffff;color:#999;">{{messages}}</div>
              </van-list>
          </div>
          </div>
          </van-pull-refresh>  
        </van-list>
        </van-tab>

        <van-tab>
        <div slot="title" @click="ishtSearch">
          海外商品
        </div>
        <van-list>
          <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
          <div>
            <!-- 无数据的情况 -->
          <div v-if='rowlength==0'>
            <img src="../../assets/icon/icon_good_search.png" style="width:100%;height:100%"/>
              <!-- <div style="text-align:center">暂无数据哦...</div> -->
          </div>
            <!-- list列表 -->
          <div v-else>
              <van-list> 
                <van-row>
                  <div v-for="(r, key) in ishtdata" :key="key" @click="JumpPageDetails(r.productId,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNum,r.couponSurplus,r.couponEnd)">
                    <div v-if="(key+1)%2==1">
                      <van-col span="12" class="img_border" >
                        <van-cell-group>
                           <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                            <div class="good_name" style="height:0.9rem;">
                              <van-tag type="danger">{{r.source}}</van-tag> {{r.title}}</div>
                              <div>
                                <span>
                                  <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                </span>
                                  <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                              </div>
                              <div style="height:0.9rem">
                                <span class="price_style">￥{{r.price}}</span>
                                <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                <span class="salenumber_style">已售{{r.salesNum}}件</span>                       
                              </div>
                        </van-cell-group>
                      </van-col>
                    </div>
                    <div v-else>
                      <van-cell-group>
                          <van-col span="12" class="img_border" >
                              <van-cell-group>
                                   <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                                      <div class="good_name" style="height:0.9rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                      <div>
                                        <span>
                                          <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                        </span>
                                        <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                      </div>
                                      <div style="height:0.9rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                        <span class="salenumber_style">已售{{r.salesNum}}件</span>
                                      </div>
                              </van-cell-group>                                    
                          </van-col>
                        </van-cell-group>
                      </div>
                  </div>  
                </van-row>
                <div style="text-align:center;font-size:16px;background:#ffffff;color:#999;">{{messages}}</div>
              </van-list>
          </div>
          </div>
          </van-pull-refresh>  
        </van-list>
        </van-tab>

        <van-tab>
        <div slot="title" @click="tianmaoSearch">
          天猫优先
        </div>
        <van-list>
          <van-pull-refresh v-model.lazy="isLoading" @refresh="onRefresh">
          <div>
            <!-- 无数据的情况 -->
          <div v-if='rowlength==0'>
            <img src="../../assets/icon/icon_good_search.png" style="width:100%;height:100%"/>
              <!-- <div style="text-align:center">暂无数据哦...</div> -->
          </div>
            <!-- list列表 -->
          <div v-else>
              <van-list> 
                <van-row>
                  <div v-for="(r, key) in tianmaodata" :key="key" @click="JumpPageDetails(r.productId,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNum,r.couponSurplus,r.couponEnd)">
                    <div v-if="(key+1)%2==1">
                      <van-col span="12" class="img_border" >
                        <van-cell-group>
                           <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                            <div class="good_name" style="height:0.9rem;">
                              <van-tag type="danger">{{r.source}}</van-tag> {{r.title}}</div>
                              <div>
                                <span>
                                  <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                </span>
                                  <van-tag plain class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                              </div>
                              <div style="height:0.9rem">
                                <span class="price_style">￥{{r.price}}</span>
                                <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                <span class="salenumber_style">已售{{r.salesNum}}件</span>                       
                              </div>
                        </van-cell-group>
                      </van-col>
                    </div>
                    <div v-else>
                      <van-cell-group>
                          <van-col span="12" class="img_border" >
                              <van-cell-group>
                                   <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                  <img v-else :src="r.mainPic" class="goods-imgurl">
                                      <div class="good_name" style="height:0.9rem;">
                                        <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                      <div>
                                        <span>
                                          <van-tag type="danger" v-if="r.couponPrice!=0">{{r.couponPrice}}元优惠券</van-tag>
                                        </span>
                                        <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
                                      </div>
                                      <div style="height:0.9rem">
                                        <span class="price_style">￥{{r.price}}</span>
                                        <span v-if="r.couponPrice!=0" class="goods-express">&nbsp;原价:￥{{r.originPrice}}</span>
                                        <span class="salenumber_style">已售{{r.salesNum}}件</span>
                                      </div>
                              </van-cell-group>                                    
                          </van-col>
                        </van-cell-group>
                      </div>
                  </div>  
                </van-row>
                <div style="text-align:center;font-size:16px;background:#ffffff;color:#999;">{{messages}}</div>
              </van-list>
          </div>
          </div>
          </van-pull-refresh>  
        </van-list>
        </van-tab>
      </van-tabs>
    </section>
    <section>
              <div class="bottom_nav7"><van-icon name="e752" @click="back_top" style="font-size:36px;color:red;"/></div> 
    </section>
    <section style="height:50px;"></section>
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
                  <img src="../../assets/icon/icon_search_current.png" style="width:0.7rem;"/>
                   <div><span style="font-size:14px;">超级搜</span></div>
              </div>
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn style="width:25%;" @click="JumpLove">
              <div style="text-align:center;">
                  <img src="../../assets/icon/icons_love.png" style="width:0.7rem;"/>
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
  </section>
</template>
<script>
import notice from "../../assets/icon/icon_notices.png";
import icon_up from "../../assets/icon/icon_up.png";
export default {
  data() {
    return {
      url: "https://shg.yuf2.cn/shg-api/api/",
      // url2:
      //   "http://yuf2.cn/app/index.php?c=entry&i=2&m=bsht_tbkquan&do=gethdinfo&itemid=&sid=&itemfee=&itempic=&nb_shopid=",
      keyWord: "衣服",
      rowlength: "",
      isLoading: true,
      articles: {},
      onlyqdata: {},
      ishtdata: {},
      tianmaodata: {},
      daysaledata: {},
      messages: "",
      currentName: "综合排序",
      active: 0,
      number: 0
    };
  },
  mounted() {
    this.superSearch();
  },
  methods: {
    Search() {
      this.active = 0;
      this.superSearch();
    },
    // 综合排序
    superSearch() {
      let _this = this;
      _this.currentName = "综合排序";
      let sw = true;
      let limit = 1;
      let pagesize = 20;
      let sort = "tk_rate_des";
      // 此处使用node做了代理product/super-search?platform=2&pageNo=1&pageSize=20&q=%E8%A1%A3%E6%9C%8D&sort=tk_rate_des
      this.$axios
        .get(
          _this.url +
            "product/super-search?platform=2&pageNo=" +
            limit +
            "&pageSize=" +
            pagesize +
            "&sort=" +
            sort +
            "&q=" +
            _this.keyWord +
            "&isCoupon=false&isOverseas=false&isTmall=false"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.articles = response.data.result;
          var lengths = response.data.length;
          _this.rowlength = lengths;
          limit += 1;
          console.log(_this.articles);
        })
        .catch(function(error) {
          console.log(error);
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
        if (_this.currentName == "综合排序") {
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "product/super-search?platform=2&pageNo=" +
                    limit++ +
                    "&pageSize=" +
                    pagesize +
                    "&sort=" +
                    sort +
                    "&q=" +
                    _this.keyWord +
                    "&isCoupon=false&isOverseas=false&isTmall=false"
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.articles.push(response.data.result[i]);
                  }
                  // console.log(lengths)
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
        }
      });
    },
    // 只看有券
    onlyqSearch() {
      let _this = this;
      _this.currentName = "仅看有券";
      let sw = true;
      let pagesize = 20;
      let sort = "tk_rate_desc";
      let limit = 1;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "product/super-search?platform=2&pageNo=" +
            limit +
            "&pageSize=" +
            pagesize +
            "&sort=" +
            sort +
            "&q=" +
            _this.keyWord +
            "&isCoupon=true"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.onlyqdata = response.data.result;
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          limit += 1;
        })
        .catch(function(error) {
          console.log(error);
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
        // if ((_this.currentName = "仅看有券")) {
        if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
          //如果开关打开则加载数据
          if (sw == true) {
            // 将开关关闭
            sw = false;
            _this.$axios
              .get(
                _this.url +
                  "product/super-search?platform=2&pageNo=" +
                  limit++ +
                  "&pageSize=" +
                  pagesize +
                  "&sort=" +
                  sort +
                  "&q=" +
                  _this.keyWord +
                  "&isCoupon=true"
              )
              .then(function(response) {
                // 将新获取的数据push到vue中的data，就会反应到视图中了
                var lengths = response.data.result.length;
                for (var i = 0; i < lengths; i++) {
                  _this.onlyqdata.push(response.data.result[i]);
                }
                // console.log(lengths)
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
        // }
      });
    },
    //海外商品
    ishtSearch() {
      let _this = this;
      _this.currentName = "外";
      let sw = true;
      let limit = 1;
      let pagesize = 20;
      let sort = "tk_rate_desc";
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "product/super-search?platform=2&pageNo=" +
            limit +
            "&pageSize=" +
            pagesize +
            "&sort=" +
            sort +
            "&q=" +
            _this.keyWord +
            "&isOverseas=true"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.ishtdata = response.data.result;
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          limit += 1;
        })
        .catch(function(error) {
          console.log(error);
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
        // if (_this.currentName == "外") {
        if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
          //如果开关打开则加载数据
          if (sw == true) {
            // 将开关关闭
            sw = false;
            _this.$axios
              .get(
                _this.url +
                  "product/super-search?platform=2&pageNo=" +
                  limit++ +
                  "&pageSize=" +
                  pagesize +
                  "&sort=" +
                  sort +
                  "&q=" +
                  _this.keyWord +
                  "&isOverseas=true"
              )
              .then(function(response) {
                // 将新获取的数据push到vue中的data，就会反应到视图中了
                var lengths = response.data.result.length;
                for (var i = 0; i < lengths; i++) {
                  _this.ishtdata.push(response.data.result[i]);
                }
                // console.log(lengths)
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
        // }
      });
    },
    //天猫优先
    tianmaoSearch() {
      let _this = this;
      _this.currentName == "天猫优先";
      // alert(_this.currentName);
      let sw = true;
      let limit = 1;
      let pagesize = 20;
      let sort = "total_sales_desc";
      let type = 5;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "product/super-search?platform=2&pageNo=" +
            limit +
            "&pageSize=" +
            pagesize +
            "&sort=" +
            sort +
            "&q=" +
            _this.keyWord +
            "&isCoupon=false&isOverseas=false&isTmall=true"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.tianmaodata = response.data.result;
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          limit += 1;
          console.log(lengths);
        })
        .catch(function(error) {
          console.log(error);
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
        // if (_this.currentName == "天猫优先") {
        if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
          //如果开关打开则加载数据
          if (sw == true) {
            // 将开关关闭
            sw = false;
            _this.$axios
              .get(
                _this.url +
                  "product/super-search?platform=2&pageNo=" +
                  limit +
                  "&pageSize=" +
                  pagesize +
                  "&sort=" +
                  sort +
                  "&q=" +
                  _this.keyWord +
                  "&isCoupon=false&isOverseas=false&isTmall=true"
              )
              .then(function(response) {
                // 将新获取的数据push到vue中的data，就会反应到视图中了
                var lengths = response.data.result.length;
                for (var i = 0; i < lengths; i++) {
                  _this.tianmaodata.push(response.data.result[i]);
                }
                console.log(lengths);
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
        // }
      });
    },
    //销量最高
    daysaleSearch() {
      let _this = this;
      _this.currentName == "高";
      // alert(_this.currentName);
      let sw = true;
      let limit = 1;
      let pagesize = 20;
      let sort = "total_sales_desc";
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "product/super-search?platform=2&pageNo=" +
            limit +
            "&pageSize=" +
            pagesize +
            "&sort=" +
            sort +
            "&q=" +
            _this.keyWord
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.daysaledata = response.data.result;
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          limit += 1;
          console.log(lengths);
        })
        .catch(function(error) {
          console.log(error);
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
        // if (_this.currentName == "高") {
        if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
          //如果开关打开则加载数据
          if (sw == true) {
            // 将开关关闭
            sw = false;
            _this.$axios
              .get(
                _this.url +
                  "product/super-search?platform=2&pageNo=" +
                  limit++ +
                  "&pageSize=" +
                  pagesize +
                  "&sort=" +
                  sort +
                  "&q=" +
                  _this.keyWord
              )
              .then(function(response) {
                // 将新获取的数据push到vue中的data，就会反应到视图中了
                var lengths = response.data.result.length;
                for (var i = 0; i < lengths; i++) {
                  _this.daysaledata.push(response.data.result[i]);
                }
                console.log(lengths);
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
        // }
      });
    },
    // 跳转商品详情页r.productId,r.source,r.source,r.title,r.couponPrice,r.couponUrl,r.integral,r.price,r.originPrice,r.salesNumr,r.couponSurplus,r.couponEnd
    JumpPageDetails(
      productId,
      source,
      title,
      couponPrice,
      couponUrl,
      integral,
      price,
      originPrice,
      salesNum,
      couponSurplus,
      couponEnd
    ) {
      if (couponPrice == 0) {
        couponUrl = "couponUrl";
      }
      this.$router.push({
        path: "/shg",
        name: "superPageDetails",
        query: {
          productId: productId,
          source: source,
          title: title,
          couponPrice: couponPrice,
          couponUrl: couponUrl,
          integral: integral,
          price: price,
          originPrice: originPrice,
          salesNum: salesNum,
          couponSurplus: couponSurplus,
          couponEnd: couponEnd
        }
      });
    },
    back_top() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    JumpLove() {
      this.$router.push({
        path: "/shg",
        name: "love"
      });
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
    onRefresh() {
      // 下拉刷新
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.searchfunction);
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
.goods-imgurl {
  width: 100%;
  height: 5rem;
  margin: auto;
}
.img_border {
  border: 0.05rem solid #f1f1f1;
}

.intergral_style {
  color: #fa2509;
  font-size: 0.3rem;
}

.price_style {
  color: red;
  font-size: 0.5rem;
}

.goods-express {
  color: #999;
  font-size: 0.3rem;
}

.salenumber_style {
  color: #999;
  font-size: 0.2rem;
}
.bottom_nav7 {
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  position: fixed;
  bottom: 60px;
  right: 20px;
  background-image: #faf609;
  text-align: center;
}
</style>
