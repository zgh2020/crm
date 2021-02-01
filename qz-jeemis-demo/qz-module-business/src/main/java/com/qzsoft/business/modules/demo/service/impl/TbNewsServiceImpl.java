package com.qzsoft.business.modules.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.dao.TbNewsDao;
import com.qzsoft.business.modules.demo.entity.TbNewsEntity;
import com.qzsoft.business.modules.demo.service.TbNewsService;
import com.qzsoft.jeemis.common.constant.Constant;
import com.qzsoft.jeemis.common.service.BaseService;
import com.qzsoft.jeemis.common.utils.ConvertDictUtils;
import com.qzsoft.jeemis.common.utils.ExcelUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 新闻管理(TbNews)表服务实现类
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
@Service("tbNewsService")
public class TbNewsServiceImpl extends BaseService implements TbNewsService {
    private final SqlSession sqlSession;
    @Autowired
	private TbNewsDao tbNewsDao;
   
	public TbNewsServiceImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	/**
	 * TbNews数据分页
	 * @param params
	 * @return IPage
	 */
	@Override
	public IPage<TbNewsEntity> page(Map<String, Object> params) {
		IPage<TbNewsEntity> page =this.getPage(params,Constant.CREATE_DATE,false,TbNewsEntity.class) ;
		QueryWrapper<TbNewsEntity> queryWrapper =this.getQueryWrapper(params,TbNewsEntity.class);
		IPage<TbNewsEntity> pageData = tbNewsDao.selectPage(page, queryWrapper);
		pageData= ConvertDictUtils.formatDicDataPage(pageData);
		return pageData;
	}
    /**
	 * TbNews数据列表
	 * @param params
	 * @return
	 */
	@Override
	public List<TbNewsEntity> list(Map<String, Object> params) {
		QueryWrapper<TbNewsEntity> queryWrapper = this.getQueryWrapper(params,TbNewsEntity.class);
		List<TbNewsEntity> entityList = tbNewsDao.selectList(queryWrapper);
		entityList=ConvertDictUtils.formatDicDataList(entityList);
		return entityList;
	}

	@Override
	public TbNewsEntity get(String id) {
		TbNewsEntity entity = tbNewsDao.selectById(id);
		return entity;
	}
    /**
	 * TbNews保存
	 * createDate creator
	 * updateDate updater 
	 * 字段会自动注入值 如不需要注入请修改TbNewsEntity
	 * @param entity
	 * @return
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void save1(TbNewsEntity entity) {
		tbNewsDao.insert(entity);
	}


	@Override
	@Transactional(rollbackFor = Exception.class)
	public void update(TbNewsEntity entity) {
		tbNewsDao.updateById(entity);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void delete(String[] ids) {
		tbNewsDao.deleteBatchIds(Arrays.asList(ids));
	}
	@Override
	public void exportXls(Map<String, Object> params , HttpServletResponse response)  {
		List<TbNewsEntity> list = this.list(params);
		ExcelUtils.exportExcelToTarget(response, "新闻管理导出列表", list, TbNewsEntity.class);
	}
	
}