
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
                                            //testobj=me.up('panel');
                                            me.up('panel').fireEvent('alterclick', c,r,me);
                                        }, c);
                                    }

                                }
                            });
                        }

                    }, 50);



                    return Ext.String.format('<span id="{0}"></span>',id0);
                }},
                //行政区划名称	户主姓名	户主身份证	与户主关系	姓名	身份证	性别	年龄	户口性质	文化程度	政治面貌
                // 健康状况	婚姻状况	月人均收入	人员类别	是否享受
                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '与户主关系',align:'center',dataIndex:'relationship'},
                {header: '姓名',align:'center',dataIndex:'name'},
                {header: '业务类型',align:'center',dataIndex:'businesstype',itemId:'businesstype'},
                {header: '身份证',align:'center',dataIndex:'personid'},
                {header: '性别',align:'center',dataIndex:'sex'},

                {header: '年龄',align:'center',dataIndex:'age',renderer: function (v, m, r) {
                    var time =Ext.Date.parse(r.get('birthday'), "Y-m-dTH:i:s");
                    var now =new Date();
                    var val =now.getFullYear()-time.getFullYear();
                    return val;

                }},

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
            tbar:[
                {
                    fieldLabel:'快速全文检索',
                    xtype: 'textfield',
                    hidden: false,
                    width:250,
                    //size:40,
                    listeners: {
                        "specialkey": function (field, e) {
                            if (e.keyCode == 13) {
                                var keyword = field.getValue().replace(/\s+/g, "");
                                var panel=this.up('panel');
                                var store=panel.getStore();
                                var bgdate=panel.down('#bgdate').getValue();
                                var eddate=panel.down('#eddate').getValue();
                                store.proxy.extraParams.bgdate=bgdate;
                                store.proxy.extraParams.eddate=eddate;
                                store.proxy.extraParams.keyword = keyword;
                                store.loadPage(1);

                            }
                        }
                    },
                    emptyText: '输入搜索关键字'

                },{
                    text:'检索',
                    listeners:{
                        "click":function(btn){
                            var field=btn.previousNode();
                            var keyword = field.getValue().replace(/\s+/g, "");

                            var panel=this.up('panel');
                            var store=panel.getStore();
                            var bgdate=panel.down('#bgdate').getValue();
                            var eddate=panel.down('#eddate').getValue();
                            store.proxy.extraParams.bgdate=bgdate;
                            store.proxy.extraParams.eddate=eddate;
                            store.proxy.extraParams.keyword = keyword;
                            store.loadPage(1);

                        }
                    }

                },{
                    xtype: 'button',
                    text: '<span style="font-weight:bold">>></span>',
                    tooltip: '显示/隐藏日期',
                    //id: 'westpanelhandler',
                    handler: function () {
                        if (this.nextSibling().isHidden()) {
                            this.nextSibling().show();
                            this.nextSibling().nextSibling().show();
                            this.setText('<span style="font-weight:bold"><<</span>');
                        } else {
                            this.nextSibling().hide();
                            this.nextSibling().setValue("");
                            this.nextSibling().nextSibling().setValue("");
                            this.nextSibling().nextSibling().hide();
                            this.setText('<span style="font-weight:bold">>></span>');
                        }

                    }
                },{
                    //fieldLabel: '发放开始日期',
                    emptyText: '请选择开始日期',
                    hidden:true,
                    itemId:'bgdate',
                    blankText : '请输选择开始日期',
                    xtype: 'datefield',
                    //itemId: 'personbirthday',
                    format: 'Y-m-d',
                    //value: Ext.Date.format(new Date(), 'Y-m-d'),
                    allowBlank: true
                },{
                    //fieldLabel: '发放结束日期',
                    emptyText: '请选择结束日期',
                    hidden:true,
                    blankText : '请输选择结束日期',
                    xtype: 'datefield',
                    itemId:'eddate',
                    //itemId: 'personbirthday',
                    format: 'Y-m-d',
                    //value: Ext.Date.format(new Date(), 'Y-m-d'),
                    allowBlank: true
                },'->',
                {
                    xtype:'splitbutton',
                    text: 'excel输出',
                    isall:false,
                    action:'outexcel',
                    arrowAlign:'right',
                    menu: [
                        {
                            text: '当前页导出',
                            isall:false,
                            action:'outexcel'
                        },
                        {
                            text: '全部导出',
                            isall:true,
                            action:'outexcel'
                        }
                    ]
                },
                '-'
                ,
                {
                    text: '高级检索',
                    action:'moresearch',
                    searchtype:'moresearchpeople'

                }

            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.PeopleQuerys',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',

                emptyMsg: "无记录",
                items:[

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
