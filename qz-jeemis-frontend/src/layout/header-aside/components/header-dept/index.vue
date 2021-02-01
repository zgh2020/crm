<template>
  <div>
  <span class="btn-text" v-if="!showDropdown">{{info.name ? `单位： ${info.deptName}` : '空单位'}}</span>
  <el-dropdown size="medium" class="d2-mr" v-else>
    <span class="btn-text">{{info.name ? `单位： ${info.deptName}` : '空单位'}}</span>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item icon="el-icon-s-home" v-for="item in info.depts" :key="item.deptId"  @click.native="changeDept(item.deptId)">
        {{item.deptName}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import util from '@/libs/util'
import account from '@/api/sys.login.js'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ]),
    showDropdown () {
      return this.info.depts && this.info.depts.length > 1
    }
  },
  methods: {
    getIndex (deptId) {
      for (const index in this.info.depts) {
        if (this.info.depts[index].deptId === deptId) { return index }
      }
      return -1
    },
    changeDept (deptId) {
      const index = this.getIndex(deptId)
      if (index < 0) {
        util.$message.showInfo2('无单位')
        return
      }
      account.changeCurrentDept(this.info.depts[index])
    }
  }
}
</script>
