/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.header.NeedToDos', {
    extend: 'Ext.data.Store',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.header.NeedToDo',
    autoLoad:true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/getneedtodos.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            roleid:roleid,
            type:"list"
        },
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});