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
Ext.define('ZSMZJ.model.navigation.IndexMsg', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'label',
            mapping:'name',
            type:'string'
        },{
            name: 'num',
            type:'int'
        },{
            name: 'type',
            type:'string'
        },{
            name: 'value',
            type:'string'
        }
    ]
});
