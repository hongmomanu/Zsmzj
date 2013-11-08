Ext.define('ZSMZJ.store.manager.FuncManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.FuncManager',
    alias : 'widget.funcmanagers',

    pageSize: 20,
    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/getfuncs.jsp',
        getMethod:function(request){ return 'POST'; },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }


});