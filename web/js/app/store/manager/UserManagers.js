Ext.define('ZSMZJ.store.manager.UserManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.UserManager',
    alias : 'widget.usermanagers',

    pageSize: 10000,
    autoLoad:false,
    proxy:{
        type: 'ajax',

        url: 'ajax/getusers.jsp'
    }

});