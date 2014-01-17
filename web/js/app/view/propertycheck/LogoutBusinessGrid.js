/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-23
 * Time: 上午9:38
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.propertycheck.LogoutBusinessGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.propertychecklogoutbusinesspanel',
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
            /*features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],*/
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
                            if(Ext.get(id0)){
                                Ext.widget('button', {
                                    renderTo: id0,
                                    margin: '0 5 0 5',
                                    text: '修改',
                                    icon:'img/busiicon/change.png',
                                    hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                     ||r.get('processstatus').toString()==processdiction.stepback),
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"修改"}),
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


                        var id1 = Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id1)){
                                Ext.widget('button', {
                                    renderTo: id1,
                                    margin: '0 5 0 5',
                                    icon:'img/process.png',
                                    text: '流程' ,
                                    width: 55,
                                     hidden: r.get('processstatus').toString()==processdiction.stepzero||
                                     r.get('processstatus').toString()==processdiction.stepback,
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"流程"}),
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
                            }

                        }, 50);

                        var id2=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id2)){
                                Ext.widget('button', {
                                    renderTo: id2,
                                    text: '查看',
                                    margin: '0 5 0 5',
                                     hidden:(r.get('processstatus').toString()==processdiction.stepzero),
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"查看"}),
                                    icon:'img/form_show.png',
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

                        var id5=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id5)){
                                Ext.widget('button', {
                                    renderTo: id5,
                                    margin: '0 5 0 5',
                                    text: '提交',
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"提交"}),
                                    icon:'img/busiicon/busiapproval.png',
                                    width: 55,
                                    listeners: {
                                        render: function(c){
                                            c.getEl().on('click', function(){
                                                me.up('panel').fireEvent('businessclick', c,r,me);

                                            }, c);
                                        }

                                    }
                                });
                            }

                        }, 50);




                        var id3=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id3)){
                                Ext.widget('button', {
                                    renderTo: id3,
                                    text: '删除',
                                    margin: '0 5 0 5',
                                    icon:'img/busiicon/del.gif',
                                    hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                     ||r.get('processstatus').toString()==processdiction.stepback),
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"删除"}),
                                    width: 55,
                                    listeners: {

                                        render: function(c){
                                            c.getEl().on('click', function(){
                                                me.up('panel').fireEvent('delclick', c,r,me);

                                            }, c);
                                        }

                                    }
                                });
                            }

                        }, 50);

                        var id4=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id4)){
                                Ext.widget('button', {
                                    renderTo: id4,
                                    text: '取消',
                                    icon:'img/sp.gif',
                                    //hidden:!(r.get('processstatus').toString()==processdiction.stepone),
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"取消"}),
                                    width: 55,
                                    margin: '0 5 0 5',
                                    listeners: {

                                        render: function(c){
                                            c.getEl().on('click', function(){

                                                me.up('panel').fireEvent('cancelclick', c,r,me);
                                            }, c);
                                        }

                                    }
                                });
                            }

                        }, 50);

                        return Ext.String.format('<span id="{0}"></span>' +
                            '<span id="{1}"></span><span id="{2}"></span>' +
                            '</span><span id="{5}"></span>'+
                            '<span id="{3}" ></span>'+
                            '<span id="{4}" ></span>',id0, id1,id2,id3,id4,id5);
                    }
                },
                {header: '状态',align:'center',dataIndex:'processstatus',width:70,renderer:function(val, obj, record){
                    if(val==processdiction.steptwo)return val+"中";
                    else return "已"+val;

                }},
                {header: '户主姓名',align:'center',dataIndex:'owername',width:70},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 150},
                {header: '收入合计',align:'center',dataIndex:'incomesum',itemId:'incomesum',width:70},
                {header: '财产合计',align:'center',dataIndex:'propertysum',itemId:'propertysum',width:70},
                {header: '住房总使用面积',align:'center',dataIndex:'houseusearea',itemId:'houseusearea',width:100},
                {header: '操作',align:'center',dataIndex:'processstatustype',itemId:'processstatustype',width:70},
                {header: '核定状态',align:'center',dataIndex:'checkstatus',itemId:'checkstatus',
                    renderer:function(v, m, r){
                        var rs='';
                        switch (parseInt(v)){
                            case 0: rs='未核定';break;
                            case 1:;
                            case 2: rs='核定中';break;
                            case 3: rs='核定完成';break;
                            default:;
                        }
                        return rs;
                    }
                },
                {header: '审核人',align:'center',dataIndex:'approvaluser'},
                {header: '行政区划',align:'center',dataIndex:'division',itemId:'division',width:200},
                {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
                {header: '户口所在地',align:'center',dataIndex:'accountaddress',itemId:'accountaddress',width:150},
                {header: '实际居住地',align:'center',dataIndex:'realaddress',itemId:'realaddress',width:150},
                {header: '家庭总人口',align:'center',dataIndex:'households',itemId:'households'},
                {header: '联系电话',align:'center',dataIndex:'telnum',itemId:'telnum',width:120},
                {header: '开户银行',align:'center',dataIndex:'bank',itemId:'bank'},
                {header: '开户人',align:'center',dataIndex:'bankower',itemId:'bankower'},
                {header: '银行账号',align:'center',dataIndex:'bankid',itemId:'bankid',width:120}




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
                store: 'propertycheck.LogoutBusinesses',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                beforePageText:'第',
                afterPageText:'页，共{0}页',
                emptyMsg: "无记录",
                items:[

                ]
            }),
            store: 'propertycheck.LogoutBusinesses'//'dbgl.NeedToDoBusinesses'

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
