package com.qzsoft.bootstrap.example.task;

import cn.hutool.json.JSONUtil;
import com.qzsoft.jeemis.platform.im.JeeImMessageHelper;
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
@Component("MessageTask")
public class MessageTaskService implements ITask {
	@Autowired
	private JeeImMessageHelper jeeImMessageHelper;

	@Override
	public void run(String params) {
		// 在任务中不能取回当前用户
		// 取门架的一些信息
		String doorInfo ="门架信息";
		// String doorInfo= JSONUtil.toJsonStr(obj);
		jeeImMessageHelper.sendAll(doorInfo);
		System.out.println("------------------任务执行---------------------------");
		System.out.println("------------------ "+ JSONUtil.toJsonStr(jeeImMessageHelper.getOnlineUserNames()));

	}
}
