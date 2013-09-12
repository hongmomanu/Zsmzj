/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.LogoutBusinesses', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.dbgl.LogoutBusiness',
    autoLoad:true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/getneedtodobusinesses.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            type:processstatustype.logout
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
