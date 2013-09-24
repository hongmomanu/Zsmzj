/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.NeedToDoBusinesses', {
    extend: 'Ext.data.Store',
    alias : 'widget.needtodobusinessesstore',
    model: 'ZSMZJ.model.dbgl.NeedToDoBusiness',
    autoLoad:false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/getneedtodobusinesses.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            businesstype:businessTableType.dbgl
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
