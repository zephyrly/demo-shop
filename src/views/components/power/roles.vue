<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体视图卡片 -->
    <el-card class="box-card">
      <el-button type="primary" class="roleBtn" @click="showDialog"
        >添加角色</el-button
      >
      <el-table
        :data="rolesList"
        height="550"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              class="rowCenter bdbottom"
              v-for="item1 in scope.row.children"
              :key="item1.id"
            >
              <el-col :span="5">
                <el-tag closable @close="_removeTag(scope.row, item1.id)">{{
                  item1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  class="rowCenter"
                  v-for="item2 in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="_removeTag(scope.row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="_removeTag(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" type="index" width="80"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="_editRoles(scope.row)"
              >编辑
            </el-button>
            <el-button type="danger" @click="_deleteRoles(scope.row)"
              >删除
            </el-button>
            <el-button type="warning" @click="_assignRights(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出框区域 -->
    <!-- 添加用户弹出框 -->
    <show-dialog
      :show.sync="show"
      :editTag="editTag"
      :formList="formList"
      @confirm="handleConfirm"
    ></show-dialog>
    <!-- 编辑用户弹出框 -->
    <show-dialog
      :show.sync="dialogShow"
      :editTag="editTag"
      :formList="formList"
      @confirm="handleConfirm"
    ></show-dialog>
    <!-- 分配权限弹出框 -->
    <rightsTreeDialog
      :show.sync="assignDialogShow"
      :treeList="treeList"
      :rolesId="rolesId"
      :defKeys="defKeys"
      @confirm="handleConfirm"
    >
    </rightsTreeDialog>
  </div>
</template>
<script>
import {
  addRoles, removeTag, getRolesList,
  deleteRoles, editRoles, getRights
} from '@/api/roles'
import showDialog from '@/components/dialog'
import rightsTreeDialog from './components/rightsTreeDialog.vue'
export default {
  name: 'roles',
  props: {},
  components: {
    showDialog,
    rightsTreeDialog
  },
  data () {
    return {
      rolesList: [], // 角色列表
      defKeys: [], // 权限列表
      show: false,
      editTag: 0, // 区分dialog弹框是编辑还是新增,0为新增,1为编辑,2为编辑权限
      dialogShow: false, // 添加用户角色弹框
      assignDialogShow: false, // 分配角色权限弹框
      rolesId: '', // 角色Id
      treeList: [], // 分配权限数据
      formList: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this._getRolesList()
  },
  methods: {
    // 请求角色列表接口
    async _getRolesList () {
      const { data: res } = await getRolesList()
      this.rolesList = res
    },
    // 添加角色弹框
    showDialog () {
      this.show = true
      this.editTag = 0
    },
    // 添加角色用户、编辑角色用户、添加用户权限
    async handleConfirm (data) {
      if (this.editTag === 0) {
        // console.log(data)
        const res = await addRoles(data)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户角色失败！')
        }
        this.$message.success('添加用户角色成功！')
      } else if (this.editTag === 1) {
        const res = await editRoles(this.rolesId, data)
        if (res.meta.status !== 200) {
          this.$message.error('编辑用户角色失败！')
        }
        this.$message.success('编辑用户角色成功！')
      } else if (this.editTag === 2) {
        this._getRolesList()
      }
      this._getRolesList()
    },
    /*
    // 方法一
    // async _removeTag (role, rightId) {
    //   // 弹框提示用户是否要删除
    //   const confirmResult = await this.$confirm(
    //     '此操作将永久删除该文件, 是否继续?',
    //     '提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).catch(err => err)

    //   if (confirmResult !== 'confirm') {
    //     return this.$message.info('取消了删除！')
    //   }

    //   const res = await removeTag(role.id, rightId)

    //   if (res.meta.status !== 200) {
    //     return this.$message.error('删除权限失败！')
    //   }
    //   // this.getRolesList()
    //   role.children = res.data
    // },
    */
    // 删除权限(方法二)
    _removeTag (role, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除用户权限
        const res = await removeTag(role.id, rightId)
        // this._getRolesList()
        // console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        role.children = res.data
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async _deleteRoles (data) {
      this.rolesId = data.id
      const res = await deleteRoles(this.rolesId)
      // console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error('删除用户失败！')
      } else {
        this.$message.success('删除用户成功！')
      }
      this._getRolesList()
    },
    // 编辑角色权限
    _editRoles (data) {
      this.editTag = 1
      this.formList = data
      this.rolesId = data.id
      this.dialogShow = true
    },
    // 分配权限
    async _assignRights (data) {
      this.assignDialogShow = true
      this.rolesId = data.id + ''
      this.editTag = 2
      const type = 'tree'
      const res = await getRights(type)
      this.treeList = res.data
      // 递归获取三级节点的Id
      this.getLeafKeys(data, this.defKeys)
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys (node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    }
  },
  mounted () { },
  beforeDestroy () { }
}
</script>
<style lang='scss' scoped>
.roleBtn {
  margin-bottom: 20px;
}
.el-tag {
  margin: 7px;
}
.bdbottom {
  border-bottom: 1px solid rgb(230, 228, 228);
}
.rowCenter {
  display: flex;
  align-items: center;
}
</style>
