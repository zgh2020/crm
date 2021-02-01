<template>
    <div>
        <el-table
                ref="listTable"
                :data="dataList"
                @selection-change="dataListSelectionChangeHandle"
                @sort-change="dataListSortChangeHandle"
                stripe
                highlight-current-row
                border
                style="width: 100%;"
                size="small"
                v-loading="dataListLoading"
                v-bind="$attrs"
                v-on="$listeners">
            <el-table-column align="center" header-align="center" type="index" :index="indexStart" width="50"></el-table-column>
            <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="left" label="文件名" min-width="150px" prop="fileName" sortable="custom">
                <template slot-scope="scope">
                    <d2-icon-file-svg :name="scope.row.fileType" :size="16" v-if="scope.row.fileType"/>
                    {{scope.row.fileName}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="大小" prop="fileSize" :formatter="formatSize" width="100px"  sortable="custom">

            </el-table-column>
            <el-table-column align="center" label="上传日期" prop="create_date" width="120px"  sortable="custom">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate">{{scope.row.createDate| moment('YYYY-MM-DD') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="downLoad(scope.row.fileId)" size="mini" type="text">下载</el-button>
                    <el-button @click="previewHandle(scope.row)" size="mini" type="text">预览</el-button>
                    <el-button @click="addOrUpdateHandle(scope.row.id)" size="small" type="text">改名</el-button>
                    <el-button @click="deleteHandle(scope.row.id)" size="small" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin: 5px 0px -15px 16px"
                       :current-page="page"
                       :page-size="limit"
                       :page-sizes="[10, 20, 50, 100]"
                       :total="total"
                       @current-change="pageCurrentChangeHandle"
                       @size-change="pageSizeChangeHandle"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 文件弹窗, 修改 -->
        <add-or-update @onUpdateSuccess="onUpdateSuccess" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
    </div>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
import addOrUpdate from './file-add-or-update'

export default {
  name: 'file-table',
  components: { addOrUpdate },
  data () {
    return {
      dataForm: {
        pid: '0'
      },
      dataList: [],
      order: '', // 排序，asc／desc
      orderField: '', // 排序，字段
      page: 1, // 当前页码
      limit: 10, // 每页数 limit 不会与字段重复
      total: 0, // 总条数
      dataListLoading: false,
      searchShow: false,
      dataListSelections: [], // 数据列表，多选项
      addOrUpdateVisible: false, // 新增／更新，弹窗visible状态
      indexStart: 1
    }
  },
  methods: {
    getDataList () {
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
    //  新增或修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = id
        this.$refs.addOrUpdate.init()
      })
    },
    deleteHandle (id) {
      this.$emit('delete-file', id)
    },
    onUpdateSuccess (data) {
      const index = this.getIndex(data.id)
      if (index >= 0) {
        this.dataList.splice(index, 1, data)
      }
    },
    formatSize (row, column, cellValue, index) {
      if (!cellValue) return ''
      return util.getFileSize(cellValue)
    },
    getIndex (id) {
      for (const index in this.dataList) {
        if (this.dataList[index].id === id) {
          return index
        }
      }
      return -1
    },
    downLoad (fileId) {
      api.download(fileId)
    },
    previewHandle (data) {
      this.$emit('preview-file', data)
    }
  }
}
</script>

<style scoped>
    .cell {
        height: 80px;
    }
</style>
