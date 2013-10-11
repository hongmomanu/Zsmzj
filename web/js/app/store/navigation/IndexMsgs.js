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
Ext.define('ZSMZJ.store.navigation.IndexMsgs', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.navigation.IndexMsg',
    autoLoad:true,

    proxy: {
        type: 'ajax',
        url: 'ajax/getindexmsg.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            roleid:roleid,
            userid:userid

        },
        reader: {
             type: 'json'/*,
             root: 'images'*/
        }
    }
    /*data: [
        {label: '用户管理',value:'usermanagerpanel',type:'widget'},
        {label: '功能管理',value:'funcmanagerpanel',type:'widget'},
        {label: '角色管理',value:'rolemanagerpanel',type:'widget'}

    ]*/
});
