
Ext.define('ZSMZJ.store.propertycheck.ChangedBusinesses', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.propertycheck.FamilyPropertyQuery',
    autoLoad:false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/sendfamilypropertyinfo.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            /*type:processstatustype.change,
            businesstype:businessTableType.dbgl*/
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
