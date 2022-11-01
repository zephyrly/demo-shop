<template>
  <div>
    <div>
      封装的树形组件
      <el-button size="small" @click="initChecked" style="margin: 10px;"
        >初始化</el-button
      >
      <tree-select
        :data="data"
        :defaultProps="defaultProps"
        multiple
        :nodeKey="nodeKey"
        :checkedKeys="defaultCheckedKeys"
        @popoverHide="popoverHide"
      ></tree-select>
    </div>
    <div>
      <!-- 封装的图片上传组件 //页面使用 -->
      <!-- 数组类型的多图上传 -->
      <uploadImage v-model="arrayImage"></uploadImage>
      <!-- 字符串类型的多图上传 -->
      <uploadImage v-model="stringImage" :isString="true"></uploadImage>
      <!-- 头像类型的上传 -->
      <uploadImage
        v-model="avatarValue"
        :avatar="true"
        :showFileList="false"
      ></uploadImage>
    </div>
  </div>
</template>

<script>
import TreeSelect from '@/components/tree'
import uploadImage from '@/components/upLoadImg'
import { obj11 } from '@/utils/demo'
var menus = [
  {
    menuId: 1,
    menuName: '系统管理',
    childrenList: [
      {
        menuId: 100,
        menuName: '用户管理',
        childrenList: [
          {
            menuId: 1000,
            menuName: '用户查询'
          },
          {
            menuId: 1001,
            menuName: '用户新增'
          },
          {
            menuId: 1002,
            menuName: '用户修改'
          },
          {
            menuId: 1003,
            menuName: '用户删除'
          }
        ]
      },
      {
        menuId: 101,
        menuName: '角色管理',
        childrenList: [
          {
            menuId: 1006,
            menuName: '角色查询'
          },
          {
            menuId: 1007,
            menuName: '角色新增'
          },
          {
            menuId: 1008,
            menuName: '角色修改'
          },
          {
            menuId: 1011,
            menuName: '删除角色'
          }
        ]
      }
    ]
  }
]
export default {
  name: 'home',
  components: {
    TreeSelect,
    uploadImage
  },
  data () {
    return {
      data: menus,
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      nodeKey: 'menuId',
      defaultCheckedKeys: [],
      // 图片上传组件
      arrayImage: [],//数组类型的多图上传
      stringImage: 'https://gcjf.guochengjinfu.cn/20201112/textProPic/1e6a8d9a94504af2b2f0d0136987de31.png',
      //字符串类型多图上传
      avatarValue: '',//头像上传
    }
  },
  created () { },
  mounted () {
    // 组建中增加了监听数据变化的，
    // 此处初始化defaultCheckedKeys的值，有效果
    this.defaultCheckedKeys = [1001]
  },
  methods: {
    // 改变默认选中的节点数据
    initChecked () {
      this.defaultCheckedKeys = [1006, 1007]
    },
    popoverHide (checkedIds, checkedData) {
      console.log(checkedIds)
      console.log(checkedData)
    }
  }
}
</script>

<style scoped>
</style>
