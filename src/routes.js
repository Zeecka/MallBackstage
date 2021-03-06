import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Home/indexMain.vue'
import { state } from './vuex/state'

// 店铺信息
import StoreInformation from './views/Home/StoreInformation.vue'

/*系统管理 systemSettings*/  
import Jurisdiction from './views/systemSettings/Jurisdiction.vue'
import SystemPush from './views/systemSettings/SystemPush.vue'
import ChangePasswords from './views/systemSettings/ChangePasswords.vue'
import releaseAdd from './views/systemSettings/releaseAdd.vue'
import releaseLook from './views/systemSettings/releaseLook.vue'

/*配置管理 configuration*/
import banner from './views/configuration/banner.vue' 
import system from './views/configuration/system.vue' 
import Authentication from './views/configuration/Authentication.vue'
import activity from './views/configuration/activity.vue'
import newActivity from './views/configuration/newActivity.vue'
import editActivity from './views/configuration/editActivity.vue'

// 分销管理 Distribution
import Identity from './views/Distribution/Identity.vue'
import zone from './views/Distribution/zone.vue'
import Agent from './views/Distribution/Agent.vue'
import MyDistribution from './views/Distribution/MyDistribution.vue'
import MyDistribution_5 from './views/Distribution/MyDistribution_5.vue'
import superiors from './views/Distribution/superiors.vue'
import rule from './views/Distribution/rule.vue'
import configuration from './views/Distribution/configuration.vue'

/*订单管理 order*/
import OrderInformation from './views/order/OrderInformation.vue'
import details from './views/order/details.vue'

// 物流管理 logistics
import DeliverGoods from './views/logistics/DeliverGoods.vue'
import Freight from './views/logistics/Freight.vue'
// import Address from './views/logistics/Address.vue'

/*商品管理 commodity */
import GoodShipped from './views/commodity/GoodShipped.vue'
import OnSale from './views/commodity/OnSale.vue'
import OffTheShelf from './views/commodity/OffTheShelf.vue'
import Illegal from './views/commodity/Illegal.vue'
import ReturnGoods from './views/commodity/ReturnGoods.vue'
import GoodEdit from './views/commodity/GoodEdit.vue'

// 身份管理 Identity
// import Identity from './views/Identity/Identitys.vue'

/*店铺管理 shop */ // 
import see from './views/shop/see.vue'
import style from './views/shop/style.vue'
import picture from './views/shop/picture.vue'

/*财务管理 Finance*/
import FlowingWater from './views/Finance/FlowingWater.vue'
import txgl from './views/Finance/txgl.vue'

// 补货专区 Replenishment 
import Replenishment from './views/Replenishment/Replenishment.vue'
import add from './views/Replenishment/add.vue'



// 增值管理   Increment
import video from './views/Increment/video.vue'
import PublicWelfare from './views/Increment/PublicWelfare.vue'
import Marketing from './views/Increment/Marketing.vue'
import pjadmin from './views/Increment/pjadmin.vue'
import ValueAddedServices from './views/Increment/ValueAddedServices.vue'





let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
     {
        path: '/mian',
        component: Main,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        // iconCls: 'fa fa-address-card',
        iconCls: 'iconfont icon-dianpu',
        leaf: true,//只有一个节点
        children: [
            { path: '/StoreInformation', component: StoreInformation, name: '店铺信息' ,  }
        ]
    },
    {
        path: '/Subject',
        component: Home,
        name: '系统设置',
        iconCls: 'iconfont icon-peizhi',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/Jurisdiction', component: Jurisdiction, name: '权限管理' },
            { path: '/ChangePasswords', component: ChangePasswords, name: '更改密码' },
            {path: '/SystemPush', component: SystemPush, name: '系统推送'},
            { path: '/releaseAdd', component: releaseAdd, name: '编辑消息', hidden: true },
            { path: '/releaseLook/:id', component: releaseLook, name: '查看系统推送', hidden: true }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '配置管理',
        iconCls: 'iconfont icon-peizhi1',
        children: [
            { path: '/banner', component: banner, name: '首页banner管理' },
            { path: '/activity', component: activity, name: '活动管理' },
            { path: '/system', component: system, name: '首页商品配置' },
            { path: '/Authentication', component: Authentication, name: '身份认证' },
            { path: '/newActivity', component: newActivity, name: '新建活动' ,hidden: true},
            { path: '/editActivity/:id/:index', component: editActivity, name: '修改活动', hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分销管理',
        iconCls: 'iconfont icon-fenxiao',
        children: [
            { path: '/Identity', component: Identity, name: '身份管理' },
            { path: '/zone', component: zone, name: '会员专享区' },
            { path: '/MyDistribution', component: MyDistribution, name: '我的分销' },
            { path: '/Agent', component: Agent, name: '代理商' },
            { path: '/rule', component: rule, name: '分销规则管理' },
            { path: '/configuration', component: configuration, name: '代理商配置' },
            { path: '/superiors/:id/:name', component: superiors, name: '查看下级' ,hidden: true }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'iconfont icon-dingdan',
        children: [
            { path: '/OrderInformation/:id', component: OrderInformation, name: '订单信息管理' },
            { path: '/pjadmin', component: pjadmin, name: '评价管理' },
            { path: '/details/:id/:index', component: details, name: '订单详情' ,hidden: true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '物流管理',
        iconCls: 'iconfont icon-wuliu',
        children: [
            { path: '/DeliverGoods', component: DeliverGoods, name: '发货' },
            { path: '/Freight', component: Freight, name: '运费模板' }
            // { path: '/Address', component: Address, name: '地址管理' }
        ]
    },
     {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'iconfont icon-shangpin',
        children: [
            { path: '/GoodShipped', component: GoodShipped, name: '发布商品' },
            { path: '/GoodEdit/:id', component: GoodEdit, name: '修改商品' ,hidden: true },
            { path: '/OnSale', component: OnSale, name: '出售中的商品' },
            { path: '/OffTheShelf', component: OffTheShelf, name: '下架商品' },
            { path: '/Illegal', component: Illegal, name: '违规商品' },
            { path: '/ReturnGoods', component: ReturnGoods, name: '退货的商品' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '店铺管理',
        iconCls: 'iconfont icon-dianpuguanli',
        children: [
            { path: '/see', component: see, name: '查看店铺' },
            { path: '/style', component: style, name: '店铺样式管理' },
            { path: '/picture', component: picture, name: '图片存储' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'iconfont icon-caiwu',
        children: [
            { path: '/FlowingWater', component: FlowingWater, name: '流水记录' },
            { path: '/txgl', component: txgl, name: '提现管理' }
        ]
    },
   {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'iconfont icon-dingdan',
        leaf: true,//只有一个节点
        children: [
            // { path: '/Replenishment', component: Replenishment, name: '补货专区' ,hidden: true},
            { path: '/add', component:add, name: '补货专区' ,  }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '增值管理',
        iconCls: 'iconfont icon-cloud-appreciation',
        children: [
            { path: '/ValueAddedServices', component: ValueAddedServices, name: '增值服务管理' },
            { path: '/video', component: video, name: '视频管理' },
            { path: '/PublicWelfare', component: PublicWelfare, name: '公益广告' },
            { path: '/Marketing', component: Marketing, name: '营销管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bar-chart',
        hidden: true,
        children: [
            // { path: '/examine', component: examine},
            // { path: '/see', component: see},
            // { path: '/addPlan/:id/:index', name:'计划发布', component: addPlan}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;