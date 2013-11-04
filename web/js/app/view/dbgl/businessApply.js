/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.dbgl.businessApply', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dbglbusinessapplyform',
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
            items: [
                /*{
                xtype: 'fieldset',
                title: '<a>【低保业务办理】家庭基本信息</a>',
                defaultType: 'textfield',

                //layout: 'anchor',
                layout: {
                    type: 'table',

                    // The total column count must be specified here
                    columns: 3,
                    tableAttrs: {
                        border: 1,
                        cellpadding: 5,
                        cellspacing: 1,
                        width: '100%',
                        //align: 'center',
                        style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                        *//*style: {
                            width: '100%'
                        }*//*
                    }
                },

                items: [{
                        name: 'division',
                        fieldLabel: '行政区划',
                        //width:300,
                        //id:'testobjcomb',
                        xtype:'dbgldivsioncombtreepath',
                        allowBlank: false,
                        blankText: "不能为空",
                        displayField: 'text',
                        valueField:'id',
                        afterLabelTextTpl: required,
                        emptyText: '请输入行政区划',
                        blankText : '请输入行政区划',
                        colspan:2,//合并列
                        allowBlank: false
                    },
                    {

                        xtype:'container',
                        border:0,

                        style: "text-align:center;",
                        rowspan:4,
                        items:[
                            {
                                xtype: 'component',
                                name:'accountimgpath',

                                value:"",
                                width:100,
                                height:110,
                                itemId:'dbglaccountimg',

                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){ this.fireEvent('imgclick', c); }, c);
                                    }
                                },
                                autoEl: {
                                    tag: 'img',
                                    cls:'mouseover',
                                    src : "img/noperson.gif"
                                }
                            }
                        ]

                    }
                    ,{
                        xtype:'dbglaplytype',
                        name: 'applytype',
                        searchtype:"dbglapplytype",
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        blankText: '请输入申请类别',
                        afterLabelTextTpl: required

                        *//*name: 'applytype',
                        afterLabelTextTpl: required,
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        blankText: '请输入申请类别',
                        allowBlank: false*//*
                    },{
                        xtype:'dbglaplytype',
                        name: 'poortype',
                        searchtype:"dbglpoortype",
                        fieldLabel: '分类管理',
                        afterLabelTextTpl: required,
                        emptyText: '请输入家庭类别',
                        blankText: '请输入家庭类别',
                        allowBlank: false
                    }
                    ,{
                        name: 'owername',
                        itemId:'owername',
                        fieldLabel: '户主姓名',
                        listeners: {

                            "blur":function(field,e){
                                var name = field.getRawValue().replace(/\s+/g, "");
                                this.fireEvent('owerchange', field);

                            }
                        },

                        afterLabelTextTpl: required,
                        blankText: '请输入户主姓名',
                        emptyText: '请输入户主姓名',
                        allowBlank: false
                    },{
                        name: 'owerid',
                        itemId:'owerid',
                        fieldLabel: '户主身份证',
                        vtype:'personid',
                        listeners: {

                            "blur":function(field,e){
                                var name = field.getRawValue().replace(/\s+/g, "");
                                this.fireEvent('owerchange', field);

                            }
                        },
                        afterLabelTextTpl: required,
                        blankText: '请输入身份证号',
                        emptyText: '请输入身份证号',
                        allowBlank: false
                    },*//*{
                        xtype:'dbglaplytype',
                        searchtype:"dbglpoorfamilytype",
                        name: 'poorfamilytype',
                        fieldLabel: '低保户类型',
                        afterLabelTextTpl: required,
                        blankText: '低保户类型',
                        emptyText: '低保户类型',
                        allowBlank: false
                    },*//*{
                        xtype:'dbglaplytype',
                        searchtype:"dbglfamilyaccount",
                        afterLabelTextTpl: required,
                        name: 'familyaccount',
                        fieldLabel: '家庭户口',
                        colspan:2,
                        blankText: '请选择家庭户口',
                        emptyText: '请选择家庭户口',
                        allowBlank: false
                    }
                    ,{
                        name: 'accountaddress',
                        fieldLabel: '户主户口所在地',
                        colspan:2,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'accountzipcode',
                        fieldLabel: '邮政编码',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'realaddress',
                        colspan:2,
                        fieldLabel: '实际居住地',
                        allowBlank: true
                    },{
                        name: 'realzipcode',
                        fieldLabel: '邮政编码',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        itemId: 'FamilyPersons',
                        name: 'households',
                        fieldLabel: '家庭总人口',
                        afterLabelTextTpl: required,
                        blankText:'家庭总人口',
                        value:0,
                        disabled:true,
                        //emptyText: '低保户类型',
                        allowBlank: false
                    }
                    ,{
                        name: 'telnum',
                        fieldLabel: '联系电话',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        xtype:'dbglaplytype',
                        searchtype:"dbglbank",
                        name: 'bank',
                        fieldLabel: '开户银行',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                    ,{
                        name: 'bankower',
                        fieldLabel: '开户人',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'bankid',
                        fieldLabel: '银行账号',
                        colspan:2,
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'otherfamilyinfo',
                        fieldLabel: '家庭备注',
                        colspan:3,
                        minWidth:600,
                        width:800,
                        //draggable :true,
                        anchor : '100%',
                        //width:800,
                        xtype : 'textarea',
                        grow : true,

                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                    ]

                },
                {
                    xtype: 'fieldset',
                    title: '<a>家庭房产信息</a>',
                    defaultType: 'textfield',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    //layout: 'anchor',
                    layout: {
                        type: 'table',

                        // The total column count must be specified here
                        columns: 3,
                        tableAttrs: {
                            border: 1,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },
                    items:[
                        {
                            xtype:'dbglaplytype',
                            searchtype:"dbglhouseproperties",
                            name: 'houseproperties',
                            fieldLabel: '住房性质',
                            listeners:{
                                scope: this,
                                'select': function (combo, records) {
                                    var value=combo.getValue();
                                    if(value==='自有'){
                                        combo.nextNode().setEditable(true)
                                    }
                                    else{
                                        combo.nextNode().setEditable(false);
                                    }

                                }
                            },
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            xtype:'dbglaplytype',
                            searchtype:"dbglhousestructure",
                            name: 'housestructure',
                            fieldLabel: '住房结构',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'housearea',
                            fieldLabel: '住房总建筑面积(㎡)',
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('houseareachane', field);
                                }
                            },
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'houseaveragearea',
                            fieldLabel: '住房人均建筑面积',

                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'houseusearea',
                            fieldLabel: '住房总使用面积(㎡)',
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('houseareachane', field);
                                }
                            },
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'houseaverageusearea',
                            fieldLabel: '住房人均使用面积',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }

                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<a>家庭收入信息</a>',
                    defaultType: 'textfield',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    //layout: 'anchor',
                    layout: {
                        type: 'table',

                        // The total column count must be specified here
                        columns: 3,
                        tableAttrs: {
                            border: 1,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },
                    items:[
                        {
                            name: 'interest',
                            value:0,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },

                            fieldLabel: '利息、股息、红利',
                            regex :/^-?\d+$/,

                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'wages',
                            value:0,
                            fieldLabel: '工资、薪金',
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regex :/^-?\d+$/,

                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'planting',
                            value:0,
                            fieldLabel: '种植、养殖、捕捞',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'pension',
                            value:0,
                            fieldLabel: '离退休金、养老保险等',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'management',
                            value:0,
                            fieldLabel: '承包经营',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'alimony',
                            value:0,
                            fieldLabel: '赡（抚、扶）养费',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'incidentalincome',
                            value:0,
                            fieldLabel: '赔偿、继承、赠与、偶然所得',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'remuneration',
                            fieldLabel: '劳务报酬',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'allowance',
                            fieldLabel: '各类生活补助',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'paidservices',
                            fieldLabel: '生产经营、有偿服务',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'propertylease',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            fieldLabel: '财产租赁、转让',
                            value:0,
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'otherincome',
                            fieldLabel: '其他',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            value:0,
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'incomesum',
                            value:0,
                            regex :/^-?\d+$/,

                            regexText  : "只能输入数值",
                            fieldLabel: '合计',
                            itemId:'incomesum',
                            allowBlank: true
                        },{
                            name: 'incomesumarea',
                            regex :/^-?\d+$/,

                            regexText  : "只能输入数值",
                            fieldLabel: '家庭上年度月平均现金收入',
                            itemId:'incomesumarea',
                            value:0,
                            allowBlank: true
                        },
                        {
                            name: 'incomesumareaperson',
                            regex :/^-?\d+$/,
                            itemId:'incomesumareaperson',

                            regexText  : "只能输入数值",
                            value:0,
                            fieldLabel: '家庭上年度月人平均现金收入',
                            itemId:'incomesumareaperson',
                            allowBlank: true
                        }

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    title: '<a>家庭闲置财产信息</a>',
                    defaultType: 'textfield',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    //layout: 'anchor',
                    layout: {
                        type: 'table',

                        // The total column count must be specified here
                        columns: 3,
                        tableAttrs: {
                            border: 1,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },
                    items:[
                        {
                            name: 'cash',
                            fieldLabel: '现金',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'banksecurities',
                            fieldLabel: '银行存款及有价证券',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            value:0,
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'debt',
                            fieldLabel: '债权',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'vehicle',
                            fieldLabel: '非生活机动车折价',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            allowBlank: true
                        },{
                            name: 'nonresidentialhouse',
                            fieldLabel: '闲置房产折价',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            allowBlank: true
                        },{
                            name: 'nolifeneededmachine',
                            fieldLabel: '非生活必须船只等机械类折价',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'insurance',
                            fieldLabel: '商业保险',
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            value:0,
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'registeredcapital',
                            fieldLabel: '工商注册资金（资本）',
                            value:0,
                            regex :/^-?\d+$/,
                            listeners: {

                                "blur":function(field,e){
                                    this.fireEvent('moneychane', field);
                                }
                            },
                            regexText  : "只能输入数值",
                            allowBlank: true
                        },{
                            name: 'propertysum',
                            itemId:'propertysum',
                            regex :/^-?\d+$/,

                            regexText  : "只能输入数值",
                            fieldLabel: '合计',
                            value:0,
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    title: '<a>家庭成员信息</a>',
                    defaultType: 'textfield',
                    bodyStyle: 'padding:5px 5px 5px 5px',
                    layout: 'fit',

                    items:[
                        *//* {
                         xtype:'panel',
                         layout: 'fit',
                         items:[*//*
                        {
                            xtype:'familymembergrid',
                            itemId:'familymembergrid'

                        }
                        *//* ]

                         }*//*

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    title: '<a>电子附件信息</a>',
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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },
                    itemId: 'affixfilespanel',
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
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
                                    html: '  <a>【申请人】家庭财产证明(0) <a>',
                                    cls:'mouseover',
                                    type:'familypropertybook',
                                    itemId:'familypropertybook',
                                    listeners: {
                                        *//*click: {
                                         element: 'el', //bind to the underlying el property on the panel
                                         fn: function(){ alert('click el'); }
                                         }*//*
                                        render: function(c){
                                            c.getEl().on('click', function(){ this.fireEvent('affixclick', c); }, c);
                                        }

                                    }

                                }
                            ]


                        }
                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    title: '<a>业务申请信息</a>',
                    defaultType: 'textfield',

                    //layout: 'anchor',
                    layout: {
                        type: 'table',

                        // The total column count must be specified here
                        columns: 3,
                        tableAttrs: {
                            border: 1,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },

                    items: [{
                        xtype:'dbglaplytype',
                        searchtype:"dbglicomemonth",
                        name: 'icomemonth',

                        fieldLabel: '现金收入累计月份',
                        afterLabelTextTpl: required,
                        emptyText: '请选择累计月份',
                        blankText : '请选择累计月份',
                        allowBlank: false
                    },
                    {
                        name: 'familyincome',
                        fieldLabel: '家庭总收入',
                        itemId:'familyincome',
                        afterLabelTextTpl: required,
                        value:0,
                        emptyText: '请输入家庭总收入',
                        blankText : '请输入家庭总收入',
                        allowBlank: false
                    }
                        ,
                        {
                            name: 'averageincome',
                            itemId:'averageincome',
                            fieldLabel: '月人均收入',
                            afterLabelTextTpl: required,
                            value:0,
                            emptyText: '请输入家庭总收入',
                            blankText : '请输入家庭总收入',
                            allowBlank: false
                        }
                        ,
                        {
                            name: 'applymoney',
                            fieldLabel: '申请救济金(元/月/人)',
                            afterLabelTextTpl: required,
                            value:0,
                            emptyText: '请输入家庭总收入',
                            blankText : '请输入家庭总收入',
                            allowBlank: false
                        }

                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<a>业务审批信息</a>',
                    defaultType: 'textfield',

                    //layout: 'anchor',
                    layout: {
                        type: 'table',

                        // The total column count must be specified here
                        columns: 3,
                        tableAttrs: {
                            border: 1,
                            cellpadding: 5,
                            cellspacing: 1,
                            width: '100%',
                            align: 'center',
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:left;"
                            *//*style: {
                             width: '100%'
                             }*//*
                        }
                    },

                    items: [
                        *//*{
                         xtype:'dbglaplytype',
                         searchtype:"dbglpoortype",
                         name: 'poortype',
                         fieldLabel: '分类管理',
                         afterLabelTextTpl: required,
                         emptyText: '请选择分类管理',
                         blankText : '请选择分类管理',
                         allowBlank: false
                         }*//**//*,
                         {
                         name: 'poorstandard',
                         fieldLabel: '低保标准(元)',
                         afterLabelTextTpl: required,
                         emptyText: '请输入低保标准',
                         blankText : '请输入低保标准',
                         allowBlank: false
                         }*//*
                         ,
                         {
                         name: 'aidnum',
                         fieldLabel: '救助证编号',
                         allowBlank: true
                         }
                        ,
                        {
                            name: 'helpbgtime',
                            fieldLabel: '救助开始日期',
                            afterLabelTextTpl: required,
                            emptyText: '请选择救助开始日期',
                            blankText : '请输选择救助开始日期',
                            xtype: 'datefield',
                            //itemId: 'personbirthday',
                            format: 'Y-m-d',
                            value: Ext.Date.format(new Date(), 'Y-m-d'),
                            allowBlank: false
                        },
                        {
                            name: 'helpedtime',
                            fieldLabel: '救助结束日期',
                            xtype: 'datefield',
                            //itemId: 'personbirthday',
                            format: 'Y-m-d',
                            allowBlank: true
                        },
                        {
                            fieldLabel: '享受人数',
                            value:0,
                            itemId: 'enjoyPersons',
                            afterLabelTextTpl: required,
                            disabled:true,
                            allowBlank: false
                        },
                        {
                            name: 'disabledpersons',
                            itemId:'disabledpersons',
                            fieldLabel: '重残人数',
                            value:0,
                            afterLabelTextTpl: required,
                            emptyText: '请输入重残人数',
                            blankText : '请输入重残人数',
                            allowBlank: false
                        },
                        {
                            name: 'disabledmoney',
                            fieldLabel: '重残低保金(元)',
                            value:0,
                            allowBlank: true
                        },
                        {
                            name: 'othershelpmoney',
                            fieldLabel: '其他人员低保金(元)',
                            value:0,
                            allowBlank: true
                        }
                        ,
                        {
                            name: 'totalhelpmoney',
                            fieldLabel: '总救助金额(元/月/户)',
                            afterLabelTextTpl: required,
                            emptyText: '请输入救助金额',
                            blankText : '请输入救助金额',
                            afterLabelTextTpl: required,
                            value:0,
                            allowBlank: false
                        }
                        ,
                        {
                            name: 'publicityedtm',
                            fieldLabel: '公示结束日期',

                            xtype: 'datefield',
                            format: 'Y-m-d',
                            value:Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY,7), 'Y-m-d'),
                            //colspan:3,
                            allowBlank: true
                        }
                        ,{
                            name: 'helpreason',
                            fieldLabel: '救助原因',
                            colspan:3,
                            minWidth:600,
                            width:800,
                            //draggable :true,
                            anchor : '100%',
                            //width:800,
                            xtype : 'textarea',
                            grow : true,

                            afterLabelTextTpl: required,
                            emptyText: '输入救助原因',
                            emptyText: '输入救助原因',
                            allowBlank: false
                        },{
                            name: 'villageopinion',
                            fieldLabel: '社区/村意见',
                            colspan:3,
                            minWidth:600,
                            width:800,
                            //draggable :true,
                            anchor : '100%',
                            //width:800,
                            xtype : 'textarea',
                            grow : true,

                            allowBlank: true
                        },{
                            name: 'townopinion',
                            fieldLabel: '街道/乡镇意见',
                            colspan:3,
                            minWidth:600,
                            width:800,
                            //draggable :true,
                            anchor : '100%',
                            //width:800,
                            xtype : 'textarea',
                            grow : true,
                            allowBlank: true
                        },{
                            name: 'civilopinion',
                            fieldLabel: '民政局意见',
                            colspan:3,
                            minWidth:600,
                            width:800,
                            //draggable :true,
                            anchor : '100%',
                            //width:800,
                            xtype : 'textarea',
                            grow : true,
                            allowBlank: true
                        }
                        ,*//*{
                            colspan:3,
                            anchor : '100%',
                            width:'100%',
                            xtype : 'panel',
                            border:0,
                            defaults:{
                                border:0
                            },
                            layout:'column',
                            defaultType: 'textfield',

                            items:[*//*
                                {
                                    fieldLabel: '制表时间',
                                    name:'mktime',
                                    //columnWidth:.5,
                                    readOnly: true,
                                    value:Ext.Date.format(new Date(), 'Y-m-d')

                                }
                                 ,{
                                xtype:'label',
                                text:''

                        }
                                 ,

                                {
                                    fieldLabel:"制表人",
                                    name:'mkperson',
                                    value:displayname,
                                    readOnly: true


                                }
                         *//*   ]
                        }*//*
                    ]
                }*/
            ],
            buttons:[
                {
                    text: '提交申请',
                    action:'applysubmit'
                }
            ]

            });
        this.callParent(arguments);
    }

});