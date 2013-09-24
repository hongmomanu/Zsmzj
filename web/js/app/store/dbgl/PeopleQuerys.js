/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.PeopleQuerys', {
    extend: 'Ext.data.Store',
    alias : 'widget.peoplequerysstore',
    model: 'ZSMZJ.model.dbgl.PeopleQuery',
    autoLoad:false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/getpeopleinfo.jsp',
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
