/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-28
 * Time: 上午9:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.disaster.calamityBusinessCheck', {
    extend : 'Ext.form.Panel',
    alias : 'widget.disasterhelpcalamitybusinesscheckform',
    requires: [


    ],
    listeners: {
        show: function(panel) {
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
                    text: '审核',
                    action:'check'
                },
                {
                    text: '取消',
                    action:'cancel'
                },
                {
                    text: '查看流程',
                    action:'showprocess'
                }
            ]

        });
        this.callParent(arguments);
    }

});