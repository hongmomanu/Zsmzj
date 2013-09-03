Ext.define('ZSMZJ.store.manager.FuncManagers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.manager.FuncManager',
    alias : 'widget.funcmanagers',

    pageSize: 20,
    getMethod:function(request){ return 'POST'; },
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: 'ajax/getfuncs.jsp',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }


});