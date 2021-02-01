package com.qzsoft.bootstrap.example.im;

import com.qzsoft.jeemis.platform.im.JeeImMessageHelper;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 新闻管理(TbNews)表控制层
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
@RestController
@RequestMapping("demo/tbnews")
@Api(tags="消息发送")
public class MessageController {
    @Autowired
	private JeeImMessageHelper jeeImMessageHelper;

	@GetMapping("sendmsg")
	public void sendMsg(){
		String messagePkid = "www";
		jeeImMessageHelper.sendToUser(messagePkid);
	}
    
}