/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbedge.familybasicFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbedgefamilybasicfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>【低保边缘户业务办理】家庭基本信息</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',

                //layout: 'anchor',
                layout: {
                    type: 'table',
                    tdAttrs:{style: "border:1px solid #2E2E2E;"},
                    // The total column count must be specified here
                    columns: 3,
                    tableAttrs: {
                        border: 1,
                        cellpadding: 5,
                        cellspacing: 0,
                        width: '100%',
                        align: 'center',
                        style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                        /*style: {
                         width: '100%'
                         }*/
                    }
                },

                items: [{
                    name: 'division',
                    itemId:'divisiontype',

                    fieldLabel: '行政区划',
                    //width:300,
                    //id:'testobjcomb',
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

                        xtype:'panel',
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
                        searchtype:"dbedgeapplytype",
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        blankText: '请输入申请类别',
                        afterLabelTextTpl: required,
                        allowBlank: false
                        /*name: 'applytype',
                         afterLabelTextTpl: required,
                         fieldLabel: '申请类别',
                         emptyText: '请输入申请类别',
                         blankText: '请输入申请类别',
                         allowBlank: false*/
                    },{
                        xtype:'dbglaplytype',
                        name: 'familytype',
                        searchtype:"dbedgefamilytype",
                        fieldLabel: '家庭类别',
                        afterLabelTextTpl: required,
                        emptyText: '请输入家庭类别',
                        blankText: '请输入家庭类别',
                        allowBlank: false
                    }
                    ,{
                        name: 'owername',
                        itemId:'owername',
                        fieldLabel: '户主姓名',
                        afterLabelTextTpl: required,
                        listeners: {

                            "blur":function(field,e){
                                var name = field.getRawValue().replace(/\s+/g, "");
                                this.fireEvent('owerchange', field);

                            }
                        },
                        blankText: '请输入户主姓名',
                        emptyText: '请输入户主姓名',
                        allowBlank: false
                    },{
                        name: 'owerid',
                        itemId:'owerid',
                        vtype:'personid',
                        fieldLabel: '户主身份证',
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
                    },{
                        xtype:'dbglaplytype',
                        searchtype:"dbedgepoorfamilytype",
                        name: 'poorfamilytype',
                        fieldLabel: '致贫原因',
                        afterLabelTextTpl: required,
                        blankText: '致贫原因',
                        emptyText: '致贫原因',
                        allowBlank: false
                    },{
                        xtype:'dbglaplytype',
                        searchtype:"dbglfamilyaccount",
                        afterLabelTextTpl: required,
                        name: 'familyaccount',
                        fieldLabel: '家庭户口',
                        blankText: '请选择家庭户口',
                        emptyText: '请选择家庭户口',
                        allowBlank: false
                    }
                    ,{
                        name: 'accountaddress',
                        fieldLabel: '户口所在地',
                        colspan:2,
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
                        colspan:2,
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
                        //name: 'households',
                        name: 'familynum',
                        fieldLabel: '家庭总人口',
                        afterLabelTextTpl: required,
                        blankText:'家庭总人口',
                        value:0,
                        readOnly:true,
                        //disabled:true,
                        //emptyText: '低保户类型',
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
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
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
                    }
                ]

            }
        );
        this.callParent(arguments);

    }

});
