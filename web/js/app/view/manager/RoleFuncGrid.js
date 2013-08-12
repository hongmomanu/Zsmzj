/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.RoleFuncGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.rolefuncgrid',
    cls:'navigation-grid',
    requires: [
        'Ext.selection.CheckboxModel'
    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            viewConfig: {
                trackOver: false,
                loadMask: false,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },

            columnLines: true,
            selModel: {
                selType:'checkboxmodel'
            },
            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),
            //sm:Ext.create('Ext.selection.CheckboxModel'),
            //hideHeaders:true,
            columns: [

                {header: '功能名', dataIndex: 'funcname',width: 250},
                {header: '功能类型', dataIndex: 'functype',width: 250},
                {header: '功能id', dataIndex: 'funcid',width: 250,hidden:true},
                {header: '角色id', dataIndex: 'roleid',width: 250,hidden:true},
                {header: '关联id', dataIndex: 'rolefuncid',width: 250,hidden:true}

            ],
            flex: 1,
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'manager.RoleFuncs',
                displayInfo: true,
                displayMsg: '显示功能 {0} - {1} of {2}',
                emptyMsg: "没有可用功能" ,
                items:[
                    '-', {
                        text: '取消',
                        action:'cancel'

                    },
                    {
                        text: '保存',
                        action:'save'
                    }]
            }),
            store: 'manager.RoleFuncs'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.manager.RoleFuncGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
