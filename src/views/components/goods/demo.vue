<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" class="inputClass">
        <el-col :span="20">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
            <!-- slot="append" -->
            <el-button slot="append" type="primary" @click="_getGoodsList()">
              搜索
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
        <el-col :span="8">
          <el-button @click="clearFilter">清除所有过滤器</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () { },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='scss' scoped>
</style>
