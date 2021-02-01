package com.qzsoft.business.modules.demo.teststudentx.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.qzsoft.jeemis.common.annotation.Dict;
import com.qzsoft.jeemis.common.validator.group.DefaultGroup;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;


/**
 * 学生表2(TestStudentx)表实体类
 *
 * @author sdmq
 * @since 2019-10-25 19:23:55
 */
@ApiModel(value ="学生表2")
@Data
@EqualsAndHashCode(callSuper=false)
@TableName("test_studentx")
public class TestStudentxEntity extends Model<TestStudentxEntity> {
    private static final long serialVersionUID = -21105756172807790L;

   /**
    *主键主键
    */
    @TableId
    @NotNull(message="{id.require}", groups = DefaultGroup.class)
    @Excel(name = "主键主键")
    @ApiModelProperty(value = "主键主键")
    private String stdId;
   /**
    *姓名
    */
    @NotNull(message="姓名不能为空", groups = DefaultGroup.class)
    @Excel(name = "姓名")
    @ApiModelProperty(value = "姓名")
    private String name;
   /**
    *生日
    */
    @Excel(name = "生日" , format = "yyyy-mm-dd")
    @ApiModelProperty(value = "生日")
    private Date birthday;
   /**
    *性别
    */
    @Excel(name = "性别")
    @ApiModelProperty(value = "性别")
    private String sex;
    /**
    *性别代码描述
    */
    @Dict(dicCodeField ="sex",dictCodeId ="AX")
    @TableField(exist=false)
    @Excel(name = "性别")
    private String sexDesc;
   /**
    *地址
    */
    @Excel(name = "地址")
    @ApiModelProperty(value = "地址")
    private String address;
   /**
    *年龄
    */
    @Excel(name = "年龄")
    @ApiModelProperty(value = "年龄")
    private Integer age;

    /**
     * 获取主键值
     *
     * @return 主键值
     */
    @Override
    protected Serializable pkVal() {
        return this.stdId;
    }
}