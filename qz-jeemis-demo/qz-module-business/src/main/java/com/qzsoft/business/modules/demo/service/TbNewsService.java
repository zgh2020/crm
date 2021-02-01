package com.qzsoft.business.modules.demo.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.entity.TbNewsEntity;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
/**
 * 新闻管理(TbNews)表服务接口
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
public interface TbNewsService {
    /**
	 * 数据分页
	 * @param params
	 * @return IPage
	 */
	IPage<TbNewsEntity> page(Map<String, Object> params);
    
	/**
	 * 数据列表
	 * @param params
	 * @return
	 */
	List<TbNewsEntity> list(Map<String, Object> params);

	/**
	 * 单个数据
	 * @param id
	 * @return
	 */
	TbNewsEntity get(String id);

	/**
	 * 保存
	 * @param entity
	 */
	void save1(TbNewsEntity entity);

	/**
	 * 更新
	 * @param entity
	 */
	void update(TbNewsEntity entity);

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