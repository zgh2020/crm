<template>
    <div class="login_wrapper">

        <div class="login_width">
            <div class="login_tit"><img src="./image/login_tit.png"></div>
            <div class="login_box">
                <div class="login_box_tit">用户登录</div>
                <div class="login_box_cont">
                    <el-form :model="formLogin" :rules="rules" label-position="top" ref="loginForm" >
                        <el-form-item prop="username">
                            <el-input  maxlength="50"  placeholder="用户名"  type="text" v-model="formLogin.username">
                                <i class="el-icon-s-custom" slot="prepend"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="密码" type="password"  v-model="formLogin.password">
                                <i class="el-icon-lock" slot="prepend"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha">
                            <el-input class="login_input_captcha" type="text" v-model="formLogin.captcha" placeholder="- - - -">
                                <i class="el-icon-more-outline" slot="prepend"/>
                            </el-input>
                            <img class="yanzheng" :src="captchaPath" @click="refreshcaptchacode">
                        </el-form-item>
                        <el-button @click="submit" class="rc_login_btn" size="default">登录</el-button>
                    </el-form>
                </div>
            </div>
            <div class="clear"></div>
            <div class="techSupprt">技术支持：旗帜信息有限公司</div>
        </div>
    </div>

</template>

<script>
import dayjs from 'dayjs'
import util from '@/libs/util.js'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      captchaPath: '',
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: '管理员',
          username: 'admin',
          password: 'admin'
        },
        {
          name: '编辑',
          username: 'editor',
          password: 'editor'
        },
        {
          name: '用户1',
          username: 'user1',
          password: 'user1'
        }
      ],
      // 表单
      formLogin: {
        username: 'admin',
        password: 'admin',
        uuid: '',
        captcha: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.refreshcaptchacode()
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    // 获取验证码
    refreshcaptchacode () {
      this.formLogin.captcha = ''
      this.formLogin.uuid = util.getUUID()
      let url = window.SITE_CONFIG.apiURL
      if (url && url[url.length - 1] !== '/') url = url + '/'
      this.captchaPath = `${url}captcha?uuid=${this.formLogin.uuid}`
      // console.info(this.captchaPath)
    },
    /**
       * @description 接收选择一个用户快速登录的事件
       * @param {Object} user 用户信息
       */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
       * @description 提交表单
       */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: util.$encrypt.encrypt(this.formLogin.password),
            captcha: this.formLogin.captcha,
            uuid: this.formLogin.uuid
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/').then(() => {}).catch(() => { console.log('vue fix') })
          }).catch(() => {
            this.refreshcaptchacode()
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .clear {
        clear: both
    }

    .login_wrapper {
        width: 100%;
        height: 100%;
        background: url("./image/login_bg.jpg") center center no-repeat #395dd4;
        background-size: 100%
    }

    .login_width {
        width: 1149px;
        margin: 0 auto;
        padding-top: 5.1%
    }

    .login_tit {
        width: 646px;
        margin: 0 auto
    }

    .login_tit img {
        width: 100%
    }

    .login_box {
        width: 1149px;
        /*width: 453px;*/
        /*padding-left: 696px;*/
        height: 584px;
        /*height: 491px;*/
        /*padding-top: 93px;*/
        background: url("./image/login_box_bg.png") no-repeat;
        background-size: 100%;
        position: relative;
    }

    .login_box_tit {
        width: 355px;
        margin-left: 696px;;
        height: 47px;
        text-align: center;
        font-size: 24px;
        color: #0075e1;
        border-bottom: 2px solid #0075e1;
        position: absolute;
        top: 93px;
    }

    .login_box_cont {
        width: 355px;
        margin-left: 696px;
        margin-top: 17px;
        position: absolute;
        top: 165px;
    }

    .login_input_captcha {
        width: 230px;
    }

    .yanzheng {
        width: 120px;
        height: 42px;
        float: right;
        margin-top: 0px;
        border: 1px solid #e9e9e9;
    }

    .rc_login_btn {
        width: 100%;
        height: 53px;
        line-height: 0px;
        background: #0075e1;
        border-radius: 6px;
        // webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        -ms-border-radius: 6px;
        border: none;
        /*margin-top: 42px;*/
        font-size: 19.5px;
        font-family: "微软雅黑";
        color: #fff;
        cursor: pointer;
        -webkit-transition: all 300ms;
        -moz-transition: all 300ms;
        -ms-transition: all 300ms;
        transition: all 300ms;
        margin-top:20px;
    }

    .techSupprt {
        font-size: 15px;
        color: #fff;
        text-align: center;
        margin-top: -5px;
    }

    @media screen and (max-width: 1600px) {
        .login_width {
            width: 920px
        }

        .login_tit {
            width: 517px
        }

        .login_box {
            width: 920px;
            /*width: 365px;*/
            /*padding-left: 555px;*/
            height: 467px;
            /*height: 400px;*/
            /*padding-top: 67px*/
            position: relative;
        }

        .login_box_tit {
            width: 282px;
            height: 40px;
            margin-left: 555px;
            text-align: center;
            font-size: 20px;
            border-bottom: 1px solid #0075e1;
            position: absolute;
            top: 65px;
        }

        .login_box_cont {
            width: 282px;
            margin-left: 555px;
            margin-top: 10px;
            position: absolute;
            top: 125px;
        }

        .login_input {
            width: 280px;
            height: 38px;
            line-height: 38px;
            /*margin-top: 18px;*/
            font-size: 15px;

        }

        .yanzheng {
            height: 42px;
            float: right;
            margin-top: 0px
        }

        .yanzheng img {
            width: 90px;
            height: 38px;
        }

        .rc_login_btn {
            height: 45px;
            line-height: 0px;
            border-radius: 5px;
            // webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            /*margin-top: 38px;*/
            font-size: 17px;
            margin-top:10px;
        }

        .techSupprt {
            font-size: 13px
        }
        .login_input_captcha {
        width: 160px;
    }
    }

    @media screen and (max-width: 1590px) {
    }

    @media screen and (max-width: 1440px) {
    }

    @media screen and (max-width: 1366px) {
        .login_width {
            padding-top: 3%
        }
    }

    @media screen and (max-width: 1280px) {
        .login_width {
            padding-top: 5%
        }
    }

    // 背景
    .circles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        li {
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            background: #FFF;
            animation: animate 25s linear infinite;
            bottom: -200px;
            @keyframes animate {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                    border-radius: 0;
                }
                100% {
                    transform: translateY(-1000px) rotate(720deg);
                    opacity: 0;
                    border-radius: 50%;
                }
            }

            &:nth-child(1) {
                left: 15%;
                width: 80px;
                height: 80px;
                animation-delay: 0s;
            }

            &:nth-child(2) {
                left: 5%;
                width: 20px;
                height: 20px;
                animation-delay: 2s;
                animation-duration: 12s;
            }

            &:nth-child(3) {
                left: 70%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
            }

            &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-delay: 0s;
                animation-duration: 18s;
            }

            &:nth-child(5) {
                left: 65%;
                width: 20px;
                height: 20px;
                animation-delay: 0s;
            }

            &:nth-child(6) {
                left: 75%;
                width: 150px;
                height: 150px;
                animation-delay: 3s;
            }

            &:nth-child(7) {
                left: 35%;
                width: 200px;
                height: 200px;
                animation-delay: 7s;
            }

            &:nth-child(8) {
                left: 50%;
                width: 25px;
                height: 25px;
                animation-delay: 15s;
                animation-duration: 45s;
            }

            &:nth-child(9  ) {
                left: 20%;
                width: 15px;
                height: 15px;
                animation-delay: 2s;
                animation-duration: 35s;
            }

            &:nth-child(10) {
                left: 85%;
                width: 150px;
                height: 150px;
                animation-delay: 0s;
                animation-duration: 11s;
            }
        }
    }

</style>
