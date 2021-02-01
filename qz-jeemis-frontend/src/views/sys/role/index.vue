<template>
    <d2-container>
            <el-form :inline="true" @keyup.enter.native="getDataList()" size="small">
                <el-form-item>
                    <el-input clearable placeholder="角色名" v-model="dataForm.name"></el-input>
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
                <el-table-column align="center" header-align="center" type="index" width="50"></el-table-column>
                <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
                <el-table-column align="center" header-align="center" label="角色名" prop="name"></el-table-column>
                <el-table-column align="center" header-align="center" label="备注" prop="remark"></el-table-column>
                <el-table-column align="center" header-align="center" label="创建时间" prop="createDate" sortable="custom" width="180"></el-table-column>
                <el-table-column align="center" fixed="right" header-align="center" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="addOrUpdateHandle(scope.row.id)" size="small" type="text"
                                   v-if="$hasPermission('sys:role:update')">修改
                        </el-button>
                        <el-button @click="deleteHandle(scope.row.id)" size="small" type="text"
                                   v-if="$hasPermission('sys:role:delete')">删除
                        </el-button>
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
import AddOrUpdate from './role-add-or-update'
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
export default {
  name: 'sys-role',
  mixins: [resizemix],
  components: {
    AddOrUpdate
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
      addOrUpdateVisible: false// 新增／更新，弹窗visible状态
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

    // 导出
    exportHandle () {
      api.exportXls(this.dataForm)
    }
  }
}
</script>
<style lang="scss">
</style>
