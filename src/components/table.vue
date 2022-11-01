<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" v-loading="load">
          <template v-for="(item, index) of table">
            <el-table-column
              v-if="item.id === 'operation'"
              :key="index"
              :prop="item.id"
              :label="item.name"
              :align="item.align ? item.align : 'center'"
              :width="item.width"
            >
              <!--if判断的是父组件传的表头是操作的id名-->
              <template slot-scope="scope">
                <el-button
                  v-for="item1 in item.list"
                  :key="item1.id"
                  @click="examine(scope.row, item1.id)"
                  type="text"
                  size="small"
                  >{{ item1.name }}</el-button
                >
                <!--可以自行增加按钮，请改变点击事件的第二个参数，父组件会根据第二个参数判断当前点击的是什么按钮-->
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :label="item.name"
              :key="index"
              :prop="item.id"
              :align="item.align ? item.align : 'center'"
              :width="item.width"
              :type="item.type"
            >
            </el-table-column>
            <!--可以传align,width和type来控制表格的居中，宽度和类型（比如需要序号，type传index）-->
          </template>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'tableList',
  props: ['table', 'tableData', 'load'],
  methods: {
    examine (rows, id) {
      this.$emit('operation', { id: id, rows: rows })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
