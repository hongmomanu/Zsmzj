Ext.define('ZSMZJ.store.manager.UserManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.UserManager',
    alias : 'widget.usermanagers',


    autoLoad:true,
    proxy:{
        type: 'ajax',

        url: 'ajax/getusers.jsp'
    }

});