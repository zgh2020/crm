package com.qzsoft.business.modules.demo.teststudentx.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.teststudentx.dao.TestStudentxDao;
import com.qzsoft.business.modules.demo.teststudentx.entity.TestStudentxEntity;
import com.qzsoft.business.modules.demo.teststudentx.service.TestStudentxService;
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
 * 学生表2(TestStudentx)表服务实现类
 *
 * @author sdmq
 * @since 2019-11-26 11:29:49
 */
@Service("testStudentxService")
public class TestStudentxServiceImpl extends BaseService implements TestStudentxService {
    private final SqlSession sqlSession;
    @Autowired
	private TestStudentxDao testStudentxDao;
   
	public TestStudentxServiceImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	/**
	 * TestStudentx数据分页
	 * @param params
	 * @return IPage
	 */
	@Override
	public IPage<TestStudentxEntity> page(Map<String, Object> params) {
		IPage<TestStudentxEntity> page =this.getPage(params,Constant.CREATE_DATE,false,TestStudentxEntity.class) ;
		QueryWrapper<TestStudentxEntity> queryWrapper =this.getQueryWrapper(params,TestStudentxEntity.class);
		IPage<TestStudentxEntity> pageData = testStudentxDao.selectPage(page, queryWrapper);
		pageData= ConvertDictUtils.formatDicDataPage(pageData);
		return pageData;
	}
    /**
	 * TestStudentx数据列表
	 * @param params
	 * @return
	 */
	@Override
	public List<TestStudentxEntity> list(Map<String, Object> params) {
		QueryWrapper<TestStudentxEntity> queryWrapper = this.getQueryWrapper(params,TestStudentxEntity.class);
		List<TestStudentxEntity> entityList = testStudentxDao.selectList(queryWrapper);
		entityList=ConvertDictUtils.formatDicDataList(entityList);
		return entityList;
	}

	@Override
	public TestStudentxEntity get(String id) {
		TestStudentxEntity entity = testStudentxDao.selectById(id);
		// 如无需代码翻译请屏蔽这句话 提高速度
		entity=ConvertDictUtils.formatDicData(entity);
		return entity;
	}
    /**
	 * TestStudentx保存
	 * createDate creator
	 * updateDate updater 
	 * 字段会自动注入值 如不需要注入请修改TestStudentxEntity
	 * @param entity
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void save(TestStudentxEntity entity) {
		testStudentxDao.insert(entity);
	}


	@Override
	@Transactional(rollbackFor = Exception.class)
	public void update(TestStudentxEntity entity) {
		testStudentxDao.updateById(entity);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void delete(String[] ids) {
	    List<String> idArray=Arrays.asList(ids);
		testStudentxDao.deleteBatchIds(idArray);
	}
	@Override
	public void exportXls(Map<String, Object> params , HttpServletResponse response)  {
		List<TestStudentxEntity> list = this.list(params);
		ExcelUtils.exportExcelToTarget(response, "学生表2导出列表", list, TestStudentxEntity.class);
	}
	
}