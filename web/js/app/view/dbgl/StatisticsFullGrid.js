
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsFullGrid' ,{
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticsfullpanel',
    cls:'navigation-grid',
    requires: [

    ],
    afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },
    initComponent: function() {
        Ext.apply(this, {
            //border: false,
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
                    //flex:1,
                    width:200,
                    locked:true,
                    dataIndex: 'divisionname'
                }, {
                    text: '合计',
                    columns: [{
                        text     : '总户数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'totalfamily'
                    }, {
                        text     : '总人数',
                        width    : 80,
                        align:   'center',
                        dataIndex: 'totalperson'
                    }, {
                        text     : '男',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'totalmen'
                    }, {
                        text     : '女',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'totalgirls'
                    }, {
                        text     : '总金额',
                        width    : 100,
                        align:   'center',
                        dataIndex: 'totalmoney'
                    }]
                },  {
                    text: '城镇',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        //sortable : true,
                        align:   'center',
                        dataIndex: 'cityfamily'
                    }, {
                        text     : '人数',
                        align:   'center',
                        width    : 80,
                        dataIndex: 'cityperson'
                    }, {
                        text     : '男',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'citymen'
                    }, {
                        text     : '女',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'citygirls'
                    }, {
                        text     : '金额',
                        width    : 100,
                        align:   'center',
                        dataIndex: 'citymoney'
                    }]
                },{
                    text: '农村',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        dataIndex: 'villagefamily'
                    }, {
                        text     : '人数',
                        width    : 80,
                        align:   'center',
                        dataIndex: 'villageperson'
                    }, {
                        text     : '男',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'villagemen'
                    }, {
                        text     : '女',
                        width    : 50,
                        align:   'center',
                        dataIndex: 'villagegirls'
                    }, {
                        text     : '金额',
                        width    : 100,
                        align:   'center',
                        dataIndex: 'villagemoney'
                    }]
                }

            ],
            /*tbar:[

            ],*/
            bbar: {
                items:[
                    '-',

                    {
                        xtype: 'monthfield',
                        fieldLabel: '选择年月',
                        value: Ext.Date.format(new Date(), 'Y-m'),
                        format: 'Y-m'

                    },
                    '->',
                    {
                        text: '导出Excel',
                        action:'outexcel'
                    }
                ]
            },
            store: 'dbgl.StatisticsFulls'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.StatisticsFullGrid.selectionModel = this.getSelectionModel();
    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
