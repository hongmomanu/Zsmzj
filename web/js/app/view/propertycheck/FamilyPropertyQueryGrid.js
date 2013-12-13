/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-20
 * Time: 上午9:40
 * commont:现在不在使用
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.propertycheck.FamilyPropertyQueryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familypropertyquerygrid',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },

    initComponent: function() {
        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            columns: [{
                xtype: 'checkcolumn',
                text: 'Active',
                dataIndex: 'id'
            }]});
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        //下拉框数据,测试数据。
        var checkselect = Ext.create('Ext.data.Store', {
            fields: ['sid', 'name'],
            data : [
                {"sid":"0","name":"不通过"},
                {"sid":"1","name":"通过"}
            ]
        });
        var isEdit = false;

        Ext.apply(this, {
            isnewgrid:true,
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
            columns: [


                Ext.create('Ext.grid.RowNumberer'),

                {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
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
                //{ xtype : 'checkcolumn', text : '', dataIndex : 'Active' ,width:20},
                {header: '户主身份证', dataIndex: 'owerid',align:'center',width: 150},

                {header: '核定结果', dataIndex: 'select',align:'center',width: 100,
                    field: {
                        xtype: 'combobox',
                        store: checkselect,
                        displayField:'name',
                        valueField:'sid',
                        id:'checkresult',
                        value:1,
                        //listClass: 'x-combo-list-small',
                        listeners:{
                            select : function(combo, record,index){
                                isEdit = true;
                            },
                            afterrender:function(){

                            }
                        }

                    },
                    renderer:function(value,metadata,record){
                        if(isEdit){
                            var index = checkselect.find(Ext.getCmp('checkresult').valueField,value);
                            var record = checkselect.getAt(index);
                            return record.data.name;
                        }else{
                            return value;
                        }

                    }
                },
                {header: '核定备注', dataIndex: 'comment',align:'center',width: 100,editor: 'textfield'},

                {header: '收入合计', dataIndex: 'incomesum',align:'center',width: 100},
                {header: '财产合计', dataIndex: 'propertysum',align:'center',width: 100},
                {header: '住房总面积', dataIndex: 'housearea',align:'center',width: 100},
                {header: '住房总使用面积', dataIndex: 'houseusearea',align:'center',width: 100},

                {header: '家庭户口', dataIndex: 'familyaccount',align:'center',width: 100},
                {header: '户口所在地', dataIndex: 'accountaddress',align:'center',width: 100},
                {header: '实际居住地', dataIndex: 'realaddress',align:'center',width: 100},
                {header: '家庭总人口', dataIndex: 'households',align:'center',width: 100},
                {header: '联系电话', dataIndex: 'telnum',align:'center',width: 100},
                {header: '开户银行', dataIndex: 'bank',align:'center',width: 100},
                {header: '银行账号', dataIndex: 'bankid',align:'center',width: 100},


                {header: '家庭登记时间', dataIndex: 'time',align:'center',width: 100},
                {header: '行政区划', dataIndex: 'division',align:'center',width: 200}

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
                    text: '删除',
                    action:'delete',
                    arrowAlign:'right'

                },
                '-'
                ,{
                    text: '新增家庭信息',
                    action:'register',
                    arrowAlign:'right'

                },
                '-'
                ,
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
                store: 'propertycheck.FamilyPropertyQuerys',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',

                emptyMsg: "无记录",
                items:[

                ]
            }),
            selModel: selModel,
            plugins:[cellEditing],
            store: 'propertycheck.FamilyPropertyQuerys'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.propertycheck.FamilyPropertyQueryGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
