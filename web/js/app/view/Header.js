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
                    /*html: '<div class="header-left-div"><ul><a>舟山市社会救助管理综合平台</a></ul><ul>' +
                        '<li ><a>在线人数:'+onlinenums+'</a></li><li><a>未读信息:0</a></li>' +
                        '<li><a>待办事务:0</a></li><li><a href="logout">退出</a></li></ul></div>',*/
                    xtype:'panel',
                    bodyPadding: 10,
                    items:[
                        {
                            xtype:'panel',
                            baseCls: 'main-header',
                            border:0,

                            defaults:{
                                border:0
                            },
                            items:[
                                {
                                    html: '  <a>舟山市社会救助管理综合平台<a>',
                                    baseCls: 'main-header',
                                    //cls:'mouseover',
                                    //type:'needthings',
                                    listeners: {
                                        /*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*/
                                        /*render: function(c){
                                            alert(2);
                                            c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                        }*/

                                    }
                                }
                            ]

                        },
                        {
                            xtype:'panel',
                            baseCls: 'main-header',
                            layout:'column',
                            width:300,
                            border:0,

                            defaults:{
                                border:0
                            },
                            items:[
                                {
                                    html: '  <a>在线人数:'+onlinenums+'<a>',
                                    baseCls: 'main-header',
                                    columnWidth:.3,
                                    cls:'mouseover',
                                    //type:'needthings',
                                    listeners: {

                                        /*render: function(c){
                                         alert(2);
                                         c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                         }*/

                                    }
                                },
                                {
                                    html: '待办事务:(0)',
                                    baseCls: 'main-header',
                                    columnWidth:.3,
                                    itemId: 'needtodopanel',
                                    cls:'mouseover',
                                    //type:'needthings',
                                    listeners: {

                                        render: function(c){
                                         c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                         }

                                    }
                                },
                                {
                                    columnWidth:.3,
                                    html: '  <a href="logout">退出<a>',
                                    baseCls: 'main-header',
                                    //cls:'mouseover',
                                    //type:'needthings',
                                    listeners: {
                                        /*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*/
                                        /*render: function(c){
                                         alert(2);
                                         c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                         }*/

                                    }
                                }
                            ]

                        }
                    ],
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
