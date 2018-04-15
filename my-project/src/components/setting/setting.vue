<template>
    <div class="setting">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--设置模块-->
        <el-tab-pane label="店铺设置" name="first">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="店铺名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址">
              <el-cascader
                placeholder="试试搜索：长沙"
                :options="options"
                filterable
                change-on-select
              ></el-cascader>
            </el-form-item>
            <el-form-item label="营业时间">
              <el-col :span="11">
                <el-date-picker type="date" id="a" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" style="text-align: center;" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" id="a" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="店铺色调">
              <el-switch v-model="form.delivery"></el-switch>
              <el-color-picker v-model="color3" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="服务类型">
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
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="店铺公告">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item class="save-part">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!--素材模块-->
        <el-tab-pane label="店铺素材" name="second">
          <div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture">
              <span class="spa-title">头像</span><el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <span class="spa-title">店铺门店实景</span><el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <span class="spa-title">前端背景</span><el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
            }, {
            value: 'fankui',
            label: '反馈'
            }, {
            value: 'xiaolv',
            label: '效率'
            }, {
            value: 'kekong',
            label: '可控'
          }]
        },{
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
            }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      },{
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
            }, {
            value: 'color',
            label: 'Color 色彩'
            }, {
            value: 'typography',
            label: 'Typography 字体'
            }, {
            value: 'icon',
            label: 'Icon 图标'
            }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        },{
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
            }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
            }, {
            value: 'input',
            label: 'Input 输入框'
            }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
            }, {
            value: 'select',
            label: 'Select 选择器'
            }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
            }, {
            value: 'switch',
            label: 'Switch 开关'
            }, {
            value: 'slider',
            label: 'Slider 滑块'
            }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
            },{
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
            }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
            }, {
            value: 'upload',
            label: 'Upload 上传'
            }, {
            value: 'rate',
            label: 'Rate 评分'
            }, {
            value: 'form',
            label: 'Form 表单'
            }
        ]
          },{
          value: 'data',
          label: 'Data',
          children: [
            {
            value: 'table',
            label: 'Table 表格'
            }, {
            value: 'tag',
            label: 'Tag 标签'
            }, {
            value: 'progress',
            label: 'Progress 进度条'
            }, {
            value: 'tree',
            label: 'Tree 树形控件'
            }, {
            value: 'pagination',
            label: 'Pagination 分页'
            }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        },{
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
            }, {
            value: 'message',
            label: 'Message 消息提示'
            }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
            }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        },{
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
            }, {
            value: 'tabs',
            label: 'Tabs 标签页'
            }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
            }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
            }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }
          ]
        },{
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
            }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
            }, {
            value: 'popover',
            label: 'Popover 弹出框'
            }, {
            value: 'card',
            label: 'Card 卡片'
            }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
            }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }
          ]
        }
      ]
      },{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
          }, {
          value: 'sketch',
          label: 'Sketch Templates'
          }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }
        ]
      }
    ],
      fileList2: [
        {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      color3:'#409EFF'
    };

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
    margin-top 20px
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
</style>
