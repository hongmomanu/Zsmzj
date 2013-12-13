
Ext.define('ZSMZJ.store.propertycheck.LogoutBusinesses', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.propertycheck.FamilyPropertyQuery',
    autoLoad:false,
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: 'ajax/sendfamilypropertyinfo.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            /*type:processstatustype.logout,
            businesstype:businessTableType.dbgl*/
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
