
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsComplexThreeGrid' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticscomplexthreepanel',
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
            stype:'complexthree',
            layout: 'fit',
            //anchor: '100% 60%',
            useArrows: true,
            rootVisible: false,
            multiSelect: false,
            xtype: 'tree-grid',

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
                    text: '总计',
                    columns: [{
                        text     : '人数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'totalpeoplenum'
                    }, {
                        text     : '资金支出</br>(元)',
                        dataIndex: 'totalhelpmoney',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '月人均补</br>助水平(元)',

                        width    : 80,
                        align:   'center',
                        dataIndex: 'personhelpmoney'
                    }]
                },
                {
                    text: 'A类',
                    columns: [{
                        text     : '人数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'atotalpeoplenum'
                    }, {
                        text     : '资金支出</br>(元)',
                        dataIndex: 'atotalhelpmoney',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '月人均补</br>助水平(元)',
                        width    : 80,
                        align:   'center',
                        dataIndex: 'apersonhelpmoney'
                    }]
                },
                {
                    text: 'B类',
                    columns: [{
                        text     : '人数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'btotalpeoplenum'
                    }, {
                        text     : '资金支出</br>(元)',
                        dataIndex: 'btotalhelpmoney',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '月人均补</br>助水平(元)',

                        width    : 80,
                        align:   'center',
                        dataIndex: 'bpersonhelpmoney'
                    }]
                }
                ,
                {
                    text: 'C类',
                    columns: [{
                        text     : '人数',
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        dataIndex: 'ctotalpeoplenum'
                    }, {
                        text     : '资金支出</br>(元)',
                        dataIndex: 'ctotalhelpmoney',
                        width    : 80,
                        align:   'center'
                    }, {
                        text     : '月人均补</br>助水平(元)',

                        width    : 80,
                        align:   'center',
                        dataIndex: 'cpersonhelpmoney'
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
            store: 'dbgl.StatisticsComplexThrees'

        });
        this.callParent(arguments);
        //ZSMZJ.view.dbgl.StatisticsComplexOneGrid.selectionModel = this.getSelectionModel();
    }

});
