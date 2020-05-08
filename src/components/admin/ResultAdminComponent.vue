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
      <component :is="types[activeIndex]" :tableData="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" >
        <template slot="operation" slot-scope="slotProps">
          <el-button size="mini" @click="handleSubmit(slotProps.datas.row)">提交</el-button>
          <el-button size="mini" @click="handleEdit(slotProps.datas.row)">修改</el-button>
          <el-button size="mini" @click="handleDelete(slotProps.datas.row)">删除</el-button>
        </template>
      </component>
      <Edit v-if="isEditing" :formInfo="editedRow"></Edit>
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

  import Edit from './EditComponent.vue'


  import { submitUnconfirmedData, deleteUnconfirmedData } from '@/api/allApi'
  import { echo } from '@/utils/commonFuncs'

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default{
    components: {
      AllTable, PlaneTable, TrainTable, SubwayTable, CoachTable, BusTable, TaxiTable, ShipTable, OthersTable,
      Edit
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
        editedRow: {},
      }
    },

    computed: {
      ...mapState({
        isEditing: state => state.admin.isEditing
      }),
      ...mapGetters({
        getTableDataByType: 'admin/getTableDataByType'
      }),
      tableData: function () {
        return this.getTableDataByType(this.activeIndex)
      }
    },

    created () {
      this.$store.dispatch('admin/getAllData')
    },

    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key.toString()
      },

      handleSizeChange: function (size) {
        this.pageSize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },

      handleSubmit: function (row) {
        console.log(row)
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          submitUnconfirmedData(row._id).then(res => {
            this.$store.dispatch('admin/getAllData').then(
              () => {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });
              }
            )
          }).catch(err => {
            this.$message('提交失败')
            throw err
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      },
      handleEdit: function (row) {
        this.editedRow= {...row}
        this.changeEdting()
      },
      handleDelete: function (row) {
        console.log(row)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUnconfirmedData(row._id).then(
              response => {
                this.$store.dispatch('admin/getAllData').then(
                  () => {
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                )
              }
          ).catch(function (error) {
            throw error
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      ...mapMutations({
        changeEdting: 'admin/changeEditing'
      })
    }
  }

</script>

<css></css>
