package com.qzsoft.business.modules.demo.teststudent.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.teststudent.entity.TestStudentEntity;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
/**
 * 学生表(TestStudent)表服务接口
 *
 * @author sdmq
 * @since 2019-10-09 13:39:15
 */
public interface TestStudentService {
    /**
	 * 数据分页
	 * @param params
	 * @return IPage
	 */
	IPage<TestStudentEntity> page(Map<String, Object> params);
    
	/**
	 * 数据列表
	 * @param params
	 * @return
	 */
	List<TestStudentEntity> list(Map<String, Object> params);

	/**
	 * 单个数据
	 * @param id
	 * @return
	 */
	TestStudentEntity get(Integer id);

	/**
	 * 保存
	 * @param entity
	 */
	void save(TestStudentEntity entity);

	/**
	 * 更新
	 * @param entity
	 */
	void update(TestStudentEntity entity);

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