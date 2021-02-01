package com.qzsoft.business.modules.demo.teststudentx.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.teststudentx.entity.TestStudentxEntity;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
/**
 * 学生表2(TestStudentx)表服务接口
 *
 * @author sdmq
 * @since 2019-11-26 11:29:50
 */
public interface TestStudentxService {
    /**
	 * 数据分页
	 * @param params
	 * @return IPage
	 */
	IPage<TestStudentxEntity> page(Map<String, Object> params);
    
	/**
	 * 数据列表
	 * @param params
	 * @return
	 */
	List<TestStudentxEntity> list(Map<String, Object> params);

	/**
	 * 单个数据
	 * @param id
	 * @return
	 */
	TestStudentxEntity get(String id);

	/**
	 * 保存
	 * @param entity
	 */
	void save(TestStudentxEntity entity);

	/**
	 * 更新
	 * @param entity
	 */
	void update(TestStudentxEntity entity);

	/**
	 * 批量删除
	 * @param ids
	 */
	void delete(String[] ids);

	/**
	 * 导出Excel
	 * @param params
	 * @param response
	 */
	void exportXls(Map<String, Object> params , HttpServletResponse response);

}