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

            store: 'navigation.DbglTreeConfigs'

        });
        this.callParent(arguments);
        // store singleton selection model instance
    }

});
