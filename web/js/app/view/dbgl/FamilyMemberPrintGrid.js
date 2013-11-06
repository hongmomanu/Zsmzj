/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.FamilyMemberPrintGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familymemberprintgrid',
    cls:'navigation-grid',
    requires: [
    ],
    initComponent: function() {

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
                    header: '与户主关系',
                    dataIndex: 'relationship',
                    width:50,
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
                    header: '姓名',
                    dataIndex: 'name',
                    //width: 160,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },  {
                    header: '身份证',
                    dataIndex: 'personid',
                    width: 150,
                    editor: {
                        allowBlank: false
                        //vtype: 'email'
                    }
                },
                {
                    header: '性别',
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
                    format: 'Y-m-d'
                },
                {
                    header: '年龄',
                    dataIndex: 'age'

                },

                {
                    header: '人员类别',
                    dataIndex: 'persontype'
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
                    xtype: 'numbercolumn',
                    header: '月收入',
                    dataIndex: 'monthlyincome',
                    format: '¥0,0'

                },
                {
                    header: '户口性质',
                    dataIndex: 'accounttype'
                },

                {
                    header: '婚姻状况',
                    dataIndex: 'maritalstatus',
                    hidden:true
                    //width: 160,

                },
                {
                    header: '文化程度',
                    dataIndex: 'education',
                    hidden:true
                },
                {
                    header: '政治面貌',
                    dataIndex: 'political',
                    hidden:true
                },
                {
                    header: '残疾类别',
                    dataIndex: 'disabledtype',
                    //width: 160,
                    hidden:true
                },
                {
                    header: '残疾等级',
                    dataIndex: 'disabledlevel',
                    hidden:true
                },
                {
                    header: '残疾证号',
                    dataIndex: 'disablenum',
                    hidden:true
                }

            ],
            flex: 1


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.FamilyMemberPrintGrid.selectionModel = this.getSelectionModel();


    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
