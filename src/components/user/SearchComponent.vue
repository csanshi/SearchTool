<template>
  <el-card style="height: 100%; width: 100%; border: 1px solid #eee">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="日期" prop="date">
        <el-date-picker type="date" placeholder="例如: 2020-01-01" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="车次" prop="trainNumber">
        <el-input v-model="form.trainNumber" placeholder="车次或航班，例如：T123 或 AC1111"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-input v-model="form.area" placeholder="可不填，例如：成都 或 四川"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">search</el-button>
        <el-button @click="reset('form')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default{
  props: [],
  data () {
    return {
      form: {
        date: '',
        trainNumber: '',
        area: ''
      },
      rules: {
        date: [
          {required: false, message: 'Please input date', trigger: 'blur'}
        ],
        trainNumber: [
          {required: false, message: 'please input trainNumber', trigger: 'change'}
        ],
        area: [
          {required: false, message: 'please input trainNumber', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    ...mapMutations({
      setCondition: 'user/setCondition'
    }),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setCondition({ ...this.form })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
      this.setCondition({})
    }
  }
}
</script>
