<template>
    <el-menu active-text-color="#3a22ff"
             text-color="#000000"
             v-bind="$attrs"
             v-on="$listeners">
        <div style="font-size: 16px;margin-left: 8px"><d2-icon name="inbox" style="margin-right: 8px"/><b>站内信箱</b></div>
        <el-menu-item v-for="item in folders" v-bind:key="item.folderId" :index="item.folderId">
            <folder-icon :id="item.folderId"/>
            {{item.folderName}} <span v-if="item.msgCount > 0 && item.folderId <= '6'">（{{item.msgCount}}）</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import folderIcon from './folder_icon'
import * as api from './api'
export default {
  props: [],
  components: { folderIcon },
  data () {
    return {
      folders: []
    }
  },
  // 第一步：挂载 ，页面加载时执行
  mounted () {

  },
  methods: {
    init () {
      api.folder().then(data => {
        this.folders = data
      })
    }
  }
}
</script>

<style scoped>
    .item {
        margin-top: 5px;
    }
    .el-menu-item.is-active {
        background: #f2f2f2;
    }
</style>
