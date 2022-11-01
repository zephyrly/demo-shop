<template>
  <div
    class="infinite-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="100"
    infinite-scroll-immediate="true"
    style="overflow: auto;"
  >
    <slot name="scrollItem"></slot>
    <van-loading
      type="spinner"
      style="margin-top:20px"
      v-show="loading"
      vertical
    >
      加载中...
    </van-loading>
    <div v-for="item in data" :key="item.index">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: "Demo2",
  props: {
    lodaing: {
      type: Boolean,
      required: true
    },
    busy: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      count: 0,
      data: [],
      busy: false
    }
  },
  methods: {
    loadMore () {
      this.$emit('loadMore')
    }
    // loadMore: function () {
    //   this.busy = true
    //   setTimeout(() => {
    //     for (var i = 0, j = 10; i < j; i++) {
    //       this.data.push({ name: this.count++ })
    //     }
    //     console.log(this.data)
    //     this.busy = false
    //   }, 1000)
    // }
  }
}
</script>

<style scoped>
.infinite-list {
  height: 450px;
}
</style>

