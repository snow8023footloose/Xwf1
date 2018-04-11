<template>
    <div class="xwfcustom">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="客户信息" name="first">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>店家名称</span>
            </div>
            <div class="item" @click="dialogFormVisibleBrief= true"><em>点击此处店家描述</em></div>
            <el-button round @click="dialogFormVisibleMsg = true">餐厅信息</el-button>
            <el-button round @click="dialogFormVisibleCeo = true">餐厅法人</el-button>
            <el-button round @click="dialogFormVisiblePrt = true">打印相关</el-button>
            <el-button round @click="dialogFormVisibleTaw = true">外卖接口</el-button>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="餐厅信息" :visible.sync="dialogFormVisibleMsg">
        <el-form :model="form">
          <el-form-item label="餐厅名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写餐厅名称"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="餐厅地址" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写餐厅详细地址"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="餐厅类型" :label-width="formLabelWidth" style="text-align: left">
            <el-select v-model="form.region" placeholder="请选择餐厅类型">
              <el-option label="快餐店" value="shanghai"></el-option>
              <el-option label="粉店" value="beijing"></el-option>
              <el-option label="餐馆" value="beijing"></el-option>
              <el-option label="早餐馆" value="beijing"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="固定电话" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写餐厅固定电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleMsg = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleMsg = false">保 存</el-button>
        </div>
      </el-dialog>

      <el-dialog title="法人信息" :visible.sync="dialogFormVisibleCeo">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写法人身份证姓名"></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="form">
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择性别">
              <el-option label="女" value="shanghai"></el-option>
              <el-option label="男" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="form">
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写法人身份证号，业务人员请仔细核对"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <span class="spa-title">身份正面</span><el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <span class="spa-title">身份反面</span><el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请保证所有信息包含在内，保持亮光，并且清晰容易识别，尽量减少杂物入镜</div>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </div>
        <el-form :model="form">
          <el-form-item label="银行卡号" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写法人的银行卡号，业务人员请仔细核对"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请填写法人的银行卡号，业务人员请仔细核对"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCeo = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleCeo = false">保 存</el-button>
        </div>
      </el-dialog>

      <el-dialog title="打印相关" :visible.sync="dialogFormVisiblePrt">
        <el-form :model="form">
          <el-form-item label="打印机名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入打印机全名"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="驱动名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入驱动名"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="机子介绍" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="请输入驱动名"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="打印模板" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="早餐" name="type"></el-checkbox>
              <el-checkbox label="中餐" name="type"></el-checkbox>
              <el-checkbox label="餐馆" name="type"></el-checkbox>
              <el-checkbox label="粉店" name="type"></el-checkbox>
              <el-checkbox label="快餐店" name="type"></el-checkbox>
              <el-checkbox label="饮品店" name="type"></el-checkbox>
              <el-checkbox label="主题餐厅" name="type"></el-checkbox>
              <el-checkbox label="料理" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblePrt = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisiblePrt = false">保 存</el-button>
        </div>
      </el-dialog>

      <el-dialog title="外卖接口" :visible.sync="dialogFormVisibleTaw">
        <div>即将前往连接外卖接口</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleTaw = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleTaw = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="店家描述" :visible.sync="dialogFormVisibleBrief">
        <el-form :model="form">
          <el-form-item label="简单描述" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="该描述用于业务员备注记录，不会展示在前端"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleBrief = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleBrief = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加店家" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="店家名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" placeholder="店家名称，开始录入信息"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <div class="bnt-group">
        <el-button-group>
          <el-button size="large" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="large" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
          <el-button size="large" type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data (){
        return{
          activeName: 'first',
          dialogFormVisible: false,
          dialogFormVisibleMsg: false,
          dialogFormVisibleCeo: false,
          dialogFormVisiblePrt: false,
          dialogFormVisibleTaw: false,
          dialogFormVisibleBrief: false,
          formLabelWidth: '80px',
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
          fileList2: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
          ],
        }
      },
      methods: {
        handleClick(tab, event) {
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
  .el-button-group
    &:first-child
      margin 0px auto !important

  .bnt-group
    width 100%
    position fixed
    bottom 2%
    z-index 15
    .el-button-group
      margin 1% 0px
    .block,.small-block
      width 73%


  .text
    font-size: 14px


  .item
    margin-bottom: 18px;


  .el-button
    margin 5px


  .clearfix:before, .clearfix:after
    display: table
    content: ""

  .clearfix:after
    clear: both

  .el-tab-pane
    display flex
    flex-wrap wrap
    .box-card
      width: 280px
      margin 15px
      &:hover
        border 1px solid #409EFF

  .el-upload__tip
    opacity 0.5

  .el-dialog
    margin-top 20px !important

  .el-upload
    margin 0 auto
</style>
