Ext.define('ZSMZJ.store.manager.RoleManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.RoleManager',
    alias : 'widget.rolemanagers',


    autoLoad:true,
    proxy:{
        type: 'ajax',

        url: 'ajax/getroles.jsp'
    }

});