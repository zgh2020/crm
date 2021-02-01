<template>
    <div class="left">
        <div class="title">
            <span>{{deptInfo.b0105}}</span>
            <span>登录时间：{{new Date()|moment('YYYY-MM-DD HH:mm')}}</span>
            <span>用户角色：{{deptInfo.userRole}}</span>
        </div>
        <div class="zj">
            <ul style="margin:0;padding:0;padding-top: 10%">
                <li>
                    <div style="overflow:hidden;position: relative;border-radius: 5px 0 0 5px;">
                        <div style="width: 57px;height: 58px;background: #fb6e52;float: left">
                            <d2-icon name="building" style="margin: 20px 0 0 16px;color: #fff; font-size:22px"></d2-icon>
                        </div>
                        <div style="padding-top:2%">
                            <span style="color:#fb6e52;font-size:14px;float: none; font-weight:bold">单位总人数 {{deptInfo.A000Count}} </span><br>
                            <span style="color:#7b7b7b;">在职人员&nbsp;{{deptInfo.A001Count}} &nbsp;历史人员&nbsp;{{deptInfo.A009Count}}</span>
                            <d2-icon name="sitemap" style="position:absolute;top:10%;right:3%;color: #ff400e; font-size:20px"/>
                        </div>
                    </div>
                </li>
                <li style="margin-top: 10%;margin-bottom:11%">
                    <div style="overflow:hidden;position: relative;border-radius: 5px 0 0 5px;">
                        <div style="width: 57px;height: 58px;background: #ffce55;float: left;">
                            <d2-icon name="newspaper" style="margin: 20px 0 0 16px;color: #fff; font-size:22px"></d2-icon>
                        </div>
                        <div style="padding-top:2%">
                            <span style="color:#ff7627;font-size:14px;float: none;font-weight:bold">行政单位数&nbsp;{{deptInfo.C000Count}}</span><br>
                            <span style="color:#7b7b7b">机关单位&nbsp;{{deptInfo.C001Count}} &nbsp;事业单位&nbsp;{{deptInfo.C002Count}}</span>
                            <d2-icon name="server" style="position:absolute;top:10%;right:3%;color: #eb9138; font-size:20px "/>
                        </div>

                    </div>
                </li>
            </ul>
        </div>
        <div class="bwl">
            <span style="float: left;margin-left: 5%; font-size:15px">系统消息</span>
            <el-button type="text" size="mini" style="float:right;color:#7b7b7b;margin-right: 5%;margin-top: 9px;">
                更多消息 >>
            </el-button>
            <ul :style="{height:hy-363+'px', margin:'0',paddingRight:'5%',paddingTop:'10%',paddingLeft:'5%', paddingBottom: '10%'}">
                <el-divider></el-divider>
                <li v-for="item in messageList" :key="item.id" @click="openMessage(item.id)">
                    <a href="javascript:void(0);"> {{ item.message }} </a>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
export default {
  name: 'QzDeptInfo',
  props: {
    hy: {
      type: Number,
      default: 360
    }
  },
  components: {},
  data () {
    return {
      title: '单位信息',
      deptInfo: {}, //  主页信息
      messageList: [
        { message: '系统消息:某某时间需要系统维护,请注意保存数据', id: '1' },
        { message: '系统消息:今年采集数据需要本月21日提报', id: '2' },
        { message: '系统消息:提报的数据已收到,校核没通过,请查看数据,二次报送', id: '3' }
      ]
    }
  },
  mounted () {
    this.loadDeptInfo()
  },
  methods: {
    init () {
    },
    //  加载单位信息
    loadDeptInfo () {
      this.deptInfo.b0105 = '某某单位'
      this.deptInfo.userRole = '管理员'
      this.deptInfo.A000Count = 120
      this.deptInfo.A001Count = 100
      this.deptInfo.A009Count = 20
      this.deptInfo.C000Count = 100
      this.deptInfo.C001Count = 60
      this.deptInfo.C002Count = 40
    },

    //  加载消息列表
    loadMessageList () {

    },
    openMessage (e) {
      this.$message.info(e)
    }
  },
  computed: {}
}
</script>

<style scoped>
    li {
        list-style: none;
    }

    .left {
        /*  width:15%;
          margin-left: 5%;*/
        /* background: red; */
        /* border: 1px solid #c8c8c8; */
    }

    .title {
        width: 100%;
        height: 15%;
        background: #409eff;
        padding-bottom: 5%;
    }

    .title span {
        display: block;
        font-size: 12px;
        color: #fff;
        margin: 3%;
        padding-left: 5%;

    }

    .title span:first-child {
        font-size: 20px;
        padding-top: 5%;
        padding-left: 7%;
        margin: 0;

    }

    .zj {
        height: 20%;
        background: #fff;

    }

    .zj span {
        font-size: 12px;
        float: left;
        padding-top: 2%;
        padding-left: 5%
    }

    .zj li {
        background: #f5f5f5;
        width: 90%;
        margin: 0 auto;

    }

    .bwl {
        overflow: hidden;
        background: #fbfbfb;
        border-top: 1px solid #c8c8c8
    }

    .bwl span {
        font-size: 12px;
        margin-top: 13px
    }

    .bwl li {
        font-size: 14px;
        height: 43px;
        line-height: 43px;
        border-bottom: 1px dashed #d2d5dc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        color: #2d8cf0
    }
    .el-divider--horizontal{
        margin: 8px 0;
    }
    @media screen and (max-width: 1600px) {
        .bwl li {
        font-size: 13px;
        height: 40px;
        line-height: 40px;
    }
    .el-divider--horizontal{
        margin: 10px 0;
    }
    }
</style>
