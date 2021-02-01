<template>
    <div class="a55ad107c67664b968e5db19e09b03dfb">
        <el-table :data="tableData" :show-header="false" size="mini"
                  tyle="width: 100%;"
                  @cell-click="clickItemHandle"
                  v-bind="$attrs"
                  v-on="$listeners">
            <el-table-column
                    label="头像"
                    show-overflow-tooltip width="46">
                <template slot-scope="scope">
                    <el-avatar  :src="getIco(scope.row)" shape="square" size="small"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    min-width="160">
                <template slot-scope="scope">
                    <span  style="margin-left: -10px"> {{ scope.row.name }}</span><br/>
                    <span class="itemDetail" v-if="scope.row.hasDept"> {{ scope.row.count }}人</span>
                    <span class="itemDetail" v-if="!scope.row.hasDept && scope.row.deptName!==''"> {{ scope.row.deptName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="选择"
                    width="80">
                <template slot-scope="scope">
                    <span style="text-align:center ">
                        <span  v-if="!typeSelect" @click="clickCheckBoxHandle(scope.row)" :class="{'checkbox':true, 'checked':scope.row.checked,'blank':!scope.row.checked }"></span>
                        <span  v-else @click="clickCheckBoxHandle(scope.row)" :class="{'checkbox':true, 'unchecked':scope.row.checked }"></span>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'list-box-user',
  props: {
    // 是否多选
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否允许选择单位
    allowGroup: {
      type: Boolean,
      required: false,
      default: true
    },
    // 最大选择的项目
    maxSelect: {
      type: Number,
      required: false,
      default: 200
    },
    typeSelect: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      tableData: [],
      deptLogo: require('./imgs/ico_company_contacts.png'),
      psnLogo: require('./imgs/ico_none.png')
    }
  },
  methods: {
    getIco (data) {
      if (data.headUrl) return data.headUrl
      if (!data.headUrl && data.hasDept) { return this.deptLogo }
      if (!data.headUrl && !data.hasDept) { return this.psnLogo }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    clickItemHandle (row, column, cell, event) {
      if (column.label === '选择') { return }
      this.$emit('onClickItem', row, this.typeSelect)
    },
    clickCheckBoxHandle (data) {
      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
      }
      this.$emit('onClickCheckBox', data, this.typeSelect)
    }
  }
}
</script>

<style lang="scss">
    // 避免穿透
    .a55ad107c67664b968e5db19e09b03dfb {
        .checkbox {
            cursor: pointer;
            margin-left: 10px;
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(./imgs/ico_selector.png) left top no-repeat;

            &.blank {
                background-position: left top;
            }

            &.checked {
                background-position: -24px top;
            }

            &.unchecked {
                background-position: right top;
            }
        }

        .itemDetail {
            margin-left: -10px;
            font-size: 9px;
        }

        .el-table__row > td {
            border: none;
        }

        //去掉最下面的那一条线
        .el-table::before {
            height: 0px;
        }

    }
</style>
