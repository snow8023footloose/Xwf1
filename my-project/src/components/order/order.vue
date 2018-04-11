<template>
  <div class="order">

    <el-tabs
      v-loading="loading"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="外卖订单" name="first">
        <template>
          <!-- <span>{{msg}}</span> -->
          <el-table
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
        </template>
      </el-tab-pane>
      <el-tab-pane label="历史订单" name="second">
        <template>
          <!-- <span>{{msg}}</span> -->
          <el-table
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
        </template>
      </el-tab-pane>
    </el-tabs>
    <editcontrol></editcontrol>
  </div>
</template>
<script>
  import editcontrol from '@/components/editcontrol/editcontrol';

  const ERR_OK = 0
  export default {
    name: 'New',
    data:() => ({
      currentPage1:5,
      activeName: 'first',
      goods:[],
      loading: true
    }),
    methods: {
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
      }
    },
    computed:{
      listGoods(){
        let tempArr = [];
        this.goods.forEach((item)=>{
          tempArr = tempArr.concat(item.foods);
        })
        return tempArr;
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
      // this.$nextTick(()=>{
      //   this.scroll = new BScroll(this.$refs['goods-classes'],{
      //   })
      // })
    },
    components: {
      editcontrol
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

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


  .cell
    text-align center


</style>


