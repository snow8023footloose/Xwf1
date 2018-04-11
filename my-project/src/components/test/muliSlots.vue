<template>
  <div>
    <header> <slot name="header"></slot></header>
    <main><slot>没有内容时，这个会出现</slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
