<template>
    <d2-container class="page">
        <div ref="d2" style="margin: -15px">
            <el-row :gutter="8">
                <el-col :span="5">
                    <el-card :style="{height:heightY-25-topY+'px'}" style="border:1px solid #c8c8c8" v-cloak>
                        <qzDeptInfo :hy="heightY-topY" :style="{margin:'-20px'}"></qzDeptInfo>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-row :gutter="8">
                        <el-col :span="24">
                            <el-card :style="{height: '280px'}">
                                <qzNotice style="margin:-21px" v-cloak></qzNotice>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card :style="{height:heightY-315-topY+'px'}">
                                <div class="el-cardheaddiv clearfix" slot="header">
                                    <span><d2-icon name="user-o" style="margin-left: -8px; margin-right: 8px;font-size:15px"/>人员分析</span>
                                </div>
                                <qzCharts :hy="heightY-330-topY" :style="{margin:'0px'}"></qzCharts>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <el-row :gutter="8">
                        <el-col :span="24">
                            <el-card :style="{height:'255px'}">
                                <div class="el-cardheaddiv clearfix" slot="header">
                                    <span><d2-icon name="share-square" style="margin-left: -8px; margin-right: 8px;font-size:14px"/>常用功能</span>
                                    <qzShortcut></qzShortcut>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card :style="{height:heightY-255-35-topY+'px'}">
                                <div class="el-cardheaddiv clearfix" slot="header">
                                    <span><d2-icon name="question-circle-o" style="margin-left: -8px; margin-right: 8px;font-size:15px"/>系统帮助</span>
                                </div>
                                <qzHelp :hy="heightY-366-topY" :style="{margin:'-19px'}"></qzHelp>
                            </el-card>

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </d2-container>
</template>

<script>
import qzDeptInfo from './components/qz-dept-info'
import qzNotice from './components/qz-notice'
import qzCharts from './components/qz-charts'
import qzShortcut from './components/qz-shortcut'
import qzHelp from './components/qz-help'
import resizemix from '@/components/qz-mixins/windowresize/resizemix'

export default {
  name: 'index',
  mixins: [resizemix],
  components: { qzDeptInfo, qzNotice, qzCharts, qzShortcut, qzHelp },
  data () {
    return {
      topY: 102
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 8px;
        & :last-child {
            margin-bottom: 0px;
        }
    }

    .el-cardheaddiv {
        height: 0px;
        margin-top: -8px;
    }
    .el-cardheaddiv span{
        font-size: 15px;
    }

    .clearfix:after {
        clear: both
    }

    [v-cloak] {
        display: none;
    }
</style>
