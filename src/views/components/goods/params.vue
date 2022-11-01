<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 提示区域 -->
      <el-alert
        title="注意：只允许第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
      </el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="动态参数" name="many">
          <tabsTable
            :btnName="btnName"
            :labelName="labelName"
            :cateID="cateID"
            :tableData="tableData"
            ref="manyTableRef"
          ></tabsTable>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <tabsTable
            :btnName="btnName"
            :labelName="labelName"
            :cateID="cateID"
            :tableData="tableData"
            ref="onlyTableRef"
          ></tabsTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getParamsList } from '@/api/goods'
import tabsTable from './components/tabsTable.vue'
export default {
  name: '',
  props: {},
  components: {
    tabsTable
  },
  data () {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: '',
      activeName: 'many',
      // table数据
      btnName: '添加参数',
      labelName: '',
      tableData: [],
    }
  },
  computed: {
    cateID () {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    }
  },
  watch: {},
  methods: {
    // 获取所有的商品分类列表
    async _getParamsList () {
      const res = await getParamsList()
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      this.catelist = res.data
    },
    // 产品多级选择
    async handleChange () {
      this.tabClick()
    },
    // tab-pan点击事件
    tabClick () {
      if (this.activeName === 'many') {
        this.btnName = '添加参数'
        this.labelName = '参数名称'
        this.$nextTick(() => {
          this.$refs.manyTableRef._getAttri()
        })
      } else if (this.activeName === 'only') {
        this.btnName = '添加属性'
        this.labelName = '属性名称'
        this.$nextTick(() => {
          this.$refs.onlyTableRef._getAttri()
        })
      }
      console.log(this.labelName)
    },
    // 获取动态参数
    async _getAttri () {
      console.log('id', this.cateID)
      const res = await getAttri(this.cateID, { sel: 'many' })
      // console.log(res)

      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
      });

      this.tableData = res.data
    },
    // 动态参数的编辑按钮
    _editAttri () {

    },
    // 动态参数的删除按钮
    _deleteAttri () {

    }
  },
  created () {
    this._getParamsList()
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='scss' scoped>
</style>
