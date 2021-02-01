<template>
    <div>
        <!--<el-row style="margin-bottom: 12px">
            <el-col :span="24">
              样式规范选择：
                <el-select placeholder="请选择" size="small" v-model="selectCss">
                    <el-option key="1" label="标准风格" value="1"></el-option>
                    <el-option key="2" label="管控平台规范1.0" value="2"></el-option>
                </el-select>
            </el-col>
        </el-row>-->
        <el-row>
            <el-table
                    :data="list"
                    v-bind="table"
                    :height="500">
                <el-table-column
                        align="center"
                        prop="title"
                        width="160"/>
                <!-- <el-table-column
                   label="预览"
                   width="120">
                   <div
                     slot-scope="scope"
                     class="theme-preview"
                     :style="{
                       backgroundImage: `url(${$baseUrl}${scope.row.preview})`
                     }">
                   </div>
                 </el-table-column>-->
                <el-table-column
                        align="center"
                        prop="address">
                    <template slot-scope="scope">
                        <el-button
                                icon="el-icon-check"
                                round
                                type="success"
                                v-if="activeName === scope.row.name">
                            已激活
                        </el-button>
                        <el-button
                                @click="handleSelectTheme(scope.row.name)"
                                round
                                v-else>
                            使用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'd2-theme-list',
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      },
      selectCss: '1'
    }
  },
  computed: {
    ...mapState('d2admin/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('d2admin/theme', [
      'set'
    ]),
    handleSelectTheme (name) {
      this.set(name)
    }
  }
}
</script>

<style lang="scss" scoped>
    .theme-preview {
        height: 50px;
        width: 100px;
        border-radius: 4px;
        background-size: cover;
        border: 1px solid $color-border-1;
    }
</style>
