/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.header.HeaderViewers', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.header.HeaderViewer',
    autoLoad:true,

    proxy: {
        type: 'ajax',
        url: 'ajax/image.json',
        reader: {
            type: 'json',
            root: 'images'
        }
    }
});
