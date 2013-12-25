
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


                {header: '操作栏', width: 100,locked : true,summaryType: 'count', align:'center',//求数量
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
                                icon:'img/form_show.png',

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

                {header: '发放年月', dataIndex: 'grantdate',width: 100,renderer: function (val, obj, record) {
                    var yearindex=val.indexOf("00-00");
                    if(yearindex>0){
                       return val.substring(0,yearindex-1)+"第十三月";
                    }
                    else{
                        var time =Ext.Date.parse(val, "Y-m-d");
                        val = Ext.util.Format.date(time, 'Y-m');
                        return val;
                    }

                }},
                {header: '行政区划', dataIndex: 'division',align:'center',width: 200},
                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 150},

                {header: '申请类别',align:'center',dataIndex:'applytype'},
                {header: '家庭类别',align:'center',dataIndex:'familytype',width:70},

                {header: '家庭类别',align:'center',dataIndex:'familytype',width:70},
                {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',width:70},
                {header: '调整金额',align:'center',dataIndex:'adjustmoney',width:70},
                {header: '家庭人数',align:'center',dataIndex:'familynum',width:70},
                {header: '享受人数',align:'center',dataIndex:'enjoynum',width:70},
                {header: '发放人',align:'center',dataIndex:'grantuser'},
                {header: '发放日期',align:'center',dataIndex:'grantdate',width:100,renderer: function (val, obj, record) {
                    var yearindex=val.indexOf("00-00");
                    if(yearindex>0){
                        return val.substring(0,yearindex-1)+"第十三月";
                    }
                    else{
                        var time =Ext.Date.parse(val, "Y-m-d");
                        val = Ext.util.Format.date(time, 'Y-m-d');
                        return val;
                    }

                }},
                {header: '数据生成日期',align:'center',dataIndex:'granttime',width:120,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '业务id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            tbar:[
                {
                    xtype: 'textfield',
                    hidden: false,
                    width:200,
                    //size:40,
                    listeners: {

                        "specialkey": function (field, e) {
                            if (e.keyCode == 13) {
                                var keyword = field.getValue().replace(/\s+/g, "");
                                var panel=this.up('panel');
                                var store=panel.getStore();
                                var bgdate=panel.down('#bgdate').getRawValue();
                                var eddate=panel.down('#eddate').getRawValue();
                                store.proxy.extraParams.bgdate=bgdate;
                                store.proxy.extraParams.eddate=eddate;
                                store.proxy.extraParams.keyword = keyword;
                                store.proxy.extraParams.name=null;
                                store.proxy.extraParams.logic=null;
                                store.proxy.extraParams.compare=null;
                                store.proxy.extraParams.value=null;
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
                            var bgdate=panel.down('#bgdate').getRawValue();
                            var eddate=panel.down('#eddate').getRawValue();
                            store.proxy.extraParams.bgdate=bgdate;
                            store.proxy.extraParams.eddate=eddate;
                            store.proxy.extraParams.keyword = keyword;
                            store.proxy.extraParams.name=null;
                            store.proxy.extraParams.logic=null;
                            store.proxy.extraParams.compare=null;
                            store.proxy.extraParams.value=null;
                            store.loadPage(1);
                        }
                    }

                },
                {
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
                },
                {
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
                    blankText : '请输选择结束日期',
                    hidden:true,
                    xtype: 'datefield',
                    itemId:'eddate',
                    //itemId: 'personbirthday',
                    format: 'Y-m-d',
                    //value: Ext.Date.format(new Date(), 'Y-m-d'),
                    allowBlank: true
                },

                /*{
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

                },*/
                '->',
                {
                    text: '高级检索',
                    action:'moresearch',
                    searchtype:'moresearchgrantmoney'

                },
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


                '-',
                {
                    text: '新增',
                    hidden:!CommonFunc.lookup(processRoleBtn,
                        {name:"name",value:"资金发放"}),
                    action:'newgrant'

                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.GrantMoneyStore',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                beforePageText:'第',
                afterPageText:'页，共{0}页',
                emptyMsg: "无待办事务"/*,
                items:[
                    '-',

                ]*/
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
