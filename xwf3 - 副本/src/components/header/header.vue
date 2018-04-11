<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="brand-title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/已有{{seller.deliveryTime}}个赞
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">商家信息-{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-headertitle"></span><marquee
      direction="left" behavior="scroll" loop="1" scrollamount="4" scrolldelay="10" align="top" hspace="20" vspace="10" onmouseover=this.stop() onmouseout=this.start()
      class="bulletin-text">{{seller.bulletin}}</marquee>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <transition name="fade" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div v-show="detailShow" class="detail animated">
        <div class="detail-wrapper clearfix">

          <div class="scroll" ref="s-scroll">
            <div class="s-scroll">
              <h1 class="name">{{seller.name}}</h1>
              <!--<div class="favorite">
                <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite()"></span>
                <span class="text">{{favoriteText}}</span>
              </div>-->
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index,key) in seller.supports" :key="key">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}
              </span>
                </li>
              </ul>
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">店家信息</div>
                <div class="line"></div>
              </div>

              <div class="info">
                <ul>
                  <li class="info-item" v-for="(info,key) in seller.infos" :key="key">{{info}}</li>
                </ul>
              </div>

              <div class="headertitle">
                <div class="line"></div>
                <div class="text">店家公告</div>
                <div class="line"></div>
              </div>

              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>

              <div class="headertitle">
                <div class="line"></div>
                <div class="text">店家实景</div>
                <div class="line"></div>
              </div>

              <div class="pics">
                <span class="seemore">向右滑动查看更多 ></span>
                <div class="pic-wrapper" ref="pic-wrapper">
                  <ul class="pic-list" ref="pic-list">
                    <li class="pic-item" v-for="(pic,key) in seller.pics" :key="key">
                      <img :src="pic" width="120" height="90">
                    </li>
                  </ul>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import star from '@/components/star/star'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '@/common/js/store'
/* eslint-disable */
export default {
  components:{star},
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  methods: {
    toggleFavorite() {
      //错误：收藏功能无效，暂停
      // console.log("1")
      // this.favorite = !this.favorite;
      // saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    showDetail() {
      this.detailShow = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['s-scroll'], {
            // scrollX: true,
            // eventPassthrough: 'vertical'
          });
        } else {
          this.scroll.refresh();
        }
      });

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
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted() {

  }

}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
@import "../../common/style.css";
@import "../../common/animate.css";
@import "../../common/styles/mixin.styl";
.scroll
  height 106%
  overflow hidden
  width 100%
  .s-scroll
    width 100%
    /*background red*/
.header
  position: relative
  overflow: hidden
  color: #fff
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    position: relative
    padding: 16px 20px 12px
    font-size: 0
    .avatar
      width 46px
      height 46px
      display: inline-block
      vertical-align: top
      img
        width 46px
        height 46px
        border-radius: 5px
    .content
      display: inline-block
      margin-left: 16px
      .brand-title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold


.favorite
  position: absolute
  width: 50px
  right: 38px
  top: 36px
  text-align: center
  .icon-favorite
    display: block
    margin-bottom: 4px
    line-height: 24px
    font-size: 24px
    color: #d4d6d9
    &.active
      color: red
  .text
    line-height: 10px
    font-size: 10px
    color: white

.description
  margin-bottom: 10px
  line-height: 12px
  font-size: 12px
  display none
.support
  .icon
    display: inline-block
    vertical-align: top
    width: 12px
    height: 12px
    margin-right: 4px
    background-size: 12px 12px
    background-repeat: no-repeat
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
  .text
    line-height: 12px
    font-size: 10px

.support-count
  position: absolute
  right: 12px
  bottom: 23px
  padding: 0 8px
  height: 24px
  line-height: 24px
  border-radius: 14px
  background: rgba(0, 0, 0, 0.2)
  text-align: center
  .count
    vertical-align: top
    font-size: 10px
  .icon-keyboard_arrow_right
    margin-left: 2px
    line-height: 24px
    font-size: 10px

.bulletin-wrapper
  position: relative
  height: 22px
  line-height: 22px
  padding: 0 22px 0 12px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  background: rgba(7, 17, 27, 0.2)
  .bulletin-headertitle
    display: inline-block
    vertical-align: top
    margin-top: 6px
    width: 22px
    height: 12px
    bg-image('bulletin')
    background-size: 22px 12px
    background-repeat: no-repeat
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 8px


.bulletin-text
  vertical-align: top
  margin: 0 4px
  font-size: 10px
  text-overflow: ellipsis

.background
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -1
  filter: blur(10px)


.detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  width: 100%
  height: 100%
  /*overflow: hidden*/
  transition: all 0.5s
  backdrop-filter: blur(10px)
  background: rgba(7, 17, 27, 0.8)
  .detail-wrapper
    display flex
    width: 100%
    height: 589px
    margin-top: 30px

.pics
  padding: 0px 20px 18px 18px
  .seemore
    font-size 8px
    float right
    margin 5px 30px
    opacity 0.5
  .pic-wrapper
    width: 82%
    overflow: hidden
    white-space: nowrap
    margin 0 auto
    .pic-list
      font-size: 0
      .pic-item
        display: inline-block
        margin-right: 6px
        width: 120px
        height: 90px
        &:last-child
          margin: 2px

.name
  line-height: 16px
  text-align: center
  font-size: 16px
  font-weight: 700
.star-wrapper
  margin-top: 18px
  padding: 2px 0
  text-align: center
.headertitle
  display: flex
  width: 80%
  margin: 28px auto 24px auto
  .line
    flex: 1
    position: relative
    top: -6px
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
  .text
    padding: 0 12px
    font-weight: 700
    font-size: 14px

.info
  width 80%
  margin 0 auto
  color: white
  .title
    padding-bottom: 12px
    line-height: 14px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 14px
  .info-item
    padding: 7px
    line-height: 16px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 12px
    &:last-child
      border-none()

.supports
  width: 80%
  margin: 0 auto
  padding-bottom 12px
  .support-item
    padding: 0 12px
    margin-bottom: 12px
    font-size: 0
    &:last-child
      margin-bottom: 0
    .icon
      display: inline-block
      width: 16px
      height: 16px
      vertical-align: top
      margin-right: 6px
      background-size: 16px 16px
      background-repeat: no-repeat
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.guarantee
        bg-image('guarantee_2')
      &.invoice
        bg-image('invoice_2')
      &.special
        bg-image('special_2')
    .text
      line-height: 16px
      font-size: 12px

.bulletin
  width: 80%
  margin: 0 auto
  .content
    padding: 0 12px
    line-height: 24px
    font-size: 12px

.detail-close
  position: fixed
  justify-content: center
  display: flex
  bottom: 0px
  width: 100%
  height: 62px
  clear: both
  background rgba(9, 29, 39, 0.3)
  font-size: 32px
  .icon-close
    padding-top: 15px
</style>
