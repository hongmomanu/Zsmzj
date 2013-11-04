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
Ext.define('ZSMZJ.model.navigation.DbglTreeConfig', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'text',
            mapping:'name',
            type:'string'
        },
        {
            name: 'iconCls',
            mapping:'url',
            type:'string'
        },
        { name: 'expanded', defaultValue: false },
        { name: 'leaf', type: 'boolean', mapping: 'leaf' },
        {
            name: 'value',
            type:'string'
        },{
            name: 'type',
            type:'string'
        }
    ]
});
