/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.disaster.EscapingMemberGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.escapingmembergrid',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            saveBtnText  : '确定',
            cancelBtnText: '取消',
            /*listeners: {
                edit: function(editor,obj,objold){
                    var famlygrid=editor.grid;
                    var form=famlygrid.up('form');

                    var store=famlygrid.getStore();
                    var enjoyednum=0;
                    var disablednum=0;
                    Ext.each(store.data.items,function(a){
                       if(a.get("isenjoyed")==isenjoyedtype.yes)enjoyednum++;
                       if(disabledtype.heavy.indexOf(a.get("disabledlevel"))>0)disablednum++;
                    });
                    var enjoyitem=form.down('#enjoyPersons');
                    var disableditem=form.down('#disabledpersons');
                    enjoyitem.setValue(enjoyednum);
                    disableditem.setValue(disablednum);
                    if(obj.record.get('relationship')=='户主'){
                        var owernameitem=form.down('#owername');
                        var oweriditem=form.down('#owerid');
                        owernameitem.setValue(obj.record.get("name"));
                        oweriditem.setValue(obj.record.get("personid"));
                    }


                },
                canceledit: function(grid,obj){
                }

            },*/
            autoCancel: false
        });
        var strore=Ext.widget('familymembers');
        //this.rowEditing=rowEditing;

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
            //姓名  身份证号码，性别 人员来源，所避灾害种类 入场所时间，出场所时间
            columns: [

                {
                    header: '姓名*',
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
                    header: '身份证号*',
                    //itemId:'userpersonid',
                    dataIndex: 'personid',
                    //width: 160,
                    editor: {
                        vtype:'personid',
                        //emptyText: '输入身份证号',
                        blankText: '输入身份证号',
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '性别*',
                    dataIndex: 'sex',
                    //width: 160,
                    editor: {
                        xtype:'dbglaplytype',
                        searchtype:"dbglsex",
                        allowBlank: false
                        //vtype: 'email'
                    }              //人员来源，所避灾害种类 入场所时间，出场所时间
                },{
                    header: '人员来源*',
                    dataIndex: 'personresource',
                    //width: 160,
                    editor: {
                        xtype:'dbglaplytype',
                        searchtype:"personresource",
                        allowBlank: true
                        //vtype: 'email'
                    }              //所避灾害种类 入场所时间，出场所时间
                },{
                    header: '所避灾害种类',
                    dataIndex: 'disastertype',
                    //width: 160,
                    editor: {
                        xtype:'dbglaplytype',
                        searchtype:"disastertype",
                        allowBlank: true
                        //vtype: 'email'
                    }              //入场所时间，出场所时间
                },{
                    xtype: 'datecolumn',
                    header: '入场所时间',

                    dataIndex: 'disasterintime',
                    format: 'Y-m-d',
                    //dateFormat: 'c',

                    renderer: function (val, obj, record) {
                        var time =Ext.Date.parse(val, "Y-m-dTH:i:s");
                        val = Ext.util.Format.date(time, 'Y-m-d');
                        return val;
                    },
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
                    xtype: 'datecolumn',
                    header: '出场所时间',
                    dataIndex: 'disasterouttime',
                    format: 'Y-m-d',
                    renderer: function (val, obj, record) {
                        var time =Ext.Date.parse(val, "Y-m-dTH:i:s");
                        val = Ext.util.Format.date(time, 'Y-m-d');
                        return val;
                    },
                    //dateFormat: 'c',

                    //width: 105,

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
                }


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
        ZSMZJ.view.disaster.EscapingMemberGrid.selectionModel = this.getSelectionModel();


    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
