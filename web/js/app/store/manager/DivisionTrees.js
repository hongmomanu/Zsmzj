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
Ext.define('ZSMZJ.store.manager.DivisionTrees', {
    extend: 'Ext.data.TreeStore',
    model: 'ZSMZJ.model.manager.DivisionTree',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        /*getMethod:function(request){ return 'POST'; },
        reader: {
            type: 'json'
            //root: 'images'
        },*/
        /*extraParams:{
            *//*roleid:roleid,
            type:"低保管理"*//*

        },*/
        url: 'ajax/gettreedivision.jsp'
    },
    root: {
        text: '舟山市',
        id:0,
        expanded: true
    }



});
