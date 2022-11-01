<template>
  <div>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="editFormRef" :model="formListBack" label-width="100px">
        <el-form-item label="用户名称">
          <el-input v-model="formListBack.roleName" />
        </el-form-item>
        <el-form-item label="用户描述">
          <el-input v-model="formListBack.roleDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    formList: {
      type: Object,
      default: () => Object.assign({}, { name: '', id: 0 })
    },
    show: {
      type: Boolean,
      default: false
    },
    editTag: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      formListBack: Object.assign({}, this.formList)
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
    formList (val) {
      const temp = this._.cloneDeep(val)
      this.formListBack = temp
    }
  },
  methods: {
    handleCancel () {
      this.dialogVisible = false
    },
    handleConfirm () {
      this.$emit('confirm', this.formListBack)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>
