package com.qzsoft.business.modules.demo.teststudent.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.qzsoft.business.modules.demo.teststudent.dao.TestStudentDao;
import com.qzsoft.business.modules.demo.teststudent.entity.TestStudentEntity;
import com.qzsoft.business.modules.demo.teststudent.service.TestStudentService;
import com.qzsoft.jeemis.common.constant.Constant;
import com.qzsoft.jeemis.common.service.BaseService;
import com.qzsoft.jeemis.common.utils.ConvertDictUtils;
import com.qzsoft.jeemis.common.utils.ExcelUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * 学生表(TestStudent)表服务实现类
 *
 * @author sdmq
 * @since 2019-10-11 09:48:11
 */
@Service("testStudentService")
public class TestStudentServiceImpl extends BaseService implements TestStudentService {
    private final SqlSession sqlSession;
    @Autowired
	private TestStudentDao testStudentDao;
   
	public TestStudentServiceImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	/**
	 * TestStudent数据分页
	 * @param params
	 * @return IPage
	 */
	@Override
	public IPage<TestStudentEntity> page(Map<String, Object> params) {
		IPage<TestStudentEntity> page =this.getPage(params,Constant.CREATE_DATE,false,TestStudentEntity.class) ;
		QueryWrapper<TestStudentEntity> queryWrapper =this.getQueryWrapper(params,TestStudentEntity.class);
		IPage<TestStudentEntity> pageData = testStudentDao.selectPage(page, queryWrapper);
		pageData= ConvertDictUtils.formatDicDataPage(pageData);
		return pageData;
	}
    /**
	 * TestStudent数据列表
	 * @param params
	 * @return
	 */
	@Override
	public List<TestStudentEntity> list(Map<String, Object> params) {
		QueryWrapper<TestStudentEntity> queryWrapper = this.getQueryWrapper(params,TestStudentEntity.class);
		List<TestStudentEntity> entityList = testStudentDao.selectList(queryWrapper);
		entityList=ConvertDictUtils.formatDicDataList(entityList);
		return entityList;
	}

	@Override
	public TestStudentEntity get(Integer id) {
		TestStudentEntity entity = testStudentDao.selectById(id);
		// 如无需代码翻译请屏蔽这句话 提高速度
		entity=ConvertDictUtils.formatDicData(entity);
		return entity;
	}
    /**
	 * TestStudent保存
	 * createDate creator
	 * updateDate updater 
	 * 字段会自动注入值 如不需要注入请修改TestStudentEntity
	 * @param entity
	 */
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void save(TestStudentEntity entity) {
		testStudentDao.insert(entity);
	}


	@Override
	@Transactional(rollbackFor = Exception.class)
	public void update(TestStudentEntity entity) {
		testStudentDao.updateById(entity);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void delete(String[] ids) {
		List<Integer> idArray=new ArrayList<>(ids.length);
		for(String id : ids){
			idArray.add(Integer.valueOf(id));
		}
		testStudentDao.deleteBatchIds(idArray);
	}
	@Override
	public void exportXls(Map<String, Object> params , HttpServletResponse response)  {
		List<TestStudentEntity> list = this.list(params);
		ExcelUtils.exportExcelToTarget(response, "学生表导出列表", list, TestStudentEntity.class);
	}
	
}