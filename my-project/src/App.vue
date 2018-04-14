<template>
  <div id="app">

    <div class="login" v-show="loginShow">
      <img class="loginPic" src="./logo.png" alt="">
      <el-form
        label-width="100px"
        :label-position="labelPosition"
        class="demo-ruleForm loginIn"
        @keydown="keyEvent($event)"
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2">
          <el-form-item label="账号" prop="pass">
            <el-input v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm2.checkPass"
              auto-complete="off"

            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
    <el-row
      v-show="loginstate"
      class="main-content"
      id="main-content"
      ref="main-content"
      v-loading.fullscreen.lock="fullscreenLoading"
    >

      <el-switch
        class="person-close person-close1"
        style="display: block"
        v-model="value4"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="营业"
        inactive-text="休息"
        @click="atSwitch"
      >
      </el-switch>
      <i style="color: #ff525b" class="el-icon-circle-close person-close" @click="loginOut"></i>

      <el-col :span="5" v-show="manager">
        <img src="./logo.png" alt="">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <router-link :to="{path:'/XWFer/xwfcustom'}" class="vlink">
            <el-menu-item index="1">
              <i class="el-icon-tickets"></i>
              <span slot="title" class="title">我的客户</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/XWFer/xwfer'}" class="vlink">
            <el-menu-item index="2">
              <i class="el-icon-star-off"></i>
              <span slot="title" class="title">个人信息</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{path:'/XWFer/xwffunction'}" class="vlink">
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title" class="title">系统功能</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-col>
      <el-col :span="5" v-show="owner">
        <img src="./logo.png" alt="">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <router-link :to="{path:'/'}" class="vlink">
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span slot="title" class="title">餐桌收银</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{path:'/XWFs/order'}" class="vlink">
            <el-menu-item index="2">
              <i class="el-icon-bell"></i>
              <span slot="title" class="title">订单管理</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{path:'/XWFs/goods'}" class="vlink">
            <el-menu-item index="3">
              <i class="el-icon-goods"></i>
              <span slot="title" class="title">菜品管理</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{path:'/XWFs/finance'}" class="vlink">
            <el-menu-item index="4">
              <i class="el-icon-news"></i>
              <span slot="title" class="title">财务信息</span>
            </el-menu-item>
          </router-link>

          <router-link :to="{path:'/XWFs/setting'}" class="vlink">
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title" class="title">系统设置</span>
            </el-menu-item>
          </router-link>

          <!--<el-menu-item index="5">
            <i class="el-icon-printer"></i>
            <span slot="title"><router-link :to="{path:'/printer'}">打印</router-link></span>
          </el-menu-item>-->
        </el-menu>
      </el-col>
      <el-col :span="19" >
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      value4: true,
      fullscreenLoading: false,
      value5:100,
      loginstate: true,
      loginShow: false,
      owner:false,
      manager: false,
      labelPosition: 'top',
      show2: true,
      footer: '新沃丰网络科技',
      ruleForm2: {
        pass: '',
        checkPass: '',
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    atSwitch(){
      console.log("1");
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
    keyEvent (ev) {
      alert(ev.keyCode)
    },
    show:function(ev){
      if(ev.keyCode == 13){
        alert('你按回车键了');
      }
    },
    // onkeydown(function () {
    //   if(event.keyCode === 13){
    //     alert("按下了enter键")
    //   }
    // }),
    loginOut(){
      this.$confirm('即将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loginstate = false
        this.loginShow = true
        this.$message({
          duration: 1500,
          type: 'success',
          message: '退出成功，感谢您的使用！'
        });

      }).catch(() => {
        this.$message({
          duration: 1500,
          type: 'info',
          message: '已取消退出'
        });
      });

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Height() {
      let mainHeigh = document.querySelector("#main-content")
      let appHeigh = document.querySelector("html").clientHeight;
      mainHeigh.style.top =(appHeigh/mainHeigh.clientHeight) + "%"

    },
    open11() {
      this.$notify({
        title: '滑动查看更多内容',
        message: '',
        offset: 100,
        duration: 2000
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if(this.value4 === true){
            this.$message({
              duration: 1500,
              type: 'success',
              message: '登录成功，店铺状态，营业中……'
            });
          }else if(this.value4 === false){
            this.$message({
              duration: 1500,
              type: 'info',
              message: '登录成功，店铺状态，休息中……'
            });
          }
          this.loginstate = true
          this.loginShow = false


        } else {
          console.log('提交失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
    },
  created() {
    this.owner = !this.manager
  },
  mounted() {
    this.Height();

  }


}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body
  overflow hidden

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: #2c3e50
  width: 100%
  height: 100%
  overflow hidden
  .main-content
    position relative
    height auto
    .el-col
      .el-menu
        .vlink
          text-decoration: none
          font-size: 2em
          color:black
          .el-menu-item
            padding-bottom 10px
            font-size:2em
            .title
              font-size 0.3em
        .router-link-exact-active
          .el-menu-item
            .title
              font-size 0.35em
      >img
        width 48%
        height auto
        margin 1em
  .login
    margin-top: 200px

.el-form-item__label
  float left !important
.loginPic
  display block
  width 135px
  margin 40px auto 10px
.loginIn
  margin 20px auto 40px
  width 250px

li
  list-style none

.person-close
  position absolute
  font-size 33px
  .transition-box
    margin-bottom: 10px
    width: 10.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    color: #fff
    padding: 10px 5px
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    p,span
      margin 2px 0
      font-size 10px
  top 18px
  right 47px
  z-index 3

.person-close1
  right 156px !important
  top 23px !important

.el-menu-item [class^=el-icon-]
  margin-right -5px

.cell
  text-align left

.finance,.goods,.setting,.member,.order,.person,.purchase,.setting,.table,.test,.xwffunction,.xwfer,.xwfcustom
  margin:0 3% 0
  height:96%

.el-tabs__nav
  margin-left 10%

.el-tabs__content
  height 720px !important
  padding-right 15px

.el-select
  display block

.el-table--fit
  height 725px !important

.el-tabs__item
  font-size 19px

.el-tabs__nav-scroll
  margin-top 20px

.el-tab-pane[data-v-60204f04]
  width 50%

@media screen and (max-width: 1200px)
  .el-table--fit
    height 570px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 570px !important
        overflow-y scroll

  .login
    margin-top: 100px !important

  .table-container
    height: 20em


@media screen and (max-width: 900px)
  .el-table--fit
    height 500px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 500px !important
        overflow-y scroll

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important


  .el-tabs__item
    font-size 14px

  .el-tabs__nav-scroll
    margin-top 0px

  .el-tab-pane[data-v-60204f04]
    width 100%

  .person-close
    position absolute
    font-size 20px
    color #f6606f
    top 11px
    right 22px
    z-index 3

  .person-close1
    right 74px !important
    top 8px !important

  .login
    margin-top: 0px !important

  .goodse
    top: 15px !important
    left: 34px !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 10px !important


@media screen and (max-width: 825px)
  .el-table--fit
    height 250px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 250px !important
        overflow-y scroll



  .el-table td, .el-table th
    padding 5px !important

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px !important
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important

  .goodse
    top: 15px !important
    left: 34px !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 10px !important
@media screen and (max-width: 737px)
  .el-table--fit
    height 280px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 280px !important
        overflow-y scroll

  .goodse
    top: 15px !important
    left: 34px !important

  .tableButtonGroup1
    left: 34px !important
    bottom: 10px !important

  .transition-box
    margin-bottom: 10px
    width: 12.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    box-sizing: border-box
    margin-right: 20px
    font-size 12px !important
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px !important


  .title
    font-size 0.256em !important


@media screen and (max-width: 668px)
  .el-table--fit
    height 250px !important

  .setting,.tables,.xwfcustom,.xwfer,.xwffunction
    >.el-tabs
      .el-tabs__content
        height 250px !important
        overflow-y scroll


  .transition-box
    margin-bottom: 10px
    width: 10.5em !important
    height: 7em !important
    border-radius: 4px
    text-align: center
    color #f6606f
    box-sizing: border-box
    margin-right: 20px
    font-size 12px
    .box-header
      height 23% !important
    p,span
      margin 2px 0
      font-size 10px


  .el-menu-item [class^=el-icon-]
    margin-right -12px
</style>
