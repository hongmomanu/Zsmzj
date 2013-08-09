Ext.define('ZSMZJ.store.manager.FuncManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.FuncManager',
    alias : 'widget.funcmanagers',


    autoLoad:true,
    proxy:{
        type: 'ajax',

        url: 'ajax/getfuncs.jsp'
    }

});