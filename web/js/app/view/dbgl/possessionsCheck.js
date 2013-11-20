/**
 * Created with IntelliJ IDEA.
 * User: weipan
 * Date: 13-11-18
 * Time: 上午11:27
 * possessionsCheck:家庭总和财产核定表单
 */

Ext.define('ZSMZJ.view.dbgl.possessionsCheck', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dbglpossessionscheckform',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('initformaftershow',this);
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
                /*{
                    html:'xxxxxxxx'
                }*/
            ],
            buttons:[
                {
                    text: '确认核定',
                    action:'applycheck'
                }
            ]

        });
        this.callParent(arguments);
    }

});