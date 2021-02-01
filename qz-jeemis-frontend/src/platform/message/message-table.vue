<template>
    <div>
        <el-table
                :data="dataList"
                @current-change="handleCurrentChange"
                @selection-change="dataListSelectionChangeHandle"
                @sort-change="dataListSortChangeHandle"
                highlight-current-row
                ref="tableData"
                size="small"
                stripe
                style="width: 100%"
                v-bind="$attrs"
                v-on="$listeners">
            <el-table-column :show-overflow-tooltip="false" align="center" header-align="center" width="66">
                <template slot-scope="scope">
                    <d2-icon name="envelope" style="color: #ff3f1d;margin-right: 5px" v-if="!scope.row.hasRead"/>
                    <d2-icon name="bookmark" style="color: #ff7934;margin-right: 5px" v-if="scope.row.hasImportant"/>
                    <i class="el-icon-paperclip" style="color: #3e52a3" v-if="scope.row.hasAttFile"></i>
                </template>
            </el-table-column>
            <el-table-column :index="indexStart" align="center" header-align="center" label="序号"
                             type="index" width="50"></el-table-column>
            <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="left" header-align="left" label="标题" min-width="300" prop="title"
                             sortable="custom"></el-table-column>
            <el-table-column align="center" header-align="center" label="发件人" prop="senderName" sortable="custom"
                             width="100"></el-table-column>
            <el-table-column align="center" header-align="center" label="发件机构" prop="deptName" sortable="custom"
                             width="200"></el-table-column>
            <el-table-column align="center" header-align="center" label="时间" prop="createDate" sortable="custom"
                             width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate"> {{ scope.row.createDate|moment('YYYY.MM.DD HH:mm') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="" width="160">
                <template slot-scope="scope">
                    <el-button @click="restoreHandle(scope.row.id)" size="small" type="text"
                               v-if=" scope.row.folder ==='9' && $hasPermission('platform:message:info')">还原
                    </el-button>
                    <el-button @click="updateImportant(scope.row.id)" size="small" type="text"
                               v-if=" scope.row.folder !=='9' && scope.row.folder !=='5' &&$hasPermission('message:sysmessagesend:update')">
                        收藏
                    </el-button>
                    <el-button @click="revokeHandle(scope.row.id)" size="small" type="text"
                               v-if=" scope.row.folder ==='5' &&$hasPermission('message:sysmessagesend:update')">撤回
                    </el-button>

                    <el-button @click="viewInfoHandle(scope.row)" size="small" type="text"
                               v-if=" scope.row.folder !=='6' && $hasPermission('platform:message:info')">查看
                    </el-button>
                    <el-button @click="editHandle(scope.row.id)" size="small" type="text"
                               v-if=" scope.row.folder==='6' && $hasPermission('platform:message:update')">编辑
                    </el-button>
                    <el-button @click="recycleHandle(scope.row.id)" size="small" type="text"
                               v-if="$hasPermission('platform:message:update')">删除
                    </el-button>
                    <!-- <el-button @click="recycleHandle(scope.row.id)" size="small" type="text"
                                v-if=" scope.row.folder==='5' && $hasPermission('platform:message:update')">撤回
                     </el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="page"
                       :page-size="limit"
                       :page-sizes="[10, 20, 50, 100]"
                       :total="total"
                       @current-change="pageCurrentChangeHandle"
                       @size-change="pageSizeChangeHandle"
                       layout="total, sizes, prev, pager, next, jumper"
                       style="margin: 5px 0px -15px">
        </el-pagination>
    </div>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'

export default {
  name: 'messageTable',
  components: {},
  props: {
    callDataForm: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      currentRow: null,
      dataList: [],
      order: '', // 排序，asc／desc
      orderField: '', // 排序，字段
      page: 1, // 当前页码
      limit: 10, // 每页数 limit 不能与字段重复
      total: 0, // 总条数
      dataListLoading: false, // 装载数据
      dataListSelections: [], // 数据列表，多选项
      addOrUpdateVisible: false, // 新增／更新，弹窗addOrUpdateVisible状态
      indexStart: 1
    }
  },
  methods: {
    getDataList () {
      this.dataForm = this.callDataForm()
      const params = {
        order: this.order,
        orderField: this.orderField,
        page: this.page,
        limit: this.limit,
        ...this.dataForm
      }
      this.indexStart = (this.page - 1) * this.limit + 1
      this.dataListLoading = true
      api.page(params).then((data) => {
        this.dataList = data.records
        this.total = data.total * 1
      }).catch((err) => {
        this.dataListLoading = false
        util.$message.showInfo2(err)
      })
      this.dataListLoading = false
    },
    // 分页, 每页条数
    pageSizeChangeHandle (val) {
      this.page = 1
      this.limit = val
      this.getDataList()
    },
    // 分页, 当前页
    pageCurrentChangeHandle (val) {
      this.page = val
      this.getDataList()
    },
    // checkbox改变
    dataListSelectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 取回dataListSelection
    getDataListSelection () {
      return this.dataListSelections
    },
    // 排序
    dataListSortChangeHandle (data) {
      if (!data.order || !data.prop) {
        this.order = ''
        this.orderField = ''
        return false
      }
      this.order = data.order
      this.orderField = data.prop
      this.getDataList()
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 取行当前行
    getCurrRow () {
      if (this.dataListSelections && this.dataListSelections.length === 1) {
        return this.dataListSelections[0]
      }
      if (this.dataListSelections && this.dataListSelections.length > 1 && !this.currentRow) {
        return this.dataListSelections[0]
      }
      return this.currentRow
    },
    // 更新当前行
    updateRow (id) {
      this.$emit('updateRow', id)
    },
    editHandle (id) {
      this.$emit('onEditRow', id)
    },
    // 取某id的index
    getIndex (id) {
      for (const index in this.dataList) {
        if (this.dataList[index].id === id) {
          return index
        }
      }
      return -1
    },
    async recycleHandle (id) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要删除的项')
      }
      const ok = await util.$message.showYesNo('是否确定删除选择的项目?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.id)
      await api.recycle(data)
      this.getDataList()
    },
    async restoreHandle (id) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要回复的项')
      }
      const ok = await util.$message.showYesNo('是否确定回复选择的项目?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.id)
      await api.restoreRecycle(data)
      this.getDataList()
    },
    // 删除某一行
    async deleteRow (id) {
      const index = this.getIndex(id)
      if (index < 0) return
      const ok = await util.$message.showYesNo('是否删除【' + this.dataList[index].title + '】?')
      // 不删除 则返回
      if (!(ok && ok === 'confirm')) {
        return
      }
      const objData = await api.remove([id])
      if (objData) {
        this.$emit('deleteSuccess', id)
        this.dataList.splice(index, 1)
        await util.$message.showInfo('删除成功')
      }
    },
    async revokeHandle (id) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要撤回的消息')
      }
      const ok = await util.$message.showYesNo('是否确定撤回选择的消息?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.id)
      await api.revokeMessage(data)
      this.getDataList()
    },
    // 触发事件
    viewInfoHandle (id) {
      this.$emit('onViewInfo', id)
    },
    updateReadStatus (id) {
      const index = this.getIndex(id)
      this.dataList[index].hasRead = true
    },
    // 触发设置收藏事件
    updateImportant (id) {
      this.$emit('onUpdateImportant', id)
      api.updateImportant(id)
      const index = this.getIndex(id)
      this.dataList[index].hasImportant = !this.dataList[index].hasImportant
    }
  }
}
</script>

<style scoped>
</style>
