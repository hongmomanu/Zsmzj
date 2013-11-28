/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.propertycheck.familyinfoCheck', {
    extend : 'Ext.form.Panel',
    alias : 'widget.propertycheckfamilyinfocheck',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('initformaftershow',this);
            this.fireEvent('test',this);
            this.fireEvent('alterapplyaftershow',this);
        }
    },
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';

        Ext.apply(this, {
            bodyPadding: 10,
            cls: 'shadowdiv',
            buttonAlign : 'center',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 100,
                msgTarget: 'side'
            },
            autoScroll: true,
            items:[

            ],
            buttons:[


                {
                    text: propertyCheckRoleBtn[0].name,
                    namevalue:propertyCheckRoleBtn[0].name,
                    hidden:!true,
                    itemId:'propertycheckbtn',
                    action:'checkbusiness'
                },
                {
                    text: '返回',
                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")})?CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:this.objdata.record.get("processstatus")}).children:null,
                        {name:"name",value:"返回"}),
                    action:'cancel'
                }
            ]

        });
        this.callParent(arguments);
    }

});