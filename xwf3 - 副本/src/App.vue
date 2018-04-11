<template>
  <div>
    <v-header class="header" :seller="seller"></v-header>
    <div class="closeHeader">
      <i class="icon-close"></i>
    </div>
    <div class="tab">
      <router-link to="/" @click.native="active($event)">
        <div class="tab-item">
          商品
        </div>
      </router-link>
      <router-link to="/order" @click.native="active($event)">

        <div class="tab-item">
          订单
        </div>
      </router-link>
      <!--<router-link to="/seller" @click.native="active($event)">
        <div class="tab-item">
          优惠券
        </div>
      </router-link>-->
      <div class="service"></div>
    </div>
    <!--<div class="hello">欢迎光临
      <p class="firm">新沃丰网络科技有限公司提供技术支持</p>
    </div>
    <p class="t1">123123123123</p>-->
    <router-view :seller="seller"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'
const ERR_OK = 0
// ERR_OK定义却没有用过，ES6会报错
/* eslint-disable */
export default {
  data () {
    return {
      seller: {},
      SColor: 'SColor'
    }
  },
  mounted() {
  },
  created () {
    this.$axios.get('http://localhost:8080/api/seller').then((response) => {
      var response = response.data
      if (response.errno === ERR_OK) {
        this.seller = response.data
        this.SColor = this.seller.sysColor[1].plan
      }
    });

    // document.getElementById('order').className = "theme"
  },
  methods: {
    active(event) {
      console.log(this.SColor)
      // event.target.style = "color:black"
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/styles/mixin.styl"

.t1
  my()

body
  letter-spacing: 1px;
.active
  color black

.closeHeader
  float right
  position absolute
  top 5px
  z-index 19
  color white
  right 5px
  width 20px
  height 20px
  border-radius 50%
  background rgba(255,25,25,0.7)
  bgmy('this.SColor')
  display flex
  justify-content center
  display none
  i
    text-align center
.tab
  display: flex
  justify-content: center
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2)
  z-index:30
  position: relative
  border-bottom-right-radius:100%;
  border-bottom-left-radius:100%;
  background white
  a
    height: 40px
    line-height: 40px
    text-align: center
    width: 33%
    background rgba(0, 0, 0, 0)
    .tab-item
      background rgba(0, 0, 0, 0)
      text-align: center;
      &:hover
        color #2b333b
        height 67px
        font-weight bold
        background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 4s infinite linear;
        @-webkit-keyframes masked-animation
          0%{ background-position: 0 0;}
          100% { background-position: -100% 0;}
/*
.header
  display none

.seller,.goods,.ratings
  top 20px !important*/

.hello
  display block
  margin 150px auto
  font-size 36px
  color #7e8c8d
  position relative
  z-index -1
  bottom 50%
  left 20%
  .firm
   text-align 22px
   font-size 12px
   margin 5px 0px
</style>
