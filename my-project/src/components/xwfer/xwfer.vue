<template>
  <div class="xwfer">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本信息" name="first">
        <div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <span class="spa-title">个人照片</span><el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="销售部" value="shanghai"></el-option>
              <el-option label="技术部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!--<el-form-item label="即时配送">-->
            <!--<el-switch v-model="form.delivery"></el-switch>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动性质">-->
            <!--<el-checkbox-group v-model="form.type">-->
              <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
              <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
            <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="特殊资源">-->
            <!--<el-radio-group v-model="form.resource">-->
              <!--<el-radio label="线上品牌商赞助"></el-radio>-->
              <!--<el-radio label="线下场地免费"></el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="活动形式">-->
            <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <div class="control">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="其他信息" name="second">

        <div>
          暂无信息
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeName: 'first',
        fileList2: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },

    methods:{
      handleClick(tab, event) {
      },
      onSubmit() {
        console.log('submit!');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-tabs__nav
    margin-left 10%

  .el-tab-pane
    text-align left !important

  .spa-title
    margin-right 10px
    width 10em
    display inline-block
    text-align left
    height 2em

  .upload-demo
    margin 20px 0px
    background rgba(233, 230, 225, 0.1)
    border-radius 0.5em
    padding 8px

  .el-form-item__content
    display flex
    align-items center

  .el-switch
    margin-bottom 32px
    margin-right 12px

  .el-tabs__content
    overflow-y scroll

  .save-part
    position fixed
    right 94px
    bottom 13px

  .control
    width 180px
    margin 0px auto
</style>
