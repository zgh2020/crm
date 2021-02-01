<template>
    <div style="height:100%">
        <ag-grid-vue :columnDefs="columnDefs" :components="components" :defaultColDef="defaultColDef"
                     :gridOptions="gridOptions"
                     :paginationPageSize="paginationPageSize"
                     @grid-ready="onGridReady"
                     @rowClicked="onRowClicked"
                     blockLoadDebounceMillis="false"
                     class="ag-theme-balham"
                     domLayout="normal"
                     id="myGrid"
                     maxBlocksInCache="2"
                     rowDeselection="true"
                     rowModelType="infinite"
                     rowSelection="single"
                     style="width: 100%;height: 100%">
        </ag-grid-vue>
    </div>
</template>

<script>
import { getcoderecentList, getcodequerylist } from './api.js'
import { AgGridVue } from 'ag-grid-vue'
import util from '@/libs/util'

export default {
  name: 'listcode',
  components: {
    'ag-grid-vue': AgGridVue
  },
  props: {
    codeid: { default: '' },
    typelist: { default: '' }, // 默认 全部  最近
    inputlayer: {
      type: Number,
      required: false,
      default: 1
    },
    searchkeys: { default: '' }
  },
  data () {
    return {
      title: '组件标题',
      gridOptions: {
        overlayLoadingTemplate: '<span class="ag-overlay-loading-center">正在加载...</span>',
        overlayNoRowsTemplate: '<span>无数据</span>',
        navigateToNextCell: this.navigateToNextCell
      },
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      components: null,
      paginationPageSize: 100,
      infiniteInitialRowCount: null,
      dataSource: null,
      dataSourcerecent: null,
      currpage: 0

    }
  },
  beforeMount () {
    this.columnDefs = [
      { headerName: '代码', field: 'code', width: 90 },
      { headerName: '代码名称', field: 'description', width: 260 }
    ]
    this.defaultColDef = { resizable: true }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.columnApi = this.gridOptions.columnApi
    // this.gridApi.setDomLayout("autoHeight");
  },
  methods: {
    init () {
    },
    // 加载前准备数据源
    onGridReady (params) {
      var _this = this
      this.dataSource = {
        getRows: function (params) {
          _this.currpage = Math.trunc(params.startRow / _this.paginationPageSize)
          //  console.log('asking for ' + params.startRow + ' to ' + params.endRow)
          getcodequerylist(_this.codeid, _this.searchkeys, _this.currpage, _this.paginationPageSize).then(res => {
            const rowsThisPage = res.records
            let lastRow = -1
            if (res.total <= params.endRow) lastRow = res.total
            if (_this.gridApi.getInfiniteRowCount() !== res.total) _this.gridApi.setInfiniteRowCount(res.total)
            params.successCallback(rowsThisPage, lastRow)
          })
        }
      }

      this.dataSourcerecent = {
        getRows: function (params) {
          getcoderecentList(_this.codeid).then(res => {
            const rowsThisPage = res.records
            const lastRow = res.records.length
            if (_this.gridApi.getInfiniteRowCount() !== res.total) _this.gridApi.setInfiniteRowCount(res.total)
            params.successCallback(rowsThisPage, lastRow)
          })
        }
      }
      if (this.typelist === '最近') {
        params.api.setDatasource(this.dataSourcerecent)
      } else {
        params.api.setDatasource(this.dataSource)
      }
    },

    //  键盘导航grid
    navigateToNextCell (params) {
      var previousCell = params.previousCellDef
      var suggestedNextCell = params.nextCellDef
      debugger
      var KEY_UP = 38
      var KEY_DOWN = 40
      var KEY_LEFT = 37
      var KEY_RIGHT = 39

      switch (params.key) {
        case KEY_DOWN:
          previousCell = params.previousCellDef
          // set selected cell on current cell + 1
          this.gridApi.forEachNode((node) => {
            if (previousCell.rowIndex + 1 === node.rowIndex) {
              node.setSelected(true)
            }
          })
          return suggestedNextCell
        case KEY_UP:
          previousCell = params.previousCellDef
          // set selected cell on current cell - 1
          this.gridApi.forEachNode((node) => {
            if (previousCell.rowIndex - 1 === node.rowIndex) {
              node.setSelected(true)
            }
          })
          return suggestedNextCell
        case KEY_LEFT:
        case KEY_RIGHT:
          return suggestedNextCell
        default:
      }
    },
    // 取回选择的节点
    getselcode () {
      const selrow = this.gridApi.getSelectedNodes()
      if (selrow.length > 0) return this.$emit('onSelected', selrow[0].data)
    },
    async onRowClicked (e) {
      // 检查是否选择到最底层,如果是,检查是否最层,不是提醒 如果不是返回数据
      if (this.inputlayer === 1 && !e.data.hasleaf) {
        await util.$message.showInfo('必须选择最底层节点')
        return
      }
      this.$emit('onSelected', e.data)
    },
    nextrow (dir) {
      // 取回当前
      if (!this.gridApi.getDisplayedRowCount()) return
      const selrow = this.gridApi.getSelectedNodes()
      // 如果有下一个
      let index = 0
      if (selrow.length > 0) index = selrow[0].rowIndex + dir
      if (this.gridApi.getDisplayedRowCount() <= index) return
      if (index < 0) return
      // 下一个
      this.gridApi.getDisplayedRowAtIndex(index).setSelected(true)
      this.gridApi.ensureIndexVisible(index)
    },

    /**
       * 测试方法
       */
    wwww () {
      if (this.searchkeys === '山东') {
        this.searchkeys = '北京'
      } else {
        this.searchkeys = '山东'
      }
      // this.gridApi.doLayout()
      this.gridApi.refreshInfiniteCache()
      this.gridApi.getDisplayedRowAtIndex(0).setSelected(true)
      // this.gridApi.setFocusedCell(0,'code')
      this.gridApi.ensureIndexVisible(0)
    }
  },
  computed: {},
  watch: {
    searchkeys (e) {
      this.gridApi.refreshInfiniteCache()
      if (!this.gridApi.getDisplayedRowCount()) return
      this.gridApi.getDisplayedRowAtIndex(0).setSelected(true)
      /* this.gridApi.ensureIndexVisible(0) */
    }
  }
}
</script>
<style scoped>

</style>
