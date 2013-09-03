
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

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),
            //行政区划 户主姓名 户主身份证 申请类别 家庭类别 救助金额 救助开始日期 救助结束日期 家庭人数 享受人数 状态 状态描述 审核人 审核日期 制单人
            //hideHeaders:true,
            columns: [


                {header: '业务操作', width: 230,locked : true,
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
                                            me.fireEvent('alterclick', c,r,me);

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

                                            me.fireEvent('processclick', c,r,me);

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
                                icon:'img/sp.gif',
                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.fireEvent('businessinfo', c,r,me);

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
                                            me.fireEvent('delclick', c,r,me);

                                        }, c);
                                    }

                                }
                            });
                        }, 50);

                        return Ext.String.format('<span id="{0}" style="padding-left:5px; "></span>' +
                            '<span id="{1}" style="padding-left:5px; "></span><span id="{2}" style="padding-left:5px; "></span>' +
                            '<span id="{3}" style="padding-left:5px; "></span>',id0, id1,id2,id3);
                    }
                },
                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                ////行政区划 户主姓名 户主身份证 申请类别 家庭类别 救助金额 救助开始日期 救助结束日期 家庭人数 享受人数 状态 状态描述 审核人 审核日期 制单人
                {header: '行政区划', dataIndex: 'division',width: 150},
                {header: '户主姓名',dataIndex:'owername'},
                {header: '户主身份证',dataIndex:'owerid'},
                {header: '申请类别',dataIndex:'applytype'},
                {header: '家庭类别',dataIndex:'familytype'},
                {header: '救助金额',dataIndex:'totalhelpmoney'},
                {header: '救助开始日期',dataIndex:'helpbgtime'},
                {header: '救助结束日期',dataIndex:'helpedtime'},
                {header: '家庭(享受)人数',dataIndex:'familynum'},
                {header: '状态',dataIndex:'processstatus'},
                {header: '审核人',dataIndex:'approvaluser'},
                {header: '审核日期',dataIndex:'approvaltime',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '制单人',dataIndex:'displayname'},
                {header: '业务id', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.NeedToDoBusinesses',
                displayInfo: true,
                displayMsg: '显示待办事务 {0} - {1} of {2}',
                emptyMsg: "无待办事务"/*,
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]*/
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
