
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.header.BriefNeedToDoGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.briefneedtodogrid',
    cls:'navigation-grid',
    isnewgrid:true,
    requires: [

    ],
    /*afterShow: function(animateTarget, cb, scope) {
        this.fireEvent('alterapplyaftershow',this);
    },*/
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
    initComponent: function() {
        var store=Ext.create('Ext.data.Store',{
            fields:['name','url','businessid','processstatus','processstatustype',
                'businesstype','owername','process','displayname','time','lastmod'],
            autoLoad:false,
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: 'ajax/getneedtodos.jsp',
                getMethod:function(request){ return 'POST'; },
                extraParams:{
                    roleid:roleid,
                    userid:userid,
                    divisionpath:divisionpath,
                    type:"list"
                },
                reader: {
                    type: 'json',
                    root: 'results',
                    totalProperty: 'totalCount'
                }
            }
        })
        store.load();
        Ext.apply(this, {
            border: false,
            //width:788,
            height:300,
            stype:'list',
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },
            style:{
                borderLeft:'2px solid #d7e4f2',
                borderBottom:'10px solid #d7e4f2'
            },
            features2: [{
                ftype: 'rowbody',
                getAdditionalData: function(data, idx, record, orig) {
                    return {
                        rowBody: Ext.String.format(
                            '<div>->简介:<span> {0}&nbsp;{1}&nbsp;{2}{3}</span></div>',
                            data.owername,Ext.util.Format.date(data.time, 'Y-m-d'),'已',data.processstatus)
                    };
                }
            },{
                ftype:'rowwrap'
            }],

            columnLines: true,

            columns: [

                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                {header: '人员姓名',dataIndex:'owername',width: 70,locked : true,
                    renderer: function (v, m, r) {
                        var me=this;
                        var id0=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id0)){
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
                                                me.up('panel').fireEvent('alterclick', c,r,me);
                                            }, c);
                                        }

                                    }
                                });
                            }

                        }, 50);



                        return Ext.String.format('<span id="{0}"></span>',id0);
                    }
                },
                {header: '流程状态', dataIndex: 'processstatus',width: 70,renderer:function(val,obj,record){
                    return "已"+val;
                }},
                {header: '当前流程',dataIndex:'process',width: 70},
                {header: '救助类别',dataIndex:'businesstype',width: 70},
                {header: '类型',width: 70,renderer:function(val,obj,record){
                    return "待办";
                }},
                {header: '提交机构',hidden:true},
                {header: '提交时间',dataIndex:'time',width:120,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    //var time = new Date(val);
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '提交人',dataIndex:'displayname'}


            ],
            tbar:[
                '->',
                {
                    xtype:'button',
                    text:'刷新',
                    iconCls: 'x-tbar-loading',
                    //action:'lookformore',
                    listeners: {
                        click: function(c){
                            store.load();
                        }

                    }
                },{
                    text:'查看更多',
                    action:'lookformore',
                    iconCls: 'x-toolbar-more-icon',
                    listeners: {
                        render: function(c){
                            c.getEl().on('click', function(){ this.fireEvent('needthingsclick', c); }, c);
                        }

                    }
                }
            ],

            store: store


        });
        this.callParent(arguments);

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
