import Vue from 'vue'
import Router from 'vue-router'
import indexs from '@/components/view/indexs'
import search from '@/components/view/search'
import Shopbrand from '@/components/view/Shopbrand'
import Shoptao from '@/components/view/Shoptao'
import ShopJuhuasuan from '@/components/view/ShopJuhuasuan'
import Shopvideo from '@/components/view/Shopvideo'
import Shopbaoyou from '@/components/view/Shopbaoyou'
import sumbitorder from '@/components/view/sumbitorder'
import test from "@/components/view/test"
import {
    resolve
} from 'path';
import PageDetails from '@/components/view/PageDetails'
import superPageDetails from '@/components/view/superPageDetails'
import user from '@/components/view/user'
import fans from '@/components/view/fans'
import friend from '@/components/view/friend'
import love from '@/components/view/love'
import vip from '@/components/view/vip'
import viprecord from '@/components/view/viprecord'
import commissionorder from '@/components/view/commissionorder'
import setting from '@/components/view/setting'
import putforwards from '@/components/view/putforwards'
import personal from '@/components/view/personal'
import personalReferee from '@/components/view/personalReferee'
import commissions from '@/components/view/commissions'
import bindingnumber from '@/components/view/bindingnumber'
import bindingalipay from '@/components/view/bindingalipay'
import bindingalipay2 from '@/components/view/bindingalipay2'
import bindingalipayscan from '@/components/view/bindingalipayscan'
import bindingalipayscan2 from '@/components/view/bindingalipayscan2'
import bindingylh from '@/components/view/bindingylh'
import bindingylh2 from '@/components/view/bindingylh2'
import bindingmoneyscan from '@/components/view/bindingmoneyscan'
import bindingmoneyscan2 from '@/components/view/bindingmoneyscan2'
import errors from '@/components/view/errors'
import customerservice from '@/components/view/customerservice'
Vue.use(Router)
export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'indexs',
            component: indexs,
            meta: {
                title: '首页',
                keepAlive: true
            }
        },
        {
            path: '/shg/search',
            name: 'search',
            component: search,
            meta: {
                title: '搜索',
                keepAlive: true
            }
        },
        {
            path: '/shg/Shopbrand',
            name: 'Shopbrand',
            component: Shopbrand,
            meta: {
                title: '品牌馆',
                keepAlive: true
            }
        },
        {
            path: '/shg/Shoptao',
            name: 'Shoptao',
            component: Shoptao,
            meta: {
                title: '淘抢购',
                keepAlive: true
            }
        }, {
            path: '/shg/ShopJuhuasuan',
            name: 'ShopJuhuasuan',
            component: ShopJuhuasuan,
            meta: {
                title: '聚划算',
                keepAlive: true
            }
        }, {
            path: '/shg/Shopvideo',
            name: 'Shopvideo',
            component: Shopvideo,
            meta: {
                title: '短视频',
                keepAlive: true
            }
        }, {
            path: '/shg/Shopbaoyou',
            name: 'Shopbaoyou',
            component: Shopbaoyou,
            meta: {
                title: '9.9包邮',
                keepAlive: true
            }
        },
        {
            path: '/shg/indexs',
            name: 'indexs',
            component: indexs,
            meta: {
                title: '首页',
                keepAlive: true
            }
        },
        {
            path: '/shg/test',
            name: 'test',
            component: test,
            meta: {
                title: '测试',
            }
        },
        {
            path: '/shg/PageDetails',
            name: 'PageDetails',
            component: PageDetails,
            meta: {
                title: '商品详情',
            }
        },
        {
            path: '/shg/superPageDetails',
            name: 'superPageDetails',
            component: superPageDetails,
            meta: {
                title: '商品详情',
            }
        },
        {
            path: '/shg/sumbitorder',
            name: 'sumbitorder',
            component: sumbitorder,
            meta: {
                title: '提交订单'
            }
        },
        {
            path: '/shg/user',
            name: 'user',
            component: user,
            meta: {
                title: '个人中心',
            }
        },
        {
            path: '/shg/love',
            name: 'love',
            component: love,
            meta: {
                title: '我的收藏',
                keepAlive: true
            }
        },
        {
            path: '/shg/vip',
            name: 'vip',
            component: vip,
            meta: {
                title: '超级搜',
                keepAlive: true
            }
        },
        {
            path: '/shg/viprecord',
            name: 'viprecord',
            component: viprecord,
            meta: {
                title: '订单记录',
            }
        },
        {
            path: '/shg/setting',
            name: 'setting',
            component: setting,
            meta: {
                title: '账户设置',
            }
        },
        {
            path: '/shg/fans',
            name: 'fans',
            component: fans,
            meta: {
                title: '我的好友',
            }
        },
        {
            path: '/shg/friend',
            name: 'friend',
            component: friend,
            meta: {
                title: '他的好友',
            }
        },
        {
            path: '/shg/bindingnumber',
            name: 'bindingnumber',
            component: bindingnumber,
            meta: {
                title: '绑定手机号'
            }
        },
        {
            path: '/shg/bindingalipay',
            name: 'bindingalipay',
            component: bindingalipay,
            meta: {
                title: '绑定支付宝账号'
            }
        },
        {
            path: '/shg/bindingalipay2',
            name: 'bindingalipay2',
            component: bindingalipay2,
            meta: {
                title: '绑定支付宝账号'
            }
        },
        {
            path: '/shg/bindingalipayscan',
            name: 'bindingalipayscan',
            component: bindingalipayscan,
            meta: {
                title: '绑定支付宝收钱二维码'
            }
        },
        {
            path: '/shg/bindingalipayscan2',
            name: 'bindingalipayscan2',
            component: bindingalipayscan2,
            meta: {
                title: '绑定支付宝收钱二维码'
            }
        },
        {
            path: '/shg/bindingylh',
            name: 'bindingylh',
            component: bindingylh,
            meta: {
                title: '绑定云联账号'
            }
        },
        {
            path: '/shg/bindingylh2',
            name: 'bindingylh2',
            component: bindingylh2,
            meta: {
                title: '绑定云联账号'
            }
        },
        {
            path: '/shg/bindingmoneyscan',
            name: 'bindingmoneyscan',
            component: bindingmoneyscan,
            meta: {
                title: '上传微信收钱二维码'
            }
        },
        {
            path: '/shg/bindingmoneyscan2',
            name: 'bindingmoneyscan2',
            component: bindingmoneyscan2,
            meta: {
                title: '上传微信收钱二维码'
            }
        },
        {
            path: '/shg/personal',
            name: 'personal',
            component: personal,
            meta: {
                title: '个人主页'
            }
        },
        {
            path: '/shg/personalReferee',
            name: 'personalReferee',
            component: personalReferee,
            meta: {
                title: '我的推荐人'
            }
        },
        {
            path: '/shg/commissions',
            name: 'commissions',
            component: commissions,
            meta: {
                title: '积分提现记录'
            }
        },
        {
            path: '/shg/commissionorder',
            name: 'commissionorder',
            component: commissionorder,
            meta: {
                title: '积分明细'
            }
        },
        {
            path: '/shg/putforwards',
            name: 'putforwards',
            component: putforwards,
            meta: {
                title: '可提现的积分',
            }
        },
        {
            path: '/shg/customerservice',
            name: 'customerservice',
            component: customerservice,
            meta: {
                title: '官方客服',
            }
        },
        {
            path: '/shg/errors',
            name: 'errors',
            component: errors,
            meta: {
                title: '错误提示信息',
            }
        },
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (from.meta.keepAlive) {
                var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
                from.meta.savedPosition = b;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    }
})