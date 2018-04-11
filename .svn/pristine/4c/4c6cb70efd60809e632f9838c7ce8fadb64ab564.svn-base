<template>
  <div class="app" >
    <div class="scroll" ref="s-scroll">
      <div class="s-scroll">
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
        <div>1</div><span>2</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import BScroll from 'better-scroll';

  export default {
    mounted() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['s-scroll'], {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .scroll
    height 300px
    overflow hidden
    width 80%
    .s-scroll
      width 200%
      background red
</style>
