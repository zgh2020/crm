package com.qzsoft.business.modules.demo.teststudentx.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qzsoft.business.modules.demo.teststudentx.entity.TestStudentxEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 学生表2(TestStudentx)表数据库访问层
 *
 * @author sdmq
 * @since 2019-11-26 11:29:48
 */
@Mapper
public interface TestStudentxDao extends BaseMapper<TestStudentxEntity> {

}