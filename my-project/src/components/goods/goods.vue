<template>
  <div class="goods">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--菜品模块-->
        <el-tab-pane label="菜品列表" name="first">
          <template>
          <!-- <span>{{msg}}</span> -->
            <el-table
              v-loading="loading"
              :data="listGoods"
              style="width: 100%"
              height="600"
            >
              <el-table-column
                fixed="left"
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                sortable
                fixed="left"
                prop="name"
                label="品名"
                width="180"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="sellCount"
                label="售卖情况"
                width="150">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="oldPrice"
                label="原价">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="rating"
                label="评价">
              </el-table-column>

              <!--按照标签陈列-->
              <!--<el-table-column
                fixed="right"
                prop="name"
                label="标签"
                width="180"
                :filters="[
                { text: '热销榜', value: '热销榜' },
                { text: '单人精彩套餐', value: '单人精彩套餐' },
                { text: '冰爽饮品限时特惠', value: '冰爽饮品限时特惠' },
                { text: '爽口凉菜', value: '爽口凉菜' },
                { text: '精选套餐', value: '精选套餐' },
                { text: '果拼果汁', value: '果拼果汁' },
                { text: '小吃主食', value: '小吃主食' },
                { text: '特色粥品', value: '特色粥品' }
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag === '家' ? 'primary' : 'success'"
                    close-transition>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>-->
            </el-table>
            <editcontrol @plusMethods="plusMethodsThis"></editcontrol>
          </template>
        </el-tab-pane>

        <!--特性模块-->
        <el-tab-pane label="特性管理" name="third">

          <!--标签-->
          <div class="tagGroup">
            <h6>请不要建立同名标签</h6>
            标签：
            <el-tag
              :key="tag.zIndex"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="tagContent(tag)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"

            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput">+ 新标签</el-button>
          </div>

          <!--分类-->
          <div class="classesGroup">
            <h6>请不要建立同名分类</h6>
            分类：
            <el-tag
              :key="tag.zIndex"
              v-for="tag in dynamicTags1"
              closable
              :disable-transitions="false"
              @close="handleClose1(tag)"

            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="tagContent1(tag)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible1"
              v-model="inputValue1"
              ref="saveTagInput1"
              @keyup.enter.native="handleInputConfirm1"
              @blur="handleInputConfirm1"
            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput1">+ 新分类</el-button>
          </div>

          <!--SKU-->
          <div class="classesGroup">
            <h6>请不要建立同SKU类名</h6>
            SKU类：
            <el-tag
              :key="tag.zIndex"
              v-for="tag in dynamicTags2"
              closable
              :disable-transitions="false"
              @close="handleClose2(tag)"

            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="tagContent2(tag)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible2"
              v-model="inputValue2"
              ref="saveTagInput2"
              @keyup.enter.native="handleInputConfirm2"
              @blur="handleInputConfirm2"
            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput2">+ 新SKU类</el-button>
          </div>

        </el-tab-pane>
        <!--未开发功能-->
        <!--<el-tab-pane label="素材管理" name="third">-->
          <!--素材管理，正在建设中……-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="菜品统计" name="fourth">-->
          <!--菜品统计，正在建设中……-->
        <!--</el-tab-pane>-->

      </el-tabs>

    <!--标签弹框-->
    <el-dialog width="80%" title="标签编辑" :visible.sync="dialogFormVisibleTagEdit">
      <el-form :model="toDynamicTags">
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="toDynamicTags.zIndex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="toDynamicTags">
        <el-form-item label="标签类型" :label-width="formLabelWidth" style="text-align: left">
          <el-select v-model="toDynamicTags.type" placeholder="请选择餐厅类型，默认标准">
            <el-option label="信息标签" value="msgTag"></el-option>
            <el-option label="价格标签" value="priceTag"></el-option>
            <el-option label="标准" value="kind"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="toDynamicTags">
        <el-form-item class="price-form" label="价格" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="toDynamicTags.price"
            auto-complete="off"
            placeholder="请输入价格"
            class="price-item"
          >
            <template slot="prepend">普通价</template>
          </el-input>
        </el-form-item>

        <el-form-item class="price-form" label="标签颜色" :label-width="formLabelWidth">
          <div class="block" style="display: flex; justify-content: space-around;">
            <span>背景颜色：</span><el-color-picker v-model="toDynamicTags.fontColor"></el-color-picker>
            <span>字体颜色：</span><el-color-picker v-model="toDynamicTags.bgColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item style="width: 50%" label="缩略图" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="toDynamicTags.fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传 </el-button>
            <div slot="tip" class="el-upload__tip">只能上传png/jpg/gif文件</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTagEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleTagEdit = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--分类弹框-->
    <el-dialog top="5vh" width="80%" title="分类编辑" :visible.sync="dialogFormVisibleClassesEdit">
      <el-form :model="toDynamicTags1" :rules="rules1" ref="toDynamicTags1">
        <el-form-item label="排序" :label-width="formLabelWidth" prop="zIndex">
          <el-input v-model="toDynamicTags1.zIndex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="分类介绍" :label-width="formLabelWidth">
          <el-input v-model="toDynamicTags1.description" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="展示类型" :label-width="formLabelWidth" style="text-align: left">
          <el-select v-model="toDynamicTags1.type" placeholder="请选择分类展示类型">
            <el-option label="始终展示" value="always"></el-option>
            <el-option label="始终不展示" value="invisible"></el-option>
            <el-option label="有时展示" value="sometimes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打印机" :label-width="formLabelWidth" style="text-align: left">
          <el-select v-model="toDynamicTags1.pid" placeholder="打印机1">
            <el-option label="打印机1" value="printer1"></el-option>
            <el-option label="打印机2" value="printer2"></el-option>
            <el-option label="打印机3" value="printer3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="餐厅id" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="toDynamicTags1.rid" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" style="text-align: left">
          <el-select v-model="toDynamicTags1.status" placeholder="可用">
            <el-option label="可用" value="enable"></el-option>
            <el-option label="不可用" value="disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 40%" label="缩略图" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="toDynamicTags1.fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传 </el-button>
            <div slot="tip" class="el-upload__tip">只能上传png/jpg/gif文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button @click="dialogFormVisibleClassesEdit = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1(toDynamicTags1)">确 定</el-button>
            <el-button type="primary" circle @click="resetForm1('toDynamicTags1')" class="el-icon-refresh"></el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--SKU弹框-->
    <el-dialog width="80%" title="SKU类编辑" :visible.sync="dialogFormVisibleSKUEdit">
      <el-form :model="toDynamicTags2">
        <div class="SKUGroup">
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input
            style="display: inline"
            v-model="toDynamicTags2.zIndex"
            placeholder="请输入SKU排序"
          ></el-input>
          </el-form-item>
          <h6>请不要建立同名SKU</h6>

          <!--SKU内部标签-->
          <el-tag
            :key="tag.zIndex"
            v-for="tag in dynamicTags3"
            closable
            :disable-transitions="false"
            @close="handleClose3(tag)"
          >
            {{tag.name}}
            <el-button
              type="primary"
              style="padding: 5px"
              size="mini"
              icon="el-icon-edit"
              circle
              @click.native="tagContent3(tag)"
            ></el-button>
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible3"
            v-model="inputValue3"
            ref="saveTagInput3"
            @keyup.enter.native="handleInputConfirm3"
            @blur="handleInputConfirm3"
          >
          </el-input>
          <el-button v-else class="button-new-tag" @click="showInput3">+ 新SKU</el-button>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSKUEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSKUEdit = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--SKU内部弹框-->
    <el-dialog width="80%" title="SKU编辑" :visible.sync="dialogFormVisibleInSKUEdit">
      <el-form :model="toDynamicTags3">
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="toDynamicTags3.zIndex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleInSKUEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleInSKUEdit = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加菜品弹框-->
    <el-dialog top="3vh" width="80%" title="增加菜品" :visible.sync="dialogFormVisibleGoodsPlus">
      <div class="matter2">
        <span
          class="matter2-hint">该部分为必填
        </span>
        <el-form :model="form" style="display: flex;">
          <el-form-item style="flex-shrink: 0" label="品名" :label-width="formLabelWidth">
            <el-input v-model="form.content" auto-complete="off" placeholder="请输入品名"></el-input>

          </el-form-item>
          <el-form-item style="flex-shrink: 0" label="打印机" :label-width="formLabelWidth">
            <el-select v-model="printValue" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="flex-shrink: 10" label="数量" :label-width="formLabelWidth">
            <el-input v-model="form.number" auto-complete="off" placeholder="请输入数量"></el-input>

          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="菜品介绍" :label-width="formLabelWidth">
            <el-input v-model="form.goodsDescription" auto-complete="off" placeholder="请输入菜品介绍,50字以内"></el-input>
          </el-form-item>
        </el-form>

        <!--菜品价格类型：标准价格、会员价格、活动价格-->
        <el-form :model="form">
          <el-form-item class="price-form" label="价格" :label-width="formLabelWidth">
            <el-input
              size="small"
              v-model="form.price"
              auto-complete="off"
              placeholder="请输入价格"
              class="price-item"
            >

              <template slot="prepend">普通价</template>
            </el-input>
            <el-input
              size="small"
              v-model="memberPrice"
              auto-complete="off"
              placeholder="请输入价格"
              class="price-item"
            >
              <template slot="prepend"><el-checkbox v-model="checked2"></el-checkbox>&nbsp;会员价{{memberDiscont}}</template>
            </el-input>
            <el-input
              size="small"
              v-model="PromotionPrice"
              auto-complete="off"
              placeholder="请输入价格"
              class="price-item"
            >
              <template slot="prepend"><el-checkbox v-model="checked3"></el-checkbox>&nbsp;活动价{{PromotionDiscont}}</template>
            </el-input>
          </el-form-item>
          <div style="display: flex; justify-content: space-around">
            <el-form-item style="width: 30%;float: left" label="缩略图" :label-width="formLabelWidth">

              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传jpg/png文件，尺寸为70*70px
                  &nbsp;——&nbsp;应用&nbsp;<el-checkbox v-model="checked1"></el-checkbox></div>
              </el-upload>
            </el-form-item>
            <el-form-item style="width: 30%;float: left" label="Banner" :label-width="formLabelWidth">

              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传jpg/png文件，尺寸为1000*375px
                  &nbsp;——&nbsp;应用&nbsp;<el-checkbox v-model="checked2"></el-checkbox></div>
              </el-upload>
            </el-form-item>
            <el-form-item style="width: 30%;float: left" label="展示图" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传 </el-button>
                <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过500kb
                  &nbsp;——&nbsp;应用&nbsp;<el-checkbox v-model="checked3"></el-checkbox></div>
              </el-upload>
            </el-form-item>
          </div>
        </el-form>

      </div>

      <!--菜品特性编辑-->

      <div class="matter2">
        <span
          class="matter2-hint">该部分为非必填，数据可在
          <el-button @click="toNature" type="primary" plain style="padding: 4px" size="mini" round>&nbsp;特性管理&nbsp;</el-button>编辑
        </span>
        <el-form :model="form">
          <el-form-item label="添加标签" :label-width="formLabelWidth">
            <el-select style="display: inline-block; width: 555px" v-model="value6" multiple placeholder="请选择，默认无标签">
              <el-option
                v-for="item in dynamicTags"
                :key="item.zIndex"
                :label="item.name"
                :value="item.zIndex">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="菜品类型" :label-width="formLabelWidth" style="text-align: left">
            <el-select style="display: inline-block; width: 555px" v-model="value4" clearable placeholder="请选择，默认其他">
              <el-option
                v-for="item in dynamicTags1"
                :key="item.zIndex"
                :label="item.name"
                :value="item.zIndex">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form">
          <el-form-item label="添加SKU" :label-width="formLabelWidth">
            <el-select style="display: inline-block; width: 555px" v-model="value5" multiple placeholder="请选择，默认无SKU">
              <el-option
                v-for="item in dynamicTags2"
                :key="item.zIndex"
                :label="item.name"
                :value="item.zIndex">
              </el-option>
            </el-select>
            <el-button type="primary" :loading="true" @click="outputSku">生成SKU</el-button>
          </el-form-item>

        </el-form>

      </div>

      <!--其他-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleGoodsPlus = false" icon="el-icon-time">暂不上架</el-button>
        <el-button @click="dialogFormVisibleGoodsPlus = false">取 消</el-button>
        <el-button type="primary" @click="plusGoods">立即上架</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import editcontrol from '@/components/editcontrol/editcontrol';

const ERR_OK = 0
export default {
  name: 'New',
  data:() => ({
    currentPage1:5,
    dialogFormVisibleGoodsPlus:false,
    dialogFormVisibleTagEdit: false,
    dialogFormVisibleSKUEdit: false,
    dialogFormVisibleClassesEdit: false,
    dialogFormVisibleInSKUEdit: false,
    activeName: 'first',
    checked1: true,
    checked2: false,
    checked3: false,
    goods:[],
    loading: true,
    formLabelWidth:'80px',
    formLabelWidth1:'120px',
    SKUinput:'',
    memberDiscont: 0.8,
    PromotionDiscont: 0.7,
    colorFont: '#409EFF',
    colorBg: '#409EFF',
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      content:'',
      goodsDescription:'',
      price:0,
      memberPrice: 0,
      PromotionPrice: 0,
      person:'',
      number: 99
    },
    toDynamicTags:[],
    dynamicTags: [
      {
        zIndex:'0',
        name:'店长推荐',
        price:'',
        fontColor:'',
        bgColor:'',
        type:'',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      },
    ],
    inputVisible: false,
    inputValue: '',
    toDynamicTags1:[],
    dynamicTags1: [
      {
        zIndex:'0',
        name:'其他',
        type:'',
        pid: '',
        rid: 0,
        description: '',
        status: '',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      },
    ],
    rules1: {
      zIndex : [
        {required: true, message:'请输入序号', trigger:'blur'},
      ],
      rid : [
        {required: true, message: '不能为空', trigger: 'blur'},
        {type: 'number', required: true, message: '请输入数字', trigger: 'blur'},
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],

    },
    inputVisible1: false,
    inputValue1: '',
    toDynamicTags2:[],
    dynamicTags2: [
      {
        zIndex:'0',
        name:'份量',
      },
    ],
    inputVisible2: false,
    inputValue2: '',
    toDynamicTags3:[],
    dynamicTags3: [
      {
        zIndex:'0',
        name:'大份',
      },
      {
        zIndex:'1',
        name:'中份',
      },
      {
        zIndex:'2',
        name:'小份',
      },
    ],
    inputVisible3: false,
    inputValue3: '',
    options1: [
          {
        value: '选项1',
        label: '默认端口1'
      }, {
        value: '选项2',
        label: '端口2'
      }, {
        value: '选项3',
        label: '端口3'
      }
    ],
    printValue:'选项1',
    value4: '',
    value5: '',
    value6: '',
    fileList2: [
    ],
  }),
  computed:{
    listGoods(){
      let tempArr = [];
      this.goods.forEach((item)=>{
        tempArr = tempArr.concat(item.foods);
      })
      return tempArr;
    },
    memberPrice: function(){
      var memberPrice = parseInt(this.form.price)*this.memberDiscont
      return memberPrice.toFixed(2)
    },
    PromotionPrice: function () {
      var PromotionPrice = parseInt(this.form.price)*this.PromotionDiscont
      return PromotionPrice.toFixed(2)
    },
    repeatNum: function () {
      let inputValue = this.inputValue;
      for(var i=0; i<this.dynamicTags.length; i++){
        if(this.dynamicTags[i].name === inputValue){

          return false;
        }
      }
    },
    repeatNum1: function () {
      let inputValue = this.inputValue1;
      for(var i=0; i<this.dynamicTags1.length; i++){
        if(this.dynamicTags1[i].name === inputValue){

          return false;
        }
      }
    },
    repeatNum2: function () {
      let inputValue = this.inputValue2;
      for(var i=0; i<this.dynamicTags2.length; i++){
        if(this.dynamicTags2[i].name === inputValue){

          return false;
        }
      }
    },
    repeatNum3: function () {
      let inputValue = this.inputValue3;
      for(var i=0; i<this.dynamicTags3.length; i++){
        if(this.dynamicTags3[i].name === inputValue){

          return false;
        }
      }
    },
    lastNum: function () {
      for(var i=0; i<this.dynamicTags.length; i++){
        var lastNum = this.dynamicTags[i].zIndex
      }
      return lastNum;
    },
    lastNum1: function () {
      for(var i=0; i<this.dynamicTags1.length; i++){
        var lastNum1 = this.dynamicTags1[i].zIndex
      }
      return lastNum1;
    },
    lastNum2: function () {
      for(var i=0; i<this.dynamicTags2.length; i++){
        var lastNum2 = this.dynamicTags2[i].zIndex
      }
      return lastNum2;
    },
    lastNum3: function () {
      for(var i=0; i<this.dynamicTags3.length; i++){
        var lastNum3 = this.dynamicTags3[i].zIndex
      }
      return lastNum3;
    }
  },
  methods: {

    submitForm1() {
      // console.log(formName);
      // console.log(formName); //rulesForm
      this.$refs['toDynamicTags1'].validate((valid) => {
        if (valid) {
          alert('提交成功');
        } else {
          alert('内容没有填写完整');
          return false;
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    toNature(){
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
      this.activeName = 'second'
    },
    handlePreview(file) {
      console.log(file);
    },
    plusMethodsThis(data){
      // console.log(data);
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
    },
    plusGoods(){
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleClick(tab, event) {
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    outputSku(){
      alert('1')
    },

    // 0
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      let repeatNum  = this.repeatNum
      let lastNum = this.lastNum
      console.log(lastNum)
      if(!lastNum){
        lastNum = -1;
      }
      console.log(this.dynamicTags);
      lastNum = parseInt(lastNum) + 1
      if (inputValue){
        if(repeatNum === false){
          alert('提示：同名项，不可建立')
        }else {
        this.dynamicTags.push(
          {
            zIndex: lastNum,
            name: inputValue,
            price: '',
            fontColor:'',
            bgColor:'',
            type:'',
            fileList: [
              {
                name: '',
                url: ''
              }
            ]
          }
        );}
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    tagContent(tag){
      this.toDynamicTags = tag
      this.dialogFormVisibleTagEdit = !this.dialogFormVisibleTagEdit
    },

    handleClose(tag) {
      this.$confirm('是否删除该标签，与其的相关菜品标签将全部取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(key);
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 1
    showInput1() {
      this.inputVisible1 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput1.$refs.input.focus();
      });
    },
    handleInputConfirm1() {
      let inputValue1 = this.inputValue1;
      let repeatNum1  = this.repeatNum1
      let lastNum1 = this.lastNum1
      console.log(lastNum1)
      if(!lastNum1){
        lastNum1 = -1;
      }
      console.log(this.dynamicTags1);
      lastNum1 = parseInt(lastNum1) + 1
      if (inputValue1){
        if(repeatNum1 === false){
          alert('提示：同名项，不可建立')
        }else {
          this.dynamicTags1.push(
            {
              zIndex: lastNum1,
              name: inputValue1,
              price: '',
              fontColor:'',
              bgColor:'',
              type:'',
              fileList: [
                {
                  name: '',
                  url: ''
                }
              ]
            }
          );}
      }
      this.inputVisible1 = false;
      this.inputValue1 = '';
    },
    tagContent1(tag){
      // console.log(tag);
      this.toDynamicTags1 = tag
      console.log(this.toDynamicTags1);
      this.dialogFormVisibleClassesEdit = !this.dialogFormVisibleClassesEdit
    },
    handleClose1(tag) {
      this.$confirm('是否删除该分类，此类菜品将无分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag.zIndex), 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 2
    showInput2() {
      this.inputVisible2 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },
    handleInputConfirm2() {
      let inputValue2 = this.inputValue2;
      let repeatNum2  = this.repeatNum2
      let lastNum2 = this.lastNum2
      console.log(lastNum2)
      if(!lastNum2){
        lastNum2 = -1;
      }
      console.log(this.dynamicTags2);
      lastNum2 = parseInt(lastNum2) + 1
      if (inputValue2){
        if(repeatNum2 === false){
          alert('提示：同名项，不可建立')
        }else {
          this.dynamicTags2.push(
            {
              zIndex: lastNum2,
              name: inputValue2
            }
          );
        }
      }
      this.inputVisible2 = false;
      this.inputValue2 = '';
    },
    tagContent2(tag){
      this.toDynamicTags2 = tag
      this.dialogFormVisibleSKUEdit = !this.dialogFormVisibleSKUEdit
      // console.log(tag);
    },
    handleClose2(tag) {
      this.$confirm('是否删除该SKU类，应用此SKU类的菜品将取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dynamicTags2.splice(this.dynamicTags2.indexOf(tag), 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 3
    showInput3() {
      this.inputVisible3 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput3.$refs.input.focus();
      });
    },
    handleInputConfirm3() {
      let inputValue3 = this.inputValue3;
      let repeatNum3  = this.repeatNum3
      let lastNum3 = this.lastNum3
      console.log(lastNum3)
      if(!lastNum3){
        lastNum3 = -1;
      }
      console.log(this.dynamicTags3);
      lastNum3 = parseInt(lastNum3) + 1
      if (inputValue3){
        if(repeatNum3 === false){
          alert('提示：同名项，不可建立')
        }else {
          this.dynamicTags3.push(
            {
              zIndex: lastNum3,
              name: inputValue3
            }
          );
        }
      }
      this.inputVisible3 = false;
      this.inputValue3 = '';
    },
    tagContent3(tag){
      this.toDynamicTags3 = tag
      // console.log(tag);
      this.dialogFormVisibleInSKUEdit = !this.dialogFormVisibleInSKUEdit
    },
    handleClose3(tag) {
      this.$confirm('是否删除该SKU，应用此SKU的菜品将取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dynamicTags3.splice(this.dynamicTags3.indexOf(tag), 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },

  created() {
    this.$axios.get('../api/goods').then((response) => {
      var response = response.data
      if (response.errno === ERR_OK) {
        this.goods = response.data
        setTimeout(this.loading = !this.loading,2000)
      }
    })
  },
  components: {
    editcontrol
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .el-upload__tip
   font-size 10px
   line-height 15px
   height auto

 .el-input-group__append,.el-input-group__prepend
   padding 0px 5px

.el-pagination
  margin 5px
.demo-table-expand
  font-size: 0
  label
    width: 90px
    color: #99a9bf
  .el-form-item
    margin-right: 0
    margin-bottom: 0
    width: 50%

.price-item
  width 30%
  margin-right 1%

.tagGroup,.classesGroup,.SKUGroup
  margin 5px 5px 15px 5px
  padding 5px 10px
  border-radius 10px
  border 1px solid rgba(124, 168, 205, 0.24)

.el-tag
  margin 10px 10px 10px 0px

.button-new-tag
  margin-left: 10px
  height: 32px
  line-height: 30px
  padding-top: 0
  padding-bottom: 0

.input-new-tag
  width: 90px
  margin-left: 10px
  vertical-align: bottom

h6
  font-weight lighter
  opacity 0.5
  margin 5px 0px 0px 0px

.matter2
  border-radius: 5px
  padding: 10px
  span
    margin: 5px 0px 10px 20px
    display: block
    font-size: 10px
    font-weight: lighter
  &:hover
    background rgba(0, 0, 0, 0.02)

</style>
