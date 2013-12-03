/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.familybasicFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglfamilybasicfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                title: '<a>【低保业务办理】家庭基本信息</a>',
                defaultType: 'textfield',
                cls:'fieldset-border',
                //style:"border:0px solid gray;",
                layout: {
                    type: 'table',
                    columns: 3,
                    tdAttrs:{style: "border:1px solid #2E2E2E;"},
                    tableAttrs: {
                        border: 1,
                        cellpadding: 5,
                        cellspacing: 0,
                        width: '100%',
                        //align: 'center',
                        style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                        /*style: {
                         width: '100%'
                         }*/
                    }
                },

                items: [{
                    name: 'division',
                    fieldLabel: '行政区划',
                    itemId:'divisiontype',
                    xtype:'dbgldivsioncombtreepath',
                    allowBlank: false,
                    blankText: "不能为空",
                    displayField: 'text',
                    valueField:'id',
                    afterLabelTextTpl: required,
                    emptyText: '请输入行政区划',
                    blankText : '请输入行政区划',
                    colspan:2,//合并列
                    allowBlank: false
                },
                    {

                        xtype:'container',
                        border:0,

                        style: "text-align:center;",
                        rowspan:4,
                        items:[
                            {
                                xtype: 'component',
                                name:'accountimgpath',

                                value:"",
                                width:100,
                                height:110,
                                itemId:'dbglaccountimg',

                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('imgclick', c); }, c);
                                    }
                                },
                                autoEl: {
                                    tag: 'img',
                                    cls:'mouseover',
                                    src : "img/noperson.gif"
                                }
                            }
                        ]

                    }
                    ,{
                        xtype:'dbglaplytype',
                        name: 'applytype',
                        searchtype:"dbglapplytype",
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        blankText: '请输入申请类别',
                        afterLabelTextTpl: required,
                        allowBlank: false

                        /*name: 'applytype',
                         afterLabelTextTpl: required,
                         fieldLabel: '申请类别',
                         emptyText: '请输入申请类别',
                         blankText: '请输入申请类别',*/

                    },{
                        xtype:'dbglaplytype',
                        name: 'poortype',
                        searchtype:"dbglpoortype",
                        fieldLabel: '分类管理',
                        afterLabelTextTpl: required,
                        emptyText: '请输入家庭类别',
                        blankText: '请输入家庭类别',
                        allowBlank: false
                    }
                    ,{
                        name: 'owername',
                        itemId:'owername',
                        fieldLabel: '户主姓名',
                        listeners: {

                            "blur":function(field,e){
                                var name = field.getRawValue().replace(/\s+/g, "");
                                this.fireEvent('owerchange', field);

                            }
                        },

                        afterLabelTextTpl: required,
                        blankText: '请输入户主姓名',
                        emptyText: '请输入户主姓名',
                        allowBlank: false
                    },{
                        name: 'owerid',
                        itemId:'owerid',
                        fieldLabel: '户主身份证',
                        vtype:'personid',
                        listeners: {

                            "blur":function(field,e){
                                var name = field.getRawValue().replace(/\s+/g, "");
                                this.fireEvent('owerchange', field);

                            }
                        },
                        afterLabelTextTpl: required,
                        blankText: '请输入身份证号',
                        emptyText: '请输入身份证号',
                        allowBlank: false
                    },/*{
                     xtype:'dbglaplytype',
                     searchtype:"dbglpoorfamilytype",
                     name: 'poorfamilytype',
                     fieldLabel: '低保户类型',
                     afterLabelTextTpl: required,
                     blankText: '低保户类型',
                     emptyText: '低保户类型',
                     allowBlank: false
                     },*/
                    {
                        xtype:'panel',
                        layout: 'column',
                        border:0,
                        items:[
                            {
                                columnWidth: 0.8,
                                xtype:'dbglaplytype',
                                searchtype:"dbglfamilyaccount",
                                afterLabelTextTpl: required,
                                name: 'familyaccount',
                                itemId:'familyaccount',
                                fieldLabel: '家庭户口',
                                //colspan:2,
                                blankText: '请选择家庭户口',
                                emptyText: '请选择家庭户口',
                                allowBlank: false
                            },

                            {
                                columnWidth: 0.2,
                                submitValue:false,
                                hidden:!(divisionpath.indexOf(spatialchildTableType.shenshispatial)>=0),
                                listeners: {

                                    "change":function(field,e){
                                        this.fireEvent('moneychane', field);
                                    }
                                },
                                itemId:'isshanghai',
                                xtype:'checkboxfield',
                                value:false,
                                boxLabel  : '是否居住上海'
                            }

                        ]

                    }


                    ,{
                        name: 'accountaddress',
                        fieldLabel: '户主户口所在地',
                        //colspan:2,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'accountzipcode',
                        fieldLabel: '邮政编码',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'realaddress',
                        //colspan:2,
                        fieldLabel: '实际居住地',
                        allowBlank: true
                    },{
                        name: 'realzipcode',
                        fieldLabel: '邮政编码',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        itemId: 'FamilyPersons',
                        name: 'households',
                        fieldLabel: '家庭总人口',
                        afterLabelTextTpl: required,
                        blankText:'家庭总人口',
                        value:0,
                        disabled:true,
                        //emptyText: '低保户类型',
                        disabledCls:'yw-disabled-field-cls',

                        allowBlank: false
                    }
                    ,{
                        name: 'telnum',
                        fieldLabel: '联系电话',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        xtype:'dbglaplytype',
                        searchtype:"dbglbank",
                        name: 'bank',
                        fieldLabel: '开户银行',
                        afterLabelTextTpl: required,
                        emptyText: '请选择开户银行',
                        blankText:'开户银行',
                        allowBlank: false
                    }
                    ,{
                        name: 'bankower',
                        fieldLabel: '开户人',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'bankid',
                        fieldLabel: '银行账号',
                        colspan:2,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'otherfamilyinfo',
                        fieldLabel: '家庭备注',
                        colspan:3,
                        minWidth:300,
                        width:800,
                        //draggable :true,
                        //anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : false,

                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                ]

            }
        );
        this.callParent(arguments);

    }

});
