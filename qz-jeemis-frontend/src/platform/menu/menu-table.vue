<template>
    <el-table
            :data="tableData"
            border
            stripe
            height="100%"
            style="width: 100%"
            :row-style="{height:'20px'}"
            :cell-style="{padding:'0'}"
            highlight-current-row
            v-bind="$attrs"
            v-on="$listeners"
            @current-change="handleCurrentChange"
            ref="tableData">
        <el-table-column prop="id" label="id" width="100px" align="center"></el-table-column>
        <el-table-column prop="icon" label="名称" width="130px" align="center">
            <template slot-scope="scope">
                <i :class="'fa fa-'+scope.row.icon" style="margin-right:10px"></i>{{scope.row.title}}
            </template>
        </el-table-column>
        <el-table-column prop="type" label="类型"  width="60px" align="center">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.type === 0" size="mini">菜单</el-tag>
                <el-tag v-else size="mini" type="danger">按钮</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="path" label="路由" width="160px"  align="left" header-align="center"></el-table-column>
        <el-table-column prop="componentpath" label="组件路径" width="260px"  align="left"></el-table-column>
        <el-table-column prop="component" label="组件名称" width="150px"  align="left"></el-table-column>
        <el-table-column prop="permissions" label="权限标识"  width="150px" align="center"></el-table-column>
        <el-table-column prop="type" label="启用"  width="60px" align="center">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.hasStop" type="danger" size="mini">停用</el-tag>
                <el-tag v-else size="mini" >启用</el-tag>
            </template>
        </el-table-column>

        <el-table-column
                label="操作"
                min-width="100">
            <template slot-scope="scope">
                <el-button @click="updateMenu(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button v-if="scope.row.hasStop" @click="startMenu(scope.row.id,scope.$index)" type="text" size="mini">启用</el-button>
                <el-button v-else size="mini"  type="text" @click="startMenu(scope.row.id,scope.$index)">停用</el-button>
                <el-button @click="deleteMenu(scope.row.id,scope.row.pid)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'

export default {
  name: 'menuGrid',
  components: {},
  data () {
    return {
      tableData: null,
      currentRow: null
    }
  },
  methods: {
    async loadTableData (pId) {
      this.tableData = await api.getMenuList(pId)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    getCurrRow () {
      return this.currentRow
    },
    updateMenu (id) {
      this.$emit('updateMenu', id)
    },
    getIndex (id) {
      for (const index in this.tableData) {
        if (this.tableData[index].id === id) { return index }
      }
      return -1
    },
    async deleteMenu (id) {
      const index = this.getIndex(id)
      if (index < 0) return
      const ok = await util.$message.showYesNo('是否删除【' + this.tableData[index].title + '】菜单?')
      // 不删除 则返回
      if (!(ok && ok === 'confirm')) {
        return
      }
      const objData = await api.deleteMenu(id)
      if (objData) {
        this.$emit('deleteSuccess', id)
        this.tableData.splice(index, 1)
        await util.$message.showInfo('删除成功')
      }
    },
    async startMenu (id, index) {
      await api.startMenuItem(id)
      console.info(index)
      this.tableData[index].hasStop = !this.tableData[index].hasStop
      util.$message.showInfo2('保存成功')
    },
    sortRow (isUp) {
      if (!this.currentRow) {
        util.$message.showInfo2('请先选择一行')
      }
      let iUp = -1
      if (!isUp) iUp = 1

      const id = this.currentRow.id
      const index1 = this.getIndex(id) - 0
      if (!isUp && index1 === this.tableData.length - 1) {
        util.$message.showInfo2('已经是最后一行')
        return
      }
      if (isUp && index1 === 0) {
        util.$message.showInfo2('已经是第一行')
        return
      }
      const index2 = index1 - 0 + iUp
      const temp = this.tableData[index2]
      this.tableData.splice(index2, 1, this.tableData[index1])
      this.tableData.splice(index1, 1, temp)
      api.saveMenuSort(this.tableData[index1].id, this.tableData[index2].id)
    }
  }
}
</script>

<style scoped>
    .cell {
        height: 80px;
    }
</style>
