<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-add_circle" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <i class="el-icon-remove-outline inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <i class="el-icon-circle-plus cart-add icon-add_circle" @click.stop.prevent="addCart"></i>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import Vue from 'vue';
const ERR_OK = 0
  export default {
    props: {
      food: {
        type: Object,
      }
    },
    data() {
      return {
      }
    },
    created () {
      this.$axios.get('../api/seller').then((response) => {
        var response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      });
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('increment', event.target);
        console.log("cartcontrol")
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

.inner
  display: inline-block
  line-height: 24px
  font-size: 24px
  color: rgb(0, 160, 220)
  transition: all 0.2s linear
  transform: rotate(0deg)


.cart-decrease
  display: inline-block
  padding: 6px
  transition: all 0.2s linear
  &.move-enter-active
    opacity: 1
    transform: translate3d(0, 0, 0)

  &.move-enter, &.move-leave-active
    opacity: 0
    transform: translate3d(24px, 0, 0)
    .inner
      transform: rotate(180deg)

</style>
