Ext.define('ZSMZJ.store.manager.EnumerateConfigManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.EnumerateConfigManager',
    alias : 'widget.enumerateconfigmanagers',
    pageSize: 100,

    autoLoad:true,
    proxy:{
        type: 'ajax',

        url: 'ajax/getEnums.jsp'
    }

});