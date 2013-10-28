/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-27
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */




Ext.define('ZSMZJ.view.dbgl.comboxwidget.divisiontreepath', {
    extend: 'Ext.ux.TreeCombo',
    alias: 'widget.dbgldivsioncombtreepath',



    initComponent: function () {
        Ext.apply(this, {
            //margin:10,
            width:320,
            //height: 10,
            //treeHeight: 10,
            treeWidth: 240,
            rootVisible:false,
            store: 'manager.DivisionTrees',
            selectChildren: true,
            canSelectFolders: true,
            itemTreeClick: function(view, record, item, index, e, eOpts, treeCombo)
            {
                //var id = record.data.id;
                this.setValue(record.data.divisionpath);
                this.setRawValue(record.data.divisionpath);
                this.collapse();
                // I want to do something here.
                // But combo do nothing (not selected item or not finish) when i init itemTreeClick function
            }

        });

        this.callParent(arguments);
    }
});