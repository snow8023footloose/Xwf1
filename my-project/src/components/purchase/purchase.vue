<template>
    <div class="purchase">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="采购列表" name="first">
          采购列表，正在建设中……
        </el-tab-pane>
        <el-tab-pane label="采购管理" name="second">
          采购管理，正在建设中……
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
