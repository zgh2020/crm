package com.qzsoft.business.modules.demo2.service;


import com.qzsoft.jeemis.common.service.BaseService;
import com.qzsoft.jeemis.repository.sqlmapper.SqlMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * 新闻管理(TbNews)表服务实现类
 *
 * @author sdmq
 * @since 2019-09-26 21:01:45
 */
@Service
public class Demo2Service extends BaseService {
    private final SqlSession sqlSession;
	public Demo2Service(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public  List<Map<String,Object>> getListUser(String deptId){
		SqlMapper sqlMapper=new SqlMapper(sqlSession);
		String strSql;
		strSql= "select * from sys_user where dept_id= #{0}";
		return  sqlMapper.selectListArgs(strSql,deptId);

	}
	
}