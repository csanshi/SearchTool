<template>
  <div>
    <MayErrorTable :tableData="feedback">
      <template slot="operation" slot-scope="slotProps">
        <el-button size="mini" @click="handleEdit(slotProps.datas.row)">更新</el-button>
        <el-button size="mini" @click="handleDelete(slotProps.datas.row)">删除</el-button>
      </template>
    </MayErrorTable>
    <el-dialog title="修改并提交" :visible="isEditing" @close="isEditing=false">
      <el-form :model="formInfo" :rules="rules" ref="editedForm" :label-width="formLabelWidth">
        <el-form-item label="信息来源" prop="srcOfMessage">
          <el-input v-model="formInfo.srcOfMessage" ></el-input>
        </el-form-item>
        <el-form-item label="信息url" prop="urlOfMessage">
          <el-input v-model="formInfo.urlOfMessage"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker type="date" v-model="formInfo.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="type" align="left">
          <el-select v-model="formInfo.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车次" prop="trainNumber">
          <el-input v-model="formInfo.trainNumber"></el-input>
        </el-form-item>
        <el-form-item label="车厢" prop="compartment">
          <el-input v-model="formInfo.compartment"></el-input>
        </el-form-item>
        <el-form-item label="起点" prop="startPoint">
          <el-input v-model="formInfo.startPoint"></el-input>
        </el-form-item>
        <el-form-item label="终点" prop="endPoint">
          <el-input v-model="formInfo.endPoint" ></el-input>
        </el-form-item>
        <el-form-item label="开始/结束时间" prop="datetime" align="left">
          <el-date-picker
            v-model="datetime"
            value-format="yyyy/MM/dd HH:mm:ss"
            type="datetimerange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formInfo.description" ></el-input>
        </el-form-item>
        <el-form-item label="填写时间" prop="submitTime">
          <el-input v-model="formInfo.submitTime" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditing=false">取 消</el-button>
        <el-button type="primary" @click="editInfo('editedForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MayErrorTable from './MayErrorTable.vue'

  import { getFeedback, updateConfirmedDataAccordingToFeedback, deleteFeedback } from '@/api/allApi'
  import { echo } from '@/utils/commonFuncs'

  export default{
    components: {
      MayErrorTable
    },

    data: function () {
      return {
        feedback: [],
        formInfo: {},
        datetime: [],
        isEditing: false,
        typeOptions: [{
          value: 1,
          label: '飞机'
        }, {
          value: 2,
          label: '火车'
        }, {
          value: 3,
          label: '地铁'
        }, {
          value: 4,
          label: '长途客车/大巴'
        }, {
          value: 5,
          label: '公交车'
        }, {
          value: 6,
          label: '出租车'
        }, {
          value: 7,
          label: '轮船'
        }, {
          value: 8,
          label: '其他公共场所'
        }],
        rules: {},
        formLabelWidth: 'auto'
      }
    },

    created () {
      getFeedback().then(responseData => {
        this.feedback = responseData
      })
    },

    methods: {
      handleEdit: function (row) {
        this.formInfo = {...row}
        this.datetime = [this.formInfo.startTime, this.formInfo.endTime]
        this.isEditing = true
      },
      editInfo: function (formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            this.formInfo.startTime = this.datetime[0]
            this.formInfo.endTime = this.datetime[1]
            updateConfirmedDataAccordingToFeedback(this.formInfo).then(responseData => {
              this.$message('修改成功')
              this.isEditing = false
              //this.$parent.$store.dispatch('admin/getAllData')
            })
          } else {
            console.log('有不合法输入！')
            return false
          }
        })
      },
      handleDelete: function (row) {
        deleteFeedback(row['_id']).then(responseData => {
          this.$message('删除成功')
        })
      }
    }
  }

</script>

<css></css>
