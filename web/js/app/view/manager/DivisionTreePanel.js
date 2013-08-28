/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-26
 * Time: 下午2:06
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.manager.DivisionTreePanel' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.divisiontreepanel',
    requires: [

    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '新政区划管理',
            layout: 'fit',
            anchor: '100% 60%',
            useArrows: true,
            rootVisible: false,
            store: 'manager.DivisionTrees',
            multiSelect: false,
            xtype: 'tree-grid',
            columns: [
                {
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: '新政区划名',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'text'
                },
                {
                    text: '更新时间',
                    flex: 1,
                    dataIndex: 'updatetime',
                    renderer: function (val) {
                        var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                        //var time = new Date(val);
                        val = Ext.util.Format.date(time, 'Y-m-d H:i');
                        return val;
                    },
                    hidden:true,
                    sortable: false
                }

            ],
            buttons: [
                {
                    text: '新增行政区划',
                    action:'add'

                },
                '->',
                {
                    text: '删除',
                    disabled:true,
                    handler: function () {

                    }

                }

            ]
        });
        this.callParent(arguments);
        // store singleton selection model instance
    }
});
