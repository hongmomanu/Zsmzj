
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.medicalhelp.MedicalStandardGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.medicalstandardgridpanel',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
    /*afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },*/
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

            columns: [

                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '医疗金额范围(起)',align:'center',dataIndex:'bgmoney',width: 200},
                {header: '医疗金额范围(止)',align:'center',dataIndex:'edmoney',width: 200},
                {header: '救助比例',align:'center',dataIndex:'helppercent'},
                {header: '救助类别',align:'center',dataIndex:'helptype'},
                {header: '医疗性质',align:'center',dataIndex:'helpnature'}

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                /*store: 'dbgl.NeedToDoBusinesses',*/
                displayInfo: true,
                displayMsg: '显示待办事务 {0} - {1} of {2}',
                emptyMsg: "无待办事务",
                items:[
                    '-',
                    {
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
                                    //store.on('load', function (store, options){CommonFunc.widgetdolayout("mainContent-panel",1);});
                                    store.loadPage(1);
                                }
                            }
                        },
                        emptyText: '输入搜索关键字'

                    },'->',

                    {
                        text: '新增',
                        action:'addnew'

                    }, {
                        itemId: 'removePerson',
                        text: '删除',
                        action:'del',
                        disabled: true
                    }
                    ,
                    {
                        text: '导出Excel',
                        action:'outexcel'
                    }
                ]
            })/*,
            store: 'dbgl.NeedToDoBusinesses'*/

        });
        this.callParent(arguments);
        ZSMZJ.view.medicalhelp.MedicalStandardGrid.selectionModel = this.getSelectionModel();
    }

});
