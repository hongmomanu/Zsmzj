/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-26
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.store.propertycheck.FamilyPropertyItems', {
    extend: 'Ext.data.Store',
    alias : 'widget.familypropertyitemquerys',
    model: 'ZSMZJ.model.propertycheck.FamilyPropertyItem',
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
