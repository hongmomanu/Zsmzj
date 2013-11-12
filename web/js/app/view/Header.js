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
            collapsible: true,
            collapsed: false,
            height:91,
            defaults:{
                //columnWidth:0.5
                //,layout:'anchor'
                border:0
            },
            items: [
                {

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
                            items:[]

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
                            items:[]

                        }
                    ],
                    border: 0,
                    baseCls: 'main-header',
                    columnWidth: 0.1

                },
                {

                    /*
                     columnWidth: 0.6,
                     baseCls: 'main-header',
                     border: false,
                     xtype:'headviewpanel'*/
                    //html: "test"
                    xtype:'panel',
                    baseCls: 'main-header',
                    layout:'column',
                    width:300,
                    border:0,
                    columnWidth: 0.9,
                    defaults:{
                        border:0
                    },
                    items:[

                        /*{
                            columnWidth: 0.3,
                            baseCls: 'main-header',
                            border: false,
                            xtype:'headviewpanel'

                        },*/
                        {
                            columnWidth: 0.8,
                            xtype:'panel',
                            border: false,
                            baseCls: 'main-header',
                            items:[
                                {
                                    xtype:'panel',
                                    bodyPadding: 35,//三个菜单上的方块区域
                                    baseCls: 'main-header'
                                },
                                {               //三个显示菜单
                                    //columnWidth: 0.4,
                                    xtype:'panel',
                                    baseCls: 'main-header',

                                    layout: {
                                        type: 'vbox',
                                        // The total column count must be specified here
                                        align:'right'
                                    },
                                    defaults: {
                                        // applied to each contained panel
                                        bodyStyle: ''
                                    },
                                    items:[
                                        {
                                            xtype:'panel',
                                            layout:'table',
                                            baseCls: 'main-header',
                                            wdith:'500',
                                            items:[
                                                {
                                                    html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
                                                        '<img src="img/head/1.png">&nbsp;<a>欢迎您：&nbsp;'+
                                                        displayname+'&nbsp;('+divisionpath+')</a><span style="width:5px;"></span>',
                                                    baseCls: 'main-header'
                                                },{
                                                    baseCls: 'main-header',
                                                    html:'&nbsp;&nbsp;<img src="img/head/2.png">&nbsp;'

                                                },
                                                {
                                                    html: '待办事务:(1)',
                                                    baseCls: 'main-header',
                                                    itemId: 'needtodopanel',
                                                    cls:'mouseover',
                                                    //type:'needthings',
                                                    listeners: {

                                                        render: function(c){
                                                            c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                                        }

                                                    }
                                                },{
                                                    html: '<span style="width:10px;"></span><img src="img/head/4.png">&nbsp;',
                                                    baseCls: 'main-header'
                                                },
                                                {
                                                    html: '  <a>在线人数:'+onlinenums+'</a>',
                                                    baseCls: 'main-header',
                                                    cls:'mouseover',
                                                    //type:'needthings',
                                                    listeners: {

                                                        /*render: function(c){
                                                         alert(2);
                                                         c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                                                         }*/

                                                    }
                                                },{
                                                    baseCls: 'main-header',
                                                    html:'&nbsp;&nbsp;<img src="img/head/5.png">&nbsp;'
                                                },{
                                                    html: '重设密码',
                                                    baseCls: 'main-header',
                                                    cls:'mouseover',
                                                    //type:'needthings',
                                                    listeners: {
                                                        render: function(c){
                                                            c.getEl().on('click', function(){ this.fireEvent('showalterpwd', c); }, c);
                                                        }

                                                    }
                                                },
                                                {
                                                    baseCls: 'main-header',
                                                    html:'<span style="width:20px;">&nbsp;</span><img src="img/head/7.png">&nbsp;'
                                                },
                                                {
                                                    html: '<a href="logout">退出<a>',
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
                                                },{
                                                    baseCls: 'main-header',
                                                    html:'&nbsp;&nbsp;'
                                                }
                                            ]
                                        }
                                    ]


                                }

                            ]
                        },
                        {
                            columnWidth: 0.2,
                            baseCls: 'main-header',
                            border: false,
                            xtype:'headviewpanel'

                        }


                    ]

                }
            ]

        });

        this.callParent(arguments);
    }
});
