


Ext.define('ZSMZJ.store.dbgl.SearchBusinesses', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.dbgl.SearchBusiness',
    autoLoad:false,
    pageSize: 5,
    proxy: {
        type: 'ajax',
        url: 'ajax/searchbusinessbypid.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            type:businessTableType.dbgl
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
