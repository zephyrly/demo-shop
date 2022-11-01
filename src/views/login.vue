<template>
  <div class="login-container">
    <div class="login-box">
      <div class="img_box">
        <img src="@/assets/logo.png" alt />
      </div>
      <el-form
        :model="form"
        ref="loginFromRef"
        :rules="loginFromRules"
        class="login_from"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getLogin } from '@/api/base'
import { validatePsdReg1 } from '@/utils/validate'
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginFromRules: {
        username: [
          { require: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入用户密码', trigger: 'blur' },
          { validator: validatePsdReg1, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登陆表单重置
    resetLoginForm () {
      this.$refs.loginFromRef.resetFields()
    },
    // 登录
    login () {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return
        const data1 = this.form
        // const { data: res } = await this.$http.post('login', data1)
        // console.log(res)
        // if (res.meta.status !== 200) return this.$message.error('登录失败！')
        // this.$message.success('登录成功')
        const { data: res } = await getLogin(data1)
        // console.log(res)

        // vuex的demo
        this.$store.dispatch('user/getCurUserInfo', data1)
        // vuex的demo

        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登陆成功')
        // 存储token
        window.sessionStorage.setItem('token', res.data.token)
        // 路由跳转首页
        this.$router.push('/home')
      })
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang='scss' scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .img_box {
    width: 130px;
    height: 130px;
    border: 1px solid lightgray;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: lightgrey;
    }
  }
  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btn {
    float: right;
  }
}
</style>
