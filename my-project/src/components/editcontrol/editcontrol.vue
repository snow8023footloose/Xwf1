<template>
    <div>
      <div class="bnt-group">
        <div class="small-block">
          <!--<el-button-group>-->
            <!--<el-button size="small" type="primary" icon="el-icon-arrow-left">上一页</el-button>-->
            <!--<el-button size="small" type="primary">下一页<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
          <!--</el-button-group>-->
          <el-button-group>
            <!--<el-button size="large" type="primary" icon="el-icon-edit"></el-button>-->
            <el-button size="large" type="primary" icon="el-icon-plus" @click="plusMethods"></el-button>
            <!--<el-button size="large" type="primary" icon="el-icon-delete"></el-button>-->
          </el-button-group>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      methods:{
        plusMethods:function(){
          this.$emit('plusMethods','good for plus');
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-button-group
    &:first-child
      margin 0px auto !important
    &:last-child
      float right

  .bnt-group
    width 100%
    position fixed
    bottom 2%
    z-index 15
    .el-button-group
      margin 1% 0px
    .block,.small-block
      width 73%

@media screen and (max-width: 825px)
  .el-button-group:first-child
    margin 1% 0px !important
</style>
