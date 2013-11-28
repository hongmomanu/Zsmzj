/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.temporaryhelp.businessApply', {
    extend : 'Ext.form.Panel',
    alias : 'widget.temporaryhelpbusinessapplyform',
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
                labelWidth: 80,
                msgTarget: 'side'
            },
            autoScroll: true,
            items:[],
            buttons:[
                {
                    text: '保存',
                    action:'applysubmit'
                }
            ]

            });
        this.callParent(arguments);
    }

});