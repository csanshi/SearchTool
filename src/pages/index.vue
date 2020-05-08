<template>
    <el-card>
      <search-component ref="search"></search-component>
      <result-component ref="result" @typeChanged="handleTypeChanged"></result-component>
    </el-card>
</template>

<script>
import SearchComponent from '../components/user/SearchComponent.vue'
import ResultComponent from '../components/user/ResultComponent.vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default{
  components: {
    SearchComponent,
    ResultComponent
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll)
  },
  data: function(){
      return {
//        ...mapState({
//          scroll: state => state.scroll
//        })
        scroll
      }
  },
//  watch: {
//      scroll: function (newVal, oldVal) {
//        console.log(newVal, oldVal)
//        document.documentElement.scrollTop = newVal
//      }
//  },
  methods: {
//    ...mapMutations({
//      setScroll: 'setScroll'
//    }),
    handleScroll(){
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    handleTypeChanged(){
      document.documentElement.scrollTop = this.scroll
    }
  }
}
</script>

<css></css>
