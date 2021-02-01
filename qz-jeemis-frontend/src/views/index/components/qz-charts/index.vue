<template>
    <el-row>
        <el-col :span="4" v-if="visibleMenu">
            <el-menu default-active="1" style="height:800px">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">人数统计</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">人员类别</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">性别统计</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">增减变化</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="24">
            <charts1 @changcharts="changCharts" :hy="hy" v-if="!visiblePie"></charts1>
            <charts11 @changcharts="changCharts" :hy="hy" v-if="visiblePie"></charts11>
        </el-col>

    </el-row>
</template>

<script>
import charts1 from './qz-charts1'
import charts11 from './qz-charts11'
export default {
  name: 'layout22',
  components: { charts1, charts11 },
  props: {
    // 高
    hy: {
      type: Number,
      required: false,
      default: 400
    }
  },
  data () {
    return {
      title: '组件标题',
      visibleMenu: false,
      visiblePie: false
    }
  },
  mounted () {
  },
  methods: {
    init () {
    },
    changCharts () {
      this.visiblePie = !this.visiblePie
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
