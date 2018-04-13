<template>
  <div class="shopcart">
    <div class="cart-content">
      <div class="content-left">
        <div class="logo-wrapper" @click.stop="toggleList">
          <div class="logo">
            <i class="el-icon-loading" style="color:white;font-size:42px;z-index:104;"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" v-show="totalCount>0" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc" v-show="totalCount===0">亲，购物车为空</div>
        <el-select size="small" multiple collapse-tags v-model="value8" filterable placeholder="点击搜索" class="search">
          <el-option
            v-for="(item,index) in listGoods"
            :key="index"
            :label="item.name"
            :value="item.price">
            <span style="">{{ item.name }}&nbsp;&nbsp;价格：</span>
            <span style=" color: #8492a6; font-size: 13px">{{ item.price }}元</span>

          </el-option>
        </el-select>
        <!-- <div class="desc" v-show="totalCount>0">另需餐桌费￥{{deliveryPrice}}元</div> -->

      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop"
                  v-for="(ball,key) in balls"
                  @before-enter="beforeDrop"
                  @enter="dropping"
                  :key="key"
                  @after-enter="afterDrop">
        <div v-show="ball.show" class="ball" v-bind:css="false">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="shopcart-list animated" v-show="listShow">
      <div class="list-header" @click.stop="toggleList">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="list-content">
        <ul>
          <li class="food" v-for="(food,key) in selectFoods" :key="key">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <!--<transition name="fade">-->
      <!--<div class="list-mask" @click="hideList" v-show="listShow"></div>-->
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import cartcontrol from '@/components/goodse/cartcontrol';
const ERR_OK = 0
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 4,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true,
        book: false,
        SColor:'SColor',
        SColor2:'SColor2',
        SColor4:'SColor4',
        goods1:[],
        options: [{
          value: '价格1',
          label: '黄金糕'
        }, {
          value: '价格2',
          label: '双皮奶'
        }, {
          value: '价格3',
          label: '蚵仔煎'
        }, {
          value: '价格4',
          label: '龙须面'
        }, {
          value: '价格5',
          label: '北京烤鸭'
        }],
        value8: ''
      };

    },
    methods: {
      drop(el) {
        console.log("shopcart")
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return ;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 210;
            let y = -(window.innerHeight - rect.top - 110);
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterDrop(el){
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false ;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        console.log(this.listGoods);
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice < this.minPrice) {
          return `￥还差${this.minPrice-this.totalPrice}元开单`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元减10元`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
      listGoods(){
        let tempArr = [];
        this.goods1.forEach((item)=>{
          tempArr = tempArr.concat(item.foods);
        })
        return tempArr;
      }
    },
    mounted(){
      console.log(this.listGoods);
    },

    created () {
      this.$axios.get('../api/seller').then((response) => {
        var response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      });
      this.$axios.get('../api/goods').then((res) => {
        var res = res.data
        if (res.errno === ERR_OK) {
          this.goods1 = res.data
          console.log(this.goods1);
          console.log("shopcart");

        }
      })
    },
    components: {
      cartcontrol
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "mixin.styl"
  @import "animate.css";
  .shopcart
    position:absolute
    z-index: 50
    width: 100%
    bottom -3px
    height: 48px
    .message
      text-align center
      border-top-right-radius:50%;
      border-top-left-radius:50%;
      font-size 12px
      color #2b333b
      background rgba(245, 255, 205, 0.8)
      line-height 24px
    .cart-content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          z-index 104
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
              opacity 0.5
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: black
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff

    .shopcart-list
      position: absolute
      right: 36px
      bottom: 46px
      z-index: -1
      width: 260px
      .list-header
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        height: 36px
        line-height: 31px
        width : 100%
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
          margin 0px
        .empty
          float: left
          margin-left: 15px
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        padding: 0 18px
        max-height: 200px
        bottom : 80px
        width : 100%
        overflow hidden
        background: #fff
        ul
          margin 0px
          margin-bottom 10px
          padding 0px
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            display inline-block
            font-size: 13px
            color: rgb(7, 17, 27)
            font-weight :100
            text-overflow: clip
            width 135px
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

.ball-container
  .ball
    position fixed
    left 210px
    bottom 110px
    z-index 200
    transition all 0.4s cubic-bezier(0.49,-0.6,0.75,0.41)
    .inner
      width 16px
      height 16px
      border-radius 50%
      background-color rgb(0,160,220)
      transition all 0.4s linear

.search
  position absolute
  bottom 10px
  left 35%
</style>
