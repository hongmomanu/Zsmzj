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


                /*{
                    text: this.objdata.record.get("checkitem"),
                    namevalue:this.objdata.record.get("checkitem"),
                    hidden:1==this.objdata.record.get("checkresult"),
                    //itemId:'propertycheckbtn',
                    action:'checkbusiness'
                },*/{
                    text: '核定收入',
                    namevalue:'核定收入',
                    hidden:!(1!=this.objdata.record.get("checkresult")&&this.objdata.record.get("checkitem")=='核定收入'),
                    action:'checkbusiness'
                },{
                    text: '核定住房',
                    namevalue:'核定住房',
                    hidden:!(1!=this.objdata.record.get("checkresult")&&this.objdata.record.get("checkitem")=='核定住房'),
                    action:'checkbusiness'
                },{
                    text: '核定现有资产',
                    namevalue:'核定现有资产',
                    hidden:!(1!=this.objdata.record.get("checkresult")&&this.objdata.record.get("checkitem")=='核定现有资产'),
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
    },
    findCheckRoleName:function(a,name){
        for(var i=0;i< a.length;i++){
            if(a[i].name==name){
                return true;
            }
        }
        return false;
    }

});