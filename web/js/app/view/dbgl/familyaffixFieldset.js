/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.familyaffixFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglfamilyaffixfieldset',
    requires: [


    ],
    listeners:{
        beforerender:function(c){

            var currentxtype=c.up('form').xtype;
            if(currentxtype.indexOf('studyhelp')==0||currentxtype.indexOf('medicalhelp')==0){
                c.removeAll();
                if(currentxtype.indexOf('studyhelp')==0){
                    c.add(c.studyhelp)
                }else if(currentxtype.indexOf('medicalhelp')==0){
                    c.add(c.medicalhelp)
                }
            }
        }

    },
    initComponent: function() {
        var me=this;
        mynewFS=me;
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                title: '<a>电子附件信息</a>',
                cls:'fieldset-border',
                collapsible: true,
                collapsed:true,
                defaultType: 'label',
                bodyStyle: 'padding:5px 5px 5px 5px',
                layout: {
                    type: 'table',
                    // The total column count must be specified here
                    columns: 2,
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
                itemId: 'affixfilespanel',
                studyhelp:[
                    {
                        xtype:'container',
                        border:0,

                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '<a>【申请人】身份证(0)<a>',

                                cls:'mouseover',
                                type:'personid',
                                itemId:'personid',
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);

                                    }

                                }
                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】户口本(0)<a>',
                                cls:'mouseover',
                                type:'accountbook',
                                itemId:'accountbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】学生证或在读证明(0)<a>',
                                cls:'mouseover',
                                type:'studentbook',
                                itemId:'studentbook',
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】困难证明件(0)<a>',
                                cls:'mouseover',
                                type:'studyhelpdifficultbook',
                                itemId:'studyhelpdifficultbook',
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】录取通知书(0) <a>',
                                cls:'mouseover',
                                type:'letterofadmission',
                                itemId:'letterofadmission',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】其他(0) <a>',
                                cls:'mouseover',
                                type:'familyotherbook',
                                itemId:'familyotherbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    }
                ],
                medicalhelp:[
                    {
                        xtype:'container',
                        border:0,

                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: ' 【申请人】身份证(0)',

                                cls:'mouseover',
                                type:'personid',
                                itemId:'personid',
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }
                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】户口本(0)<a>',
                                cls:'mouseover',
                                type:'accountbook',
                                itemId:'accountbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】发票或结算单(0)<a>',
                                cls:'mouseover',
                                type:'Invoiceorstatement',
                                itemId:'Invoiceorstatement',
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】医疗救助申请对象民主评议表(0) <a>',
                                cls:'mouseover',
                                type:'limitlifetable',
                                itemId:'limitlifetable',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】困难证明件(0)<a>',
                                cls:'mouseover',
                                type:'studyhelpdifficultbook',
                                itemId:'studyhelpdifficultbook',
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】疾病症断书(0) <a>',
                                cls:'mouseover',
                                type:'diseaseoffbook',
                                itemId:'diseaseoffbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】申请报告(0) <a>',
                                cls:'mouseover',
                                type:'applicationreport',
                                itemId:'applicationreport',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】其他(0) <a>',
                                cls:'mouseover',
                                type:'familyotherbook',
                                itemId:'familyotherbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    }
                ],
                items:[

                    {
                        xtype:'container',
                        border:0,

                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: ' 【申请人】身份证(0)',

                                cls:'mouseover',
                                type:'personid',
                                itemId:'personid',
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }
                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】户口本(0)<a>',
                                cls:'mouseover',
                                type:'accountbook',
                                itemId:'accountbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】残疾证(0)<a>',
                                cls:'mouseover',
                                type:'disabilitybook',
                                itemId:'disabilitybook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },
                    {

                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】疾病诊断书(0)<a>',
                                cls:'mouseover',
                                type:'illbook',
                                itemId:'illbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]



                    },
                    {

                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a >【申请人】婚姻状况证明(0)<a>',
                                cls:'mouseover',
                                type:'marrybook',
                                itemId:'marrybook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]



                    },
                    {

                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】房产证明(0) <a>',
                                cls:'mouseover',
                                type:'housebook',
                                itemId:'housebook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】经济收入证明(0)  <a>',
                                cls:'mouseover',
                                type:'incomebook',
                                itemId:'incomebook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】最低生活保障申请对象民主评议表(0)<a>',
                                cls:'mouseover',
                                type:'limitlifetable',
                                itemId:'limitlifetable',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);

                                    },
                                    beforerender:function(c){
                                        var o=me.containUncommonTable(me.up('form').xtype);
                                        if(o){
                                            c.html= o[c.type]
                                        }
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】申请报告(0)<a>',
                                cls:'mouseover',
                                type:'applybook',
                                itemId:'applybook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】 签署“协议书”并盖章(0)<a>',
                                cls:'mouseover',
                                type:'agreementbook',
                                itemId:'agreementbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】最低生活保障申请审批表(0)<a>',
                                cls:'mouseover',
                                type:'limitlifeapprovaltable',
                                itemId:'limitlifeapprovaltable',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    },
                                    beforerender:function(c){
                                        var o=me.containUncommonTable(me.up('form').xtype);
                                        if(o){
                                            c.html= o[c.type]
                                        }
                                    }

                                }

                            }
                        ]

                    },
                    {
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】家庭财产证明(0) <a>',
                                cls:'mouseover',
                                type:'familypropertybook',
                                itemId:'familypropertybook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】公告和评议表(0) <a>',
                                cls:'mouseover',
                                type:'familynoticeandcommentbook',
                                itemId:'familynoticeandcommentbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    },{
                        xtype:'container',
                        border:0,
                        defaults:{
                            border:0
                        },
                        items:[
                            {
                                html: '  <a>【申请人】其他(0) <a>',
                                cls:'mouseover',
                                type:'familyotherbook',
                                itemId:'familyotherbook',
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                    }

                                }

                            }
                        ]


                    }
                ]
            }
        );

        this.callParent(arguments);

    },
    uncommonTable:[

        {xtype:'temporaryhelp',
            value:{limitlifetable:'【申请人】临时救助申请对象民主评议表(0)',limitlifeapprovaltable:'【申请人】临时救助申请审批表(0)'}},
        {xtype:'charitablehelp',
            value:{limitlifetable:'【申请人】慈善救助申请对象民主评议表(0)',limitlifeapprovaltable:'【申请人】慈善救助申请审批表(0)'}},
        {xtype:'disasterhelpcalamity',
            value:{limitlifetable:'【申请人】灾害救助申请对象民主评议表(0)',limitlifeapprovaltable:'【申请人】灾害救助申请审批表(0)'}},
        {xtype:'rangershelp',
            value:{limitlifetable:'【申请人】流浪救助申请对象民主评议表(0)',limitlifeapprovaltable:'【申请人】流浪救助申请审批表(0)'}}
    ],
    containUncommonTable:function(xtype){
        if(!xtype){
            return;
        }
        var len=this.uncommonTable.length;
        for(var i=0;i<len;i++){
            if(xtype.indexOf(this.uncommonTable[i].xtype)==0){
                return this.uncommonTable[i].value;
            }
        }
    }

});
