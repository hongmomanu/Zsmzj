/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.header.NeedToDo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'url'},
        {name: 'processstatus', type: 'string'},
        {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
