<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="通知通告" name="notice">
                <el-table
                        :border=false
                        :data="tableData"
                        :show-header="true"
                        class="hide-table-header"
                        height="190px"
                        row-key="id"
                        size="medium"
                        stripe
                        v-loading="loading">
                    <el-table-column
                            header-align="center"
                            label="通知标题"
                            min-width="80%">
                        <template slot-scope="scope">
                            <i class="fa fa-angle-right" style="margin-left:2%"></i>
                            <span style="margin-left: 10px">{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="通知日期"
                            min-width="20%"
                    >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.createDate| moment('YYYY-MM-DD') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button size="mini" style="float: right;padding-right: 15px" type="text">更多>></el-button>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
export default {
  name: 'qzNotice',
  components: {},
  data () {
    return {
      title: '组件标题',
      props: {},
      loading: false,
      tableData: [],
      activeName: 'notice'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tableData = [
        { title: '关于做好信息采集的通知', createDate: '2019-05-01' },
        { title: '关于做好信息采集的通知', createDate: '2019-05-01' },
        { title: '关于做好信息采集的通知', createDate: '2019-05-01' }
      ]
    }
  }
}
</script>

<style scoped>
    .box-card {
        width: 100%;
    }
    .el-tab-pane {
        margin: -2px;
    }
</style>
