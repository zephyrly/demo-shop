<template>
  <div class="ratings">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 为了模拟mock随意建的表 -->
    <button @click="VuexClick" style="float:left">VuexClick</button>
    <button @click="goReport" style="float:left">goReport</button>
    <el-table :data="list" stripe style="width: 100%" border>
      <el-table-column prop="content" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="time" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="username" label="地址"> </el-table-column>
      <el-table-column prop="id" label="地址"> </el-table-column>
      <el-table-column prop="country" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'users',
  data () {
    return {
      msg: '评价页面',
      loading: false,
      finished: false,
      list: [],
      cateList: {
        name: '111'
      }
    }
  },
  computed: {
    ...mapGetters({
      UserInfo: 'user/getUserInfo'
    })
  },
  created () {
    this.onLoading()
  },
  methods: {
    onLoading () {
      // 使用axios获取mock的模拟数据
      this.$http.post('/api/ratings/list').then(res => {
        const { code, data } = res.data
        if (code === 200 && data) {
          data.forEach(v => {
            this.list.push(v)
          })
          this.loading = false // 加载状态结束
        }
        if (this.list.length >= 100) {
          this.finished = true // 数据全部加载完毕
        }
      }).catch(err => {
        console.log(`调用失败：${err}`)
      })
    },
    // vuex的demo
    VuexClick () {
      console.log(this.UserInfo)
    },
    goReport() {
      this.$router.push({ path: "/reports" });
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 20px;
}
.ratings {
  text-align: center;
}
</style>
