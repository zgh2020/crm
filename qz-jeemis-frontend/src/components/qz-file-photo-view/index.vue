<template>
    <div class="mainDiv">
        <el-row class="view-icon">
            <el-col :span="8">
                <el-button @click="isCollapse=true" plain size="mini" title="切换侧栏" v-if="!isCollapse">
                    <d2-icon name="bars"/>
                </el-button>
                <el-button @click="isCollapse=false" plain size="mini" title="切换侧栏" v-else>
                    <d2-icon name="bars"/>
                </el-button>
                <el-button @click="prev" plain size="mini" style="margin-left:45px;" title="上一张">
                    <i class="el-icon-top"></i>
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="next" plain size="mini" title="下一张">
                    <i class="el-icon-bottom"></i>
                </el-button>
                <el-input
                        :value="inputPage"
                        @input="changePage"
                        @keyup.enter.native="search"
                        class="current-page"
                        size="mini"
                ></el-input>
                /{{ images.length }}
            </el-col>
            <el-col :span="8" style="text-align:center">
                <el-button @click="zoomIn" plain size="mini" title="放大" v-show="!isReadingMode">
                    <i class="el-icon-zoom-in"></i>
                </el-button>
                <el-divider direction="vertical" v-if="!isReadingMode"></el-divider>
                <el-button @click="zoomOut" plain size="mini" title="缩小" v-show="!isReadingMode">
                    <i class="el-icon-zoom-out"></i>
                </el-button>
                <el-button @click="actualSize" plain size="mini" title="实际大小" v-show="!isReadingMode">
                    <i class="el-icon-c-scale-to-original"></i>
                </el-button>
                <el-button @click="suitableSize" plain size="mini" title="适合页面" v-show="!isReadingMode">
                    <i class="el-icon-tickets"></i>
                </el-button>
                <el-button @click="rotate" plain size="mini" title="向左旋转" v-show="!isReadingMode">
                    <i class="el-icon-refresh-left"></i>
                </el-button>
                <el-button @click="reverse" plain size="mini" title="向右旋转" v-show="!isReadingMode">
                    <i class="el-icon-refresh-right"></i>
                </el-button>
                <el-button @click="readingMode" plain size="mini" title="阅读模式" v-if="!isReadingMode">
                    <i class="el-icon-notebook-1"></i>
                </el-button>
                <el-button @click="cancelReadingMode" plain size="mini" title="退出阅读模式" v-else>
                    <d2-icon name="columns"/>
                </el-button>
            </el-col>
            <el-col :span="8" style="text-align:right">
                <el-button @click="print" plain size="mini" title="打印">
                    <i class="el-icon-printer"></i>
                </el-button>
                <el-button @click="download" plain size="mini" title="下载">
                    <i class="el-icon-download"></i>
                </el-button>
            </el-col>
        </el-row>
        <div class="view-flex">
            <div class="view-main" flex flex-box="1">
                <div :class="isCollapse?'el-menu-collapse':'el-menu-not-collapse'">
                    <photo-tree
                            @handleNodeClick="handleNodeClick"
                            ref="photoTree"
                    />
                </div>
                <div class="right-container" flex flex-box="1">
                    <photo-view
                            :initialReadingMode="false"
                            :initialSuitableSize="true"
                            @handleMenuEvent="handleMenuEvent"
                            ref="photoView"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import photoTree from './photo-tree'
import photoView from './photo-view'
import * as api from '../qz-file-view/api'

export default {
  data () {
    return {
      isCollapse: true,
      isReadingMode: false,
      inputPage: 1,
      treeData: [],
      images: [],
      selectKey: null,
      title: '图片预览',
      filesData: null,
      // 单文件预览
      fileId: '',
      fileName: '',
      url: '',
      visible: false
    }
  },
  components: {
    photoTree,
    photoView
  },
  methods: {
    // 初始化数据,如果是单文件预览则自行构造数据结构
    init () {
      this.$nextTick(() => {
        this.visible = true
        this.singleFileView()
        const tmpData = { ...this.filesData }
        this.dealData(tmpData)
        if (this.images.length >= 1) {
          this.selectKey = this.images[0].id
        } else {
          this.inputPage = 0
        }
        this.$refs.photoView.images = this.images
        this.$refs.photoView.init()
        this.treeData = []
        this.treeData.push(tmpData)
        this.$refs.photoTree.treeData = this.treeData
      })
    },
    // 单文件预览
    singleFileView () {
      if (this.filesData) return
      const objFile = {}
      objFile.id = this.fileId
      objFile.fileName = this.fileName
      objFile.title = this.fileName
      objFile.fileType = 'jpg'
      objFile.url = api.downloadUrl(this.fileId)
      this.filesData = objFile
    },
    prev () {
      this.$refs.photoView.prev()
    },
    next () {
      this.$refs.photoView.next()
    },
    rotate () {
      this.$refs.photoView.rotate()
    },
    // 左转
    reverse () {
      this.$refs.photoView.reverse()
    },
    // 右转
    zoomIn () {
      this.$refs.photoView.zoomIn()
    },
    zoomOut () {
      this.$refs.photoView.zoomOut()
    },
    suitableSize () {
      this.$refs.photoView.setSuitableSize()
    },
    actualSize () {
      this.$refs.photoView.setActualSize()
    },
    readingMode () {
      this.$refs.photoView.readingMode()
      this.isReadingMode = true
    },
    cancelReadingMode () {
      this.$refs.photoView.cancelReadingMode()
      this.isReadingMode = false
    },
    print () {
      this.$refs.photoView.print()
    },
    // 下载
    download () {
      this.$refs.photoView.download()
    },
    changePage (value) {
      this.inputPage = value
    },
    search (e) {
      this.$refs.photoView.search(this.inputPage)
    },
    handleNodeClick (data) {
      this.$refs.photoView.handleNodeClick(data)
      this.selectKey = data.id
    },
    // 处理后端数据,将后端传入的数据 仅把图片把最后节点摘出来存储在images
    dealData (object) {
      const arr = object.children
      object.label = object.title
      if (arr) {
        object.fileType = 'file'
        for (const item of arr) {
          this.dealData(item)
        }
      } else {
        this.images.push({
          url: object.url,
          id: object.id,
          name: object.fileName
        })
        object.number = this.images.length - 1
      }
    },
    // 处理菜单事件
    handleMenuEvent (event, val) {
      switch (event) {
        case 'setCurrentKey': {
          this.setCurrentKey(val)
          break
        }
        case 'changeInputValue': {
          this.inputPage = val
          break
        }
        default:
          break
      }
    },
    // 设置菜单选中状态
    setCurrentKey (key) {
      this.selectKey = key
      this.$refs.photoTree.setCurrentKey(key)
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-menu-not-collapse {
        width: 15%;
        height: 100%;
        background-color: #f4f4f4;
        border-right: 1px solid #d9d9d9;
        overflow-y: auto;
        overflow-x: hidden;
        transition: width 0.4s;
    }

    .el-menu-collapse {
        width: 0px;
        height: 100%;
        background-color: #f4f4f4;
        border-right: 1px solid #d9d9d9;
        overflow-y: auto;
        overflow-x: hidden;
        transition: width 0.4s;
    }

    .view-icon {
        height: 32px;
        line-height: 32px;
        background-color: #f4f4f4;
        box-shadow: inset 0 1px 1px #d9d9d9, inset 0 -1px 0 #d9d9d9, 0 1px 0 #d9d9d9,
        0 1px 1px #d9d9d9;
        color: #606266;
    }

    .el-col {
        padding: 0 4px;
    }

    .el-button--mini,
    .el-button--mini.is-round {
        padding: 4px 8px;
        border-radius: 0px;
    }

    .el-button {
        background: #f4f4f4;
        border: none;
        /* margin-left: 5px; */
    }

    .el-button + .el-button {
        margin-left: 0px;
    }

    .el-button.is-plain:focus,
    .el-button.is-plain:hover {
        background: #e6e6e6;
        color: #606266;
    }

    .el-button--mini,
    .el-button--small {
        font-size: 13px;
    }

    .el-divider--vertical {
        margin: 0px;
    }

    .view-main {
        /* height: 500px; */
        background-color: #e8e8e8;
        overflow: hidden;
        position: relative;
    }

    .el-menu-item {
        height: auto;
        line-height: 20px;
        white-space: normal;
        font-size: 13px;
        padding-left: 12px !important;
        color: #444;
    }

    .el-menu-item.is-active {
        background: none;
    }

    .el-menu-item:hover {
        background: #eaeaea;
    }

    .el-menu-item.is-active,
    .el-menu-item:active,
    .el-menu-item:focus {
        color: #409eff;
    }

    .el-menu-item span {
        width: 176px;
        display: block;
        white-space: normal;
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #e2e2e2;
    }

    .right-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .el-image {
        margin: 15px 0;
        box-shadow: 0px 0px 20px #aaa;
    }

    .space {
        height: 10px;
    }

    .current-page {
        width: 50px;
        margin-left: 4px;
    }

    .current-page .el-input__inner {
        height: 21px;
        line-height: 21px;
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        color: #606266;
        text-align: right;
        padding: 0 10px;
        /* -webkit-tap-highlight-color:rgba(255,0,0,0); */
    }

    .current-page .el-input__inner:hover {
        background-color: #fff;
    }

    .view-flex {
        display: flex;
        width: 100%;
        height: calc(100% - 33px);
    }

    // 图片展示区
    .image_show_box {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        // 左右翻页按钮
    }

    // 拖拽
    .drag_container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.4s;

        img {
            cursor: grab;
        }

        img.default_size {
            max-width: 100%;
            max-height: 100%;
        }
    }

    .mainDiv {
        height: 100%;
        min-width: 700px;
    }
</style>
