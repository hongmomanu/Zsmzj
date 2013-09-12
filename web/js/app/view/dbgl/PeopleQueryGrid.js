
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.PeopleQueryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.peoplequerypanel',
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


                Ext.create('Ext.grid.RowNumberer'),
                {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
                    summaryRenderer: function(value){
                    return '本页合计'
                }},
                //行政区划名称	户主姓名	户主身份证	与户主关系	姓名	身份证	性别	年龄	户口性质	文化程度	政治面貌
                // 健康状况	婚姻状况	月人均收入	人员类别	是否享受
                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '与户主关系',align:'center',dataIndex:'relationship'},
                {header: '姓名',align:'center',dataIndex:'name'},

                {header: '身份证',align:'center',dataIndex:'personid'},
                {header: '性别',align:'center',dataIndex:'sex'},

                {header: '年龄',align:'center',dataIndex:'age'},

                {header: '户口性质',align:'center',dataIndex:'accounttype'},
                {header: '文化程度',align:'center',dataIndex:'education'},
                {header: '政治面貌',align:'center',dataIndex:'political'},
                {header: '健康状况',align:'center',dataIndex:'bodystatus'},
                {header: '婚姻状况',align:'center',dataIndex:'maritalstatus'},
                {header: '月人均收入',align:'center',dataIndex:'monthlyincome',summaryType: 'sum',
                    summaryRenderer: function(value){
                        return '总金额:'+value
                    }},
                {header: '人员类别',align:'center',dataIndex:'persontype'},
                {header: '是否享受',align:'center',dataIndex:'isenjoyed'},

                {header: '人员id',align:'center', width: 150,dataIndex:'rowid',hidden:true}

            ],
            flex: 1,
            /*tbar:[

            ],*/
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.PeopleQuerys',
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
            }),
            store: 'dbgl.PeopleQuerys'


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