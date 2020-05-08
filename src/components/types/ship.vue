<template>
  <div>
    <el-table
        :data="tableData"
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
            <el-link :href="scope.row.urlOfMessage" target="_blank">{{scope.row.srcOfMessage}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="trainNumber"
          label="班次"
          width="140">
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
          prop="description"
          label="出行描述"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          sortable>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="submitTime"-->
          <!--label="提交时间"-->
          <!--width="120"-->
          <!--sortable>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="remark"-->
          <!--label="事件备注"-->
          <!--width="80">-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          width="180"
          fixed="right">
          <template slot-scope="scope">
            <slot name='operation' :datas="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default{
    props: {
      tableData: Array
    }
  }

</script>

<css></css>
