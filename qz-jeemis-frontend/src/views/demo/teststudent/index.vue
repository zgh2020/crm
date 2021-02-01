<template>
    <d2-container ref="d2c">
          <el-form :inline="true" @keyup.enter.native="getDataList()" size="small">
              <el-form-item>
                  <qz-input-date  value-format="YYYY-MM-DD" v-model="dataForm.ge_birthday" placeholder="起始日期" style="width: 150px"></qz-input-date>
             </el-form-item>
             <el-form-item>
                  <qz-input-date value-format="YYYY-MM-DD" v-model="dataForm.le_birthday" placeholder="截止日期" style="width: 150px"></qz-input-date>
             </el-form-item>
              <el-form-item>
                  <el-input  v-model="dataForm.age" placeholder="年龄" style="width: 90px"></el-input>
              </el-form-item>
             <el-form-item>
                     <qz-select-code clearable codeid="AX" placeholder="性别" v-model="dataForm.sex"></qz-select-code>
             </el-form-item>
             <el-form-item>
                   <el-button @click="getDataList()">查询</el-button>
             </el-form-item>
             <el-form-item>
                   <el-button @click="addOrUpdateHandle()" type="primary" v-if="$hasPermission('demo:teststudent:save')">增加</el-button>
             </el-form-item>
             <el-form-item>
                   <el-button @click="deleteHandle()" type="danger" v-if="$hasPermission('demo:teststudent:delete')">批量删除</el-button>
             </el-form-item>
             <el-form-item>
                   <el-button @click="exportHandle()" type="success" v-if="$hasPermission('demo:teststudent:export')">导出</el-button>
             </el-form-item>
            </el-form>
            <el-table
                    ref="listTable"
                    :data="dataList"
                    @selection-change="dataListSelectionChangeHandle"
                    @sort-change="dataListSortChangeHandle"
                    stripe
                    highlight-current-row
                    border
                    :height="heightY-topY+'px'"
                    style="width: 100%;margin-top: -10px"
                    size="small"
                    v-loading="dataListLoading">
                <el-table-column align="center" header-align="center" type="index" :index="indexStart" width="50"></el-table-column>
                <el-table-column align="center" header-align="center" type="selection" width="50"></el-table-column>
            <el-table-column prop="stdId" label="主键" header-align="center" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
              <el-table-column prop="birthday" label="生日" header-align="center" align="center" sortable="custom">
                   <template slot-scope="scope">
                       <span v-if="scope.row.birthday"> {{ scope.row.birthday|moment('YYYY-MM-DD') }}</span>
                    </template>
              </el-table-column>
            <el-table-column prop="sexDesc" label="性别" header-align="center" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="address" label="地址" header-align="center" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" header-align="center" align="center"></el-table-column>
            <el-table-column align="center"  header-align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click="addOrUpdateHandle(scope.row.stdId)" size="small" type="text"
                                   v-if="$hasPermission('demo:teststudent:update')">修改</el-button>
                        <el-button @click="deleteHandle(scope.row.stdId)" size="small" type="text"
                                   v-if="$hasPermission('demo:teststudent:delete')">删除</el-button>
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
            <add-or-update @refreshDataList="getDataList"  ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
    </d2-container>
</template>
<script>
import util from '@/libs/util'
import resizemix from '@/components/qz-mixins/windowresize/resizemix'
import * as api from './api'
import addOrUpdate from './teststudent-add-or-update'
export default {
  name: 'demo-teststudent',
  mixins: [resizemix],
  components: {
    addOrUpdate
  },
  data () {
    return {
      dataForm: {
        // 生日之间ge_是指大于等于
        ge_birthday: null,
        // le_是指小于等于
        le_birthday: null,
        // 性别
        sex: ''
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
      indexStart: 1,
      scrollTop: 0,
      scrollTableTop: 0
    }
  },
  mounted () {
    this.getDataList()
  },
  activated () {
    this.$refs.d2c.scrollTo(0, this.scrollTop)
    // console.info('wwwx', this.$refs.listTable.bodyWrapper)
    // this.$refs.listTable.bodyWrapper.scroll=this.scrollTableTop
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.listTable.bodyWrapper.scrollTo(0, this.scrollTableTop)
      }, 100)
    })
  },
  deactivated () {
    this.scrollTop = this.$refs.d2c.scrollY()
    this.scrollTableTop = this.$refs.listTable.bodyWrapper.scrollTop
    console.info(this.$refs.listTable.bodyWrapper.scrollTop)
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
      console.info(this.dataForm)
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
    async addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.visible = true
        this.$refs.addOrUpdate.dataForm.stdId = id
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
      const data = id ? [id] : this.dataListSelections.map(item => item.stdId)
      await api.remove(data)
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
