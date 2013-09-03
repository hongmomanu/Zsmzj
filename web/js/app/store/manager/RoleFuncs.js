Ext.define('ZSMZJ.store.manager.RoleFuncs', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.RoleFunc',
    alias : 'widget.rolefuncs',

    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/getrolefuncs.jsp',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    },
    listeners: {
        load: function(store, records, success) {

        }
    }

});