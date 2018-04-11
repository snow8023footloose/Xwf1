<template>
  <div class="seller" ref="sc-seller">
    <div class="coupon-content">
      <div class="overview">
        <ul>
          <li class="coupon-item" v-for="(item,index,key) in seller.coupon" :key="key" @click="buyCoupon(index,$event)">
            <span class="price">{{seller.coupon[index].price}}</span>

            <div class="masked">
              抵<span class="realworth">{{seller.coupon[index].realWorth}}</span>元
            </div>
            <img class="bg-coupon" :src="seller.coupon[index].bg" alt="">
            <div class="rules"><h5>使用规则</h5>{{seller.coupon[index].rules}}，满<span class="text">{{seller.coupon[index].floorPrice}}</span>可用</div>
            <div class="quantity">剩余{{seller.coupon[index].quantity}}张</div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">更多活动，敬请期待……</h1>
        <div class="pic-wrapper" ref="pic-wrapper">
          <ul class="pic-list" ref="pic-list">
            <li class="pic-item" v-for="(pic,key) in seller.pics" :key="key">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import split from '@/components/split/split';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    mounted: function () {
      this._initScroll();
      this._initPics();
    },
    methods: {
      buyCoupon(index,event) {
        if (!event._constructed) {
          return;
        }
        alert("确认支付"+this.seller.coupon[index].price+"元")
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['sc-seller'], {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs['pic-list'].style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styles/mixin.styl"

  .seller
    position: absolute
    top: 124px
    bottom: 0
    left: 0
    padding-top 25px
    width: 100%
    overflow: hidden
    background white
    .overview
      position: relative
      padding: 18px

.coupon-content
  height auto

.coupon-item
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
  border-radius 5px
  height 120px
  margin-bottom 20px
  background #2b333b
  position relative
  color white
  &:first-child
    display none
  .price
    margin 10px
    opacity 0.8
    font-weight lighter
    font-family "Copperplate Gothic Light"
    font-size 30px
    position relative
    top 29px
    left 70px
    opacity 0.1
  .rules
    font-size 10px
    opacity 0.25
    padding 0px 10px
    position relative
    bottom 13px
    h5
      margin-bottom 2px
  .quantity
    position relative
    left 245px
    top -48px
    opacity 0.8
    font-size 14px
  img
    width 20px
    height 20px
    display none
  .masked
    text-align: center;
    height 67px
    position relative
    top -16px
    background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s infinite linear;
    @-webkit-keyframes masked-animation
      0%{ background-position: 0 0;}
      100% { background-position: -100% 0;}
    .realworth
      font-weight 800
      font-family "Angsana New"
      font-size 80px
      z-index 200

.pics
  padding: 10px 18px 0px
  margin-bottom 30px
  .title
    margin-bottom: 12px
    line-height: 14px
    color: rgb(7, 17, 27)
    font-size: 14px
  .pic-wrapper
    width: 100%
    overflow: hidden
    .pic-list
      font-size: 0
      .pic-item
        display: inline-block
        margin-right: 6px
        width 64px
        height 54px
        border-radius 5px
        overflow hidden
        img
          width 64px
          height 54px
        &:last-child
          margin: 0

.info-item
  padding: 18px 18px 0 18px
  color: rgb(7, 17, 27)
  font-size 12px
  color #Ccc


</style>
