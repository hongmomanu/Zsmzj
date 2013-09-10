/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.dbgl.businessPrint', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dbglbusinessprintform',
    requires: [


    ],
    afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('printapplyaftershow',this);
    },
    initComponent: function() {
        Ext.apply(this, {
            //bodyPadding: 10,
            cls: 'shadowdiv',
            /*title:'低保办理审批表' ,*/
            buttonAlign : 'center',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 180,
                msgTarget: 'side'
            },
            autoScroll: true,
            items: [
                {
                    xtype:'panel',
                    bodyPadding: 10,
                    title:'低保办理审批表',
                    header: {
                        titleAlign: 'center'
                    },
                    border:0,

                    items:[

                        {
                            xtype: 'fieldset',
                            title: '<a>家庭基本信息</a>',
                            defaultType: 'label',

                            //layout: 'anchor',
                            layout: {
                                type: 'table',

                                // The total column count must be specified here
                                columns: 6,
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
                                text:'户主姓名'
                            },
                                {
                                    text:'',
                                    itemId:'owername'
                                },{
                                    text:'户主身份证'
                                }
                                ,{
                                    text:'',
                                    colspan:3,
                                    itemId:'owerid'
                                },
                                {
                                    name: 'accountaddress',
                                    text: '户口所在地'
                                },
                                {
                                    itemId: 'accountaddress',
                                    colspan:3,
                                    text: ''
                                },
                                {
                                    text: '住房性质'
                                },
                                {
                                    itemId: 'houseproperties',
                                    text: ''
                                },
                                {
                                    text: '实际居住地'
                                },
                                {
                                    itemId: 'realaddress',
                                    colspan:3,
                                    text: ''
                                },{
                                    name: 'telnum',
                                    text: '联系电话'
                                }
                                ,{
                                    itemId: 'telnum',
                                    text: ''
                                },{
                                    name: 'familyaccount',
                                    text: '家庭户口性质'
                                },{
                                    itemId: 'familyaccount',
                                    text: ''
                                }
                                ,{
                                    name: 'applytype',
                                    text: '申请类别'
                                },{
                                    itemId: 'applytype',
                                    text: ''
                                },
                                {
                                    text: '致贫原因'

                                },{
                                    itemId: 'poorreason',
                                    text: ''
                                }
                            ]

                        },

                        {
                            xtype: 'fieldset',
                            title: '<a>家庭成员信息</a>',
                            defaultType: 'textfield',
                            bodyStyle: 'padding:5px 5px 5px 5px',
                            layout: 'fit',

                            items:[

                                {
                                    xtype:'familymemberprintgrid',
                                    itemId:'familymembergrid'
                                }

                            ]
                        }

                        ,
                        {
                            xtype: 'fieldset',
                            title: '<a>低保业务办理信息</a>',
                            itemId:'businesscheckinfo',
                            defaultType: 'label',
                            height: 350,
                            //layout: 'anchor',
                            layout: {
                                type: 'table',
                                // The total column count must be specified here
                                columns: 6,
                                tableAttrs: {
                                    border: 1,
                                    cellpadding: 5,
                                    cellspacing: 1,
                                    width: '100%',
                                    align: 'center',
                                    style: "width:100%;height:100%;border:1px solid gray;border-collapse:collapse;margin:0 auto;text-align:center;"

                                }
                            },

                            items: [{
                                name: 'icomemonth',
                                text: '收入累计月份'
                            },
                                {
                                    itemId: 'icomemonth',
                                    text: ''
                                },

                                {
                                    name: 'averageincome',
                                    text: '月人均收入'

                                }
                                ,
                                {
                                    itemId: 'averageincome',
                                    text: ''

                                }
                                ,
                                {
                                    text: '家庭总人口'
                                },

                                {
                                    itemId: 'FamilyPersons',
                                    text: ''
                                },
                                {
                                    text: '低保类型'
                                },
                                {
                                    itemId: 'poortype',
                                    text: ''
                                },
                                {
                                    text: '救助证编号'
                                }
                                ,
                                {
                                    itemId: 'aidnum',
                                    text: ''
                                }
                                ,

                                {

                                    text: '低保标准(元)'
                                },
                                {
                                    itemId: 'poorstandard',
                                    text: ''
                                },
                                {
                                    text: '享受人数'
                                },
                                {
                                    text: '',
                                    itemId: 'enjoyPersons'
                                },
                                {
                                    text: '救助日期'
                                },
                                {
                                    text: '',
                                    itemId: 'helpbgtime'
                                },
                                {
                                    text: '救助金额'
                                },
                                {
                                    text: '',
                                    itemId: 'totalhelpmoney'
                                },
                                {
                                    text: '救助原因',
                                    height:180,
                                    colspan:1
                                },
                                {
                                    itemId: 'helpreason',
                                    text: '',
                                    height:180,
                                    colspan:5

                                },

                                {
                                    text: '社区/村意见'
                                },
                                {
                                    itemId: 'villageopinion',
                                    text: '',
                                    colspan:2

                                },
                                {
                                    text: '街道/乡镇意见'

                                },{
                                    itemId: 'townopinion',


                                    colspan:2,
                                    text: ''
                                },{
                                    text: '民政局意见',
                                    rowspan:3,
                                    height:100
                                },{
                                    itemId: 'civilopinion',
                                    colspan:5,
                                    rowspan:3,
                                    height:100,
                                    text: ''
                                }
                            ]
                        }

                    ]
                }



            ],
            buttons:[
                {   text: '打印',
                    action:'print'
                }
            ]

            });
        this.callParent(arguments);
    }

});