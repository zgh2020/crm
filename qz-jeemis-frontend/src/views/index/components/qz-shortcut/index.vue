<template>
    <div class="shortcutbox">
        <el-row :gutter="2">
            <el-col :span="6">
                <span><img src="./image/icon-qbyy04@80.png" height="100%" width="100%"/></span>
                <p>人员管理</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-qbyy06@80.png" height="100%" width="100%"/></span>
                <p>机构管理</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-wdyy07@80.png" height="100%" width="100%"/></span>
                <p>综合查询</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-wdyy01@80.png" height="100%" width="100%"/></span>
                <p>统计分析</p>
            </el-col>
        </el-row>
        <el-row :gutter="2">
            <el-col :span="6">
                <span><img src="./image/icon-qbyy09@80.png" height="100%" width="100%"/></span>
                <p>数据导出</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-qbyy12@80.png" height="100%" width="100%"/></span>
                <p>数据导入</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-qbyy17@80.png" height="100%" width="100%"/></span>
                <p>年报统计</p>
            </el-col>
            <el-col :span="6">
                <span><img src="./image/icon-wdyy05@80.png" height="100%" width="100%"/></span>
                <p>系统设置</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'shortcut',
  components: {},
  props: [],
  data () {
    return {
      title: '组件标题'
    }
  },
  mounted () {
  },
  methods: {
    init () {
    }
  }
}
</script>

<style scoped>
    .shortcutbox div{
        /*display: inline-block;
        background: yellow;*/
        margin: 5px 0px;
    }
    .shortcutbox span{
        display: inline-block;
        width: 40%;
        height: 35%;
        margin: 5% 30%;
        cursor: pointer;
    }
    .shortcutbox p{
        display: inline-block;
        width: 90%;
        height: 20%;
        margin: 5% 5%;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
</style>
