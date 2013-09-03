/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.ProcessHistory', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'approvalname'},
        {name: 'approvalresult'},
        {name: 'approvalopinion'},
        {name: 'displayname', type: 'string'},
        {name: 'time',type:'string'},
        {name:'approvalid'}
    ]
});
