<template>
    <div>
        <ve-histogram :data="chartData" :settings="chartSettings" :height="hy+'px'" :toolbox="toolbox"></ve-histogram>
    </div>
</template>

<script>
export default {
  props: {
    hy: {
      type: Number,
      default: 400
    }
  },
  data () {
    this.chartSettings = {
      metrics: ['总数', '男', '女'],
      dimension: ['人员类别']
    }
    return {
      toolbox: {
        feature: {
          magicType: { type: ['stack', 'tiled'] },
          myTool1: {
            show: true,
            title: '切换',
            icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
            onclick: () => {
              this.$emit('changcharts')
            }
          },
          saveAsImage: {}
        }
      },
      chartData: {
        columns: ['人员类别', '男', '女', '总数'],
        rows: [
          { 人员类别: '人员总数', 男: 200, 女: '693', 总数: 893 },
          { 人员类别: '公务员(含参公)', 男: 300, 女: '693', 总数: 993 },
          { 人员类别: '事业人员', 男: 200, 女: '693', 总数: 893 },
          { 人员类别: '国企人员', 男: 200, 女: '693', 总数: 893 },
          { 人员类别: '领导干部', 男: 500, 女: '293', 总数: 893 },
          { 人员类别: '一般干部', 男: 600, 女: '393', 总数: 993 }
        ]
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
    .inner {
        position: absolute;
        top: 20px;
        right: 20px;
        bottom: 20px;
        left: 20px;
    }
</style>
