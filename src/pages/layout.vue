<template>
  <el-card style="margin-top: -5%">
    <div class="nav" align="right">
      <add-component ref="add" ></add-component>
      <component :is="flag"></component>
      <!--<login-component ref="login" ></login-component>-->
    </div>
    <div>
      <fieldset>
        <legend><a name="brief">新型冠状病毒肺炎<br />确诊患者同行程查询工具<br /><b>v1.0</b><br /><span id="update_at"></span></a></legend>
      </fieldset>
    </div>
    <router-view></router-view>
  </el-card>
</template>

<script>
  import AddComponent from '../components/AddComponent.vue'
  import LoginComponent from '../components/LoginComponent.vue'
  import LogoutComponent from '../components/LogoutComponent.vue'
  export default{
    name: 'layout',
    components: {
      AddComponent,
      LoginComponent,
      LogoutComponent,
    },
    data: function () {
      return{
        flag: 'LoginComponent',
      }
    },
    mounted: function () {
      this.flag = this.$route.name == 'index' ? 'LoginComponent' : 'LogoutComponent'
    },
    updated: function () {
      this.flag = this.$route.name == 'index' ? 'LoginComponent' : 'LogoutComponent'
    },

  }
</script>
