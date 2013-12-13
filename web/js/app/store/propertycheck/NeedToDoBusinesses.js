

Ext.define('ZSMZJ.store.propertycheck.NeedToDoBusinesses', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.propertycheck.FamilyPropertyQuery',
    autoLoad:false,
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: 'ajax/sendfamilypropertyinfo.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{

        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
