/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.propertycheck.ProcessHistorys', {
    extend: 'Ext.data.Store',
    alias : 'widget.propertycheckprocesshistorys',
    model: 'ZSMZJ.model.propertycheck.ProcessHistory',
    autoLoad:false,
    pageSize: 5,
    proxy: {
        type: 'ajax',
        url: 'ajax/sendfamilypropertyinfo.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            //type:businessTableType.dbgl
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
