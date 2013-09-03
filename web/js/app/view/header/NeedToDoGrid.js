
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.header.NeedToDoGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.needtodopanel',
    cls:'navigation-grid',
    requires: [

    ],
    afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow');
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

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [


                {header: '业务操作', width: 250,
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
                                text: r.get('process'),
                                icon:'img/sp.gif',
                                width: 55,
                                listeners: {

                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            me.fireEvent('businessclick', c,r,me);

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
                {header: '流程状态', dataIndex: 'processstatus',width: 150,renderer:function(val,obj,record){
                    return "已"+val;
                }},
                {header: '当前流程',dataIndex:'process'},
                {header: '类型',renderer:function(val,obj,record){
                    return "待办";
                }},
                {header: '提交机构',hidden:true},
                {header: '提交时间',dataIndex:'time',width:200,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    //var time = new Date(val);
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '提交人',dataIndex:'displayname'},
                {header: '业务id', width: 150,dataIndex:'businessid',hidden:true}


            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'header.NeedToDos',
                displayInfo: true,
                displayMsg: '显示待办事务 {0} - {1} of {2}',
                emptyMsg: "无待办事务"/*,
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]*/
            }),
            store: 'header.NeedToDos'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.header.NeedToDoGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
