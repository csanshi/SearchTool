<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" style="width: 10%">全部</el-menu-item>
      <el-menu-item index="1" style="width: 10%">飞机</el-menu-item>
      <el-menu-item index="2" style="width: 10%">火车</el-menu-item>
      <el-menu-item index="3" style="width: 10%">地铁</el-menu-item>
      <el-menu-item index="4" style="width: 17%">长途客车/大巴</el-menu-item>
      <el-menu-item index="5" style="width: 10%">公交车</el-menu-item>
      <el-menu-item index="6" style="width: 10%">出租车</el-menu-item>
      <el-menu-item index="7" style="width: 10%">轮船</el-menu-item>
      <el-menu-item index="8" style="width: 10%">其他公共场所</el-menu-item>
    </el-menu>
    <div>
      <component id="table" ref="table" :is="types[activeIndex]" :tableData="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)">
        <template slot="operation" slot-scope="slotProps">
          <el-button size="mini" @click="isEditingErrorInfo=true;id=slotProps.datas.row._id">
            存疑
          </el-button>
        </template>
      </component>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="tableData.length">
      </el-pagination>
    </div>
    <el-dialog
      title="请填写说明文字"
      :visible.sync="isEditingErrorInfo"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="errInfo"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditingErrorInfo = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitProblem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AllTable from '../types/all.vue'
  import PlaneTable from '../types/plane.vue'
  import TrainTable from '../types/train.vue'
  import SubwayTable from '../types/subway.vue'
  import CoachTable from '../types/coach.vue'
  import BusTable from '../types/bus.vue'
  import TaxiTable from '../types/taxi.vue'
  import ShipTable from '../types/ship.vue'
  import OthersTable from '../types/others.vue'


  import OperationForAdmin from '../operation/OperationForAdmin.vue'

  import { getAllData, submitNewInfo, addFeedback } from '@/api/allApi'
  import { echo } from '@/utils/commonFuncs'

  import { mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";

  export default{
    components: {
      ElInput,
      AllTable, PlaneTable, TrainTable, SubwayTable, CoachTable, BusTable, TaxiTable, ShipTable, OthersTable,
      OperationForAdmin
    },

    data: function () {
      return {
        activeIndex: '0',
        types: [
          'AllTable',
          'PlaneTable',
          'TrainTable',
          'SubwayTable',
          'CoachTable',
          'BusTable',
          'TaxiTable',
          'ShipTable',
          'OthersTable'
        ],
        currentPage: 1,
        pageSize: 5,
        isEditingErrorInfo: false,
        id:'',
        errInfo: '',
      }
    },

    computed: {
      ...mapState({
//        allData: state => state.hxrData
      }),
      ...mapGetters({
          tableData: 'user/getResult'
      }),
    },

    watch: {
      activeIndex(){
        this.$nextTick(() => {
            this.$emit('typeChanged')
        })
      }
    },

    created () {
      this.$store.dispatch('user/getAllData')
    },

    methods: {
      ...mapMutations({
        setScroll: 'user/setScroll',
        setType: 'user/setType'
      }),

      handleSelect(key) {
        this.activeIndex = key.toString()
        this.setType(this.activeIndex)
      },

      handleSizeChange: function (size) {
        this.pageSize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },

      handleSubmitProblem: function () {
        this.isEditingErrorInfo = true
        if(this.errInfo){
          addFeedback(this.id, this.errInfo).then( responseData => {
                this.isEditingErrorInfo = false
                this.$message('提供成功')
            })
        }

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }

</script>
