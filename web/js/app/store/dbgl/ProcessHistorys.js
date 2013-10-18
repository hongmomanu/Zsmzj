/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.ProcessHistorys', {
    extend: 'Ext.data.Store',
    alias : 'widget.processhistorys',
    model: 'ZSMZJ.model.dbgl.ProcessHistory',
    autoLoad:false,
    pageSize: 5,
    proxy: {
        type: 'ajax',
        url: 'ajax/getprocesshistorys.jsp',
        getMethod:function(request){ return 'POST'; },

        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});
