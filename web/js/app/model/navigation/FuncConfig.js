/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-10
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */
/**
 * Model for a summit
 */
Ext.define('ZSMZJ.model.navigation.FuncConfig', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'label',
            type:'string'
        },{
            name: 'value',
            type:'string'
        },{
            name: 'type',
            type:'string'
        }
    ]
});
