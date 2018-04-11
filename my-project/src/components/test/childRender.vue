<template>
    <div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: [
        'msg'
      ],
      render(createEle) {
        var p = createEle('p', {
          domProps: {
            innerHTML: this.msg //这里的this不能省略
          }
        });
        return createEle('div', [this.$scopedSlots.default({
          text: 'this is from render-scopeded slot' //子组件自己的props属性
        }), p])
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
