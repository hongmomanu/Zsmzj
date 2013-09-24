
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.FamilyQueryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familyquerypanel',
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
            stype:businessTableType.dbgl,
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


                Ext.create('Ext.grid.RowNumberer'),
                {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
                    summaryRenderer: function(value){
                    return '本页合计'
                },renderer: function (v, m, r) {
                    var me=this;
                    var id0=Ext.id();
                    Ext.defer(function () {
                        Ext.widget('label', {
                            renderTo: id0,
                            //margin: '0 5 0 5',
                            border:0,
                            text: v,
                            overCls:'mouseover',
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
                }},

                //行政区划名称	户主姓名	户主身份证	申请类别	家庭户口性质	家庭类别	低保户类型
                // 家庭人数	享受人数	救助开始日期	救助金额	开户人	银行帐号	救助证编号

                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '申请类别',align:'center',dataIndex:'applytype'},
                {header: '家庭类别',align:'center',dataIndex:'familytype'},
                {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
                    summaryRenderer: function(value){
                        return '总金额:'+value
                    }},
                {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
                {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
                {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
                    summaryRenderer: function(value){
                        return '总人数:'+value
                    }},

                {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

                {header: '低保户类型',align:'center',dataIndex:'poorfamilytype'},

                {header: '享受人数',align:'center',dataIndex:'enjoynum'},
                {header: '开户人',align:'center',dataIndex:'bankower'},
                {header: '银行帐号',align:'center',dataIndex:'bankid'},
                {header: '救助证编号',align:'center',dataIndex:'aidnum'},

                {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.FamilyQuerys',
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

                    },'->',
                    {
                        text: '导出Excel',
                        action:'outexcel'

                    }
                ]
            }),
            store: 'dbgl.FamilyQuerys'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.PeopleQueryGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
