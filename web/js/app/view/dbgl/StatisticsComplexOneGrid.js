
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsComplexOneGrid' ,{
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticscomplexonepanel',
    cls:'navigation-grid',
    requires: [

    ],
    afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },
    initComponent: function() {
        Ext.apply(this, {
            border: true,
            layout: 'fit',
            //anchor: '100% 60%',
            useArrows: true,
            rootVisible: false,
            multiSelect: false,
            xtype: 'tree-grid',
            /*features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],*/
            //hideHeaders:true,

            columns: [
                {
                    text     : '地区',
                    xtype: 'treecolumn',
                    align:   'center',
                    //flex:1,
                    width:160,
                    locked:true,
                    dataIndex: 'divisionname'
                },
                {
                    text     : '低保户数',
                    align:   'center',
                    //flex:1,
                    width:160,
                    dataIndex: 'totalfamily'
                },
                {
                    text     : '低保人数',
                    align:   'center',
                    //flex:1,
                    width:160,
                    dataIndex: 'totalperson'
                },
                {
                    text: '低保人数(按类别分)',
                    columns: [{
                        text     : '老年人',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'oldperson'
                    }, {
                        text     : '成年人',
                        columns: [
                            {
                                text     : '在职职工',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'jobers'
                            },
                            {
                                text     : '灵活就业人员',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'freejobers'
                            } ,
                            {
                                text     : '登记失业人员',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'loginnojob'
                            } ,
                            {
                                text     : '登记未失业人员',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'logoutnojob'
                            }

                        ],
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '未成年人',
                        columns: [
                            {
                                text     : '在校生',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'student'
                            },
                            {
                                text     : '其他人员',
                                width    : 80,
                                align:   'center',
                                dataIndex: 'otherperson'
                            }
                        ],
                        width    : 50,
                        align:   'center',
                        dataIndex: 'totalmen'
                    }]
                },  {
                    text: '残疾人',
                    columns: [{
                        text     : '总人数',
                        width    : 75,
                        //sortable : true,
                        align:   'center',
                        dataIndex: 'disabilitynum'
                    }, {
                        text     : '其中',
                        align:   'center',
                        width    : 80,
                        columns: [{
                            text     : '重残疾人数',
                            width    : 75,
                            sortable : true,
                            dataIndex: 'harddisabilitynum'
                        }]


                    }]
                },{
                    text: '资金支出',
                    columns: [{
                        text     : '当月支出',
                        width    : 75,
                        sortable : true,
                        dataIndex: 'totalmoney'
                    }, {
                        text     : '当月累计',
                        width    : 80,
                        align:   'center',
                        dataIndex: 'totalmoney'
                    }]
                }

            ],
            /*tbar:[

            ],*/
            bbar: {
                items:[
                    '-',

                    Ext.widget('monthfield', {
                        fieldLabel: '选择年月',
                        value: Ext.Date.format(new Date(), 'Y-m'),
                        listeners: {

                            "specialkey": function (field, e) {
                                if (e.keyCode == 13) {
                                    var month = field.getRawValue().replace(/\s+/g, "");
                                    var store=this.up('panel').getStore();
                                    store.proxy.extraParams.bgmonth = month;
                                    store.load();
                                }
                            },
                            "change":function(field,e){
                                var month = field.getRawValue().replace(/\s+/g, "");
                                var store=this.up('panel').getStore();
                                store.proxy.extraParams.bgmonth = month;
                                store.load();
                                //alert(1);
                                //console.log(field);
                            }
                        },
                        format: 'Y-m'
                    }),

                    /*{
                        xtype: 'monthfield',

                    },*/
                    '->',
                    {
                        text: '导出Excel',
                        action:'outexcel'
                    }
                ]
            },
            store: 'dbgl.StatisticsComplexOnes'

        });
        this.callParent(arguments);
        ZSMZJ.view.dbgl.StatisticsComplexOneGrid.selectionModel = this.getSelectionModel();
    }

});
