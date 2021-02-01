<template>
    <d2-container>
        <el-form :inline="true" @keyup.enter.native="getDataList()" size="small">
            <el-form-item>
                <el-input clearable placeholder="文件名" v-model="dataForm.like_fileName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input clearable placeholder="文件类型扩展名" v-model="dataForm.like_fileType"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="addOrUpdateHandle()" type="primary"
                           v-if="$hasPermission('platform:officetemplate:save')">增加
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="deleteHandle()" type="danger"
                           v-if="$hasPermission('platform:officetemplate:delete')">批量删除
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="exportHandle()" type="success"
                           v-if="$hasPermission('platform:officetemplate:export')">导出
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="dataList"
                :height="heightY-topY+'px'"
                @selection-change="dataListSelectionChangeHandle"
                @sort-change="dataListSortChangeHandle"
                border
                highlight-current-row
                ref="listTable"
                size="small"
                stripe
                style="width: 100%;margin-top: -10px"
                v-loading="dataListLoading">
            <el-table-column :index="indexStart" align="center" header-align="center" type="index"
                             width="50"></el-table-column>
            <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="left" header-align="center" label="id" prop="id" width="120px" sortable="custom"></el-table-column>
            <el-table-column align="left" header-align="center" label="标题"  prop="fileType" min-width="200px">
                <template slot-scope="scope">
                    <d2-icon-svg :size="16" :name="scope.row.fileType"/> {{scope.row.fileTitle}}
                </template>
            </el-table-column>
            <el-table-column align="left" header-align="center" label="文件名"  prop="fileName" width="260px">
            </el-table-column>
            <el-table-column align="left" header-align="center" label="文件ID" prop="fileId" width="260px"></el-table-column>
            <el-table-column align="center" header-align="center" label="创建时间" prop="createDate" sortable="custom">
                <template slot-scope="scope">
                    <span v-if="scope.row.createDate"> {{ scope.row.createDate|moment('YYYY-MM-DD') }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="addOrUpdateHandle(scope.row.id)" size="small" type="text"
                               v-if="$hasPermission('platform:officetemplate:update')">修改
                    </el-button>
                    <el-button @click="download(scope.row.fileId)" size="small" type="text"
                               v-if="$hasPermission('platform:officetemplate:update')">下载
                    </el-button>
                    <el-button @click="deleteHandle(scope.row.id)" size="small" type="text"
                               v-if="$hasPermission('platform:officetemplate:delete')">删除
                    </el-button>
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
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-show="addOrUpdateVisible"></add-or-update>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import resizeMix from '@/components/qz-mixins/windowresize/resizemix'
import * as api from './api'
import addOrUpdate from './template-add-or-update'

export default {
  name: 'platform-office-template',
  mixins: [resizeMix],
  components: {
    addOrUpdate
  },
  data () {
    return {
      dataForm: {
        // id
        id: '',
        //  文件ID
        fileId: '',
        // 文件标题
        fileTitle: '',
        // 文件名包含
        like_fileName: '',
        // 文件类型扩展名包含
        like_fileType: '',
        // 预览图像文件id
        filePreview: '',
        // 排序
        orderid: undefined,
        // 创建者
        creator: '',
        // 创建时间
        createDate: '',
        // 更新者
        updater: '',
        // 更新时间
        updateDate: ''
      },
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
    // 导出
    exportHandle () {
      api.exportXls(this.dataForm)
    },
    download (id) {
      api.download(id)
    }
  }
}
</script>
<style lang="scss">
</style>
