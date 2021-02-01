<template>
    <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            border
            stripe
            height="100%"
            style="width: 100%"
            v-bind="$attrs"
            v-on="$listeners">
        <el-table-column
                type="index"
                width="50px">
        </el-table-column>
        <el-table-column prop="code" width="120px" label="代码"/>
        <el-table-column prop="zzbcode" width="120px" label="报送代码"/>
        <el-table-column prop="description" min-width="200px" label="代码描述"/>
        <el-table-column prop="codeid" width="80px" label="代码类"/>
        <el-table-column prop="spell" width="200px" label="简拼"/>
        <el-table-column prop="hashide" width="80px" label="显示">
            <template slot-scope="scope">
                <span v-if="scope.row.hashide==0">显示</span>
                <span v-if="scope.row.hashide==1">隐藏</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
export default {
  props: [],
  data () {
    return {
      tableData: [],
      currentRow: null,
      index: ''
    }
  },
  methods: {
    async loadTableData (codeid, code, searchName) {
      this.tableData = await api.getCodeTableList(codeid, code, searchName)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCurrRow () {
      return this.currentRow
    },

    getIndex (pkid) {
      for (const index in this.tableData) {
        if (this.tableData[index].pkid === pkid) { return index }
      }
      return -1
    },
    setCurrRow (data) {
      const index = this.getIndex(data.pkid)
      if (index < 0) {
        this.tableData.push(data)
      } else {
        this.tableData.splice(index, 1, data)
      }
    },
    removeRow (data) {
      const index = this.getIndex(data.pkid)
      if (index < 0) return
      this.tableData.splice(index, 1)
    },
    sortDownRow () {
      if (!this.currentRow) {
        util.$message.showInfo2('请先选择一行')
      }
      const pkid = this.currentRow.pkid
      const index1 = this.getIndex(pkid) - 0
      if (index1 === this.tableData.length - 1) {
        util.$message.showInfo2('已经是最后一行')
        return
      }
      const index2 = index1 - 0 + 1
      const temp = this.tableData[index2]
      this.tableData.splice(index2, 1, this.tableData[index1])
      this.tableData.splice(index1, 1, temp)
      api.saveSysCodeItemOrder(this.tableData[index1].pkid, this.tableData[index2].pkid)
    },
    sortUpRow () {
      if (!this.currentRow) {
        util.$message.showInfo2('请先选择一行')
      }
      const pkid = this.currentRow.pkid
      const index1 = this.getIndex(pkid) - 0
      if (index1 === 0) {
        util.$message.showInfo2('已经是第一行')
        return
      }
      const index2 = index1 - 0 - 1
      const temp = this.tableData[index2]
      this.tableData.splice(index2, 1, this.tableData[index1])
      this.tableData.splice(index1, 1, temp)
      api.saveSysCodeItemOrder(this.tableData[index1].pkid, this.tableData[index2].pkid)
    }
  }
}
</script>

<style>
    .el-main{
        padding-top: 0;
    }
    .el-main>div{
        height: 100%;
        overflow-y: auto;
    }
</style>
