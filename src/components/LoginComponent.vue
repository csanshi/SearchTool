<template>
  <div style="display: inline" align="left">
    <el-button type="primary" icon="plus" @click="dialogVisible =true">管理员登录</el-button>
    <el-dialog title="管理员登录" :visible.sync="dialogVisible" >
      <el-form :model="formInfo" :rules="rules" ref="formInfo" :label-width="formLabelWidth">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="formInfo.username" @keyup.enter.native="handleLogin('formInfo')"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="formInfo.password" show-password @keyup.enter.native="handleLogin('formInfo')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin('formInfo')">登 录</el-button>
      </div>
    </el-dialog>
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
      handleLogin: function (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid){
            login(this.formInfo.username, this.formInfo.password).then(responsedData => {
              // console.log('response: ', responsedData)
              if(responsedData.length != 0){
                this.dialogVisible = false
                this.$router.push('admin')
              }else{
                this.$message('账号或密码错误')
              }
              // resolve()
            }).catch(error => {
              console.log(error)
            })
//            this.$http.post(config.URL, this.formInfo).then(
//              function (res) {
//                if(res.status == 200){
//                  if(res.body.length == 0){
//                    this.$message('账号或密码错误')
//                  }else{
//                    this.dialogVisible = false
//                    this.$router.push('admin')
//                  }
//                }else{
//                  this.$message('添加失败,状态码：' + res.status)
//                }
//              },
//              function (err) {
//                throw err
//              }
//            )
          }else {
            console.log('有不合法输入')
            return false
          }
        })

      }
    }
  }
</script>

<style>
  .el-form-item {
  }
</style>
