<template>
    <d2-container>
            <el-form :inline="true" @keyup.enter.native="getDataList()" size="small">
                <el-form-item style="width: 160px">
                    <el-input clearable placeholder="标题" v-model="dataForm.title"></el-input>
                </el-form-item>
                <el-form-item style="width: 90px">
                    <qz-select-code codeid="DW" clearable placeholder="栏目" v-model="dataForm.noticeType1"></qz-select-code>
                </el-form-item>
                <el-form-item style="width: 110px">
                    <qz-select-code codeid="DX" clearable placeholder="子栏目" v-model="dataForm.noticeType2"></qz-select-code>
                </el-form-item>
                <el-form-item>
                    <qz-input-date  value-format="YYYY-MM-DD" v-model="dataForm.ge_createDate" placeholder="起始日期" style="width: 150px"></qz-input-date>
                </el-form-item>
                <el-form-item>
                    <qz-input-date value-format="YYYY-MM-DD" v-model="dataForm.le_createDate" placeholder="截止日期" style="width: 150px"></qz-input-date>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList()">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addOrUpdateHandle()" type="primary" v-if="$hasPermission('sys:role:save')">增加
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="deleteHandle()" type="danger" v-if="$hasPermission('sys:role:delete')">批量删除
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="exportHandle()" type="success" v-if="$hasPermission('sys:role:export')">导出
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
                <el-table-column align="left" header-align="center" label="栏目" width="100" prop="noticeType1Desc"></el-table-column>
                <el-table-column align="left" header-align="center" label="子栏目" width="100" prop="noticeType2Desc"></el-table-column>
                <el-table-column align="left" header-align="center" label="标题" min-width="160" prop="title"></el-table-column>
                <el-table-column align="left" header-align="center" label="发文单位" width="100" prop="deptName"></el-table-column>
                <el-table-column align="center" header-align="center" label="状态"  width="90">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.hasPublish">已发布</el-tag>
                        <el-tag size="mini" type="danger" v-else>未发布</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" label="创建时间" prop="createDate" sortable="custom" width="120">
                    <template slot-scope="scope">
                       <span v-if="scope.row.createDate"> {{ scope.row.createDate|moment('YYYY-MM-DD') }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"  header-align="center" label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="addOrUpdateHandle(scope.row.id)" size="small" type="text"
                                   v-if="$hasPermission('sys:notice:update')">修改</el-button>
                        <el-button @click="viewNoticeHandle(scope.row.id)" size="small" type="text"
                                   v-if="$hasPermission('sys:notice:info')">查看</el-button>
                        <el-button @click="publishHandle(scope.row.id,'停止')" size="small" type="text"
                                   v-if="$hasPermission('sys:notice:update') && scope.row.hasPublish">停止发布</el-button>
                        <el-button @click="publishHandle(scope.row.id,'发布')" size="small" type="text"
                                   v-if="$hasPermission('sys:notice:update') && !scope.row.hasPublish">启动发布</el-button>
                        <el-button @click="deleteHandle(scope.row.id)" size="small" type="text"
                                   v-if="$hasPermission('sys:notice:delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="margin: 5px 0px -15px"
                    :current-page="page"
                    :page-size="limit"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="total"
                    @current-change="pageCurrentChangeHandle"
                    @size-change="pageSizeChangeHandle"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
            <!-- 弹窗, 新增 / 修改 -->
            <add-or-update @refreshDataList="getDataList"  ref="addOrUpdate" v-show="addOrUpdateVisible"></add-or-update>
    </d2-container>
</template>

<script>
import * as api from './api'
import util from '@/libs/util'
import AddOrUpdate from './notic-add-or-update'
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
export default {
  name: 'sys-notice',
  mixins: [resizemix],
  components: {
    AddOrUpdate
  },
  data () {
    return {
      dataForm: {
        title: '',
        noticeType1: '',
        noticeType2: '',
        // ge_是指大于等于
        ge_createDate: null,
        // le_是指小于等于
        le_createDate: null
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
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = id
        this.$refs.addOrUpdate.init()
      })
    },
    async deleteHandle (id) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2('请选择需要删除的项')
      }
      const ok = await util.$message.showYesNo('是否确定删除选择的项目?')
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.id)
      await api.remove(data)
      this.getDataList()
    },

    async publishHandle (id, publish) {
      if (!id && this.dataListSelections.length <= 0) {
        return util.$message.showInfo2(`请选择需要【${publish}】的项目`)
      }
      const ok = await util.$message.showYesNo(`是否确定【${publish}】选择的项目?`)
      if (!(ok && ok === 'confirm')) {
        return ''
      }
      const data = id ? [id] : this.dataListSelections.map(item => item.id)
      if (publish === '发布') { await api.publishStart(data) } else { await api.publishStop(data) }
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
    },

    viewNoticeHandle (id) {
      this.$router.push({
        name: 'view-notice',
        params: { id: id },
        query: {
          id: id
        }
      })
    },
    // 导出
    exportHandle () {
      api.exportXls(this.dataForm)
    }
  }
}
</script>
<style lang="scss">
</style>
