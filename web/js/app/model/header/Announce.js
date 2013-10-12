/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.header.Announce', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'processstatus'},
        {name:'process'},
        {name:'approvalresult'},
        {name:'approvalopinion'},
        {name:'time'},
        {name:'approvaluser'},
        {name:'businessid'}
    ]
});
