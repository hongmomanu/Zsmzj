/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.manager.FuncManager', {
    extend: 'Ext.data.Model',
    fields: [

        {
            name:'funcid',
            type:'int'
        },
        {
            name: 'funcname',
            type:'string'
        },
        {
            name: 'functype',
            type:'string'
        }


    ]
});
