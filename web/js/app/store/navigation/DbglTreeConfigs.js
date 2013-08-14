/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-10
 * Time: 下午2:56
 * To change this template use File | Settings | File Templates.
 */

/**
 * The store used for mission
 */
Ext.define('ZSMZJ.store.navigation.DbglTreeConfigs', {
    extend: 'Ext.data.TreeStore',
    model: 'ZSMZJ.model.navigation.DbglTreeConfig',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        getMethod:function(request){ return 'POST'; },
        reader: {
            type: 'json'
            //root: 'images'
        },
        extraParams:{
            roleid:roleid,
            type:"低保管理"

        },
        url: 'ajax/gettreefuncsbyrule.jsp'
    },
    root: {
        text: '低保管理',
        expanded: true
    }



});
