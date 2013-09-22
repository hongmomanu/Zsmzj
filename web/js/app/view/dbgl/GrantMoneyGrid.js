
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.GrantMoneyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dbglgrantmoneypanel',
    cls:'navigation-grid',
    requires: [

    ],
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
            features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],
            //hideHeaders:true,
            columns: [


                {header: '操作栏', width: 230,locked : true,summaryType: 'count', align:'center',//求数量
                    summaryRenderer: function(value){
                        return '本页合计'
                    },
                    renderer: function (v, m, r) {
                        var me=this;
                        var id0=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id0,
                                margin: '0 5 0 5',
                                text: '查看',
                                icon:'img/sp.gif',

                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            testobj=me.up('panel');
                                            me.up('panel').fireEvent('alterclick', c,r,me);
                                        }, c);
                                    }

                                }
                            });
                        }, 50);



                        return Ext.String.format('<span id="{0}"></span>',id0);
                    }
                },
                //发放年月	行政区划	户主姓名	户主身份证	申请类别	家庭类别	救助金额	家庭人数	享受人数	发放人	发放日期	数据生成日期

                {header: '发放年月', dataIndex: 'grantdate',width: 150,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d");
                    val = Ext.util.Format.date(time, 'Y-m');
                    return val;
                }},
                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},

                {header: '申请类别',align:'center',dataIndex:'applytype'},
                {header: '家庭类别',align:'center',dataIndex:'familytype'},

                {header: '家庭类别',align:'center',dataIndex:'familytype'},
                {header: '救助金额',align:'center',dataIndex:'totalhelpmoney'},
                {header: '家庭人数',align:'center',dataIndex:'familynum'},
                {header: '享受人数',align:'center',dataIndex:'enjoynum'},
                {header: '发放人',align:'center',dataIndex:'grantuser'},
                {header: '发放日期',align:'center',dataIndex:'grantdate',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d");
                    val = Ext.util.Format.date(time, 'Y-m-d');
                    return val;
                }},
                {header: '数据生成日期',align:'center',dataIndex:'granttime',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '业务id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.GrantMoneyStore',
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
                                    store.loadPage(1);
                                }
                            }
                        },
                        emptyText: '输入搜索关键字'

                    },
                    {
                        xtype: 'monthfield',
                        fieldLabel: '选择年月',
                        value: Ext.Date.format(new Date(), 'Y-m'),
                        listeners: {

                            "specialkey": function (field, e) {
                                if (e.keyCode == 13) {
                                    var month = field.getRawValue().replace(/\s+/g, "");
                                    var store=this.up('panel').getStore();
                                    store.proxy.extraParams.bgmonth = month;

                                    store.loadPage(1);
                                }
                            }
                        },
                        format: 'Y-m'

                    },
                    '->',
                    {
                        text: '导出Excel',
                        action:'outexcel'

                    },
                    '-',
                    {
                        text: '新增',
                        action:'newgrant'

                    }
                ]
            }),
            store: 'dbgl.GrantMoneyStore'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.GrantMoneyGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
