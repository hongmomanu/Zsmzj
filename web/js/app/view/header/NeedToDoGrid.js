
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


                {header: '审批操作', width: 150,
                    renderer: function (v, m, r) {
                        var me=this;
                        var id1 = Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id1,
                                icon:'img/process.gif',
                                text: '流程' ,
                                width: 55,
                                listeners: {
                                    /*click: {
                                     element: 'el', //bind to the underlying el property on the panel
                                     fn: function(){ alert('click el'); }
                                     }*/
                                    render: function(c){
                                        c.getEl().on('click', function(){
                                            //Ext.Msg.alert('Info', r.get('processstatus'))

                                            me.fireEvent('processclick', c,r);

                                        }, c);
                                    }

                                }/*,


                                handler: function () {

                                    Ext.Msg.alert('Info', r.get('processstatus'))

                                }*/
                            });
                        }, 50);
                        var id2=Ext.id();
                        Ext.defer(function () {
                            Ext.widget('button', {
                                renderTo: id2,
                                text: r.get('process'),
                                icon:'img/sp.gif',
                                width: 55,
                                handler: function () { Ext.Msg.alert('Info', r.get('processstatus')) }
                            });
                        }, 50);

                        return Ext.String.format('<span id="{0}"></span><span>&nbsp;&nbsp;&nbsp;</span><span id="{1}"></span>', id1,id2);
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
