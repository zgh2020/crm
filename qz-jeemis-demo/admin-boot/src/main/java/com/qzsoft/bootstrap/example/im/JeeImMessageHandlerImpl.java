package com.qzsoft.bootstrap.example.im;

import com.qzsoft.jeemis.platform.im.JeeImMessageHandler;
import org.springframework.stereotype.Component;

/**
 * 处理 暂时未用
 * @author sdmq
 * @date 2019/12/10 15:01
 */
@Component
public class JeeImMessageHandlerImpl implements JeeImMessageHandler {
	@Override
	public boolean onText(String s) {
		System.out.println("JeeImMessageHandlerImpl-onText  " + s );
		// 继续
		return true;
	}

	@Override
	public boolean onBytes(byte[] bytes) {
		// 继续
		return true;
	}
}
