<template>
  <div>
    <el-upload
      v-loading="loading"
      class="upload-demo"
      :action="action"
      :limit="limit"
      :show-file-list="showFileList"
      :file-list="fileList"
      :data="dataObj"
      :name="name"
      :headers="headers"
      :list-type="listType"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <div v-if="!avatar">
        <i slot="default" class="el-icon-plus"></i>
      </div>
      <div v-else>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
    <el-dialog width="800px" :visible.sync="imgSpreadVisible" append-to-body>
      <img class="spread-image" :src="imgSpreadUrl" />
    </el-dialog>
  </div>
</template>

<script>
//引入token，一般上传图片接口可能需要token
import { getToken } from '@/utils/auth'
export default {
  props: {
    value: {},
    //action是上传的地址
    action: {
      type: String,
      default: ''
    },
    //最大允许上传个数
    limit: {
      type: Number,
      default: 20
    },
    //是否采用头像上传模式
    avatar: {
      type: Boolean,
      default: false,
    },
    //根据业务需要，设置是否返回给父组件字符串类型
    //或者直接返回数组
    isString: {
      type: Boolean,
      default: false,
    },
    //是否显示已上传文件列表,如果要换成头像上传则设置成false
    //并且把avatar属性设置成true
    showFileList: {
      type: Boolean,
      default: true
    },
    //设置限制上传图片的大小
    size: {
      type: Number,
      default: 5
    },
    //上传时附带的额外字段,看你们后端是否要求，没有则不设置
    dataObj: {
      type: Object,
      default: () => {
        return { type: 5 }//这个没有就默认空
      }
    },
    //上传的文件字段名，后端要求的字段名
    name: {
      type: String,
      default: 'files'
    },
    //文件列表的类型，text/picture/picture-card
    listType: {
      type: String,
      default: 'picture-card'
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        //this.changeFlag利用这个变量，让我们在上传的时候暂停掉对父组件传递数据的监听
        //因为这个时候我们还没有通知父组件去接受我们上传成功后的图片路径
        if (this.changeFlag) {
          //判断是否是头像上传,
          if (!this.avatar && val) {
            //判断是否传递过来的数据是字符串，是字符串转为数组；有的业务需要如此
            //如果是字符串有可能为空
            if (this.isString) {
              val = val.split(',')
            }
            //把父组件传递过来的图片数组添加到上传成功后的暂存变量中，
            //再次上传后重新给父组件，更新图片绑定数据
            this.emitList = [...val];
            //循环遍历父组件数据，重新赋值成element组件所需要的回显数据
            val.forEach(item => {
              let obj = {
                uid: item.uid,
                name: item.name,
                url: item
              }
              this.fileList.push(obj)
            })
            //如果是头像上传则直接赋值给图片路径即可
          } else {
            this.imageUrl = val;
          }

        }

      }
    },
  },
  computed: {
    // 设置上传的请求头部
    headers () {
      return {
        'ContentType': 'multipart/form-data',// 设置Content-Type类型为multipart/form-data
        Authorization: window.sessionStorage.getItem('token')// 设置token
      }
    }
  },
  data () {
    return {
      fileList: [],//element自带的图片list
      emitList: [],//回显的图片list
      imgSpreadVisible: false,//查看缩略图的弹窗状态
      imgSpreadUrl: '',//缩略图大图图片路径
      loading: false,//加载状态
      changeFlag: true,
      imageUrl: ''
    }
  },
  methods: {
    //上传前校验一下图片大小
    beforeUpload (file) {
      const isLtSize = file.size / 1024 / 1024 < this.size
      if (!isLtSize) {
        this.$message.error('文件大小不能超过 ' + this.size + 'M')
      }
      return isLtSize
    },
    //文件上传成功时的钩子
    handleSuccess (file, fileInfo) {
      //定义一个上传成功的变量，用来暂停监听父组件的数据，
      //因为我们还没有通知父组件接受参数
      this.changeFlag = false;
      this.loading = true;
      let item = file.data[0];
      //头像上传（不带预览）
      if (this.avatar) {
        this.imageUrl = item;
        this.$emit('input', item);
      } else {
        //多图上传（带预览）
        this.emitList.push(item);
        let val = [...this.emitList];
        //如果需要回传的是字符串类型，则转字符串回传父组件
        if (this.isString) {
          val = val.join(',')
        }
        this.$emit('input', val);
      }
      this.loading = false;
    },
    //文件状态改变时的钩子
    handleChange () {
      if (this.loading) {
        //用于图片校验
        this.$emit('change', true)
      }
    },
    //文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      //同样的暂停掉监听父组件数据，以免产生图片展示bug
      this.changeFlag = false;
      //获取要删除的图片路径。判断是父组件传递的图片图片路径还是刚刚上传产生的图片路径
      const url = file.response ? file.response.data[0] : file.url;
      //遍历当前图片路径在通知给父组件的数据中是哪一个。然后删除掉。再通知父组件更新数据
      this.emitList.forEach((item, index) => {
        if (item.indexOf(url) > -1) {
          this.emitList.splice(index, 1)
          let val = [...this.emitList];
          //判断回传父组件是否是字符串类型
          if (this.isString) {
            val = val.join(',')
          }
          this.$emit('input', val);
        }
      })
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview (file) {
      if (this.showFileList && this.listType == 'picture-card') {
        this.imgSpreadUrl = file.url
        this.imgSpreadVisible = true
      }
    },
    //文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.error('最多上传' + this.limit + '个文件')
    },
  }
}
</script>

<style lang="scss" scoped>
.spread-image {
  display: block;
  max-width: 100%;
  max-height: 500px;
  margin: auto;
}
.avatar {
  width: 100%;
  height: auto;
}
</style>

