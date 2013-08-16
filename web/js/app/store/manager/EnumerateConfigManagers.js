Ext.define('ZSMZJ.store.manager.EnumerateConfigManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.EnumerateConfigManager',
    alias : 'widget.enumerateconfigmanagers',


    autoLoad:true,
    proxy:{
        type: 'ajax',

        url: 'ajax/getEnumerate.jsp'
    }

});