package com.qzsoft.bootstrap.example.mq;

import cn.hutool.core.thread.ThreadUtil;
import com.qzsoft.jeemis.queue.redis.subscribe.RedisSubscribeListener;
import org.springframework.data.redis.connection.Message;
import org.springframework.stereotype.Component;

/**
 * @author sdmq
 * @date 2020/1/3 10:57
 */
@Component
public class MyRedisSubscribeListenerImpl implements RedisSubscribeListener {
	@Override
	public void onMessage(Message message, String topic) {
		System.out.println("新收到订阅主题:" + topic + ":" + message.toString());
		ThreadUtil.safeSleep(10);
		System.out.println("-------------------"+topic+"完成");
	}

}
