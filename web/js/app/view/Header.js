/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('ZSMZJ.view.Header', {
    extend: 'Ext.Panel',

    dock: 'top',
    baseCls: 'main-header-all',
    alias : 'widget.myheader',

    requires: [
        'Ext.data.*',
        'Ext.util.*',
        'Ext.view.View'

    ],


    initComponent: function() {
        var zsj='舟山市';
        var localdivisionpath=divisionpath;
        if(divisionpath.indexOf(zsj)==0&&divisionpath!=zsj){
            localdivisionpath=divisionpath.substring(zsj.length);
        }

        Ext.applyIf(this, {
            frame : false,
            border:0,
            collapsible: true,
            collapsed: false,
            height:90,
            defaults:{
                border:0
            },
            items: [
                {
                    baseCls: 'main-header',
                    xtype:'headviewpanel'

                }
,
            ]

        });

        this.callParent(arguments);
    }
});
