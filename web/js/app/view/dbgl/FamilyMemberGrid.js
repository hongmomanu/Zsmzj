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
                        allowBlank: false
                    }
                }, {
                    header: '姓名*',
                    dataIndex: 'name',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },  {
                    header: '身份证*',
                    dataIndex: 'personid',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '性别*',
                    dataIndex: 'sex',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },{
                    xtype: 'datecolumn',
                    header: '出生日期',
                    dataIndex: 'birthday',
                    format: 'Y-m-d',

                    //width: 105,

                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        itemId: 'personbirthday',
                        format: 'Y-m-d',
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
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '人员类别*',
                    dataIndex: 'persontype',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '职业状况*',
                    dataIndex: 'jobstatus',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '健康状况*',
                    dataIndex: 'bodystatus',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '特定救助对象',
                    dataIndex: 'specialobject',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },
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
                    header: '文化程度',
                    dataIndex: 'education',
                    //width: 160,
                    editor: {
                        allowBlank: true
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
                        allowBlank: true
                        //vtype: 'email'
                    }
                },
                {
                    header: '残疾等级',
                    dataIndex: 'disabledlevel',
                    //width: 160,
                    editor: {
                        allowBlank: true
                        //vtype: 'email'
                    }
                },
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
