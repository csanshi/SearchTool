<template>
  <div style="display: inline">
    <el-button type="primary" icon="plus" @click="dialogVisible=true">新建信息</el-button>
    <el-dialog title="添加信息" :visible.sync="dialogVisible"  @close="resetForm('formInfo')">
      <el-form :model="formInfo" :rules="rules" ref="newForm" :label-width="formLabelWidth">
        <el-form-item label="信息来源" prop="srcOfMessage">
          <el-input v-model="formInfo.srcOfMessage" ></el-input>
        </el-form-item>
        <el-form-item label="信息url" prop="urlOfMessage">
          <el-input v-model="formInfo.urlOfMessage"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker type="date" placeholder="例如: 2020-01-01" v-model="formInfo.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
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
        <el-form-item label="开始/结束时间" prop="startTime" align="left">
          <el-date-picker
            v-model="formInfo.startTime"
            value-format="yyyy/MM/dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo('newForm')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addUnconfirmedData} from '@/api/allApi'
export default{
  data () {
    return {
      dialogVisible: false,
      formInfo: {
        srcOfMessage: '人民日报',
        urlOfMessage: 'www.baidu.com',
        date: null,
        type: 1,
        trainNumber: 'No. 189, Grove St, Los Angeles',
        compartment: '1号车厢',
        startPoint: '埃塞俄比亚',
        endPoint: '成都',
        startTime: '2020/02/23',
        endTime: '2020/02/24',
        description: '描述1',
        submitTime: new Date().getTime()
      },
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
  methods: {
    checkName () {
      console.log(1)
    },
    resetForm (arg) {
      console.log(arg)
    },
    addInfo: function (formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          this.formInfo.endTime = this.formInfo.startTime[1]
          this.formInfo.startTime = this.formInfo.startTime[0]
          addUnconfirmedData(this.formInfo).then(responseData => {
            this.dialogVisible = false
            this.$message('添加成功，等待审核')
          })
        } else {
          console.log('有不合法输入！')
          return false
        }
      })
    }
  }
}
</script>

