<template>
    <div style="height: 100%">
        <el-table
                v-loading="loading"
                :data="tableData"
                :height="hy+'px'"
                :border=false
                size="medium"
                :show-header="true"
                class="hide-table-header"
                stripe
                row-key="id">
            <el-table-column
                    label="资源标题"
                    min-width="0"
                    header-align="center">
                <template slot-scope="scope">
                    <i class="el-icon-question"></i>
                    <span style="margin-left: 10px">{{ scope.row.f帮助标题 }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-button size="mini" type="text" style="float: right;padding-right: 15px">更多>></el-button>
    </div>
</template>

<script>
export default {
  name: 'qzHelp',
  props: {
    hy: {
      type: Number,
      default: 500
    }
  },
  components: {},
  data () {
    return {
      title: '组件标题',
      loading: false,
      tableData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tableData = [
        { f帮助标题: '系统使用帮助' },
        { f帮助标题: '系统使用常用问题' },
        { f帮助标题: '怎么进行增人操作' },
        { f帮助标题: '怎么招聘计划操作' },
        { f帮助标题: '系统工资调整帮助' },
        { f帮助标题: '工资福利政策法规' }
      ]
    }
  }
}
</script>

<style>

</style>
