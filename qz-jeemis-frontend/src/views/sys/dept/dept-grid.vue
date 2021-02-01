<template>
    <el-table
            ref="listTable"
            v-loading="dataListLoading"
            :data="dataList"
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
        <el-table-column prop="id" width="160px" label="编码(id)"/>
        <el-table-column prop="name" width="320px" label="机构名称"/>
        <el-table-column prop="type" width="80px" label="类型">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.type=='1'">单位</el-tag>
                <el-tag type="success" v-if="scope.row.type=='2'">部门</el-tag>
                <el-tag  type="danger" v-if="scope.row.type=='3'">分组</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="spell" width="200px" label="简拼"/>
        <el-table-column prop="pkid" width="280px" label="主键(pkid)"/>
    </el-table>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
export default {
  props: [],
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      currentRow: null,
      index: ''
    }
  },
  methods: {
    init () {
    },
    async loadDataList (pId) {
      this.dataListLoading = true
      this.dataList = await api.getList(pId).catch(err => {
        this.dataListLoading = false
        util.$message.showInfo2(err)
      })
      this.dataListLoading = false
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCurrRow () {
      return this.currentRow
    },

    getIndex (pkid) {
      for (const index in this.dataList) {
        if (this.dataList[index].pkid === pkid) { return index }
      }
      return -1
    },
    setCurrRow (data) {
      const index = this.getIndex(data.pkid)
      if (index < 0) {
        this.dataList.push(data)
      } else {
        this.dataList.splice(index, 1, data)
      }
    },
    removeRow (data) {
      const index = this.getIndex(data.pkid)
      if (index < 0) return
      this.dataList.splice(index, 1)
    },
    sortDownRow () {
      if (!this.currentRow) {
        util.$message.showInfo2('请先选择一行')
      }
      const pkid = this.currentRow.pkid
      const index1 = this.getIndex(pkid) - 0
      if (index1 === this.dataList.length - 1) {
        util.$message.showInfo2('已经是最后一行')
        return
      }
      const index2 = index1 - 0 + 1
      const temp = this.dataList[index2]
      this.dataList.splice(index2, 1, this.dataList[index1])
      this.dataList.splice(index1, 1, temp)
      api.sortInfo(this.dataList[index1].pkid, this.dataList[index2].pkid)
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
      const temp = this.dataList[index2]
      this.dataList.splice(index2, 1, this.dataList[index1])
      this.dataList.splice(index1, 1, temp)
      api.sortInfo(this.dataList[index1].pkid, this.dataList[index2].pkid)
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
