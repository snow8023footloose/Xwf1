import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Order from '@/components/order/order'
import Tables from '@/components/tables/tables'
import Finance from '@/components/finance/finance'
import Apply from '@/components/test/apply'
import Setting from '@/components/setting/setting'
import Xwfer from '@/components/xwfer/xwfer'
import Xwfcustom from '@/components/xwfcustom/xwfcustom'
import Xwffunction from '@/components/xwffunction/xwffunction'
// import Goodse from '@/components/goodse/goodse'


Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/XWFs/goods',
      name:'Goods',
      component: Goods
    },
    {
      path:'/XWFs/finance',
      name:'Finance',
      component: Finance
    },
    {
      path:'/',
      name:'Tables',
      component:Tables

    },
    {
      path:'/XWFs/order',
      name:'Order',
      component: Order
    },
    {
      path:'/XWFs/apply',
      name:'Apply',
      component: Apply
    },
    {
      path:'/XWFs/setting',
      name:'Setting',
      component: Setting
    },
    {
      path:'/XWFer/xwfer',
      name:'Xwfer',
      component: Xwfer
    },
    {
      path:'/XWFer/xwfcustom',
      name:'Xwfcustom',
      component: Xwfcustom
    },
    {
      path:'/XWFer/xwffunction',
      name:'Xwffunction',
      component: Xwffunction
    }
    // ,
    // {
    //   path:'/goodse',
    //   name:'Goodse',
    //   component: Goodse
    // }
  ]
})
