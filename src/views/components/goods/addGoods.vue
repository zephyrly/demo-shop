<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="消息提示的文案" type="info" center show-icon> </el-alert>
      <el-steps
        :space="200"
        finish-status="success"
        :active="activeIndex - 0"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :label-position="labelPosition"
        :model="fromList"
        :rules="fromRules"
        label-width="120px"
        status-icon
        ref="fromRef"
      >
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeIndex"
          @tab-click="tabClicked"
          :before-leave="beforeLeave"
          style="min-height:400px"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="fromList.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="fromList.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="fromList.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="fromList.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <elCascader @confirm="handleConfirm"> </elCascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <!-- 渲染动态参数 -->
            <el-form-item
              :label="item.attr_name"
              v-for="item in manyTable"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item"
                  v-for="(item, index) in item.attr_vals"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTable"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <!-- action 表示图片要上传到的后台API地址 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="fromList.goods_introduce"></quill-editor>
          </el-tab-pane>
          <el-tab-pane label="添加商品">
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="btnAdd" @click="add">
              添加商品
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="previewImg" />
    </el-dialog>
  </div>
</template>
<script>

import { getCategories, getAttri, addGoods } from '@/api/goods'
import elCascader from './components/elCascader.vue'
import uploadImage from '@/components/upLoadImg'
export default {
  name: '',
  props: {},
  components: {
    elCascader,
    uploadImage
  },
  data () {
    return {
      tabPosition: 'left', // 表格位置
      labelPosition: 'left', // label标签位置
      fromList: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0, // 商品所属的分类数组
        goods_cat: [], // 图片的数组
        pics: [], // 商品的详情描述
        goods_introduce: '',
        attrs: []
      },
      manyTable: [], // 动态参数列表
      onlyTable: [], // 静态参数列表
      activeIndex: '0',
      catelist: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      pic: [], // 图片的数组格式
      // 上传图片的URL地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false,
      fromRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    cateID () {
      if (this.fromList.goods_cat.length === 3) {
        return this.fromList.goods_cat[2]
      }
      return null
    }
  },
  watch: {},
  methods: {
    // 商品分类基础数据列表
    async _getCategories () {
      const res = await getCategories()
      if (res.meta.status !== 200) {
        this.$message.error('获取商品分类数据列表失败！')
      }
      this.catelist = res.data
    },
    // 离开页面后
    beforeLeave (activeName, oldActiveName) {
      // 跳转到的页面activeName，还未跳转的页面oldActiveName
      if (oldActiveName === '0' && this.fromList.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    // 请求动态静态的数据列表
    async tabClicked () {
      // console.log(this.activeIndex)
      // only:输入框(唯一) many:后台下拉列表/前台单选框
      if (this.activeIndex === '1' || this.activeIndex === '5') {
        const res = await getAttri(this.cateID, { sel: 'many' })
        if (res.meta.status !== 200) {
          this.$message.error('请求动态参数失败！')
        }

        res.data.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTable = res.data
      } else if (this.activeIndex === '2' || this.activeIndex === '5') {
        const res = await getAttri(this.cateID, { sel: 'only' })
        if (res.meta.status !== 200) {
          this.$message.error('请求静态参数失败！')
        }
        this.onlyTable = res.data
        // console.log(res)
      }
    },
    // 级联选择器选择的值
    handleConfirm (value) {
      this.fromList.goods_cat = value
    },
    // 处理图片预览效果
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 处理移除图片的操作
    handleRemove (file) {
      // console.log(file)
      // 1. 获取将要删除的图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2. 从 pics 数组中，找到这个图片对应的索引值
      const i = this.fromList.pics.findIndex(x => x.pic === filePath)
      // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      this.fromList.pics.splice(i, 1)
      // console.log(this.fromList)
    },
    // 监听图片上传成功的事件
    handleSuccess (response) {
      // console.log(response)
      // 1. 拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 2. 将图片信息对象，push 到pics数组中
      this.fromList.pics.push(picInfo)
    },
    add () {
      this.$refs.fromRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项！')
        }
        // 处理动态参数
        // console.log('many', this.manyTable)
        this.manyTable.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.fromList.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTable.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.fromList.attrs.push(newInfo)
        })
        const from = _.cloneDeep(this.fromList)
        from.goods_cat = from.goods_cat.join(',')
        // 发起请求
        // console.log('from', from)
        const res = await addGoods(from)
        // console.log('res', res)

        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })
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
.el-checkbox-group {
  margin: 0 10px 0 0 !important;
}
.el-tab-pane {
  max-width: 900px;
}
.previewImg {
  width: 100%;
}
.btnAdd {
  margin-left: 20px;
}
</style>
