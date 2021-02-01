package com.qzsoft.bootstrap.example.im;

import com.qzsoft.jeemis.common.service.BaseService;
import com.qzsoft.jeemis.platform.im.JeeImMessageListener;
import org.springframework.stereotype.Component;

/**
 * @author sdmq
 */
@Component
public class JeeImMessageListenerImpl extends BaseService implements JeeImMessageListener {


	@Override
	public void onAfterConnected(boolean isConnected, boolean isReconnect) {
		// System.out.println("JeeImMessageListenerImpl---isConnected" + isConnected + "++" + isReconnect);
	}

	@Override
	public void onBeforeClose() {

	}

	@Override
	public void onAfterSent(String s) {
		 System.out.println("JeeImMessageListenerImpl---" + s);
	}

	@Override
	public void onAfterHandled(String s) {
		 System.out.println("JeeImMessageListenerImpl---onAfterHandled---" + s);
	}
}
