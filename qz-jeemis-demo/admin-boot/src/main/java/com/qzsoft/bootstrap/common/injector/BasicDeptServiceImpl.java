package com.qzsoft.bootstrap.common.injector;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.qzsoft.jeemis.common.utils.ConvertUtils;
import com.qzsoft.jeemis.platform.dept.dto.BasicDeptDTO;
import com.qzsoft.jeemis.platform.dept.service.IBasicDeptService;
import com.qzsoft.system.repository.sys.dao.SysDeptDao;
import com.qzsoft.system.repository.sys.entity.SysDeptEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 必须要注入的机构服务类
 * 因为不能保证所有的系统的机构表一致
 * 例如一般采用 sys_dept
 * 在人事系统 是b001
 * @author sdmq
 */
@Service
public class BasicDeptServiceImpl implements IBasicDeptService {
	@Autowired
	SysDeptDao sysDeptDao;

	@Override
	public BasicDeptDTO getDeptByPkId(String pkId) {
	  SysDeptEntity sysDeptEntity= sysDeptDao.selectById(pkId);
	  return ConvertUtils.sourceToTarget(sysDeptEntity,BasicDeptDTO.class);
	}

	@Override
	public BasicDeptDTO getDeptById(String id) {
		QueryWrapper<SysDeptEntity> queryWrapper=new QueryWrapper<>();
		queryWrapper.eq("id",id);
		SysDeptEntity sysDeptEntity= sysDeptDao.selectOne(queryWrapper);
		return ConvertUtils.sourceToTarget(sysDeptEntity,BasicDeptDTO.class);
	}

	@Override
	public String getDeptNameByPkId(String pkId) {
		QueryWrapper<SysDeptEntity> queryWrapper=new QueryWrapper<>();
		queryWrapper.eq("pkid",pkId).select("name");
		SysDeptEntity sysDeptEntity= sysDeptDao.selectOne(queryWrapper);
		return sysDeptEntity.getName();
	}

	@Override
	public String getDeptNameById(String id) {
		QueryWrapper<SysDeptEntity> queryWrapper=new QueryWrapper<>();
		queryWrapper.eq("id",id).select("name");
		SysDeptEntity sysDeptEntity= sysDeptDao.selectOne(queryWrapper);
		if (sysDeptEntity==null) {return "";}
		return sysDeptEntity.getName();
	}

	@Override
	public String getDeptIdByPkId(String pkId) {
		QueryWrapper<SysDeptEntity> queryWrapper=new QueryWrapper<>();
		queryWrapper.eq("pkid",pkId).select("id");
		SysDeptEntity sysDeptEntity= sysDeptDao.selectOne(queryWrapper);
		return sysDeptEntity.getId();
	}
}
