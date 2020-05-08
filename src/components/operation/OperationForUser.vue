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
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <el-table-column
          prop="srcOfMessage"
          label="线索来源"
          width="120">
          <template slot-scope="scope">
            <el-link :href="scope.row.urlOfMessage">{{scope.row.srcOfMessage}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="trainNumber"
          label="车次/车牌/航班名"
          width="140">
        </el-table-column>
        <el-table-column
          prop="type"
          label="出行类型"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="startPoint"
          label="出发站"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endPoint"
          label="到达站"
          width="100">
        </el-table-column>
        <el-table-column
          prop="compartment"
          label="车厢"
          width="80">
        </el-table-column>
        <el-table-column
          prop="description"
          label="出行描述"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="submitTime"
          label="提交时间"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="事件备注"
          width="120">
        </el-table-column>
      </el-table>
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
  import {getAllData} from '@/api/allApi'
  export default{
    data: function () {
      return {
        activeIndex: '0',
        hxrData: [],
        currentPage: 1,
        pageSize: 5,
        tableData: [],
        typeMapping: ['全部', '飞机', '火车', '地铁', '长途客车/大巴',
          '公交车', '出租车', '轮船', '其他公共场所']
      }
    },
    props: {
      url: String
    },
    created () {
      this.handleGetData()
    },
    methods: {
      handleSelect(key, keyPath) {
        let res = []
        for(let i = 0; i < this.hxrData.length; i++){
          let item = this.hxrData[i]
          if(item.type == key){
            res.push({...item})
            res[res.length-1].type = this.typeMapping[key]
          }else if(key == 0){
            console.log('key == 0');
            res.push({...item})
            res[res.length-1].type = this.typeMapping[item.type]
          }
        }
        this.tableData = res
      },
      handleSizeChange: function (size) {
        this.pageSize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      handleGetData: function () {
        getAllData().then(responseData => {
          this.hxrData = responseData;
          let result = [];
          for(let i = 0; i < this.hxrData.length; i++){
            result[i] = {...this.hxrData[i]};
            let k = result[i].type;
            result[i].type = this.typeMapping[k]
          }
          this.tableData = result
        })
//      this.$http.get(this.config.url).then(res => {
//        this.hxrData = res.body
//        let result = []
//        for(let i = 0; i < this.hxrData.length; i++){
//          result[i] = {...this.hxrData[i]}
//          let k = result[i].type
//          result[i].type = this.typeMapping[k]
//        }
//        this.tableData = result
//      })
      },
      searchAndUpdateData (conditions) {
        console.log('searchAndUpdateData: ', conditions)
        var [date, trainNumber, area] = [conditions.date, conditions.trainNumber, conditions.area]
        var res = []
        for (var i = 0; i < this.hxrData.length; i++) {
          var item = this.hxrData[i]
          //if (new Date(item.date).getTime() == new Date(date).getTime()) {
          // console.log(item)
          if (item.date.search(date) != -1 &&
            item.trainNumber.search(trainNumber) != -1 &&
            (item.startPoint.search(area) != -1 || item.endPoint.search(area) != -1)) {
            res.push(item)
          }
        }
        this.tableData = res
      }
    }
  }

</script>

<css></css>
