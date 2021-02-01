<template>
    <div>
        <el-dropdown class="d2-mr" size="medium">
            <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updatePassword">
                    <d2-icon class="d2-mr-5" name="key"/>
                    修改密码
                </el-dropdown-item>
                <el-dropdown-item @click.native="updateUserInfo">
                    <d2-icon class="d2-mr-5" name="user-circle"/>
                    个人信息
                </el-dropdown-item>
                <el-dropdown-item @click.native="logOff">
                    <d2-icon class="d2-mr-5" name="power-off"/>
                    注销
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <password-update  ref="passwordUpdate" v-if="showPwdDialog" @close="closePwdDialog"></password-update>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import account from '@/api/sys.login.js'
import passwordUpdate from './user-password-update'

export default {
  components: { passwordUpdate },
  data () {
    return {
      showPwdDialog: false
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    updatePassword () {
      this.showPwdDialog = true
      this.$nextTick(() => {
        this.$refs.passwordUpdate.init()
      })
    },
    updateUserInfo () {
      account.changeUserInfo()
    },
    closePwdDialog () {
      this.showPwdDialog = false
    },
    /**
       * @description 登出
       */
    logOff () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
