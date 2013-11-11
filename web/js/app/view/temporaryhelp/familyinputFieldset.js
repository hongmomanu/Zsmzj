/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-7
 * Time: 下午14:26
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.temporaryhelp.familyinputFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.temporaryhelpfamilyinputfieldset',
    requires: [],

    initComponent: function () {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            xtype: 'fieldset',
            title: '<a>家庭收入信息</a>',
            cls:'fieldset-border',
            defaultType: 'textfield',
            bodyStyle: 'padding:5px 5px 5px 5px',
            //layout: 'anchor',
            layout: {
                type: 'table',

                // The total column count must be specified here
                columns: 3,
                tableAttrs: {
                    border: 1,
                    cellpadding: 5,
                    cellspacing: 1,
                    width: '100%',
                    align: 'center',
                    style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                    /*style: {
                     width: '100%'
                     }*/
                }
            },
            items:[
                {
                    name: 'interest',
                    fieldLabel: '利息、股息、红利',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                }
                ,{
                    name: 'wages',
                    fieldLabel: '工资、薪金',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'planting',
                    fieldLabel: '种植、养殖、捕捞',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'pension',
                    fieldLabel: '离退休金、养老保险等',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'management',
                    fieldLabel: '承包经营',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'alimony',
                    fieldLabel: '赡（抚、扶）养费',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'incidentalincome',
                    fieldLabel: '赔偿、继承、赠与、偶然所得',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'remuneration',
                    fieldLabel: '劳务报酬',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'allowance',
                    fieldLabel: '各类生活补助',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'paidservices',
                    fieldLabel: '生产经营、有偿服务',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'propertylease',
                    fieldLabel: '财产租赁、转让',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'otherincome',
                    fieldLabel: '其他',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                }

            ]
        });

        this.callParent(arguments);
    }
})