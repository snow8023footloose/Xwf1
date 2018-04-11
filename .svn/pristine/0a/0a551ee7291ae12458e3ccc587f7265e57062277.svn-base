import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Seller from '@/components/seller/seller'
import Order from '@/components/order/order'
import Star from '@/components/star/star'
import Test from '@/components/test/test'
import sellerSearch from '@/components/test/seller-search'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/star',
      name: 'Star',
      component: Star
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/seller-search',
      name: 'sellerSearch',
      component: sellerSearch
    }
  ]
})
