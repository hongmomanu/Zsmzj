/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.manager.RoleManager', {
    extend: 'Ext.data.Model',
    fields: [

        {
            name:'roleid',
            type:'int'
        },
        {
            name: 'rolename',
            type:'string'
        }


    ]
});
