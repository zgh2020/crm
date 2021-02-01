package com.qzsoft.business.modules.demo.teststudentx.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.teststudentx.entity.TestStudentxEntity;
import com.qzsoft.business.modules.demo.teststudentx.service.TestStudentxService;
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
 * 学生表2(TestStudentx)表控制层
 *
 * @author sdmq
 * @since 2019-11-26 11:29:49
 */
@RestController
@RequestMapping("demo/teststudentx")
@Api(tags="学生表2")
public class TestStudentxController  {
    @Autowired
    private TestStudentxService testStudentxService;

	@PostMapping("page")
	@ApiOperation("分页")
	@ApiImplicitParams({
			@ApiImplicitParam(name = Constant.PAGE, value = "当前页码，从1开始", paramType = "query", required = true, dataType="int") ,
			@ApiImplicitParam(name = Constant.LIMIT, value = "每页显示记录数", paramType = "query",required = true, dataType="int") ,
			@ApiImplicitParam(name = Constant.ORDER_FIELD, value = "排序字段", paramType = "query", dataType="String") ,
			@ApiImplicitParam(name = Constant.ORDER, value = "排序方式，可选值(asc、desc)", paramType = "query", dataType="String") ,
			@ApiImplicitParam(name = "link_name", value = "名字", paramType = "query", dataType="String"),
	})
	@RequiresPermissions("demo:teststudentx:page")
	public Result<IPage<TestStudentxEntity>> page(@ApiIgnore @RequestBody Map<String, Object> params){
		IPage<TestStudentxEntity> page = testStudentxService.page(params);

		return new Result<IPage<TestStudentxEntity>>().ok(page);
	}

	@GetMapping("list")
	@ApiOperation("列表")
	@RequiresPermissions("demo:teststudentx:list")
	public Result<List<TestStudentxEntity>> list(@ApiIgnore @RequestParam Map<String, Object> params){
		List<TestStudentxEntity> data = testStudentxService.list(params);

		return new Result<List<TestStudentxEntity>>().ok(data);
	}

	@GetMapping("{id}")
	@ApiOperation("信息")
	@RequiresPermissions("demo:teststudentx:info")
	public Result<TestStudentxEntity> get(@PathVariable("id") String id){
		TestStudentxEntity data = testStudentxService.get(id);

		return new Result<TestStudentxEntity>().ok(data);
	}

	@PostMapping
	@ApiOperation("保存")
	@LogOperation("保存")
	@RequiresPermissions("demo:teststudentx:save")
	public Result save(@RequestBody TestStudentxEntity dto){
		//效验数据
		ValidatorUtils.validateEntity(dto, AddGroup.class, DefaultGroup.class);
		testStudentxService.save(dto);
		return new Result();
	}

	@PutMapping
	@ApiOperation("修改")
	@LogOperation("修改")
	@RequiresPermissions("demo:teststudentx:update")
	public Result update(@RequestBody TestStudentxEntity dto){
		//效验数据
		ValidatorUtils.validateEntity(dto, UpdateGroup.class, DefaultGroup.class);

		testStudentxService.update(dto);

		return new Result();
	}
	
	@DeleteMapping
	@ApiOperation("删除")
	@LogOperation("删除")
	@RequiresPermissions("demo:teststudentx:delete")
	public Result delete(@RequestBody String[] ids){
		//效验数据
		AssertUtils.isArrayEmpty(ids, "id");

		testStudentxService.delete(ids);

		return new Result();
	}



	@GetMapping("export")
	@ApiOperation("导出")
	@LogOperation("导出")
	@RequiresPermissions("demo:teststudentx:export")
	public void export(@ApiIgnore @RequestParam Map<String, Object> params , HttpServletResponse response) throws Exception {
		testStudentxService.exportXls(params,response);
	}
    
}