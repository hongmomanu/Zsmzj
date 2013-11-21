/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-20
 * Time: 上午9:45
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.store.propertycheck.FamilyPropertyQuerys', {
    extend: 'Ext.data.Store',
    alias : 'widget.familypropertyquerys',
    model: 'ZSMZJ.model.propertycheck.FamilyPropertyQuery',
    autoLoad:false,
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: 'ajax/getfamilypropertyinfo.jsp',
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
