<template>
  <el-card>
    <el-radio-group v-model="flag" style="margin-bottom: 20px;">
      <el-radio-button :label="true">待审核数据</el-radio-button>
      <el-radio-button :label="false">存疑数据</el-radio-button>
    </el-radio-group>
    <component :is="flag ? 'UnconfirmedTable' : 'MayErrorTable' "></component>

    <!--<result-admin-component></result-admin-component>-->
  </el-card>
</template>

<script>
  import UnconfirmedTable from '../components/admin/ResultAdminComponent.vue'
  import MayErrorTable from '../components/admin/ResultAdmin2Component.vue'

  export default {
    data: function () {
      return{
        flag: 'true'
      }
    },
    components: {
      UnconfirmedTable,
      MayErrorTable
    }
  }
</script>

