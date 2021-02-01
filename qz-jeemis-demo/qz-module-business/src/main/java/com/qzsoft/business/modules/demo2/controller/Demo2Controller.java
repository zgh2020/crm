package com.qzsoft.business.modules.demo2.controller;


import cn.hutool.json.JSONUtil;
import com.qzsoft.business.modules.demo2.service.Demo2Service;
import com.qzsoft.jeemis.common.utils.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 新闻管理(TbNews)表控制层
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
@RestController
@RequestMapping("demo2")
@Api(tags="演示传参")
public class Demo2Controller {
	@Autowired
	Demo2Service demo2Service;

	@PostMapping("param0")
	@ApiOperation("传map参数")
	public Result<Map<String,Object>> get0(@RequestBody Map<String, Object> params){
		System.out.println(JSONUtil.toJsonStr(params));
		return new Result<Map<String,Object>>().ok(params);
	}

	@PostMapping("param1")
	@ApiOperation("传普通参数")
	public Result<String> get1(String v1,String v2,String v3){
		System.out.println( String.format("%s-%s-%s",v1,v2,v3));
		return new Result<String>().ok(String.format("%s-%s-%s",v1,v2,v3));
	}

	@PostMapping("param2")
	@ApiOperation("传普通参数和Map参数")
	public  Result<Map<String,Object>> get2(@RequestBody Map<String, Object> params,String id){
		System.out.println(JSONUtil.toJsonStr(params));
		params.put("id",id);
		return new  Result<Map<String,Object>>().ok(params);
	}

	@PostMapping("param3")
	@ApiOperation("上传文件")
	public Result<String> get3(){
		// 等补充
		return new Result<String>().ok("ok");
	}

	@PostMapping("getuserlist")
	@ApiOperation("取用户列表")
	public Result<Object> getListUser(String deptId,String name){
		// 等补充
		return new Result<Object>().ok(demo2Service.getListUser(deptId));
	}
}