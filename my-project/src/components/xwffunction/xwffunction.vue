<template>
    <div class="xwffunction">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--<el-tab-pane label="基本功能" name="first">-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="电话簿" name="second">
          <el-card class="box-card">
            <div v-for="item in telephoneBook" class="text item">
              {{item.name}}&nbsp;{{item.number}}&nbsp;&nbsp;&nbsp;{{item.department}}
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="反馈" name="third">
          <el-form>
            <el-form-item label="反馈信息">
              <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
              <div class="control">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>清空</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data (){
        return{
          activeName: 'second',
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          telephoneBook:[
            {
              name:'小张',
              number:'15773153167',
              department:'技术部'
            },
            {
              name:'小张',
              number:'15773153167',
              department:'销售部'
            },
            {
              name:'小张',
              number:'15773153167',
              department:'销售部'
            },
            {
              name:'小红',
              number:'15773153167',
              department:'技术部'
            },
            {
              name:'小张',
              number:'15773153167',
              department:'销售部'
            }
          ]
        }
      },
      methods: {
        handleClick(tab, event) {
        },
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
