/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 上午9:12
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.comboxwidget.ApplyTypes', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.dbgl.comboxwidget.ApplyType',
    alias : 'widget.dbglapplytypes',


    autoLoad:false,
    proxy:{
        type: 'ajax',

        url: 'ajax/getenumbytype.jsp'
    }

});