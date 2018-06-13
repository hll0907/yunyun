<template>
<div>
    <section class="searchBar" id="searchBar">
    <!-- 搜索框 -->
    <div :class="searchBarFixed == true ? 'isFixed' :''">
        <van-search v-model="value" show-action placeholder="搜索商品" style="padding:2px;">
            <div slot="action"><van-button type="default" size="small" @click="getdatas" style="background:red;color:#ffffff;">搜索</van-button></div>
        </van-search>
    </div>
    </section>
    <section>
       <van-tabs v-model="active" type="line">
        <div>
            <van-tab>
                <div slot="title" @click="getdata">
                    <span>智能推荐</span>
                </div>
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
                                <div v-for="(r, key) in articles" :key="key" @click="JumpPageDetails(r.productId)">
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
                                               <!-- <van-tag class="intergral_style" plain v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag class="intergral_style" plain v-else>约奖:{{r.integral}} 白积分</van-tag> -->
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
            </van-tab>
            <van-tab>
                <div slot="title" @click="getdatahighreward">
                    <span>奖励最高</span>
                </div>
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
                                <div v-for="(r, key) in highreward" :key="key" @click="JumpPageDetails(r.productId)">
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
                                                <!-- <van-tag plain class="intergral_style" v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag plain class="intergral_style"  v-else>约奖:{{r.integral}} 白积分</van-tag> -->
                                              <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
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
                                               <!-- <van-tag class="intergral_style" plain v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag class="intergral_style" plain v-else>约奖:{{r.integral}} 白积分</van-tag> -->
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
            </van-tab>
            <van-tab>
                <div slot="title" @click="getdatahighdiscount">
                    <span>优惠最大</span>
                </div>
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
                                <div v-for="(r, key) in highdiscount" :key="key" @click="JumpPageDetails(r.productId)">
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
                                                <!-- <van-tag plain class="intergral_style" v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag plain class="intergral_style"  v-else>约奖:{{r.integral}} 白积分</van-tag> -->
                                              <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
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
                                               <!-- <van-tag class="intergral_style" plain v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag class="intergral_style" plain v-else>约奖:{{r.integral}} 白积分</van-tag> -->
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

            </van-tab>
            <van-tab>
                <div slot="title" @click="getdatahighsales">
                    <span>销量最高</span>
                </div>
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
                                <div v-for="(r, key) in highsales" :key="key" @click="JumpPageDetails(r.productId)">
                                    <div v-if="(key+1)%2==1">
                                        <van-col span="12" class="img_border" >
                                          <van-cell-group>
                                            <img v-if="r.mainPic==''||r.mainPic==null" src="../../assets/icon/icon_img_load.png" class="goods-imgurl">
                                            <img v-else :src="r.mainPic" class="goods-imgurl">
                                              <div class="good_name" style="height:0.9rem;">
                                                <van-tag type="danger">{{r.source}}</van-tag>{{r.title}}</div>
                                              <div>
                                                <span>
                                                 <van-tag v-if="r.couponPrice!=0" type="danger">{{r.couponPrice}}元优惠券</van-tag>
                                                </span>
                                                <!-- <van-tag plain class="intergral_style" v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag plain class="intergral_style"  v-else>约奖:{{r.integral}} 白积分</van-tag> -->
                                              <van-tag plain  class="intergral_style" style="color: #fa2509;">约奖:{{r.integral}} 积分</van-tag>
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
                                               <!-- <van-tag class="intergral_style" plain v-if="r.hasQuanfan==true">云联全返</van-tag>
                                                <van-tag class="intergral_style" plain v-else>约奖:{{r.integral}} 白积分</van-tag> -->
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
            </van-tab>
        </div>
    </van-tabs>
    </section>
        <div class="bottom_nav6"><van-icon name="e752" @click="back_top" style="font-size:36px;color:red;"/></div> 
</div>
</template>
<script>
// import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      isLoading: true,
      url: "https://shg.yuf2.cn/shg-api/api/",
      articles: {},
      highreward: {},
      highdiscount: {},
      highsales: {},
      searchBarFixed: false,
      img: "",
      messages: "",
      rowlength: "",
      pageSize: 10, //每页条数
      sortType: "0", //排列次数
      value: "", //搜索关键字
      currentName: "智能推荐"
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getParams();
    this.getdata();
    this.getdatas();
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var a =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      var offsetTops = a;
      if (scrollTop + offsetTops > offsetTops) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },
    getdata() {
      // 缓存指针
      let _this = this;
      _this.currentName = "智能推荐";
      // 设置一个开关来避免重负请求数据
      let sw = true;
      let page = 1;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "/product/other/list?keyword=" +
            _this.value +
            "&page=" +
            page +
            "&pageRows=" +
            _this.pageSize +
            "&sortType=time"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.articles = response.data.result;
          // console.log(_this.articles);
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          page += 1;
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
        if (_this.currentName == "智能推荐") {
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //alert("到达底部");
            // console.log(sw);
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "/product/other/list?keyword=" +
                    _this.value +
                    "&page=" +
                    page++ +
                    "&pageRows=" +
                    _this.pageSize +
                    "&sortType=time"
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.articles.push(response.data.result[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
                })
                .catch(function(error) {
                  console.log(error);
                  _this.$toast("网络异常错误...");
                });
            }
            if (sw == false) {
              _this.messages = "正在加载中...";
              // console.log("正在加载中");
            }
          }
        }
      });
    },
    getdatahighreward() {
      // 缓存指针
      let _this = this;
      _this.currentName = "奖励最高";
      // 设置一个开关来避免重负请求数据
      let sw = true;
      let pages = 1;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "/product/other/list?keyword=" +
            _this.value +
            "&page=" +
            pages +
            "&pageRows=" +
            _this.pageSize +
            "&sortType=reward"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.highreward = response.data.result;
          // console.log(_this.highreward);
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          pages += 1;
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
        if (_this.currentName == "奖励最高") {
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //alert("到达底部");
            // console.log(sw);
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "/product/other/list?keyword=" +
                    _this.value +
                    "&page=" +
                    pages++ +
                    "&pageRows=" +
                    _this.pageSize +
                    "&sortType=reward"
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.highreward.push(response.data.result[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
                })
                .catch(function(error) {
                  console.log(error);
                  _this.$toast("网络异常错误...");
                });
            }
            if (sw == false) {
              _this.messages = "正在加载中...";
              // console.log("正在加载中");
            }
          }
        }
      });
    },
    getdatahighdiscount() {
      // 缓存指针
      let _this = this;
      _this.currentName = "优惠最大";
      // 设置一个开关来避免重负请求数据
      let sw = true;
      let pages = 1;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "/product/other/list?keyword=" +
            _this.value +
            "&page=" +
            pages +
            "&pageRows=" +
            _this.pageSize +
            "&sortType=coupon"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.highdiscount = response.data.result;
          // console.log(_this.highdiscount);
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          pages += 1;
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
        if (_this.currentName == "优惠最大") {
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //alert("到达底部");
            // console.log(sw);
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "/product/other/list?keyword=" +
                    _this.value +
                    "&page=" +
                    pages++ +
                    "&pageRows=" +
                    _this.pageSize +
                    "&sortType=coupon"
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.highdiscount.push(response.data.result[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
                })
                .catch(function(error) {
                  console.log(error);
                  _this.$toast("网络异常错误...");
                });
            }
            if (sw == false) {
              _this.messages = "正在加载中...";
              // console.log("正在加载中");
            }
          }
        }
      });
    },
    getdatahighsales() {
      // 缓存指针
      let _this = this;
      _this.currentName = "销量最高";
      // 设置一个开关来避免重负请求数据
      let sw = true;
      let pages = 1;
      // 此处使用node做了代理
      this.$axios
        .get(
          _this.url +
            "/product/other/list?keyword=" +
            _this.value +
            "&page=" +
            pages +
            "&pageRows=" +
            _this.pageSize +
            "&sortType=sale"
        )
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.highsales = response.data.result;
          // console.log(_this.highsales);
          var lengths = response.data.result.length;
          _this.rowlength = lengths;
          pages += 1;
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
        if (_this.currentName == "销量最高") {
          if (a + Math.floor(b) == c || a + Math.ceil(b) == c) {
            //alert("到达底部");
            // console.log(sw);
            //如果开关打开则加载数据
            if (sw == true) {
              // 将开关关闭
              sw = false;
              _this.$axios
                .get(
                  _this.url +
                    "/product/other/list?keyword=" +
                    _this.value +
                    "&page=" +
                    pages++ +
                    "&pageRows=" +
                    _this.pageSize +
                    "&sortType=sale"
                )
                .then(function(response) {
                  // 将新获取的数据push到vue中的data，就会反应到视图中了
                  var lengths = response.data.result.length;
                  for (var i = 0; i < lengths; i++) {
                    _this.highsales.push(response.data.result[i]);
                  }
                  // 数据更新完毕，将开关打开
                  sw = true;
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
    back_top() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.params.data;
      // 将数据放在当前组件的数据内
      this.value = routerParams;
      var keyword = window.location.href;
      var i = keyword.indexOf("=");
      this.value = decodeURI(keyword.substring(i + 1, keyword.length));
    },
    onRefresh() {
      // 下拉刷新
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getdatas();
        this.count++;
      }, 500);
    },
    getdatas() {
      this.$router.push({
        path: "/shg",
        name: "search",
        query: { keyword: this.value },
        params: {
          data: this.value
        }
      });
      //  alert(this.active);
      if (this.currentName == "智能推荐") {
        this.getdata();
      } else if (this.currentName == "奖励最高") {
        this.getdatahighreward();
      } else if (this.currentName == "优惠最大") {
        this.getdatahighdiscount();
      } else if (this.currentName == "销量最高") {
        this.getdatahighsales();
      }
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
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
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