<!--autor：zhangliangliang-->
<template>
    <el-table
            :data="tableData"
            @current-change="handleCurrentChange"
            border
            height="100%"
            highlight-current-row
            ref="singleTable"
            stripe
            style="width: 100%">

        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                label="字段名称"
                prop="fieldname"
                width="120"
        >
        </el-table-column>
        <el-table-column
                label="字段描述"
                prop="description"
                width="200"
        >
        </el-table-column>
        <el-table-column
                label="类型"
                prop="fieldtype"
                width="120"
        >
        </el-table-column>
        <el-table-column
                label="长度"
                prop="fieldlen"
                width="70">
            <template slot-scope="scope">
                <span onclick="" size="mini" v-if="scope.row.fielddec">
                    {{scope.row.fieldlen}}.{{scope.row.fielddec}}
                </span>
                <span v-else>
                    {{scope.row.fieldlen}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
                label="字典"
                prop="codeid"
                width="90">
            <template slot-scope="scope">
                <el-link onclick="" size="mini" v-if="scope.row.codeid">{{scope.row.codeid}}</el-link>
            </template>
        </el-table-column>
        <el-table-column
                label="格式"
                prop="format"
                width="100"/>
        <el-table-column
                label="必填"
                prop="required"
                width="80">
            <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.required">必填</el-tag>
            </template>
        </el-table-column>
        <el-table-column
                label="报送表"
                prop="zzbset"
                width="100"/>
        <el-table-column
                label="报送字段"
                prop="zzbfield"
                width="100"/>
    </el-table>
</template>

<script>
import * as api from './api.js'

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
    async loadTableData (setid) {
      this.tableData = await api.getItemList(setid)
    },
    handleCurrentChange (row) {
      this.currentRow = row
      this.$emit('table-click', row)
    },

    getCurrRowIdValue () {
      if (this.currentRow != null) return this.currentRow.id
      return null
    },
    getCurrRownameValue () {
      if (this.currentRow != null) return this.currentRow.codeid + ':' + this.currentRow.description
      return null
    },
    getLastLine () {
      this.index = this.currentRow.axios - 1
      if (this.currentRow.axios !== 0) return this.tableData[this.currentRow.axios - 1].id
      return null
    },
    getNextLine () {
      this.index = this.currentRow.axios + 1
      if (this.tableData[this.currentRow.axios + 1] === undefined) {
        return null
      }
      return this.tableData[this.currentRow.axios + 1].id
    },
    getNodeIco () {
      return require('@/assets/image/model/field.ico')
    }
  }
}
</script>

<style>

</style>
