<template>
  <div>
    <el-dialog title="编辑用户权限" :visible.sync="dialogVisible">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="subTreeList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        highlight-current=""
        node-key="id"
        :default-checked-keys="defKeys"
        :filter-node-method="filterNode"
        ref="treeRef"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetChecked">清空选择</el-button>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="_grantRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { grantRight } from '@/api/roles'
export default {
  name: 'Index',
  props: {
    treeList: {
      type: Array,
      default: () => Object.assign([], [])
    },
    show: {
      type: Boolean,
      default: false
    },
    rolesId: {
      type: String,
      default: ''
    },
    defKeys: {
      type: Array,
      default: () => Object.assign([], [])
    }
  },
  data () {
    return {
      // assign 只能对对象中的基本数据类型数据进行深拷贝，而内部的object类型数据不能进行深拷贝
      // 这里不需要进行数据的隔离，故不使用stringify进行转换
      subTreeList: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    }
  },
  watch: {
    treeList (val) {
      const temp = this._.cloneDeep(val)
      this.subTreeList = temp
    },
    filterText (val) {
      this.$refs.treeRef.filter(val)
    }
  },
  methods: {
    // 取消父组件
    handleCancel () {
      this.dialogVisible = false
    },
    // 将权限赋值给用户
    async _grantRight () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(this.$refs.treeRef.getCheckedKeys())
      console.log(this.$refs.treeRef.getHalfCheckedKeys())
      const idStr = keys.join(',')
      const res = await grantRight(this.rolesId, { rids: idStr })
      if (res.meta.status !== 200) {
        this.$message.error('更新用户权限失败！')
      }
      this.$message.success('更新用户权限成功！')
      this.$emit('confirm')
      this.dialogVisible = false
    },
    // 筛选树形组件的值
    filterNode (value, subTreeList) {
      if (!value) return true
      return subTreeList.authName.indexOf(value) !== -1
    },
    // 清空树形组件的值
    resetChecked () {
      this.$refs.treeRef.setCheckedKeys([])
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-tree {
  height: 300px;
  overflow: auto;
  padding: 10px;
}
</style>
