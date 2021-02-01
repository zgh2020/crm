let t = {}

t.loading = '加载中...'

t.brand = {}
t.brand.lg = '企业版'
t.brand.mini = 'jeemis'

t.add = '新增'
t.delete = '删除'
t.deleteBatch = '批量删除'
t.update = '修改'
t.query = '查询'
t.export = '导出'
t.handle = '操作'
t.confirm = '确定'
t.cancel = '取消'
t.logout = '退出'

t.prompt = {}
t.prompt.title = '提示'
t.prompt.info = '确定进行[{handle}]操作?'
t.prompt.success = '操作成功'
t.prompt.failed = '操作失败'
t.prompt.deleteBatch = '请选择删除项'
t.prompt.logout = '注销当前账户吗?'

t.message = {}
t.message.logoutCancel = '放弃注销用户'

t.validate = {}
t.validate.required = '必填项不能为空'
t.validate.format = '{attr}格式错误'

t.upload = {}
t.upload.text = '将文件拖到此处，或<em>点击上传</em>'
t.upload.tip = '只支持{format}格式文件！'
t.upload.button = '点击上传'

t.datePicker = {}
t.datePicker.range = '至'
t.datePicker.start = '开始日期'
t.datePicker.end = '结束日期'

t.fullscreen = {}
t.fullscreen.prompt = '您的浏览器不支持此操作'

t.updatePassword = {}
t.updatePassword.title = '修改密码'
t.updatePassword.username = '账号'
t.updatePassword.password = '原密码'
t.updatePassword.newPassword = '新密码'
t.updatePassword.comfirmPassword = '确认密码'
t.updatePassword.validate = {}
t.updatePassword.validate.comfirmPassword = '确认密码与新密码输入不一致'

t.theme = {}
t.theme.d2 = 'D2Admin 经典'
t.theme.violet = '紫罗兰'
t.theme.line = '简约线条'
t.theme.star = '繁星'
t.theme.tomorrowNightBlue = 'Tomorrow Night Blue'
t.theme.list = {}
t.theme.list.button = '使用'
t.theme.list.buttonActive = '已激活'

t.layout = {}
t.layout.hello = '你好'
t.layout.logout = '注销'
t.layout.updatePassword = '修改密码'
t.layout.tooltip = {}
t.layout.tooltip.fullscreen = '全屏'
t.layout.tooltip.fullscreenActive = '退出全屏'
t.layout.tooltip.theme = '主题'
t.layout.tooltip.search = '搜索'
t.layout.search = {}
t.layout.search.placeholder = '搜索页面'
t.layout.search.tip1 = '您可以使用快捷键'
t.layout.search.tip2 = '唤醒搜索面板，按'
t.layout.search.tip3 = '关闭。'

t.layoutTab = {}
t.layoutTab.index = '首页'
t.layoutTab.noName = '未命名'

t.contentTabs = {}
t.contentTabs.closeCurrent = '关闭当前标签页'
t.contentTabs.closeOther = '关闭其它标签页'
t.contentTabs.closeAll = '关闭全部标签页'

/* 页面 */
t.notFound = {}
t.notFound.desc = '抱歉！您访问的页面<em>失联</em>啦...'
t.notFound.back = '上一页'
t.notFound.home = '首页'

t.login = {}
t.login.language = '语言'
t.login.motto = '时间是一切财富中最宝贵的财富'
t.login.form = {}
t.login.form.placeholderUsername = '用户名'
t.login.form.placeholderPassword = '密码'
t.login.form.placeholderCaptcha = '验证码'
t.login.form.textSubmitButton = '登录'
t.login.form.textForget = '忘记密码'
t.login.form.textSignUp = '注册用户'
t.login.footer = {}
t.login.footer.buttonHelp = '帮助'
t.login.footer.buttonPrivacy = '隐私'
t.login.footer.buttonClause = '条款'
t.login.copyright = {}
t.login.copyright.p1 = 'Copyright'
t.login.copyright.p2 = '2018 D2 Projects 开源组织出品'
t.login.copyright.p3 = '@FairyEver'
t.login.ruleMessage = {}
t.login.ruleMessage.username = '请输入用户名'
t.login.ruleMessage.password = '请输入密码'
t.login.ruleMessage.captcha = '请输入验证码'

t.home = {}
t.home.sysInfo = {}
t.home.sysInfo.name = '系统名称'
t.home.sysInfo.nameVal = 'qzjeemis【新版】'
t.home.sysInfo.version = '版本信息'
t.home.sysInfo.versionVal = process.env.VUE_APP_VERSION
t.home.sysInfo.osName = '操作系统'
t.home.sysInfo.osVersion = '系统版本'
t.home.sysInfo.osArch = '系统架构'
t.home.sysInfo.processors = 'CPU核数'
t.home.sysInfo.totalPhysical = '系统内存'
t.home.sysInfo.freePhysical = '剩余内存'
t.home.sysInfo.memoryRate = '内存使用'
t.home.sysInfo.userLanguage = '系统语言'
t.home.sysInfo.jvmName = 'JVM信息'
t.home.sysInfo.javaVersion = 'JVM版本'
t.home.sysInfo.javaHome = 'JAVA_HOME'
t.home.sysInfo.userDir = '工作目录'
t.home.sysInfo.javaTotalMemory = 'JVM占用内存'
t.home.sysInfo.javaFreeMemory = 'JVM空闲内存'
t.home.sysInfo.javaMaxMemory = 'JVM最大内存'
t.home.sysInfo.userName = '当前用户'
t.home.sysInfo.systemCpuLoad = 'CPU负载'
t.home.sysInfo.userTimezone = '系统时区'

/* 模块 */
t.model = {}
t.model.name = '名称'
t.model.key = '标识'
t.model.version = '版本'
t.model.createTime = '创建时间'
t.model.lastUpdateTime = '更新时间'
t.model.design = '设计'
t.model.deploy = '部署'
t.model.description = '描述'

t.process = {}
t.process.name = '名称'
t.process.key = '标识'
t.process.deployFile = '部署流程文件'
t.process.id = '流程ID'
t.process.deploymentId = '部署ID'
t.process.version = '版本'
t.process.resourceName = 'XML'
t.process.diagramResourceName = '图片'
t.process.deploymentTime = '部署时间'
t.process.active = '激活'
t.process.suspend = '挂起'
t.process.convertToModel = '转换为模型'

t.running = {}
t.running.id = '实例ID'
t.running.definitionKey = '定义Key'
t.running.processDefinitionId = '定义ID'
t.running.processDefinitionName = '定义名称'
t.running.activityId = '当前环节'
t.running.suspended = '是否挂起'
t.running.suspended0 = '否'
t.running.suspended1 = '是'

t.news = {}
t.news.title = '标题'
t.news.pubDate = '发布时间'
t.news.createDate = '创建时间'
t.news.content = '内容'

t.schedule = {}
t.schedule.beanName = 'bean名称'
t.schedule.beanNameTips = 'spring bean名称, 如: testTask'
t.schedule.pauseBatch = '暂停'
t.schedule.resumeBatch = '恢复'
t.schedule.runBatch = '执行'
t.schedule.log = '日志列表'
t.schedule.params = '参数'
t.schedule.cronExpression = 'cron表达式'
t.schedule.cronExpressionTips = '如: 0 0 12 * * ?'
t.schedule.remark = '备注'
t.schedule.status = '状态'
t.schedule.status0 = '暂停'
t.schedule.status1 = '正常'
t.schedule.statusLog0 = '失败'
t.schedule.statusLog1 = '成功'
t.schedule.pause = '暂停'
t.schedule.resume = '恢复'
t.schedule.run = '执行'
t.schedule.jobId = '任务ID'
t.schedule.times = '耗时(单位: 毫秒)'
t.schedule.createDate = '执行时间'

t.mail = {}
t.mail.name = '名称'
t.mail.config = '邮件配置'
t.mail.subject = '主题'
t.mail.createDate = '创建时间'
t.mail.send = '发送邮件'
t.mail.content = '内容'
t.mail.smtp = 'SMTP'
t.mail.port = '端口号'
t.mail.username = '邮箱账号'
t.mail.password = '邮箱密码'
t.mail.mailTo = '收件人'
t.mail.mailCc = '抄送'
t.mail.params = '模板参数'
t.mail.paramsTips = '如：{"code": "123456"}'
t.mail.templateId = '模版ID'
t.mail.status = '状态'
t.mail.status0 = '发送失败'
t.mail.status1 = '发送成功'
t.mail.mailFrom = '发送者'
t.mail.createDate = '发送时间'

t.sms = {}
t.sms.mobile = '手机号'
t.sms.status = '状态'
t.sms.status0 = '发送失败'
t.sms.status1 = '发送成功'
t.sms.config = '短信配置'
t.sms.send = '发送短信'
t.sms.platform = '平台类型'
t.sms.platform1 = '阿里云'
t.sms.platform2 = '腾讯云'
t.sms.params = '参数'
t.sms.paramsTips = '如：{"code": "123456"}'
t.sms.params1 = '参数1'
t.sms.params2 = '参数2'
t.sms.params3 = '参数3'
t.sms.params4 = '参数4'
t.sms.createDate = '发送时间'
t.sms.aliyunAccessKeyId = 'Key'
t.sms.aliyunAccessKeyIdTips = '阿里云AccessKeyId'
t.sms.aliyunAccessKeySecret = 'Secret'
t.sms.aliyunAccessKeySecretTips = '阿里云AccessKeySecret'
t.sms.aliyunSignName = '短信签名'
t.sms.aliyunTemplateCode = '短信模板'
t.sms.aliyunTemplateCodeTips = '短信模板CODE'
t.sms.qcloudAppId = 'AppId'
t.sms.qcloudAppIdTips = '腾讯云AppId'
t.sms.qcloudAppKey = 'AppKey'
t.sms.qcloudAppKeyTips = '腾讯云AppKey'
t.sms.qcloudSignName = '短信签名'
t.sms.qcloudTemplateId = '短信模板'
t.sms.qcloudTemplateIdTips = '短信模板ID'

t.oss = {}
t.oss.config = '云存储配置'
t.oss.upload = '上传文件'
t.oss.url = 'URL地址'
t.oss.createDate = '创建时间'
t.oss.type = '类型'
t.oss.type1 = '七牛'
t.oss.type2 = '阿里云'
t.oss.type3 = '腾讯云'
t.oss.type4 = 'FastDFS'
t.oss.type5 = '本地上传'
t.oss.qiniuDomain = '域名'
t.oss.qiniuDomainTips = '七牛绑定的域名'
t.oss.qiniuPrefix = '路径前缀'
t.oss.qiniuPrefixTips = '不设置默认为空'
t.oss.qiniuAccessKey = 'AccessKey'
t.oss.qiniuAccessKeyTips = '七牛AccessKey'
t.oss.qiniuSecretKey = 'SecretKey'
t.oss.qiniuSecretKeyTips = '七牛SecretKey'
t.oss.qiniuBucketName = '空间名'
t.oss.qiniuBucketNameTips = '七牛存储空间名'
t.oss.aliyunDomain = '域名'
t.oss.aliyunDomainTips = '阿里云绑定的域名，如：http://cdn.renren.io'
t.oss.aliyunPrefix = '路径前缀'
t.oss.aliyunPrefixTips = '不设置默认为空'
t.oss.aliyunEndPoint = 'EndPoint'
t.oss.aliyunEndPointTips = '阿里云EndPoint'
t.oss.aliyunAccessKeyId = 'AccessKeyId'
t.oss.aliyunAccessKeyIdTips = '阿里云AccessKeyId'
t.oss.aliyunAccessKeySecret = 'AccessKeySecret'
t.oss.aliyunAccessKeySecretTips = '阿里云AccessKeySecret'
t.oss.aliyunBucketName = 'BucketName'
t.oss.aliyunBucketNameTips = '阿里云BucketName'
t.oss.qcloudDomain = '域名'
t.oss.qcloudDomainTips = '腾讯云绑定的域名'
t.oss.qcloudPrefix = '路径前缀'
t.oss.qcloudPrefixTips = '不设置默认为空'
t.oss.qcloudAppId = 'AppId'
t.oss.qcloudAppIdTips = '腾讯云AppId'
t.oss.qcloudSecretId = 'SecretId'
t.oss.qcloudSecretIdTips = '腾讯云SecretId'
t.oss.qcloudSecretKey = 'SecretKey'
t.oss.qcloudSecretKeyTips = '腾讯云SecretKey'
t.oss.qcloudBucketName = 'BucketName'
t.oss.qcloudBucketNameTips = '腾讯云BucketName'
t.oss.qcloudRegion = '所属地区'
t.oss.qcloudRegionTips = '请选择'
t.oss.qcloudRegionBeijing1 = '北京一区（华北）'
t.oss.qcloudRegionBeijing = '北京'
t.oss.qcloudRegionShanghai = '上海（华东）'
t.oss.qcloudRegionGuangzhou = '广州（华南）'
t.oss.qcloudRegionChengdu = '成都（西南）'
t.oss.qcloudRegionChongqing = '重庆'
t.oss.qcloudRegionSingapore = '新加坡'
t.oss.qcloudRegionHongkong = '香港'
t.oss.qcloudRegionToronto = '多伦多'
t.oss.qcloudRegionFrankfurt = '法兰克福'
t.oss.localDomain = '域名'
t.oss.localDomainTips = '绑定的域名，如：http://cdn.renren.io'
t.oss.fastdfsDomain = '域名'
t.oss.fastdfsDomainTips = '绑定的域名，如：http://cdn.renren.io'
t.oss.localPrefix = '路径前缀'
t.oss.localPrefixTips = '不设置默认为空'
t.oss.localPath = '存储目录'
t.oss.localPathTips = '如：D:/upload'

t.dept = {}
t.dept.name = '名称'
t.dept.parentName = '上级部门'
t.dept.sort = '排序'
t.dept.parentNameDefault = '一级部门'

t.dict = {}
t.dict.dictName = '名称'
t.dict.dictType = '类型'
t.dict.dictValue = '值'
t.dict.sort = '排序'
t.dict.remark = '备注'
t.dict.createDate = '创建时间'

t.logError = {}
t.logError.requestUri = '请求URI'
t.logError.requestMethod = '请求方式'
t.logError.requestParams = '请求参数'
t.logError.ip = '操作IP'
t.logError.userAgent = '用户代理'
t.logError.createDate = '创建时间'
t.logError.errorInfo = '异常信息'

t.logLogin = {}
t.logLogin.creatorName = '用户名'
t.logLogin.status = '状态'
t.logLogin.status0 = '失败'
t.logLogin.status1 = '成功'
t.logLogin.status2 = '账号已锁定'
t.logLogin.operation = '操作类型'
t.logLogin.operation0 = '登录'
t.logLogin.operation1 = '退出'
t.logLogin.ip = '操作IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = '创建时间'

t.logOperation = {}
t.logOperation.status = '状态'
t.logOperation.status0 = '失败'
t.logOperation.status1 = '成功'
t.logOperation.creatorName = '用户名'
t.logOperation.operation = '用户操作'
t.logOperation.requestUri = '请求URI'
t.logOperation.requestMethod = '请求方式'
t.logOperation.requestParams = '请求参数'
t.logOperation.requestTime = '请求时长'
t.logOperation.ip = '操作IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = '创建时间'

t.menu = {}
t.menu.name = '名称'
t.menu.icon = '图标'
t.menu.type = '类型'
t.menu.type0 = '菜单'
t.menu.type1 = '按钮'
t.menu.sort = '排序'
t.menu.url = '路由'
t.menu.permissions = '授权标识'
t.menu.permissionsTips = '多个用逗号分隔，如：sys:menu:save,sys:menu:update'
t.menu.parentName = '上级菜单'
t.menu.parentNameDefault = '一级菜单'
t.menu.resource = '授权资源'
t.menu.resourceUrl = '资源URL'
t.menu.resourceMethod = '请求方式'
t.menu.resourceAddItem = '添加一项'

t.params = {}
t.params.paramCode = '编码'
t.params.paramValue = '值'
t.params.remark = '备注'

t.role = {}
t.role.name = '名称'
t.role.remark = '备注'
t.role.createDate = '创建时间'
t.role.menuList = '菜单授权'
t.role.deptList = '数据授权'

t.user = {}
t.user.username = '用户名'
t.user.deptName = '所属部门'
t.user.email = '邮箱'
t.user.mobile = '手机号'
t.user.status = '状态'
t.user.status0 = '停用'
t.user.status1 = '正常'
t.user.createDate = '创建时间'
t.user.password = '密码'
t.user.comfirmPassword = '确认密码'
t.user.realName = '真实姓名'
t.user.gender = '性别'
t.user.gender0 = '男'
t.user.gender1 = '女'
t.user.gender2 = '保密'
t.user.roleIdList = '角色配置'
t.user.validate = {}
t.user.validate.comfirmPassword = '确认密码与密码输入不一致'

const t2 = {
  _name: '简体中文',
  layout: {
    'header-aside': {
      'header-fullscreen': {
        active: '全屏',
        exit: '退出全屏'
      },
      'header-log': {
        empty: '没有日志或异常',
        'error-length': '包含 {length} 个异常',
        'log-length': '{length} 条日志'
      },
      'header-size': {
        options: {
          default: '默认',
          medium: '中',
          mini: '最小',
          small: '小'
        }
      },
      'header-theme': {
        dialog: {
          title: '主题'
        },
        list: {
          button: {
            'is-active': '已激活',
            select: '选择'
          },
          column: {
            label: {
              preview: '预览'
            }
          }
        },
        tooltip: {
          content: '主题'
        }
      },
      'header-user': {
        hello: '你好',
        'log-off': '注销'
      },
      'menu-item': {
        'label-default': '未命名菜单'
      },
      'menu-side': {
        empty: '没有侧栏菜单'
      },
      message: {
        warning: {
          'temporary-menu': '临时菜单'
        }
      },
      'panel-search': {
        'autocomplete-placeholder': '搜索页面',
        tip: '你可以使用快捷键 {open} 唤醒搜索面板，按 {close} 关闭'
      },
      tabs: {
        'close-all': '全部关闭',
        'close-left': '关闭左侧',
        'close-other': '关闭其它',
        'close-right': '关闭右侧',
        'label-default': '未命名'
      }
    }
  },
  public: {
    confirm: {
      special: {
        logout: {
          button: {
            cancel: '放弃',
            confirm: '确定注销'
          },
          message: '注销当前账户吗?  打开的标签页和用户设置将会被保存。',
          title: '确认操作'
        }
      }
    },
    message: {
      error: {
        form: {
          invalid: '表单校验失败，请检查'
        },
        handle: {
          invalid: '无效的操作'
        }
      },
      special: {
        logout: {
          cancel: '放弃注销用户'
        }
      }
    },
    notify: {
      special: {
        'component-size': {
          changed: {
            message: '全局组件尺寸已经变更',
            title: '提示'
          }
        },
        'show-log': {
          message: '完整的日志内容已经打印到控制台',
          title: '日志详情'
        },
        upload: {
          error: {
            message: '数据上传失败',
            title: '上传失败'
          },
          start: {
            message: '正在上传数据，请稍后',
            title: '开始上传'
          },
          success: {
            message: '数据上传成功',
            title: '上传成功'
          }
        }
      }
    },
    rules: {
      required: '请输入 {name}'
    }
  },
  views: {
    system: {
      error: {
        404: {
          back: '返回首页'
        }
      },
      index: {
        cover: {
          'build-time': '构建时间',
          'github-fork-alt': 'Fork me on GitHub',
          'sub-title': '优雅的中后台集成方案',
          title: 'D2 Admin'
        },
        help: {
          button: '需要帮助吗',
          dialog: {
            join: {
              qq: {
                'sub-title': '加入 2000 人用户大群共同交流',
                title: '请使用手机 QQ 扫面上方二维码'
              },
              we: {
                'sub-title': '添加作者微信好友，邀请加入微信群',
                title: '请使用手机微信扫面上方二维码'
              }
            },
            link: {
              text: {
                doc: '文档',
                issues: '历史提问',
                'new-issue': '在 Github 提问'
              }
            },
            'sub-title': {
              doc: '这里有一些参考资料',
              join: '询问其它使用者或作者'
            },
            title: '帮助'
          }
        },
        page: {
          link: {
            href: {
              doc: 'https://doc.d2admin.fairyever.com/zh/'
            },
            text: {
              'd2-projects': '开源组织',
              daily: '日报',
              doc: '文档',
              ice: '飞冰',
              juejin: '掘金',
              'start-kit': '简化版'
            }
          },
          we: {
            button: '微信公众号',
            introduce: '官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息',
            title: '今日前端'
          }
        }
      },
      log: {
        table: {
          'empty-text': '暂无日志信息',
          label: {
            component: '触发组件',
            message: '信息',
            more: '查看详细信息',
            time: '时间',
            url: '触发页面'
          }
        },
        upload: {
          button: '上传 {number} 条数据'
        }
      },
      login: {
        footer: {
          button: {
            clause: '条款',
            help: '帮助',
            privacy: '隐私'
          },
          copyright: {
            author: 'FairyEver',
            content: '2018 D2 Projects 开源组织出品',
            copyright: 'Copyright'
          }
        },
        form: {
          button: {
            login: '登录'
          },
          label: {
            code: '验证码',
            password: '密码',
            username: '用户名'
          },
          placeholder: {
            code: '验证码',
            password: '密码',
            username: '用户名'
          }
        },
        motto: {
          text: '时间是一切财富中最宝贵的财富。'
        },
        options: {
          'forget-password': '忘记密码',
          register: '注册用户'
        },
        'quick-login': {
          dialog: {
            title: '快速选择用户'
          },
          'toggle-button': {
            text: '快速选择用户'
          }
        }
      }
    }
  }
}
t = { ...t, ...t2 }
export default t
