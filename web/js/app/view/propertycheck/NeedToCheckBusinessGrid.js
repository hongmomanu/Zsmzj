/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-23
 * Time: 上午9:38
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.propertycheck.NeedToCheckBusinessGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.propertycheckneedtocheckbusinesspanel',
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
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },
            columns: [


                {header: '业务操作', width: 230,locked : true,summaryType: 'count', align:'center',//求数量
                    summaryRenderer: function(value){
                        return '本页合计'
                    },
                    renderer: function (v, m, r) {
                        var me=this;
                        var id0=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id0)){
                                Ext.widget('button', {
                                    renderTo: id0,
                                    margin: '0 5 0 5',
                                    text: '核定',
                                    icon:'img/busiicon/change.png',
                                    hidden:r.data.checkresult==1,
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
                        var id1=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id1)){
                                Ext.widget('button', {
                                    renderTo: id0,
                                    margin: '0 5 0 5',
                                    text: '查看',
                                    icon:'img/form_show.png',
                                    hidden:false,
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




                        return Ext.String.format('<span id="{0}"></span>'+
                            '<span id="{1}" ></span>',id0,id1);
                    }
                },
                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '核定',align:'center',dataIndex:'checkresult',itemId:'checkresult',
                    renderer:function(v, m, r){
                        if(r.data.checkresult=='1'){
                            return '通过'
                        }else{
                            return '未通过'
                        }
                    }
                } ,
                {header: '备注',align:'left',dataIndex:'checkcomment',itemId:'checkcomment',width:200},
                {header: '收入合计',align:'center',dataIndex:'incomesum',itemId:'incomesum'},
                {header: '财产合计',align:'center',dataIndex:'propertysum',itemId:'propertysum'},
                {header: '住房总使用面积',align:'center',dataIndex:'houseusearea',itemId:'houseusearea'},
                {header: '行政区划',align:'center',dataIndex:'division',itemId:'division'},
                {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
                {header: '户口所在地',align:'center',dataIndex:'accountaddress',itemId:'accountaddress'},
                {header: '实际居住地',align:'center',dataIndex:'realaddress',itemId:'realaddress'},
                {header: '家庭总人口',align:'center',dataIndex:'households',itemId:'households'},
                {header: '联系电话',align:'center',dataIndex:'telnum',itemId:'telnum'},
                {header: '开户银行',align:'center',dataIndex:'bank',itemId:'bank'},
                {header: '开户人',align:'center',dataIndex:'bankower',itemId:'bankower'},
                {header: '银行账号',align:'center',dataIndex:'bankid',itemId:'bankid'}
               /* ,
                {header: '流程状态',align:'center',dataIndex:'processstatus',itemId:'processstatus'},
                {header: '核定状态',align:'center',dataIndex:'checkstatus',itemId:'checkstatus'}*/



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
                            var panel=this.up('panel');
                            var store=panel.getStore();
                            var bgdate=panel.down('#bgdate').getRawValue();
                            var eddate=panel.down('#eddate').getRawValue();
                            store.proxy.extraParams.bgdate=bgdate;
                            store.proxy.extraParams.eddate=eddate;
                            var keyword = field.getValue().replace(/\s+/g, "");
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
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'propertycheck.FamilyPropertyQuerys',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                beforePageText:'第',
                afterPageText:'页，共{0}页',
                emptyMsg: "无记录",
                items:[

                ]
            }),
            store: 'propertycheck.FamilyPropertyQuerys'//'dbgl.NeedToDoBusinesses'

        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.propertycheck.NeedToDoBusinessGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
