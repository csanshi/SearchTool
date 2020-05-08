<template>
  <div>
    <el-button>dddd</el-button>
    <el-button
      size="mini"
      @click="$emit('edit',  scope.$index, scope.row)">编辑</el-button>
    <el-button
      size="mini"
      type="danger"
      @click="f(scope.$index, scope.row)">删除</el-button>
    <el-button
      size="mini"
      @click="$emit('submit', scope)">提交</el-button>
  </div>
</template>

<script>
export default{
  props: {
    scope: Object,
  },
  methods: {
    f: function (a1, a2) {
      console.log(a1, a2)
    }
  }
}
</script>
