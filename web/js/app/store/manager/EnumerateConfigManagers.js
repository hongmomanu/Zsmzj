Ext.define('ZSMZJ.store.manager.EnumerateConfigManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.EnumerateConfigManager',
    alias : 'widget.enumerateconfigmanagers',
    pageSize: 10000,

    autoLoad:false,
    proxy:{
        type: 'ajax',

        url: 'ajax/getEnums.jsp'
    }

});