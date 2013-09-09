
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.NeedToDoBusinessGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.needtodobusinesspanel',
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


                {header: '业务操作', width: 230,locked : true,summaryType: 'count', align:'center',//求数量
                    summaryRenderer: function(value){
                        return '本页合计'
                    },
                    renderer: function (v, m, r) {
                        var me=this;
                        var id0=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id0,
                                text: '修改',
                                icon:'img/sp.gif',
                                hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                    ||r.get('processstatus').toString()==processdiction.stepback),
                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.up('panel').fireEvent('alterclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);


                        var id1 = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id1,
                                icon:'img/process.gif',
                                text: '流程' ,
                                width: 55,
                                hidden: r.get('processstatus').toString()==processdiction.stepzero||
                                    r.get('processstatus').toString()==processdiction.stepback,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            //Ext.Msg.alert('Info', r.get('processstatus'))
                                            //me.fireEvent('processclick', c,r,me);
                                            me.up('panel').fireEvent('processclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);

                        var id2=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id2,
                                text: '查看',
                                hidden:(r.get('processstatus').toString()==processdiction.stepzero),
                                icon:'img/sp.gif',
                                width: 55,
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.up('panel').fireEvent('alterclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);

                        var id5=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id5,
                                text: '提交',
                                hidden:!(r.get('processstatus').toString()==processdiction.stepzero),
                                icon:'img/sp.gif',
                                width: 55,
                                listeners: {
                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.up('panel').fireEvent('businessclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);




                        var id3=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id3,
                                text: '删除',
                                icon:'img/sp.gif',
                                hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                    ||r.get('processstatus').toString()==processdiction.stepback),
                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.up('panel').fireEvent('delclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);

                        var id4=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id4,
                                text: '取消',
                                icon:'img/sp.gif',
                                //hidden:!(r.get('processstatus').toString()==processdiction.stepone),
                                hidden:true,
                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){

                                            me.up('panel').fireEvent('cancelclick', c,r,me);
                                        }, c);
                                    }

                                }
                            });
                        }, 50);

                        return Ext.String.format('<span id="{0}" style="padding-left:5px; "></span>' +
                            '<span id="{1}" style="padding-left:5px; "></span><span id="{2}" style="padding-left:5px; "></span>' +
                            '</span><span id="{5}" style="padding-left:5px; "></span>'+
                            '<span id="{3}" style="padding-left:5px; "></span>'+
                            '<span id="{4}" style="padding-left:5px; "></span>',id0, id1,id2,id3,id4,id5);
                    }
                },
                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                ////行政区划 户主姓名 户主身份证 申请类别 家庭类别 救助金额 救助开始日期 救助结束日期 家庭人数 享受人数 状态 状态描述 审核人 审核日期 制单人
                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '申请类别',align:'center',dataIndex:'applytype'},
                {header: '家庭类别',align:'center',dataIndex:'familytype'},
                {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
                    summaryRenderer: function(value){
                        return '总金额:'+value
                    }},
                {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
                {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
                {header: '家庭(享受)人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
                    summaryRenderer: function(value){
                        return '总人数:'+value
                    }},
                {header: '状态',align:'center',dataIndex:'processstatus'},
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
                store: 'dbgl.NeedToDoBusinesses',
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

                    }
                ]
            }),
            store: 'dbgl.NeedToDoBusinesses'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.NeedToDoBusinessGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
