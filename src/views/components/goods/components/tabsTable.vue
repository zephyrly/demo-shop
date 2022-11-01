<template>
  <div>
    <el-button type="primary" @click="_getAttri">{{ btnName }}</el-button>
    <el-table :data="subTableData" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
            :key="index"
            v-for="(item, index) in scope.row.attr_vals"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ item }}
          </el-tag>
          <!-- 输入的文本框 -->
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <!-- 添加按钮 -->
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="attr_name" :label="labelName"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="_editAttri(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" @click="_deleteAttri(scope.row.attr_id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAttri, deleteParams } from '@/api/goods'
export default {
  name: '',
  props: {
    btnName: {
      type: String,
      default: '添加属性'
    },
    labelName: {
      type: String,
      default: '参数名称'
    },
    cateID: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: []
    }
  },
  components: {},
  data () {
    return {
      selType: '', // 请求数据类型
      subTableData: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取动态参数
    async _getAttri () {
      if (this.labelName === '属性名称') {
        this.selType = 'only'
      } else {
        this.selType = 'many'
      }
      this.subTableData = []
      const res = await getAttri(this.cateID, { sel: this.selType })
      console.log(res)
      if (res.data !== null) {
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          item.inputVisible = false
          // 文本框中输入的值
          item.inputValue = ''
        });
      }

      this.subTableData = res.data
      console.log(this.subTableData)
    },
    handleClose () {

    },
    _editAttri (data) {
      this.$emit('', data)
    },
    async _deleteAttri (attr_id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该参数, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 用户取消了删除的操作
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      // 删除的业务逻辑
      const res = await deleteParams(this.cateID, attr_id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败！')
      }

      this.$message.success('删除参数成功！')
      this._getAttri()
    },
    handleInputConfirm () {

    }
  },
  created () {
    this.subTableData = this._.cloneDeep(this.tableData)
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='scss' scoped>
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>
