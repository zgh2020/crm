<template>
    <d2-container>
        <el-form :inline="true" @keyup.enter.native="getDataList()" size="small" style="margin-top: -15px">
            <el-form-item>
                <el-input clearable placeholder="文件名" v-model="dataForm.fileName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="addOrUpdateHandle()" type="primary" v-if="$hasPermission('sys:oss:all')">上传
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="deleteHandle()" type="danger" v-if="$hasPermission('sys:oss:all')">批量删除
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
                ref="listTable"
                :data="dataList"
                @selection-change="dataListSelectionChangeHandle"
                @sort-change="dataListSortChangeHandle"
                stripe
                highlight-current-row
                :height="heightY-topY+'px'"
                border
                style="width: 100%;margin-top: -10px"
                size="small"
                v-loading="dataListLoading">
            <el-table-column align="center" header-align="center" type="index" :index="indexStart" width="50"></el-table-column>
            <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="left" header-align="center" label="文件名" sortable="custom" prop="fileName" min-width="300"></el-table-column>
            <el-table-column align="left" header-align="center" label="文件ID" sortable="custom" prop="fileId" width="250"></el-table-column>
            <el-table-column align="left" header-align="center" label="文件夹" sortable="custom" prop="fileFolder" width="100"></el-table-column>
            <el-table-column align="center" header-align="center" label="创建时间" prop="createDate" sortable="custom" width="180"></el-table-column>
            <el-table-column align="center" fixed="right" header-align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="downloadHandle(scope.row.fileId)" size="small" type="text"
                               v-if="$hasPermission('sys:oss:all')">下载
                    </el-button>
                    <el-button @click="deleteHandle(scope.row.fileId)" size="small" type="text"
                               v-if="$hasPermission('sys:oss:all')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 10px"
                       :current-page="page"
                       :page-size="limit"
                       :page-sizes="[10, 20, 50, 100]"
                       :total="total"
                       @current-change="pageCurrentChangeHandle"
                       @size-change="pageSizeChangeHandle"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
       <file-upload @refreshDataList="getDataList"  ref="addOrUpdate" v-if="addOrUpdateVisible"></file-upload>
    </d2-container>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import fileUpload from './file-upload'
export default {
  name: 'sys-file',
  mixins: [resizemix],
  components: {
    fileUpload
  },
  data () {
    return {
      dataForm: {
        name: ''
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
  mounted () {
    this.getDataList()
  },
  methods: {
    init () {

    },
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
    addOrUpdateHandle () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    downloadHandle (id) {
      api.download(id)
    },
    async deleteHandle (id) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要删除的项')
      }
      const ok = await util.$message.showYesNo('是否确定删除选择的项目?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.fileId)
      await api.del(data)
      this.getDataList()
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
    }
  }
}
</script>
<style lang="scss">
</style>
