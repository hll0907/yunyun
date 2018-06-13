<template>
  <div>
    <!--轮播图片-->
    <div>
      <van-swipe class="goods-swipe" :autoplay="4000" v-if="code==1">
        <van-swipe-item v-for="(img, index) in images" :key="index">
        <img :src="img" style="height:10.0rem;">
        </van-swipe-item>
      </van-swipe>

      <van-swipe class="goods-swipe" :autoplay="4000" v-else>
        <img src="../../assets/icon/icon_img_load.png" style="height:10.0rem;">
      </van-swipe>
    </div>
    <!-- 价格 -->
    <div style="background:#ffffff;">
      <div style="height:0.2rem;">&nbsp;</div>
      <div style="margin:0.1rem;">
        <div>
          <div style="float:left;">
          <span style="font-size:0.5rem;color:red;">{{articles.price}}元</span> 
          <span v-if="articles.couponPrice!=0" style="text-decoration:line-through;color:#999">￥{{articles.originPrice}}</span> 
          </div>
          <div style="text-align:right;color:#999;">
          已售{{articles.salesNum}}件
          </div>
          <div style="clear:both;"></div>
          </div>
        <div style="font-size:0.4rem;">
          <van-tag type="danger">{{articles.source}}</van-tag>{{articles.title}}</div>
        <div>
          <div style="float:left;">
          <van-tag type="danger" plain v-if="articles.couponPrice!=0">{{articles.couponPrice}}元优惠券</van-tag>
          </div>
          <div v-if="articles.couponPrice!=0" style="text-align:right;color:#999;">
          <span>剩余{{articles.couponSurplus}}张</span>
          <span>到期{{articles.couponEnd}}</span>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    </div>

    <!-- 奖励 -->
    <div style="background:#ffffff">
      <div>
        <div>
         <van-cell-group>
          <!-- <van-cell  > -->
             <van-cell is-link value="购物须知" @click="onClickGoshop">
            <template slot="title">
              <span style="color:#f05a03">约奖：{{articles.integral}}积分</span>
            </template>
          </van-cell>
        </van-cell-group>
        </div>
      </div>
    </div>

    <div style="height:0.1rem;">&nbsp;</div>
    <div style="background:#ffffff;">
      <div style="margin:0rem 0.1rem 0rem 0.1rem">
        <p style="text-align:center;">商品详细图文</p>
        <div>{{articles.note}}</div>
      </div>
    </div>
    <div style="height:0.1rem;">&nbsp;</div>
    <div v-for="(r, index) in detailImages" :key="index">
      <img :src="r" alt="暂无图片" style="width:100%;height:100%;" >
    </div>

    <div class="bottom_nav9">
      <div>
          <div @click="JumpAddCollect(goodsId)" v-if="hasCollect==false">
            <div style="text-align:center;">
              <van-icon name="e619"/>
              <div style="margin:2px;">加入收藏夹</div>
            </div>
          </div>
          <div @click="JumpDelCollect(goodsId)" v-else>
            <div style="text-align:center;color:red;">
              <van-icon name="e619"/>
              <div style="margin:2px;">取消收藏</div>
            </div>
          </div>
          </div>
    </div> 
    <div style="background:#ffffff;height:50px;">&nbsp;</div>
    <!-- 底部菜单 -->
    <div>
      <van-goods-action>
        
        <!-- <van-goods-action-big-btn text="" @click="OnclickShare" /> -->
        <div>
        <div v-if="time==0">
          <div v-if="taobaoNumber==''">
            <van-submit-bar button-text="点击刷新" @submit="onClickLoad">
          <span slot="default">&nbsp;&nbsp;&nbsp;生成失败</span>
          </van-submit-bar>
          </div>
          <div v-else>
            <van-submit-bar  button-text="去购买" @submit="OnclickBuy" 
            v-clipboard:copy="taobaoNumber"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
         <div slot="default" v-if="articles.couponPrice!=0" style="color:red;">优惠券{{articles.couponPrice}}元,约奖{{articles.integral}}积分</div>
          <div slot="default" v-else style="color:red;">约奖{{articles.integral}}积分</div>
          </van-submit-bar>
          </div>
        </div>
        <div v-else>
        <van-submit-bar v-if="transferchainUrl==''||transferchainUrl==null" loading button-text="正在生成">
        <span slot="default">&nbsp;&nbsp;&nbsp;正在生成请稍候({{time}} s)</span>
        </van-submit-bar>
        <van-submit-bar v-else button-text="去购买" @submit="OnclickBuy" 
            v-clipboard:copy="taobaoNumber"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
         <div slot="default" v-if="articles.couponPrice!=0" style="color:red;">优惠券{{articles.couponPrice}}元,约奖{{articles.integral}}积分</div>
          <div slot="default" v-else style="color:red;">约奖{{articles.integral}}积分</div>
        </van-submit-bar>
        </div>
        </div>
      </van-goods-action>
    </div>

    <!-- <van-actionsheet v-model="helpshow" title="奖励说明">
      <p style="font-size:16px;">1、该奖励为约奖，指通过优惠价购买一件商品的积分奖励，多买多得（根据实际付款金额），实际到帐积分有上下微小浮动属于正常现象。</p>
      <p style="font-size:16px;">2、必须通过拼团客系统进入直接拼团付款才有奖励，进入后先收藏，再通过收藏下单是无奖励的，如需收藏，请使用拼团客系统的收藏夹。</p> 
      <p style="height:10px;"></p>
    </van-actionsheet> -->
    
    <van-dialog v-model="postsuccessshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:75%;background:#f1f1f1" :lock-scroll="false">
      <div class="banner-box" style="text-align:center;">
        <img src="../../assets/icon/icon_success.png" style="width:100%" />
      </div>
    </van-dialog>
    <van-dialog v-model="posterrorshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:75%;background:#f1f1f1" :lock-scroll="false">
      <div class="banner-box" style="text-align:center;">
        <img src="../../assets/icon/icon_error.png" style="width:100%" />
      </div>
    </van-dialog>
     <van-dialog v-model="goshopshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:80%;background:#f1f1f1" :lock-scroll="false">
      <div style="font-size:0.35rem;margin:2px;">1、{{content1}}</div>
      <div style="font-size:0.35rem;margin:2px;">2、{{content2}}</div>
      <div style="font-size:0.35rem;margin:2px;">3、{{content3}}</div>
      <div style="font-size:0.35rem;margin:2px;">4、{{content4}}</div>
      <div style="font-size:0.35rem;margin:2px;">5、{{content5}}</div>
    </van-dialog>
     <!-- <van-dialog v-model="postshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:75%;background:#f1f1f1" :lock-scroll="false">
      <div class="banner-box" style="text-align:center;">
        <img :src="shopimgurl" style="width:100%" 
        v-clipboard:copy="taobaoNumber"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"/>
      </div>
      <div style="text-align:center;">点击图片复制淘口令,打开手机淘宝,领取优惠券,购买更省钱哦</div>
    </van-dialog> -->

     <!-- <van-dialog v-model="shareshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:75%;background:#f1f1f1" :lock-scroll="false">
       <div class="banner-box" style="text-align:center;">
          <img src="../../assets/icon/icon_bg.png" style="width:100%;height:100%;display:none;" id="bg" crossorigin="Anonymous"/>
          <img :src="shopimgurl" style="width:100%;height:100%;display:none" id="img1" crossorigin="Anonymous"/>
          <canvas id="qrccode-canvas"  style="display:none;"></canvas>
          <img :src="imgSrcs" style="width:100%;height:100%;display:none" id="img2" crossorigin="Anonymous"/>
          <div style="margin-top:5px;"><img :src="scan" style="width:95%;height:95%;" id="scan" crossorigin="Anonymous"/></div>
          <canvas id="myCanvas" style="width:100%;;height:100%;display:none;"></canvas>
          <div>
          <div style="font-size:0.3rem;">点击分享优惠券，生成二维码</div>
          <van-button type="default" @click="createQrc" style="font-size:0.5rem;background:#FF8855;color:#FFFFFF">分享优惠券</van-button>
          <section style="height:5px;"></section>
          </div>
        </div>
    </van-dialog> -->
  </div>
</template>
<script>
var QRCode = require("qrcode");
import addpost from "../../assets/icon/icons_addpost.png";
import { Dialog } from "vant";
export default {
  data() {
    return {
      url: "https://shg.yuf2.cn/shg-api/api/",
      userId: 0,
      goodsId: "",
      articles: {},
      images: {},
      detailImages: {},
      code: 0,
      helpshow: false,
      postshow: false,
      shareshow: false,
      hasCollect: false,
      postsuccessshow: false,
      posterrorshow: false,
      goshopshow: false,
      couponUrl: "",
      shopName: "",
      shopimgurl: "",
      transferchainUrl: "",
      taobaoNumber: "",
      imgSrcs: "",
      scan: "",
      prices: "",
      scanUrl: "",
      time: 10
    };
  },

  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.userId = dataJson.userId;
    var keyword = window.location.href;
    var i = keyword.indexOf("Id=");
    this.goodsId = decodeURI(keyword.substring(i + 3, keyword.length));
    // alert(this.goodsId)
    this.getPageDetails();
    this.getPageDetailsImage();
    this.getConvertUrl();
    // this.$nextTick(function() {
    //   // DOM操作
    //   this.canvas = document.getElementById("qrccode-canvas");
    //   this.c = document.getElementById("myCanvas");
    // });
    // this.createQrc();
  },
  methods: {
    onClickGoshop() {
      this.getgoshop();
      this.goshopshow = true;
    },
    onClickLoad() {
      window.location.reload();
    },
    getPageDetails() {
      // 缓存指针
      let _this = this;
      let interval = window.setInterval(function() {
        if (_this.time-- <= 0) {
          _this.time = 0;
          window.clearInterval(interval); //停止
        }
      }, 1000);
      // 此处使用node做了代理
      this.$axios
        .get(_this.url + "/product/detail?productId=" + _this.goodsId)
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.articles = response.data.result;
          _this.shopName = response.data.result.title;
          _this.couponUrl = response.data.result.couponUrl;
          _this.shopimgurl = response.data.result.mainPic;
          _this.prices = response.data.result.price;
          _this.getConvertUrl();
        })
        .catch(function(error) {
          console.log(error);
          _this.$toast("该商品已下架了");
        });
    },
    getConvertUrl() {
      let _this = this;
      this.$axios
        .post(
          _this.url +
            "/product/convert_url?productId=" +
            _this.goodsId +
            "&couponUrl=" +
            _this.couponUrl
        )
        .then(function(response) {
          if (response.data.code == 1) {
            _this.transferchainUrl = response.data.result;
            // _this.makeShortUrl();
            _this.maketaobaocommand();
            // console.log(_this.transferchainUrl);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     getgoshop() {
      let _this = this;
      this.$axios
        .get("https://shg.yuf2.cn/shg-api/api/product/shopping_note")
        .then(function(response) {
          // console.log(response);
          var content = response.data.result.content;
          _this.content1 = content.substring(
            content.indexOf("1、") + 2,
            content.lastIndexOf("2、")
          );
          _this.content2 = content.substring(
            content.indexOf("2、") + 2,
            content.lastIndexOf("3、")
          );
          _this.content3 = content.substring(
            content.indexOf("3、") + 2,
            content.lastIndexOf("4、")
          );
          _this.content4 = content.substring(
            content.indexOf("4、") + 2,
            content.lastIndexOf("5、")
          );
          _this.content5 = content.substring(
            content.indexOf("5、") + 2,
            content.length
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //立即购买
    OnclickBuy() {
      this.maketaobaocommand();
    },
    // //分享优惠券
    // OnclickShare() {
    //   this.$nextTick(function() {
    //     // DOM操作
    //     this.canvas = document.getElementById("qrccode-canvas");
    //     this.c = document.getElementById("myCanvas");
    //   });
    //   // this.createQrc();
    //   this.shareshow = true;
    // },
    //生成短链
    // makeShortUrl() {
    //   let _this = this;
    //   this.$axios
    //     .get(_this.url + "/product/short-url?url=" + _this.transferchainUrl)
    //     .then(function(response) {
    //       if (response.data.code == 1) {
    //         _this.scanUrl = response.data.result;
    //         // console.log(response.data.result);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // //生成优惠券分享图片
    // createQrc: function() {
    //   // console.log(this.scanUrl);
    //   QRCode.toCanvas(this.canvas, this.scanUrl, error => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("success");
    //       var canvas = document.getElementById("qrccode-canvas");
    //       var imgSrc = canvas.toDataURL("image/png");
    //       this.imgSrcs = imgSrc;
    //       // console.log(this.imgSrcs);
    //       var c = document.getElementById("myCanvas");
    //       c.width = 600;
    //       c.height = 900;
    //       var ctx = c.getContext("2d");
    //       var img = document.getElementById("img1");
    //       var img2 = document.getElementById("img2");
    //       var bg = document.getElementById("bg");
    //       ctx.drawImage(bg, 0, 0, 600, 960);
    //       ctx.drawImage(img, 10, 10, 580, 580);
    //       ctx.drawImage(img2, 390, 660, 200, 200);
    //       ctx.font = "normal normal normal 28px Arial";
    //       ctx.lineWidth = 1;
    //       var lineWidth = 0;
    //       var canvasWidth = c.width; //计算canvas的宽度
    //       var initHeight = 618; //绘制字体距离canvas顶部初始的高度
    //       var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    //       for (let i = 0; i < this.shopName.length; i++) {
    //         lineWidth += ctx.measureText(this.shopName[i]).width;
    //         if (lineWidth > canvasWidth) {
    //           ctx.fillText(
    //             this.shopName.substring(lastSubStrIndex, i),
    //             10,
    //             initHeight
    //           ); //绘制截取部分
    //           initHeight += 30; //28为字体的高度
    //           lineWidth = 0;
    //           lastSubStrIndex = i;
    //         }
    //         if (i == this.shopName.length - 1) {
    //           //绘制剩余部分
    //           ctx.fillText(
    //             this.shopName.substring(lastSubStrIndex, i + 1),
    //             10,
    //             initHeight + 10
    //           );
    //         }
    //       }
    //       ctx.fillStyle = "red";
    //       ctx.fillText("￥" + this.prices + "元", 10, 700);
    //       ctx.fillStyle = "#999";
    //       ctx.fillText("长按图片发送给好友,", 10, 740);
    //       ctx.fillText("或保存到手机相册,", 10, 780);
    //       ctx.fillText("打开手机淘宝扫一扫,", 10, 820);
    //       ctx.fillText("识别二维码,领取优惠券", 10, 860);
    //       c.crossOrigin = "Anonymous";
    //       var myCanva = c.toDataURL("image/png");
    //       this.scan = myCanva;
    //     }
    //   });
    // },
    //生成淘宝口令
    maketaobaocommand() {
      let _this = this;
      this.$axios
        .get(
          _this.url +
            "/product/tpwd?text=" +
            _this.shopName +
            "&url=" +
            _this.transferchainUrl +
            "&logoUrl=" +
            _this.shopimgurl
        )
        .then(function(response) {
          if (response.data.code == 1) {
            // _this.postshow = true;
            _this.taobaoNumber = response.data.result;
            console.log(_this.taobaoNumber)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //复制淘口令
    onCopy: function(e) {
      this.postsuccessshow = true;
      // this.$toast("您已成功复制了淘口令,打开手机淘宝领取优惠券即可享受优惠哦");
    },
    onError: function(e) {
      this.posterrorshow = true;
      // this.$toast("复制失败了哦");
    },
    getPageDetailsImage() {
      // 缓存指针
      let _this = this;
      // 此处使用node做了代理
      this.$axios
        .get(_this.url + "/product/images?productId=" + _this.goodsId)
        .then(function(response) {
          // 将得到的数据放到vue中的data
          _this.images = response.data.result.images;
          _this.detailImages = response.data.result.detailImages;
          _this.code = 1;
        })
        .catch(function(error) {
          console.log(error);
          _this.$toast("该商品已下架了");
        });
    },
    jumpmessage() {
      this.helpshow = true;
    },
    JumpAddCollect() {
      // 缓存指针
      let _this = this;
      if (_this.userId == "") {
        this.$toast("暂未登录哦");
      } else {
        // 此处使用node做了代理
        this.$axios
          .post(
            _this.url +
              "/product/collect?userId=" +
              _this.userId +
              "&productId=" +
              _this.goodsId
          )
          .then(function(response) {
            if (response.data.code == 1) {
              _this.hasCollect = true;
              _this.getPageDetails();
              _this.$toast(response.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    JumpDelCollect(productIds) {
      // 缓存指针
      let _this = this;
      if (_this.userId == "") {
        this.$toast("暂未登录哦");
      } else {
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
            if ((response.data.code = 1)) {
              _this.$toast(response.data.message);
              _this.hasCollect = false;
              _this.getPageDetails();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // JumpShape() {
    //   window.location.href = this.couponUrl;
    // }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>
<style lang="less">
@import "../../common/css/fontface.css";

.goods {
  &-swipe {
    img {
      width: 100%;
      height: 100%;
      margin: auto;
      display: block;
      background-size: contain;
    }
  }
}
body {
  background: #f1f1f1;
}
.bottom_nav9 {
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    position: fixed;
    top: 40px;
    right: 20px;
    background: #faf609;
    text-align: center;
}
</style>


