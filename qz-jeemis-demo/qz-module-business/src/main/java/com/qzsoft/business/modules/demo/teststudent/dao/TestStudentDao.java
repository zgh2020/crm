package com.qzsoft.business.modules.demo.teststudent.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qzsoft.business.modules.demo.teststudent.entity.TestStudentEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 学生表(TestStudent)表数据库访问层
 *
 * @author sdmq
 * @since 2019-10-09 13:39:14
 */
@Mapper
public interface TestStudentDao extends BaseMapper<TestStudentEntity> {

}