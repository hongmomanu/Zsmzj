
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsComplexTwoGrid' ,{
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticscomplextwopanel',
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
            stype:'complextwo',
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
                    text: '当月新增低保对象情况',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'newmonthfamilynum'
                    }, {
                        text     : '人数',
                        dataIndex: 'newmonthpeoplenum',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '金额',

                        width    : 50,
                        align:   'center',
                        dataIndex: 'newtotalhelpmoney'
                    }]
                },
                {
                    text: '当月退出低保对象情况',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'logoutmonthfamilynum'
                    }, {
                        text     : '人数',
                        dataIndex: 'logoutmonthpeoplenum',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '金额',

                        width    : 50,
                        align:   'center',
                        dataIndex: 'logouttotalhelpmoney'
                    }]
                },
                {
                    text: '当月补差调增情况',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'addmoneymonthfamilynum'
                    }, {
                        text     : '人数',
                        dataIndex: 'addmoneymonthpeoplenum',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '金额',

                        width    : 50,
                        align:   'center',
                        dataIndex: 'addmoneytotalhelpmoney'
                    }]
                },
                {
                    text: '当月补差调减情况',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'reducemoneymonthfamilynum'
                    }, {
                        text     : '人数',
                        dataIndex: 'reducemoneymonthpeoplenum',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '金额',

                        width    : 50,
                        align:   'center',
                        dataIndex: 'reducemoneytotalhelpmoney'
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
            store: 'dbgl.StatisticsComplexTwos'

        });
        this.callParent(arguments);
        //ZSMZJ.view.dbgl.StatisticsComplexOneGrid.selectionModel = this.getSelectionModel();
    }

});
