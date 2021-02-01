package com.qzsoft.business.modules.demo.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qzsoft.business.modules.demo.entity.TbNewsEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 新闻管理(TbNews)表数据库访问层
 *
 * @author sdmq
 * @since 2019-09-26 21:01:44
 */
@Mapper
public interface TbNewsDao extends BaseMapper<TbNewsEntity> {

}