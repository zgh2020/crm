package com.qzsoft.business.modules.demo.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.entity.TbNewsEntity;
import com.qzsoft.business.modules.demo.service.TbNewsService;
import com.qzsoft.jeemis.common.annotation.LogOperation;
import com.qzsoft.jeemis.common.constant.Constant;
import com.qzsoft.jeemis.common.utils.Result;
import com.qzsoft.jeemis.common.validator.AssertUtils;
import com.qzsoft.jeemis.common.validator.ValidatorUtils;
import com.qzsoft.jeemis.common.validator.group.AddGroup;
import com.qzsoft.jeemis.common.validator.group.DefaultGroup;
import com.qzsoft.jeemis.common.validator.group.UpdateGroup;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * 新闻管理(TbNews)表控制层
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
@RestController
@RequestMapping("demo/tbnews")
@Api(tags="新闻管理")
public class TbNewsController  {
    @Autowired
    private TbNewsService tbNewsService;
	@GetMapping("page")
	@ApiOperation("分页")
	@ApiImplicitParams({
			@ApiImplicitParam(name = Constant.PAGE, value = "当前页码，从1开始", paramType = "query", required = true, dataType="int") ,
			@ApiImplicitParam(name = Constant.LIMIT, value = "每页显示记录数", paramType = "query",required = true, dataType="int") ,
			@ApiImplicitParam(name = Constant.ORDER_FIELD, value = "排序字段", paramType = "query", dataType="String") ,
			@ApiImplicitParam(name = Constant.ORDER, value = "排序方式，可选值(asc、desc)", paramType = "query", dataType="String") ,
			@ApiImplicitParam(name = "link_title", value = "标题", paramType = "query", dataType="String"),
			@ApiImplicitParam(name = "ge_createDate", value = "起始创建时间", paramType = "query", dataType="Date"),
			@ApiImplicitParam(name = "le_createDate", value = "截止创建时间", paramType = "query", dataType="Date")
	})
	@RequiresPermissions("demo:tbnews:page")
	public Result<IPage<TbNewsEntity>> page(@ApiIgnore @RequestParam Map<String, Object> params){
		IPage<TbNewsEntity> page = tbNewsService.page(params);

		return new Result<IPage<TbNewsEntity>>().ok(page);
	}

	@GetMapping("list")
	@ApiOperation("列表")
	@RequiresPermissions("demo:tbnews:list")
	public Result<List<TbNewsEntity>> list(@ApiIgnore @RequestParam Map<String, Object> params){
		List<TbNewsEntity> data = tbNewsService.list(params);

		return new Result<List<TbNewsEntity>>().ok(data);
	}

	@GetMapping("{id}")
	@ApiOperation("信息")
	@RequiresPermissions("demo:tbnews:info")
	public Result<TbNewsEntity> get(@PathVariable("id") String id){
		TbNewsEntity data = tbNewsService.get(id);

		return new Result<TbNewsEntity>().ok(data);
	}

	@PostMapping
	@ApiOperation("保存")
	@LogOperation("保存")
	@RequiresPermissions("demo:tbnews:save")
	public Result save(@RequestBody TbNewsEntity dto){
		//效验数据
		ValidatorUtils.validateEntity(dto, AddGroup.class, DefaultGroup.class);
		tbNewsService.save1(dto);
		return new Result();
	}

	@PutMapping
	@ApiOperation("修改")
	@LogOperation("修改")
	@RequiresPermissions("demo:tbnews:update")
	public Result update(@RequestBody TbNewsEntity dto){
		//效验数据
		ValidatorUtils.validateEntity(dto, UpdateGroup.class, DefaultGroup.class);

		tbNewsService.update(dto);

		return new Result();
	}
	
	@DeleteMapping
	@ApiOperation("删除")
	@LogOperation("删除")
	@RequiresPermissions("demo:tbnews:delete")
	public Result delete(@RequestBody String[] ids){
		//效验数据
		AssertUtils.isArrayEmpty(ids, "id");

		tbNewsService.delete(ids);

		return new Result();
	}



	@GetMapping("export")
	@ApiOperation("导出")
	@LogOperation("导出")
	@RequiresPermissions("demo:tbnews:export")
	public void export(@ApiIgnore @RequestParam Map<String, Object> params , HttpServletResponse response) throws Exception {
		tbNewsService.exportXls(params,response);
	}

}