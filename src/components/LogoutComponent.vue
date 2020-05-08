<template>
  <div style="display: inline">
    <router-link to="index"><el-button type="primary" icon="plus" @click="dialogVisible =true">注销</el-button>
    </router-link>
  </div>
</template>

<script>
  import { login } from '@/api/allApi'
  export default{
    data () {
      return {
        dialogVisible: false,
        formInfo: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        },
        formLabelWidth: 'auto'
      }
    },
    methods: {

    }
  }
</script>

<style>
  .el-form-item {
  }
</style>
