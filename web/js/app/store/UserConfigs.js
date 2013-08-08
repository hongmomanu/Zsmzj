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
Ext.define('ZSMZJ.store.UserConfigs', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.UserConfig',
    data: [
        {label: '用户管理',value:'missiongridpanel',type:'widget'}

    ]
});
