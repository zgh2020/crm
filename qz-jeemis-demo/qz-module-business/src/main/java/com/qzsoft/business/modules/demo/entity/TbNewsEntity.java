package com.qzsoft.business.modules.demo.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.qzsoft.jeemis.common.validator.group.DefaultGroup;
import com.qzsoft.jeemis.common.validator.group.UpdateGroup;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;


/**
 * 新闻管理(TbNews)表实体类
 *
 * @author sdmq
 * @since 2019-09-26 21:01:43
 */
@ApiModel(value = "新闻管理")
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("tb_news")
public class TbNewsEntity extends Model<TbNewsEntity> {
	private static final long serialVersionUID = -52658500309945604L;
	/**
	 *id主键
	 */
	@TableId(value = "id", type = IdType.ASSIGN_ID) //主键ID_WORKER策略
	@NotNull(message = "{id.require}", groups = UpdateGroup.class)
	@Excel(name = "id主键")
	@ApiModelProperty(value = "id主键")
	private Long id;
	/**
	 *标题
	 */
	@NotNull(message = "标题不能为空", groups = DefaultGroup.class)
	@Excel(name = "标题")
	@ApiModelProperty(value = "标题")
	private String title;
	/**
	 *内容
	 */
	@NotNull(message = "内容不能为空", groups = DefaultGroup.class)
	@Excel(name = "内容")
	@ApiModelProperty(value = "内容")
	private String content;
	/**
	 *发布时间
	 */
	@Excel(name = "发布时间")
	@ApiModelProperty(value = "发布时间")
	private Date pubDate;
	/**
	 *创建者dept_id
	 */
	@Excel(name = "创建机构")
	@ApiModelProperty(value = "创建机构")
	@TableField(fill = FieldFill.INSERT)
	private String deptId;
	/**
	 *创建者
	 */
	@Excel(name = "创建者")
	@TableField(fill = FieldFill.INSERT)
	@ApiModelProperty(value = "创建者")
	private Long creator;
	/**
	 *创建时间
	 */
	@Excel(name = "创建时间")
	@TableField(fill = FieldFill.INSERT)
	@ApiModelProperty(value = "创建时间")
	private Date createDate;
	/**
	 *更新者
	 */
	@Excel(name = "更新者")
	@TableField(fill = FieldFill.UPDATE)
	@ApiModelProperty(value = "更新者")
	private Long updater;
	/**
	 *更新时间
	 */
	@Excel(name = "更新时间")
	@TableField(fill = FieldFill.UPDATE)
	@ApiModelProperty(value = "更新时间")
	private Date updateDate;

	/**
	 * 获取主键值
	 *
	 * @return 主键值
	 */
	@Override
	protected Serializable pkVal() {
		return this.id;
	}
}