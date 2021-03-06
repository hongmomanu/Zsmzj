
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.LogoutBusinessGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.logoutbusinesspanel',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            stype:processstatustype.logout,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                getRowClass: manangerRowClass,
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
                            if(Ext.get(id0)){
                                Ext.widget('button', {
                                    renderTo: id0,
                                    margin: '0 5 0 5',
                                    text: '修改',
                                    icon:'img/busiicon/change.png',
                                    /*hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                     ||r.get('processstatus').toString()==processdiction.stepback),*/
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
                                    /* hidden: r.get('processstatus').toString()==processdiction.stepzero||
                                     r.get('processstatus').toString()==processdiction.stepback,*/
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
                                    /* hidden:(r.get('processstatus').toString()==processdiction.stepzero),*/
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
                                    //hidden:!(r.get('processstatus').toString()==processdiction.stepzero),
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
                                    /*hidden:!(r.get('processstatus').toString()==processdiction.stepzero
                                     ||r.get('processstatus').toString()==processdiction.stepback),*/
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

                        var id6=Ext.id();
                        Ext.defer(function () {
                            if(Ext.get(id6)){
                                Ext.widget('button', {
                                    renderTo: id6,
                                    text: '取消审核',
                                    icon:'img/sp.gif',
                                    //hidden:!(r.get('processstatus').toString()==processdiction.stepone),
                                    hidden:!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                                        {name:"name",value:r.get("processstatus")}).children,
                                        {name:"name",value:"取消审核"}),
                                    width: 70,
                                    margin: '0 5 0 5',
                                    listeners: {

                                        render: function(c){
                                            c.getEl().on('click', function(){

                                                me.up('panel').fireEvent('cancelprocessdictiontwo', c,r,me);
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
                            '<span id="{4}" ></span>'+
                            '<span id="{6}" ></span>',id0, id1,id2,id3,id4,id5,id6);
                    }
                },
                //{header: '审批名称', dataIndex: 'rolename',width: 150},
                ////行政区划 户主姓名 户主身份证 申请类别 家庭类别 救助金额 救助开始日期 救助结束日期 家庭人数 享受人数 状态 状态描述 审核人 审核日期 制单人
                {header: '状态',align:'center',dataIndex:'processstatus',width:70,renderer:function(val, obj, record){


                    if (val==processdiction.stepzero) return "未提交";
                    else if(val==processdiction.steptwo)return val+"中";
                    else return "已"+val;

                }},
                {header: '行政区划', dataIndex: 'division',align:'center',width: 200},
                {header: '市',hidden:true, dataIndex: 'city',align:'center',width: 250,renderer:function(val, obj, record){
                    var re=/[^市]+(市)/g;
                    var revillage=/[^乡镇街道]+(社区|村)/g;
                    var retown=/[^区县级]+(乡|镇|街道)/g;
                    var division=record.get('division');
                    division=division.replace(division.match(revillage)?division.match(revillage)[0]:"","");
                    division=division.replace(division.match(retown)?division.match(retown)[0]:"","");
                    var result=division.match(re)?division.match(re)[0]:division;
                    (function (result,record){
                        function fn(){
                            record.raw.city=result
                        }
                        var task = new Ext.util.DelayedTask(fn);
                        task.delay(5);
                    })(result,record);
                    //record.set('city',division);
                    return result;
                }},
                {header: '区/县',hidden:true, dataIndex: 'county',align:'center',width: 250,renderer:function(val, obj, record){
                    var re=/[^市]+(市)/g;
                    var revillage=/[^乡镇街道]+(社区|村)/g;
                    var retown=/[^区县级]+(乡|镇|街道)/g;
                    var division=record.get('division');
                    division=division.replace(division.match(revillage)?division.match(revillage)[0]:"","");
                    division=division.replace(division.match(retown)?division.match(retown)[0]:"","");
                    division=division.replace(division.match(re)?division.match(re)[0]:"","");
                    //record.set('county',division);
                    (function (result,record){
                        function fn(){
                            record.raw.county=result
                        }
                        var task = new Ext.util.DelayedTask(fn);
                        task.delay(5);
                    })(division,record);
                    return division;
                }},
                {header: '乡/镇', hidden:true,dataIndex: 'town',align:'center',width: 250,renderer:function(val, obj, record){
                    var re=/[^区县级]+(乡|镇|街道)/g;
                    var result=record.get('division').match(re)?record.get('division').match(re)[0]:"";
                    (function (result,record){
                        function fn(){
                            record.raw.town=result
                        }
                        var task = new Ext.util.DelayedTask(fn);
                        task.delay(5);
                    })(result,record);
                    //record.set('town',result);
                    return result;
                }},

                {header: '村/社区',hidden:true, dataIndex: 'village',align:'center',width: 250,renderer:function(val, obj, record){
                    var re=/[^乡镇街道]+(社区|村)/g;
                    var result=record.get('division').match(re)?record.get('division').match(re)[0]:"";
                    //Ext.suspendLayouts();
                    (function (result,record){
                        function fn(){
                            record.raw.village=result
                        }
                        var task = new Ext.util.DelayedTask(fn);
                        task.delay(5);
                    })(result,record);
                    return result;
                }},
                {header: '户主姓名',align:'center',dataIndex:'owername',width:70},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 150},
                //变更前人数	变更前金额	变更后人数	变更后金额	变更日期	变更原因	状态	状态描述	审核人	审核日期	制单人	制单日期
                //家庭类别	注销日期	注销原因
                {header: '申请类别',align:'center',dataIndex:'applytype'},
                /*{header: '家庭类别',align:'center',dataIndex:'familytype'},*/

                {header: '分类管理',align:'center',dataIndex:'poortype',itemId:'familytype'},
                {header: '注销日期',align:'center',dataIndex:'logoutdate'},

                {header: '注销原因',align:'center',dataIndex:'logoutreason'},
                {header: '审核人',align:'center',dataIndex:'approvaluser'},
                {header: '审核日期',align:'center',dataIndex:'approvaltime',width:120,renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }},
                {header: '制单人',align:'center',dataIndex:'displayname'},
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
                            store.proxy.extraParams.name=null;
                            store.proxy.extraParams.logic=null;
                            store.proxy.extraParams.compare=null;
                            store.proxy.extraParams.value=null;

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
                {xtype:'squareshapeddiv'},
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
                store: 'dbgl.LogoutBusinesses',
                displayInfo: true,
                displayMsg: '显示待办事务 {0} - {1} of {2}',
                emptyMsg: "无待办事务",
                items:[


                ]
            }),
            store: 'dbgl.LogoutBusinesses'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.LogoutBusinessGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
