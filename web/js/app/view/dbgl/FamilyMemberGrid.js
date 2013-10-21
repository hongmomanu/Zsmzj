/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.FamilyMemberGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familymembergrid',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            saveBtnText  : '确定',
            cancelBtnText: '取消',
            listeners: {
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
                    if(enjoyitem)enjoyitem.setValue(enjoyednum);
                    if(disableditem)disableditem.setValue(disablednum);
                    if(obj.record.get('relationship')=='户主'){
                        var owernameitem=form.down('#owername');
                        var oweriditem=form.down('#owerid');
                        owernameitem.setValue(obj.record.get("name"));
                        oweriditem.setValue(obj.record.get("personid"));
                    }


                },
                canceledit: function(grid,obj){
                }

            },
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
            columns: [

                {
                    header: '与户主关系*',
                    dataIndex: 'relationship',
                    locked   : true,
                    width:150,
                    //flex: 1,
                    summaryType: 'count',//求数量
                    summaryRenderer: function(value){
                        return '家庭成员数：'+value
                    },
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        xtype:'dbglaplytype',
                        listeners: {
                            change: function (combo,newValue, oldValue, eOpts) {

                                var store=this.up('grid').getStore();
                                var hasower=false;
                                Ext.each(store.data.items,function(item){
                                    if(item.get('relationship')=='户主'){
                                        hasower=true;
                                    }
                                });
                                if(hasower&&newValue=='户主'){
                                    Ext.Msg.alert("提示信息", "户主必须唯一");
                                    this.setValue(oldValue  );
                                }
                                testobj=this;

                            }
                        },
                        searchtype:"dbglrelationship",
                        allowBlank: false
                    }
                }, {
                    header: '姓名*',
                    //itemId:'name',
                    dataIndex: 'name',
                    //width: 160,
                    editor: {

                        allowBlank: false
                        //vtype: 'email'
                    }
                },  {
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
                    }
                },{
                    xtype: 'datecolumn',
                    header: '出生日期',
                    dataIndex: 'birthday',
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
                    header: '年龄',
                    dataIndex: 'age',
                    /*renderer: function (val, obj, record) {
                        //console.log(obj);
                        if(record.get('birthday')&&record.get('birthday')!=""){
                            var birthday =Ext.Date.parse(record.get('birthday'), "Y-m-dTH:i:s");
                            var d=new Date();
                            //val = Ext.util.Format.date(time, 'Y-m-d H:i');
                            return d.getFullYear()-birthday.getFullYear();
                        }
                        else{
                            return "";
                        }
                    },*/
                    editor: {
                        itemId: 'personage',
                        xtype:'textfield',
                        //disabled:true,
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '是否享受*',
                    dataIndex: 'isenjoyed',
                    //width: 160,
                    editor: {
                        allowBlank: false,
                        xtype:'dbglaplytype',
                        listeners:{
                            //scope: this,
                            'select': function (combo, records) {
                                var value=combo.getValue();
                                if(value==='不享受'){
                                    combo.nextNode().setDisabled(false);
                                    combo.nextNode().setReadOnly(false);
                                }
                                else{
                                    combo.nextNode().setValue("");
                                    combo.nextNode().setReadOnly(true);

                                    //combo.nextNode().setDisabled(true);
                                }

                            }
                        },
                        searchtype:"isenjoyed"
                        //vtype: 'email'
                    }
                },
                {
                    header: '不享受原因*',
                    //hidden:true,
                    //disabled :true,
                    dataIndex: 'noenjoyedreason',
                    //width: 160,
                    editor: {
                        disabled:true,
                        allowBlank: true
                    }
                },

                {
                    header: '分类管理*',
                    dataIndex: 'persontype',
                    //width: 160,
                    editor: {
                        allowBlank: false,
                        xtype:'dbglaplytype',
                        searchtype:"poortype"
                        //vtype: 'email'
                    }
                },
                {
                    header: '是否可推荐就业*',
                    dataIndex: 'jobstatus',
                    //width: 160,
                    editor: {
                        allowBlank: false,
                        xtype:'dbglaplytype',
                        searchtype:"isjobstatus"
                        //vtype: 'email'
                    }
                },
                {
                    header: '健康状况*',
                    dataIndex: 'bodystatus',
                    //width: 160,
                    editor: {
                        allowBlank: false,
                        xtype:'dbglaplytype',
                        searchtype:"bodystatus"
                        //vtype: 'email'
                    }
                },
                /*{
                    header: '特定救助对象',
                    dataIndex: 'specialobject',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },*/
                {
                    header: '工作单位',
                    dataIndex: 'workunits',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },

                {
                    xtype: 'numbercolumn',
                    header: '月收入',
                    dataIndex: 'monthlyincome',
                    format: '¥0,0',
                    width: 90,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        maxValue: 150000
                    }
                },
                {
                    header: '户口性质',
                    dataIndex: 'accounttype',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },

                {
                    header: '婚姻状况',
                    dataIndex: 'maritalstatus',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },
                {
                    header: '就学阶段',//'文化程度',
                    dataIndex: 'education',
                    //width: 160,
                    editor: {
                        allowBlank: true,
                        xtype:'dbglaplytype',
                        searchtype:"education"
                        //vtype: 'email'
                    }
                },
                {
                    header: '政治面貌',
                    dataIndex: 'political',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },
                {
                    header: '残疾类别',
                    dataIndex: 'disabledtype',
                    //width: 160,

                    editor: {
                        allowBlank: true,
                        xtype:'dbglaplytype',
                        searchtype:"disabledtype"
                        //vtype: 'email'
                    }
                },
                {
                    header: '残疾等级',
                    dataIndex: 'disabledlevel',
                    //width: 160,
                    editor: {
                        allowBlank: true,
                        xtype:'dbglaplytype',
                        searchtype:"disabledlevel"
                        //vtype: 'email'
                    }
                },
                /*{
                    header: '就学阶段',
                    dataIndex: 'studylevel',
                    //width: 160,
                    editor: {
                        allowBlank: false,
                        xtype:'dbglaplytype',
                        searchtype:"studylevel"
                        //vtype: 'email'
                    }
                },*/
                {
                    header: '残疾证号',
                    dataIndex: 'disablenum',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                }

            ],
            tbar: [{
                text: '新增家庭成员',
                iconCls: 'employee-add',
                action:'addnewperson'

            }, {
                itemId: 'removePerson',
                text: '删除家庭成员',
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
        ZSMZJ.view.dbgl.FamilyMemberGrid.selectionModel = this.getSelectionModel();


    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
