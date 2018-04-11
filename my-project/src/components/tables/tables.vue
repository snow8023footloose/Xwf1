<template>
  <div class="tables">

    <!--table模块-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="餐桌信息" name="first">
        <el-row :guter="0">
          <div class="table-container">
            <transition name="el-zoom-in-left"  v-for="(item,index) in listTable" :key="item.id">
              <div v-show="show2" class="transition-box"  @click="selectTable(item,index)">
                <div class="box-header">
                  <span class="left" style="float: left;margin-left: 7px">桌号：{{index+1}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.score}}</span>
                </div>
                  <!--总：{{item.recommend.length}}项-->
                <div class="box-content">
                  <p v-for="(recommend,index) in item.recommend">{{index+1}}.{{recommend}}&nbsp;</p>
                </div>
              </div>
            </transition>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="餐桌记录" name="second">
        <div style="margin-top: 15px; display: flex;justify-content: space-between">
          <el-select v-model="tableSearchSelect1" slot="prepend" placeholder="请选择桌号/订单号">
            <el-option label="桌号" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
          </el-select>
          <el-time-picker
            v-model="valueSearchSelect"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="今日任意时间点">
          </el-time-picker>
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--table遮罩-->
    <div class="mask-black" v-show="show3"></div>

    <!--table操作按钮-->
    <div class="tableButtonGroup" v-show="show3">
      <el-button type="danger" @click="handleDelete" icon="el-icon-delete" circle></el-button>
      <el-button @click="stopTableService" type="warning" icon="el-icon-time" circle></el-button>
      <el-button @click="handleEdit" icon="el-icon-edit" circle></el-button>
      <el-button @click="callService" icon="el-icon-phone-outline" circle></el-button>
      <el-button @click="refreshTable" v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-refresh" circle></el-button>
      <el-button @click="show3=!show3" class="closeTable" icon="el-icon-close" circle></el-button>
    </div>

    <!--table订单按钮-->
    <div class="tableButtonGroup1" v-show="show3">
      <span v-for="item in form.name">
        <el-popover
          placement="top"
          title="个人账单详情"
          width="200"
          trigger="hover"
          class="popover"
        >
          <p>个人账单</p>
          <div style="text-align: right; margin: 0">
            <el-button type="success" size="mini" @click="singleAccounts">结账</el-button>
          </div>

          <el-button class="singleButton" slot="reference" @click="selectCustom(item,$event)" type="primary" size="small" icon="el-icon-document" round>{{item}}</el-button>
        </el-popover>
        <el-badge :value="1" class="item">
        </el-badge>
      </span>

      <el-button @click="plusCustomer" icon="el-icon-plus" circle></el-button>
    </div>

    <!--table弹框-->
    <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div class="goodse animated" id="goods" ref="goods-top" v-show="show3">
        <el-popover
          placement="top"
          title="餐桌账单详情"
          width="200"
          trigger="hover"
        >
          <div v-model="toAccountBox" ></div>
          <p v-for="(item,index) in toAccountBox.recommend">{{index+1}}.{{item}}</p>
          <div style="text-align: right; margin: 0">
            <el-button type="success" size="mini" @click="singleAccounts">结账</el-button>
          </div>
          <div slot="reference" class="tableNumber">{{tableTitle}}</div>
        </el-popover>

        <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
          <div class="menu-wrapper animated" ref="menu-wrapper" v-show="show">
            <ul class="menu-ul">
              <li v-for="(item,index,key) in goods" :key="key" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                <span class="text border-1px">
                  <!-- <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> -->
                  {{item.name}}
                </span>
              </li>
            </ul>
          </div>
        </transition>
        <div @click="show=!show" class="menu-button">
        </div>
        <div class="foods-wrapper" id="foods-wrapper" ref="foods-wrapper" @touchend="otouch">
          <ul class="foods-ul">
            <li v-for="(item,key) in goods" :key="key" class="food-list food-list-hook">
              <h1 class="goods-title">{{item.name}}</h1>
              <ul class="goodsUl">
                <li ref="food-li" @click="selectFood(food,$event)" v-for="(food,key) in item.foods" :key="key" class="food-item border-1px">
                  <div class="icon">
                    <img width="70px" height="70px" :src="food.icon">
                  </div>
                  <div class="goods-content">
                    <h3 class="goods-name">{{food.name}}</h3>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper" id="cartcontrol-wrapper">
                      <cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shopcart ref="shop-cart" :select-foods="selectFoods"></shopcart>
      </div>
    </transition>

    <!--丢弃弹框-->
    <el-dialog :title="tableTitle" :model="form" :visible.sync="dialogFormVisibleTable" width="70%">
      <!--此处省略搜索输入框-->
      <!-- <el-select v-model="value" placeholder="请选择类别，默认全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="value9"
        multiple
        filterable
        remote
        label="搜索"
        reserve-keyword
        placeholder="可输入首字母搜索"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-form :model="form">
        <el-form-item label="已点" :label-width="formLabelWidth">
          <div>
          <span v-for="item in form.type" v-model="form.type">
            <el-checkbox :label="item" name="type"></el-checkbox>
          </span>
          </div>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.content" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button size="large" type="danger" icon="el-icon-delete" @click="dialogFormVisibleTable = false">删除</el-button>
        <el-button @click="dialogFormVisibleTable = false">暂停服务</el-button>
        <el-button @click="dialogFormVisibleTable = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleTable = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加餐桌弹框-->
    <el-dialog title="增加餐桌" :visible.sync="dialogFormVisibleTablePlus">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.content" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="桌号" :label-width="formLabelWidth">
          <el-input v-model="form.tableNum" auto-complete="off" placeholder="请输入桌号"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="餐桌类型" :label-width="formLabelWidth" style="text-align: left">
          <el-select v-model="form.region" placeholder="请选择餐厅类型，默认标准">
            <el-option :disable="true" label="包厢" value="shanghai"></el-option>
            <el-option label="大厅" value="beijing"></el-option>
            <el-option label="标准" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="容纳人数" :label-width="formLabelWidth">
          <el-input v-model="form.person" auto-complete="off" placeholder="请输入容纳人数"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="large" icon="el-icon-time">暂不开启</el-button>
        <el-button @click="dialogFormVisibleTablePlus = false">取 消</el-button>
        <el-button type="primary" @click="plusTable">立即开启</el-button>
      </div>
    </el-dialog>

    <!--添加组件-->
    <editcontrol @plusMethods="plusMethodsThis"></editcontrol>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/tables/shopcart.vue'
import cartcontrol from '@/components/tables/cartcontrol.vue'
import editcontrol from '@/components/editcontrol/editcontrol';
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  name: 'tables',
  data: () => ({
    show3: false,
    input5: '',
    fullscreenLoading: false,
    tableSearchSelect1: '',
    tableSearchSelect2: '',
    valueSearchSelect: new Date(2016, 9, 10, 18, 40),
    goods: [],
    listHeight: [],
    scrollY: 0,
    selectedFood: {},
    show: false,
    divTop: "divTop",
    SColor: 'SColor',
    show2: false,
    activeName: 'first',
    dialogFormVisibleTable: false,
    dialogFormVisibleTablePlus: false,
    listTable:[],
    goodsTable:[],
    currentDate: new Date(),
    formLabelWidth:'80px',
    tableTitle:"",
    visible2: false,
    toAccountBox: [],
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
      tableNum:'',
      person:''
    },
    options4: [],
    value9: [],
    list: [],
    loading: false,
    states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
    options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    value: ''

  }),
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    stopTableService(){
      const loading = this.$loading({
        lock: true,
        text: '正在暂停该餐桌服务……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'

      });
      setTimeout(() => {
        loading.close();
        this.$message({
          showClose: true,
          message: '该餐桌二维码已经失效！',
          type: 'success'
        });
      }, 2000);
    },
    plusCustomer(){

    },
    refreshTable(){
      const loading = this.$loading({
        lock: true,
        text: '清台中……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'

      });
      setTimeout(() => {
        loading.close();
        this.$message({
          showClose: true,
          message: '清台成功！',
          type: 'success'
        });
      }, 2000,function () {

      });

    },
    singleAccounts(){
      alert("结账中……")
    },
    selectCustom(item,event){
      // console.log(item);
      // console.log(event);
      var toggle = event.currentTarget; //通过event获取该元素
      // toggle.style.boxShadow = '1px 2px 3px rgba(0,0,0,0.3)'

    },
    handleDelete(tag) {
      this.$confirm('即将删除该餐桌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag), 1);
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
    otouch() {
      this.show = false
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }

      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      if (document.getElementById("goods").offsetTop < 124) {
        return;
      };
      this.selectedFood = food;
    },
    callService(){
      alert("呼叫服务")
    },
    incrementTotal(target) {
      //体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs['shop-cart'].drop(target);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {

      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },


    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    plusTable(){
      this.dialogFormVisibleTablePlus =!this.dialogFormVisibleTablePlus
    },
    plusMethodsThis(data){
      this.dialogFormVisibleTablePlus = !this.dialogFormVisibleTablePlus;
    },
    handleEdit(){
      this.dialogFormVisibleTablePlus = !this.dialogFormVisibleTablePlus;
    },
    selectTable(item,index){
      let showGoodse = document.getElementById('goods')
      // showGoodse.style.display = "none"

      this.show3=!this.show3

      this.$nextTick(() => {
        if(!this.scroll){
          this._initScroll();
        }else{
          this.scroll.refresh();
        }
        this._calculateHeight();
      })
      // this.dialogFormVisibleTable = !this.dialogFormVisibleTable
      // console.log(item);

      this.toAccountBox = item;
      // console.log(this.toAccountBox);console.log("this.toAccountBox");
      this.form.name = item.score
      this.form.type = item.recommend
      var Title = new Array("桌号"+(index+1))
      this.tableTitle = Title.join('——')
    },
    handleClick(tab, event) {
    },
    labelHideSroll(){
    },
    openMsg(msg){
      const h = this.$createElement;
      this.$msgbox({
        title: '结账',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('el-button', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '结账中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
      // this.$alert(
      //   '<el-row>\n' +
      //   '  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">\n' +
      //   '    <el-card :body-style="{ padding: \'0px\' }">\n' +
      //   '      <div style="padding: 14px;">\n' +
      //   '        <span>好吃的汉堡</span>\n' +
      //   '        <div class="bottom clearfix">\n' +
      //   '          <time class="time">' +
      //                 this.currentDate+
      //               '</time>\n' +
      //   '          <el-button type="text" class="button">操作按钮</el-button>\n' +
      //   '        </div>\n' +
      //   '      </div>\n' +
      //   '    </el-card>\n' +
      //   '  </el-col>\n' +
      //   '</el-row>',
      //   '确认结账', {
      //   dangerouslyUseHTMLString: true
      // });
    }
  },
  mounted() {
    setTimeout(this.show2 = !this.show2,2000);
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  created() {

    this.$axios.get('../api/ratings').then((response) => {
      var response = response.data
      if (response.errno === ERR_OK) {
        this.listTable = response.data
      }
    })
    this.$axios.get('../api/goods').then((res) => {
      var res = res.data
      if (res.errno === ERR_OK) {
        this.goodsTable = res.data
        this.goods = res.data

      }
    })
    // this.$axios.get('../api/seller').then((re) => {
    //     var re = re.data
    //     if (re.errno === ERR_OK) {
    //       this.seller = re.data
    //       console.log(this.seller)
    //     }
    //   });

  },
  components:{
    editcontrol,
    shopcart,
    cartcontrol
  },
  events: {
    'cart.add'(target) {
      this._drop(target);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

@import "mixin.styl"
@import "animate.css";



.tables
  margin:0 3% 0
  .el-row
    .table-container
      display: flex
      height: 720px
      flex-wrap: wrap
      .transition-box
        margin-bottom: 8px
        width: 10em
        height: 10em
        border-radius: 10px
        background-color: white
        color: white
        text-align: center
        box-sizing: border-box
        margin-right: 20px
        overflow hidden
        position relative
        z-index 99
        .box-header
          width 100%
          height 15%
          display block
          background #409EFF
        .box-content
          overflow-y scroll
          height 77%
          width 95%
          color: rgba(0, 0, 0, 0.5) !important
          border-radius 0px 0px 9px 9px/ 0px 0px 9px 9px
          text-align left
          padding-left 5%
          background rgba(0, 0, 0, 0.05)
          p
            margin 4px 0px
            font-size 14px


            /*.right*/
              /*width 50%*/
              /*height auto*/
              /*background #409EFF*/
              /*position relative*/
              /*top 0*/
              /*right 0*/
              /*z-index 100*/

  .tableButtonGroup
    position: absolute
    right: 50px
    bottom: 20px
    width 50px
    z-index 100
    button
      margin 0px 0px 10px 10px


  .tableNumber
    position: absolute
    font-size: 17px
    z-index: 1
    background: #f56c6c
    color: white
    width: 111px
    height: 73px
    border-radius: 50%
    text-align: center
    line-height: 100px
    right: 27%
    top: -36px

  .tableButtonGroup1
    position: fixed
    left: 23%
    bottom: 35px
    width auto
    z-index 100
    span
      .popover
        .singleButton
          margin-left 0px
          padding 10px
          &:hover
            box-shadow 1px 2px 3px rgba(0,0,0,0.3)
    >button
      margin-left 2px


  .el-badge
    top -9px
    left -15px


  .time
    font-size: 13px
    color: #999


  .bottom
    margin-top: 13px
    line-height: 12px


  .button
    padding: 0
    float: right


  .image
    width: 100%
    display: block


  .clearfix:before,.clearfix:after
    display: table
    content: ""


  .clearfix:after
    clear: both


.mask-black
  width 150%
  height 150%
  left -50%
  top -50%
  background rgba(0,0,0,0.5)
  position fixed
  z-index 100


.closeTable:hover
  background #f56c6c
  color white
  border-color #f56c6c


.goodse
  display: flex
  position fixed
  top 50px
  left 124px
  background white
  width: 75%
  overflow: hidden
  text-align left
  border-radius 10px
  height 80%
  z-index 103
  .close-bnt
    color white
    position fixed
    bottom 20px
    left 50%
    font-size 40px
  .menu-button
    position relative
    width 20px
    height 20px
    background #f3f5f7
    border-radius 100%
    display none

  .menu-wrapper
    flex: 0 0 80px
    width: auto
    background: #f3f5f7
    display block !important
    .menu-ul
      width 105px
      padding-left 15px
    .menu-item
      display: table
      height: 54px
      width: 75px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat

      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px

  .foods-wrapper
    flex: 1
    ul
      padding 0px 0px 30px
      margin-top 0px
     .food-list
      padding-top 20px
      background white
      .goods-title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          .goods-content
            flex: 1
            .goods-name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)

.desc, .extra
  line-height: 10px
  font-size: 10px
  color: rgb(147, 153, 159)
.desc
  line-height: 12px
  margin: 3px 0px 8px
.extra
  .count
    margin-right: 12px
.price
  font-weight: 700
  line-height: 24px
  .now
    margin-right: 8px
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)


.cartcontrol-wrapper
  position: absolute
  right: 0
  bottom: 12px
  background white
  border-radius 20px
  .cartcontrol
    padding-top 1px
    .cart-decrease,.cart-add,.cart-count
      padding 1px

.desc, .extra
  line-height: 10px
  font-size: 10px
  color: rgb(147, 153, 159)
.desc
  line-height: 12px
  margin: 3px 0px 8px
.extra
  .count
    margin-right: 12px
  .now
    margin-right: 8px
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)



  .el-select,.el-input
    width: 130px

  .input-with-select,.el-input-group__prepend
    background-color: #fff

</style>
