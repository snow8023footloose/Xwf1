<template>
    <div class="goods" id="goods" ref="goods-top">
      <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
        <div class="menu-wrapper animated" ref="menu-wrapper" v-show="show">
          <ul>
            <li v-for="(item,index,key) in goods" :key="key" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
      </transition>
      <div @click="show=!show" class="menu-button">
        <i class="icon-keyboard_arrow_right button-icon"></i>
      </div>
      <div class="foods-wrapper" id="foods-wrapper" ref="foods-wrapper" @touchend="otouch">
        <ul class="foods-ul">
          <li v-for="(item,key) in goods" :key="key" class="food-list food-list-hook">
            <h1 class="goods-title">{{item.name}}</h1>
            <ul>
              <!--单个菜品信息遍历-->
              <li
                ref="food-li"
                @click="selectFood(food,$event)"
                v-for="(food,key) in item.foods"
                :key="key"
                class="food-item border-1px"
              >
                <div class="icon">
                  <img width="70px" height="70px" :src="food.icon">
                </div>
                <div class="goods-content">
                  <h2 class="goods-name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper" id="cartcontrol-wrapper">
                    <cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart
        ref="shop-cart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></shopcart>
      <food :food="selectedFood" ref="food"></food>
    </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart.vue'
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
import food from '@/components/food/food.vue'

const ERR_OK = 0
/* eslint-disable */
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      show: false,
      divTop: "divTop",
      SColor: 'SColor'
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$axios.get('./api/goods').then((response) => {
      var response = response.data
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      }
    })
    this.$axios.get('../api/seller').then((response1) => {
      var response1 = response1.data
      if (response1.errno === ERR_OK) {
        this.SColor = response1.data.sysColor[1].plan
      }
    });

  },
  methods: {
    otouch() {
      this.show = false
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      console.log(document.getElementById("goods").clientHeight)
      console.log(document.getElementById("goods").offsetTop)
      if (!event._constructed) {
        return;
      }
      if (document.getElementById("goods").offsetTop < 124) {
        return;
      };
      this.selectedFood = food;
      this.$refs['food'].show();
    },
    incrementTotal(target) {
      //体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs['shop-cart'].drop(target);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components:{
    shopcart,
    cartcontrol,
    food
  },
  events: {
    'cart.add'(target) {
      this._drop(target);
    }
  },
  mounted(){

      if(!this.scroll){
        this._initScroll();
      }else{
        this.scroll.refresh();
      }
      this._calculateHeight();

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styles/mixin.styl"
  @import "../../common/animate.css";
  @import "../../common/style.css";
.goods
  display: flex
  background white
  position: absolute
  top: 124px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-button
    position relative
    width 20px
    height 20px
    background #f3f5f7
    border-radius 100%
    display none

  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    display block !important
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')/**/
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px

  .foods-wrapper
    flex: 1
    ul
     .food-list
      padding-top 20px
      background white
      .goods-title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          .goods-content
            flex: 1
            .goods-name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)

.desc, .extra
  line-height: 10px
  font-size: 10px
  color: rgb(147, 153, 159)
.desc
  line-height: 12px
  margin: 3px 0px 8px
.extra
  .count
    margin-right: 12px
.price
  font-weight: 700
  line-height: 24px
  .now
    margin-right: 8px
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)


.cartcontrol-wrapper
  position: absolute
  right: 0
  bottom: 12px
  background white
  border-radius 20px
  .cartcontrol
    padding-top 1px
    .cart-decrease,.cart-add,.cart-count
      padding 1px


.goods-
  display: flex
  position: absolute
  background white
  top: 0px
  bottom: 46px
  z-index 30
  width: 100%
  overflow: hidden
  .menu-button
    position absolute
    margin-top 147%
    left 5%
    width 44px
    height 44px
    background rgba(255,255,255,0.9)
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3)
    /*background #f3f5f7*/
    border-radius 100%
    z-index 30
    .button-icon
      font-size 45px
      text-align center
      vertical-align middle
  .menu-wrapper
    flex: 0 0 80px
    position: absolute
    bottom 12%
    padding 12px
    background: rgba(255,255,255,0.9)
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3)
    z-index 30
    overflow hidden
    border-radius 20% 20% 20% 20% / 40% 40% 40% 40%
    ul
      display flex
      flex-wrap wrap
      justify-content center
      .menu-item
        float left
        padding: 0 5px
        line-height: 14px
        margin 10px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')/**/
        .text
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          text-align center
          font-size: 16px


  .foods-wrapper
    background url("bg-1.jpg")
    flex: 1
    .foods-ul
      background url("bg-1.jpg")
      background-size 100%
      .food-list
        padding-top 20px
        margin-top 25px
        background rgba(255,255,255,0.7)
        border-radius 10px
        .goods-title
          left 0
          top 0
          text-align center
          height: 26px
          line-height: 26px
          width 35%
          margin 0px auto 15px
          font-size: 12px
          color: black
          border-radius 10px
          background: #f3f5f7
          border 1px solid #f9cc5f
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3)
        .food-item
          display: flex
          margin: 5px 18px
          padding-bottom: 6px
          border-1px(rgba(7, 17, 27, 0))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
            display none
            .goods-content
              position relative
              flex: 1
              .goods-name
                margin: 2px 0 8px 0
                height: 14px
                line-height: 14px
                font-size: 14px
                font-weight bold
              .price
                position relative
                top 0px
                right 0px
          &:first-child
            /*background #2b333b*/
            .icon
              flex: 0 0 50%
              width 100px
              height 50%
              display block
              img
                width 93%
                height 93%



.desc, .extra
  line-height: 10px
  font-size: 10px
  color: rgb(147, 153, 159)
.desc
  line-height: 12px
  margin: 3px 0px 8px
.extra
  .count
    margin-right: 12px
  .now
    margin-right: 8px
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)



</style>
