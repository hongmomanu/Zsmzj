/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-23
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.TheSameMonthBusinessFamilyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.thesamemonthbusinessfamilygrid',
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
            stype:businessTableType.dbgl,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                loadingText: '读取中...',
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
                {header: '户主姓名',align:'center',dataIndex:'owername',locked : true, name:'tests',
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
                                            testobj=me.up('panel');
                                            me.up('panel').fireEvent('alterclick', c,r,me);
                                        }, c);
                                    }

                                }
                            });
                        }

                    }, 50);



                    return Ext.String.format('<span id="{0}"></span>',id0);
                }},

                //行政区划名称	户主姓名	户主身份证	申请类别	家庭户口性质	家庭类别	低保户类型
                // 家庭人数	享受人数	救助开始日期	救助金额	开户人	银行帐号	救助证编号


                {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
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
                {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
                {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

            ],
            flex: 1,
            tbar:[
                {
                    fieldLabel: '年份',
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    itemId:'thesamemonth_year',
                    labelWidth: 30,
                    width: 120,
                    listeners:{
                        afterrender:function(c){
                            this.setValue(new Date().getFullYear())
                        }
                    },
                    store:Ext.create('Ext.data.Store', {
                        fields: [ 'name'],
                        data : [
                            {"name":"2014"},
                            {"name":"2013"},
                            {"name":"2012"},
                            {"name":"2011"},
                            {"name":"2010"},
                            {"name":"2009"}
                        ]
                    })
                },{
                    fieldLabel: '月份',
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    itemId:'thesamemonth_month',
                    labelWidth: 30,
                    width: 120,
                    listeners:{
                        afterrender:function(c){
                            var month=new Date().getMonth()+1;
                            month=month<10?'0'+month:month;
                            this.setValue(month)
                        }
                    },
                    store:Ext.create('Ext.data.Store', {
                        fields: [ 'name'],
                        data : [
                            {"name":"01"},
                            {"name":"02"},
                            {"name":"03"},
                            {"name":"04"},
                            {"name":"05"},
                            {"name":"06"},
                            {"name":"07"},
                            {"name":"08"},
                            {"name":"09"},
                            {"name":"10"},
                            {"name":"11"},
                            {"name":"12"}
                        ]
                    })
                },{
                    text:'查询',
                    listeners:{
                        "click":function(btn){

                            var panel=this.up('panel');
                            var store=panel.getStore();
                            var thesamemonth_year=panel.down('#thesamemonth_year').getRawValue();
                            var thesamemonth_month=panel.down('#thesamemonth_month').getRawValue();
                            var date=new Date(thesamemonth_year,Number(thesamemonth_month),0);
                            var month=date.getMonth()+1;
                            month=month<10?'0'+month:month;
                            var yn=date.getFullYear()+'-'+month;
                            Ext.apply(store.proxy.extraParams,panel.familyqueryparams);
                            store.proxy.extraParams.value[1]=yn;

                            store.loadPage(1);
                        }
                    }

                },
                '-'
                ,{
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
                                var bgdate=panel.down('#bgdate').getRawValue();
                                var eddate=panel.down('#eddate').getRawValue();
                                store.proxy.extraParams.bgdate=bgdate;
                                store.proxy.extraParams.eddate=eddate;
                                store.proxy.extraParams.keyword = keyword;
                                Ext.apply(store.proxy.extraParams,panel.thesamemonthqueryparams);
                                /*store.proxy.extraParams.name=null;
                                store.proxy.extraParams.logic=null;
                                store.proxy.extraParams.compare=null;
                                store.proxy.extraParams.value=null;*/

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
                    itemId:'bgdate',
                    hidden:true,
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
                    searchtype:'moresearchfamily'

                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.FamilyQuerys',
                displayInfo: true,
                displayMsg: '显示待家庭 {0} - {1} of {2}',
                emptyMsg: "无家庭数据",
                items:[

                ]
            }),
            store: 'dbgl.FamilyQuerys'

        });
        this.callParent(arguments);
        ZSMZJ.view.dbgl.PeopleQueryGrid.selectionModel = this.getSelectionModel();

    }

});
