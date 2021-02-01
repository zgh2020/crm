/**
 * Copyright (c) 2018  All rights reserved.
 */

package com.qzsoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.tio.websocket.starter.EnableTioWebSocketServer;

/**
 *
 * @author
 */
//@EnableAsync //打开异步
//@RedisQueueScanner("com.qzsoft") //队列
@EnableCaching  //打开缓存
@EnableTioWebSocketServer // 打开即时通讯
@SpringBootApplication(exclude = {
		org.activiti.spring.boot.SecurityAutoConfiguration.class,
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class AdminApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AdminApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AdminApplication.class);
	}
}