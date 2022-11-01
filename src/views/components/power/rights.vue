<template>
  <div>
    <table-list
      :table="table"
      :tableData="tableData"
      @operation="getExamine"
      :load="load"
    ></table-list>
  </div>
</template>
<script>
import TableList from '@/components/table'
export default {
  components: {
    TableList
  },
  data () {
    return {
      load: false, // 是否显示加载动画
      table: [ // 表头
        { id: 'name', name: '地市' },
        { id: 'evaluationStudentNumber', name: '已测人数' },
        { id: 'operation', name: '操作', list: [{ id: 'examine', name: '查看' }, { id: 'compile', name: '编辑' }] } // id名是固定的，如若改变，请同时改变table组件对应的地方
      ],
      tableData: [ // 表内容
        {
          name: '111',
          evaluationStudentNumber: '2222'
        }
      ]
    }
  },
  methods: {
    getExamine (e) { // 根据table组件传的不同的id进行不同的操作
      if (e.id === 'examine') {
        console.log('查看')
      }
      if (e.id === 'compile') {
        console.log('编辑')
      }
    }
  }
}
</script>
