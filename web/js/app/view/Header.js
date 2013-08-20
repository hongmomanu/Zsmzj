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
        Ext.applyIf(this, {
            //html: '舟山市社会救助管理平台'
            xtype:'panel',
            frame : false,
            baseCls: 'main-header-all',
            layout: 'column',
            border:0,
            height:91,
            defaults:{
                //columnWidth:0.5
                //,layout:'anchor'
                border:0
            },
            items: [
                {
                    html: '<div class="header-left-div"><ul><a>舟山市社会救助管理综合平台</a></ul><ul>' +
                        '<li ><a>在线人数:'+onlinenums+'</a></li><li><a>未读信息:0</a></li>' +
                        '<li><a>待办事务:0</a></li><li><a href="logout">退出</a></li></ul></div>',
                    border: 0,
                    baseCls: 'main-header',
                    columnWidth: 0.4

                },
                {

                    columnWidth: 0.6,
                    baseCls: 'main-header',
                    border: false,
                    xtype:'headviewpanel'
                    //html: "test"

                }
            ]

        });

        this.callParent(arguments);
    }
});
