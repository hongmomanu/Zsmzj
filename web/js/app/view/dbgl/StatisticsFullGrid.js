
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsFullGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dbglstatisticsfullpanel',
    cls:'navigation-grid',
    requires: [

    ],
    afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },
            features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],
            //hideHeaders:true,

            columns: [
                {
                    text     : '地区',
                    flex     : 1,
                    sortable : false,
                    dataIndex: 'company'
                }, {
                    text: '合计',
                    columns: [{
                        text     : '总户数',
                        width    : 75,
                        sortable : true,
                        dataIndex: 'price'
                    }, {
                        text     : '总人数',
                        width    : 80,

                        dataIndex: 'change'
                    }, {
                        text     : '男',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '女',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '总金额',
                        width    : 100,
                        dataIndex: 'pctChange'
                    }]
                },  {
                    text: '城镇',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        dataIndex: 'price'
                    }, {
                        text     : '人数',
                        width    : 80,

                        dataIndex: 'change'
                    }, {
                        text     : '男',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '女',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '金额',
                        width    : 100,
                        dataIndex: 'pctChange'
                    }]
                },{
                    text: '农村',
                    columns: [{
                        text     : '户数',
                        width    : 75,
                        sortable : true,
                        dataIndex: 'price'
                    }, {
                        text     : '人数',
                        width    : 80,

                        dataIndex: 'change'
                    }, {
                        text     : '男',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '女',
                        width    : 50,
                        dataIndex: 'pctChange'
                    }, {
                        text     : '金额',
                        width    : 100,
                        dataIndex: 'pctChange'
                    }]
                }

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                /*store: 'dbgl.StatisticsFulls',*/
                displayInfo: true,
                displayMsg: '显示统计结果 {0} - {1} of {2}',
                emptyMsg: "无统计结果",
                items:[
                    '-',
                    /*{
                        xtype: 'textfield',
                        hidden: false,
                        width:200,
                        //size:40,
                        listeners: {

                            "specialkey": function (field, e) {
                                if (e.keyCode == 13) {
                                    var keyword = field.getValue().replace(/\s+/g, "");
                                    var store=this.up('panel').getStore();
                                    store.proxy.extraParams.keyword = keyword;
                                    store.load();
                                }
                            }
                        },
                        emptyText: '输入搜索关键字'

                    },*/
                    {
                        xtype: 'datefield',
                        fieldLabel: '选择年月',
                        displayField: 'name',
                        valueField: 'value',
                        width: 500,
                        labelWidth: 80,
                        store: bookStore

                    },
                    '->',
                    {
                        text: '导出Excel',
                        action:'outexcel'
                    }
                ]
            })/*,
            store: 'dbgl.StatisticsFulls'*/


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
