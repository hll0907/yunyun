<template>
  <section>
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
          <span style="font-size:0.5rem;color:red;">{{price}}元</span>
           <span v-if="couponPrice!=0" style="text-decoration:line-through;color:#999">￥{{originPrice}}</span>
         </div>
          <div style="text-align:right;color:#999;">
           已售{{salesNum}}件
          </div>
          <div style="clear:both;"></div>
        </div>
        <div style="font-size:0.4rem;">
           <van-tag type="danger">{{source}}</van-tag>{{shopName}}</div>
        <div>
          <div style="float:left;">
            <van-tag type="danger" plain v-if="couponPrice!=0">{{couponPrice}}元优惠券</van-tag>
          </div>
          <div v-if="couponPrice!=0" style="text-align:right;color:#999;">
            <span>剩余{{couponSurplus}}张</span>
            <span>到期{{couponEnd}}</span>
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
            <van-cell is-link value="购物须知" @click="onClickGoshop">
              <!-- <van-cell> -->
              <template slot="title">
                <span style="color:#f05a03">约奖：{{integral}} 积分</span>
              </template>
          </van-cell>
        </van-cell-group>
        </div>
      </div>
    </div>
    <div v-for="(img, index) in detailImages" :key="index">
      <img :src="img" style="width:100%;"/>
    </div>
    <!-- <div class="bottom_nav9">
      <div style="text-align:center;" @click="onClickGoshop">
              <div><img src="../../assets/icon/icon_goshop.png" style="width:0.6rem;"/></div>
              <div style="margin-top:2px;color:red;">购物须知</div>
      </div>
    </div> -->
    <div style="height:50px;"></div>
    <div>
      <van-goods-action>
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
         <div slot="default" v-if="couponPrice!=0" style="color:red;">优惠券{{couponPrice}}元,约奖{{integral}}积分</div>
          <div slot="default" v-else style="color:red;">约奖{{integral}}积分</div>
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
          <div slot="default" v-if="couponPrice!=0" style="color:red;">优惠券{{couponPrice}}元,约奖{{integral}}积分</div>
          <div slot="default" v-else style="color:red;">约奖{{integral}}积分</div>
        </van-submit-bar>
        </div>
      </van-goods-action>
    </div>
    <van-dialog v-model="goshopshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:80%;background:#f1f1f1" :lock-scroll="false">
      <div style="font-size:0.35rem;margin:2px;">1、{{content1}}</div>
      <div style="font-size:0.35rem;margin:2px;">2、{{content2}}</div>
      <div style="font-size:0.35rem;margin:2px;">3、{{content3}}</div>
      <div style="font-size:0.35rem;margin:2px;">4、{{content4}}</div>
      <div style="font-size:0.35rem;margin:2px;">5、{{content5}}</div>
    </van-dialog>

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

     <van-dialog v-model="postshow" :show-confirm-button="false" :close-on-click-overlay="true" style="width:75%;background:#f1f1f1" :lock-scroll="false">
      <div class="banner-box" style="text-align:center;">
        <img :src="itempic" style="width:100%" 
        v-clipboard:copy="taobaoNumber"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"/>
      </div>
      <div style="text-align:center;">点击图片复制淘口令,打开手机淘宝,领取优惠券,购买更省钱哦</div>
    </van-dialog>
    </section>
</template>
<script>
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
      imgurl: "",
      price: 10,
      originPrice: 100,
      couponPrice: 10,
      itempic: "",
      integral: "",
      salesNum: 10,
      couponSurplus: "",
      couponEnd: "",
      source: "",
      couponUrl: "",
      transferchainUrl: "",
      shopName: "",
      hasCollect: false,
      postshow: false,
      goshopshow: false,
      postsuccessshow: false,
      posterrorshow: false,
      taobaoNumber: "",
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      content5: "",
      time: 10
    };
  },

  mounted() {
    var dataJson = JSON.parse(
      decodeURIComponent(this.cookies.getCookie("userData"))
    );
    this.userId = dataJson.userId;
    var keyword = window.location.href;
    var i = keyword.indexOf("productId=");
    this.goodsId = decodeURI(
      keyword.substring(i + 10, keyword.lastIndexOf("&source"))
    );
    // alert(this.goodsId);
    var sources = keyword.indexOf("&source=");
    this.source = decodeURI(
      keyword.substring(sources + 8, keyword.lastIndexOf("&title"))
    );
    // alert(this.source);

    this.shopName = decodeURI(
      keyword.substring(
        keyword.indexOf("&title=") + 7,
        keyword.lastIndexOf("&couponPrice")
      )
    );
    //  alert(this.shopName);
    this.couponPrice = decodeURI(
      keyword.substring(
        keyword.indexOf("&couponPrice=") + 13,
        keyword.lastIndexOf("&couponUrl")
      )
    );
    // alert(this.couponPrice);
    this.couponUrl = decodeURI(
      keyword.substring(
        keyword.indexOf("&couponUrl=") + 11,
        keyword.lastIndexOf("&integral")
      )
    );
    // alert(this.couponUrl);
    this.integral = decodeURI(
      keyword.substring(
        keyword.indexOf("&integral=") + 10,
        keyword.lastIndexOf("&price")
      )
    );
    this.price = decodeURI(
      keyword.substring(
        keyword.indexOf("&price=") + 7,
        keyword.lastIndexOf("&originPrice")
      )
    );
    // alert(this.price)
    this.originPrice = decodeURI(
      keyword.substring(
        keyword.indexOf("&originPrice=") + 13,
        keyword.lastIndexOf("&salesNum")
      )
    );
    // alert(this.originPrice)
    this.salesNum = decodeURI(
      keyword.substring(
        keyword.indexOf("&salesNum=") + 10,
        keyword.lastIndexOf("&couponSurplus")
      )
    );
    // alert(this.salesNum)
    this.couponSurplus = decodeURI(
      keyword.substring(
        keyword.indexOf("&couponSurplus=") + 15,
        keyword.lastIndexOf("&couponEnd")
      )
    );
    // alert(this.couponSurplus)
    this.couponEnd = decodeURIComponent(
      keyword.substring(keyword.indexOf("&couponEnd=") + 11, keyword.length)
    );
    this.getshopdetails();
  },
  methods: {
     onClickLoad() {
      window.location.reload();
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

    getshopdetails() {
      let _this = this;
       let interval = window.setInterval(function() {
      if (_this.time-- <= 0) {
        _this.time = 0;
        window.clearInterval(interval); //停止
      }
    }, 1000);
      this.$axios
        .get(_this.url + "/product/images?productId=" + _this.goodsId)
        .then(function(response) {
          // console.log(response);
          if (response.data.code == 1) {
            var content = response.data.result;
            _this.images = response.data.result.images;
            _this.itempic = _this.images[0];
            _this.detailImages = response.data.result.detailImages;
            _this.code = 1;
            _this.getConvertUrl();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClickGoshop() {
      this.getgoshop();
      this.goshopshow = true;
    },
    OnclickBuy() {
      this.maketaobaocommand();
    },
    //复制淘口令
    onCopy: function(e) {
      this.postsuccessshow = true;
      // this.$toast("您已成功复制了淘口令");
    },
    onError: function(e) {
      this.posterrorshow = true;
      // this.$toast("复制失败了哦");
    },
    getConvertUrl() {
      let _this = this;
      // alert(_this.couponUrl);
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
            _this.maketaobaocommand();
            // console.log(_this.transferchainUrl);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

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
            _this.itempic
        )
        .then(function(response) {
          if (response.data.code == 1) {
            // _this.postshow = true;
            _this.taobaoNumber = response.data.result;
            // console.log(response.data.result);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
// .bottom_nav9 {
//     border-radius: 50%;
//     -moz-border-radius: 50%;
//     -webkit-border-radius: 50%;
//     position: fixed;
//     bottom: 180px;
//     right: 30px;
//     background-image: #faf609;
//     text-align: center;
// }
</style>


