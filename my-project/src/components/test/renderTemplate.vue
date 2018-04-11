<template>
    <div>
      <div>this is from template</div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      render(createEle) {
        return createEle('div', 'this is from render')
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
