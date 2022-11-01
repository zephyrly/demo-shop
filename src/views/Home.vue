<template>
  <el-container class="Container">
    <el-header class="header">
      <span>优选商品后台管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item.path"
              v-for="item in item.children"
              :key="item.id"
              @click="routerSave(item.id + '')"
            >
              <template>{{ item.authName }}</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '../api/base'
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      isCollapse: false,
      menulist: [],
      activePath: '',
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await getMenus()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    routerSave (active) {
      window.sessionStorage.setItem('activePath', active)
    }
  }
}
</script>

<style lang="scss" scoped>
.Container {
  height: 100%;
}
.header {
  background-color: #373d41;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    margin-left: 150px;
    color: white;
    font-size: 30px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
    span {
      margin-left: 20px;
      font-size: 14px;
    }
  }
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  background-color: #eaedf1;
}
</style>
