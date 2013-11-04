
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.StatisticsComplexFourGrid' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglstatisticscomplexfourpanel',
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
            stype:'complexfour',
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
                    text: '农垦企业人员(含农场)',
                    align:   'center',
                    width:80,
                    flex:1,
                    dataIndex:'farmer'
                },
                {
                    text: '国有森工员(含国有林场)',
                    width:80,
                    align:   'center',
                    flex:1,
                    dataIndex:'forester'
                },
                {
                    text: '两劳释放人员',
                    width:80,
                    align:   'center',
                    flex:1,
                    dataIndex:'criminal'
                },
                {
                    text: '散居归侨侨眷',
                    align:   'center',
                    width:80,
                    dataIndex:'compatriot'
                },
                {
                    text: '非农水库移民',
                    align:   'center',
                    width:80,
                    flex:1,
                    dataIndex:'immigrant'
                },
                {
                    text: '高校毕业生',
                    width:80,
                    align:'center',
                    flex:1,
                    dataIndex:'graduate'
                },
                {
                    text: '退役军人',
                    align:   'center',
                    width:80,
                    flex:1,
                    dataIndex:'veterans'
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
            store: 'dbgl.StatisticsComplexFours'

        });
        this.callParent(arguments);
        //ZSMZJ.view.dbgl.StatisticsComplexOneGrid.selectionModel = this.getSelectionModel();
    }

});
