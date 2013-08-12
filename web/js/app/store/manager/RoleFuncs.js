Ext.define('ZSMZJ.store.manager.RoleFuncs', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.RoleFunc',
    alias : 'widget.rolefuncs',

    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/getrolefuncs.jsp'
    },
    listeners: {
        load: function(store, records, success) {
                 //alert("ok");
                 //console.log(store);
                 //console.log(records);

        }
    }

});