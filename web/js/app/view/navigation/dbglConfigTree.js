/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-8
 * Time: 下午2:50
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.view.navigation.dbglConfigTree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.dbglconfigtree',
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    xtype: 'tree-reorder',

    rootVisible: false,
    border: false,
    useArrows: true,

    initComponent: function() {
        Ext.apply(this, {
            viewConfig: {
                /*plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }*/
            },

            store: (function (me) {
                var s = Ext.widget('dbgltreeconfigs');
                s.proxy.extraParams = {
                    type: me.searchtype,
                    roleid:roleid

                };
                //s.root.text=me.searchtype;
                s.getRootNode().set('text', me.searchtype);
                s.load();
                return s;
            })(this)

        });
        this.callParent(arguments);
        // store singleton selection model instance
    }

});
