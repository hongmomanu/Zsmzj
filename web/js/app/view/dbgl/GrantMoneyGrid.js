
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.GrantMoneyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.grantmoneypanel',
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
                                            me.up('panel').fireEvent('showclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);



                        return Ext.String.format('<span id="{0}"></span>',id0);
                    }
                },
                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                ////行政区划 户主姓名 户主身份证 申请类别 家庭类别 救助金额 救助开始日期 救助结束日期 家庭人数 享受人数 状态 状态描述 审核人 审核日期 制单人
                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                //变更前人数	变更前金额	变更后人数	变更后金额	变更日期	变更原因	状态	状态描述	审核人	审核日期	制单人	制单日期
                //家庭类别	注销日期	注销原因
                {header: '申请类别',align:'center',dataIndex:'applytype'},
                {header: '家庭类别',align:'center',dataIndex:'familytype'},

                {header: '注销日期',align:'center',dataIndex:'logoutdate'},
                {header: '注销原因',align:'center',dataIndex:'logoutreason'},

                {header: '状态',align:'center',dataIndex:'processstatus',renderer:function(val, obj, record){


                        if (val==processdiction.stepzero) return "未提交";
                        else if(val==processdiction.steptwo)return val+"中";
                        else return "已"+val;

                }},
                {header: '审核人',align:'center',dataIndex:'approvaluser'},
                {header: '审核日期',align:'center',dataIndex:'approvaltime',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '制单人',align:'center',dataIndex:'displayname'},
                {header: '业务id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                /*store: 'dbgl.LogoutBusinesses',*/
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
                                    store.load();
                                }
                            }
                        },
                        emptyText: '输入搜索关键字'

                    },'->',
                    {
                        text: '导出Excel',
                        action:'outexcel'

                    }
                ]
            })/*,
            store: 'dbgl.LogoutBusinesses'*/


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
