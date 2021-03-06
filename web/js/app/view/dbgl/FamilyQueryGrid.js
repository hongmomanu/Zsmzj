
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.FamilyQueryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familyquerypanel',
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
                loadingText: '读取中...',
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


                /*{header: '申请类别',align:'center',dataIndex:'applytype',itemId:'applytype'},
                {header: '业务类型',align:'center',dataIndex:'businesstype',itemId:'businesstype'},
                {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},
                {header: '救助性质',align:'center',dataIndex:'helpnature',itemId:'helpnature'},
                {header: '医保性质',align:'center',dataIndex:'medicarenature',itemId:'medicarenature'},


                {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
                {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
                    summaryRenderer: function(value){
                        return '总金额:'+value
                    }},
                {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
                {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
                {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
                    summaryRenderer: function(value){
                        return '总人数:'+value
                    }},

                {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

                {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

                {header: '享受人数',align:'center',dataIndex:'enjoynum'},
                {header: '开户人',align:'center',dataIndex:'bankower'},
                {header: '银行帐号',align:'center',dataIndex:'bankid'},
                {header: '救助证编号',align:'center',dataIndex:'aidnum'},


                {header: '联系人1',dataIndex: 'conectperson',align:'center'},
                {dataIndex: 'telnum',align:'center',header:'联系人1电话'},
                {dataIndex: 'conectperson2',align:'center',header:'联系人2'},
                {dataIndex: 'telnum2',align:'center',header:'联系人2电话'},
                {dataIndex: 'windresistance',align:'center',header:'抗风能力'},
                {dataIndex: 'earthquakeresistance',align:'center',header:'抗震能力'},
                {dataIndex: 'housestructure',align:'center',header:'结构'},
                {dataIndex: 'escapingnum',align:'center',header:'避灾人数'},
                {dataIndex: 'houseusearea',align:'center',header:'使用面积'},
                {dataIndex: 'housearea',align:'center',header:'建筑面积'},
                {dataIndex: 'coverage',align:'center',header:'覆盖范围'},*/
                {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

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
                    emptyText: '输入身份证或者姓名'

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
