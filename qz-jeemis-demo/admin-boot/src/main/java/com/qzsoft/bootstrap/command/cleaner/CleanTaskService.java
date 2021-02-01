package com.qzsoft.bootstrap.command.cleaner;

import com.qzsoft.jeemis.platform.security.service.BasicUserTokenService;
import com.qzsoft.jeemis.task.task.ITask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 清理垃圾类 所有的垃圾清理 比如过期的token 临时文件 数据库临时数据 每10分钟清理一次
 * @author sdmq
 * @date 2019/9/30 10:15
 */
@Slf4j
@Component("cleanTask")
public class CleanTaskService implements ITask {
	@Autowired
	private BasicUserTokenService basicUserTokenService;

	@Override
	public void run(String params) {
		/*log.debug("CleanTaskService定时任务正在执行，参数为：{}", params);
		log.debug("删除过期日志");*/
		basicUserTokenService.deleteExpireToken();
		// 以下请自己定义自己需要清理的内容
	}
}
