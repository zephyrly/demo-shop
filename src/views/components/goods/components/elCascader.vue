<template>
  <div>
    <el-cascader
      v-model="goods_cat"
      :options="catelist"
      :props="cateProps"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>
<script>
import { getCategories } from '@/api/goods'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      goods_cat: [],
      catelist: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取商品分类数据列表
    async _getCategories () {
      const res = await getCategories()
      // console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('获取商品分类数据列表失败！')
      }
      this.catelist = res.data
    },
    handleChange () {
      // console.log(this.goods_cat)
      if (this.goods_cat.length !== 3) {
        this.goods_cat = []
      }
      this.$emit('confirm', this.goods_cat)
    }
  },
  created () {
    this._getCategories()
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='scss' scoped>
.cascaderClass {
  height: 300px;
  ::v-deep .el-cascader__dropdown {
    height: 200px;
  }
}
</style>
