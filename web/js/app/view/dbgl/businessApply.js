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
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            bodyPadding: 10,
            cls: 'shadowdiv',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 180,
                msgTarget: 'side'
            },
            autoScroll: true,
            items: [{
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
                        align: 'center',
                        style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
                        /*style: {
                            width: '100%'
                        }*/
                    }
                },

                items: [{
                        name: 'division',
                        fieldLabel: '行政区划',
                        afterLabelTextTpl: required,
                        emptyText: '请输入行政区划',
                        blankText : '请输入行政区划',
                        colspan:2,//合并列
                        allowBlank: false
                    },
                    {
                        xtype: 'component',
                        name:'accountimgpath',

                        width:100,
                        height:110,
                        id:'dbglaccountimg',
                        rowspan:4,
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
                    ,{
                        name: 'applytype',
                        afterLabelTextTpl: required,
                        fieldLabel: '申请类别',
                        emptyText: '请输入申请类别',
                        blankText: '请输入申请类别',
                        allowBlank: false
                    },
                    ,{
                        name: 'applytype',
                        fieldLabel: '家庭类别',
                        afterLabelTextTpl: required,
                        emptyText: '请输入家庭类别',
                        blankText: '请输入家庭类别',
                        allowBlank: false
                    }
                    ,{
                        name: 'owername',
                        fieldLabel: '户主姓名',
                        afterLabelTextTpl: required,
                        blankText: '请输入户主姓名',
                        emptyText: '请输入户主姓名',
                        allowBlank: false
                    },{
                        name: 'owerid',
                        fieldLabel: '户主身份证',
                        afterLabelTextTpl: required,
                        blankText: '请输入身份证号',
                        emptyText: '请输入身份证号',
                        allowBlank: false
                    },{
                        name: 'poorfamilytype',
                        fieldLabel: '低保户类型',
                        afterLabelTextTpl: required,
                        blankText: '低保户类型',
                        emptyText: '低保户类型',
                        allowBlank: false
                    },{
                        name: 'familyaccount',
                        fieldLabel: '家庭户口',
                        emptyText: '请选择家庭户口',
                        allowBlank: true
                    }
                    ,{
                        name: 'accountaddress',
                        fieldLabel: '户口所在地',
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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
                            /*style: {
                             width: '100%'
                             }*/
                        }
                    },
                    items:[
                        {
                            name: 'houseproperties',
                            fieldLabel: '住房性质',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'housestructure',
                            fieldLabel: '住房结构',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'housearea',
                            fieldLabel: '住房总面积(㎡)',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'houseaveragearea',
                            fieldLabel: '住房人均面积',
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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
                            /*style: {
                             width: '100%'
                             }*/
                        }
                    },
                    items:[
                        {
                            name: 'interest',
                            fieldLabel: '利息、股息、红利',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'wages',
                            fieldLabel: '工资、薪金',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'planting',
                            fieldLabel: '种植、养殖、捕捞',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'pension',
                            fieldLabel: '离退休金、养老保险等',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'management',
                            fieldLabel: '承包经营',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'alimony',
                            fieldLabel: '赡（抚、扶）养费',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'incidentalincome',
                            fieldLabel: '赔偿、继承、赠与、偶然所得',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'remuneration',
                            fieldLabel: '劳务报酬',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'allowance',
                            fieldLabel: '各类生活补助',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'paidservices',
                            fieldLabel: '生产经营、有偿服务',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'propertylease',
                            fieldLabel: '财产租赁、转让',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'otherincome',
                            fieldLabel: '其他',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }

                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    title: '<a>家庭财产信息</a>',
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
                            style: "border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"
                            /*style: {
                             width: '100%'
                             }*/
                        }
                    },
                    items:[
                        {
                            name: 'cash',
                            fieldLabel: '现金',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        }
                        ,{
                            name: 'banksecurities',
                            fieldLabel: '银行存款及有价证券',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'debt',
                            fieldLabel: '债权',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'vehicle',
                            fieldLabel: '机动车辆',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'nonresidentialhouse',
                            fieldLabel: '非居住类房屋',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'insurance',
                            fieldLabel: '商业保险',
                            //afterLabelTextTpl: required,
                            //emptyText: '低保户类型',
                            allowBlank: true
                        },{
                            name: 'registeredcapital',
                            fieldLabel: '工商注册资金（资本）',
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
                       /* {
                            xtype:'panel',
                            layout: 'fit',
                            items:[*/
                                {xtype:'familymembergrid'}
                           /* ]

                        }*/

                    ]
                }
            ]

            });
        this.callParent(arguments);
    }

});