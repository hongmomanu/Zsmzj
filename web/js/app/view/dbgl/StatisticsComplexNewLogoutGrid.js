
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsComplexNewLogoutGrid' ,{
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticscomplexnewlogoutpanel',
    //cls:'navigation-grid',
    requires: [


    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
   /* afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },*/
    initComponent: function() {
        Ext.apply(this, {
            border: true,
            stype:'complexnewlogout',
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
                    text: '新增',
                    columns: [
                        {
                        text     : '农户',
                        columns:[
                            {
                                text:'户数',
                                width    : 75,
                                sortable : true,
                                align:   'center',
                                dataIndex: 'newmonthfamilynum'
                            },
                            {
                                text:'人数',
                                width    : 75,
                                sortable : true,
                                align:   'center',
                                dataIndex: 'newmonthpeoplenum'
                            },
                            {
                                text:'金额',
                                width    : 75,
                                sortable : true,
                                align:   'center',
                                dataIndex: 'newmonthmoney'
                            }
                        ]

                    },
                        {
                        text     : '非农户',
                            columns:[
                                {
                                    text:'户数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'newcitymonthfamilynum'
                                },
                                {
                                    text:'人数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'newcitymonthpeoplenum'
                                },
                                {
                                    text:'金额',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'newcitymonthmoney'
                                }
                            ]
                    }
                    ]
                },
                {
                    text: '注销',
                    columns: [
                        {
                            text     : '农户',
                            columns:[
                                {
                                    text:'户数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutmonthfamilynum'
                                },
                                {
                                    text:'人数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutmonthpeoplenum'
                                },
                                {
                                    text:'金额',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutmonthmoney'
                                }
                            ]

                        },
                        {
                            text     : '非农户',
                            columns:[
                                {
                                    text:'户数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutcitymonthfamilynum'
                                },
                                {
                                    text:'人数',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutcitymonthpeoplenum'
                                },
                                {
                                    text:'金额',
                                    width    : 75,
                                    sortable : true,
                                    align:   'center',
                                    dataIndex: 'logoutcitymonthmoney'
                                }
                            ]
                        }
                    ]
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
            store: 'dbgl.StatisticsComplexTwos'

        });
        this.callParent(arguments);
        //ZSMZJ.view.dbgl.StatisticsComplexOneGrid.selectionModel = this.getSelectionModel();
    }

});
