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
Ext.define('ZSMZJ.store.navigation.UserConfigs', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.navigation.UserConfig',
    data: [
        {label: '用户管理',value:'usermanagerpanel',type:'widget'},
        {label: '功能管理',value:'funcmanagerpanel',type:'widget'},
        {label: '角色管理',value:'rolemanagerpanel',type:'widget'}

    ]
});
