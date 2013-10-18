/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.disaster.EscapingSuppliesGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.escapingsuppliesgrid',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            saveBtnText  : '确定',
            cancelBtnText: '取消',

            autoCancel: false
        });
        var strore=Ext.widget('familymembers');

        Ext.apply(this, {
            border: false,
            //autoScroll: true,

            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                //autoFit : true,
                enableTextSelection:true,
                stripeRows: true
            },


            columnLines: true,

            features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],
            store:strore,
            //品名  数量， 单位 购入时间 购入使用资金
            columns: [


                {
                    header: '品名*',
                    dataIndex: 'name',
                    locked   : true,
                    width:150,
                    //flex: 1,
                    summaryType: 'count',//求数量
                    summaryRenderer: function(value){
                        return '避灾对象总数：'+value
                    },
                    editor: {

                        allowBlank: false
                        //vtype: 'email'
                    }

                }, {
                    header: '数量',
                    //itemId:'userpersonid',
                    dataIndex: 'suppliesnum',
                    //width: 160,
                    editor: {

                        allowBlank: true
                        //vtype: 'email'
                    }
                },
                {
                    dataIndex: 'unit',
                    header: '单位',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }              //人员来源，所避灾害种类 入场所时间，出场所时间
                },{
                    xtype: 'datecolumn',
                    header: '购入时间',
                    dataIndex: 'suppliesbuytime',
                    renderer: function (val, obj, record) {
                        var time =Ext.Date.parse(val, "Y-m-dTH:i:s");
                        val = Ext.util.Format.date(time, 'Y-m-d');
                        return val;
                    },
                    format: 'Y-m-d',
                    //dateFormat: 'c',

                    //width: 105,

                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        itemId: 'personbirthday',
                        //format: 'Y-m-d',
                        renderer: function (val, obj, record) {
                            var time =Ext.Date.parse(val, "Y-m-dTH:i:s");
                            val = Ext.util.Format.date(time, 'Y-m-d');
                            return val;
                        },
                        minValue: '1900-01-01',
                        minText: 'Cannot have a start date before the company existed!',
                        maxValue: Ext.Date.format(new Date(), 'Y-m-d')
                    }
                },
                {
                    header: '购入资金',
                    dataIndex: 'suppliesmoney',
                    //width: 160,
                    editor: {
                        allowBlank: true
                    }
                }
                /*

                {
                    header: '品名*',
                    dataIndex: 'name',
                    width:150,
                    summaryType: 'count',//求数量
                    summaryRenderer: function(value){
                        return '避灾对象总数：'+value
                    },
                    editor: {

                        allowBlank: false
                    }

                }, {

                    editor: {

                        regexText  : "只能输入数值",
                        allowBlank: true
                    },
                    dataIndex: 'suppliesnum',
                    header: '数量'

                }, {
                    dataIndex: 'unit',
                    header: '单位',
                    editor: {

                        allowBlank: false
                        //vtype: 'email'
                    }
                },{
                    xtype: 'datecolumn',
                    header: '购入时间',
                    dataIndex: 'suppliesbuytime',
                    format: 'Y-m-d',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        //format: 'Y-m-d',
                        renderer: function (val, obj, record) {
                            var time =Ext.Date.parse(val, "Y-m-dTH:i:s");
                            val = Ext.util.Format.date(time, 'Y-m-d');
                            return val;
                        },
                        minValue: '1900-01-01',
                        minText: 'Cannot have a start date before the company existed!',
                        maxValue: Ext.Date.format(new Date(), 'Y-m-d')
                    }
                }, {
                    dataIndex: 'suppliesmoney',
                    header: '购入资金',
                    editor: {

                        allowBlank: false
                        //vtype: 'email'
                    },
                    allowBlank: true
                }*/


            ],
            tbar: [{
                text: '新增避灾对象',
                iconCls: 'employee-add',
                action:'addnewperson'

            }, {
                itemId: 'removePerson',
                text: '删除避灾对象',
                iconCls: 'employee-remove',
                action:'delperson',

                disabled: true
            }],
            plugins: [rowEditing],
            flex: 1,
            listeners: {
                'selectionchange': function(view, records) {
                    this.down('#removePerson').setDisabled(!records.length);
                    //grid.down('#removeEmployee').setDisabled(!records.length);
                }
            }

        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.disaster.EscapingSuppliesGrid.selectionModel = this.getSelectionModel();


    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
