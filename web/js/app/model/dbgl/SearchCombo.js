/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 上午9:16
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.SearchCombo', {
    extend: 'Ext.data.Model',
    fields: [

        {
            name:'owername',
            type:'string'
        },
        {
            name: 'owerid',
            type:'string'
        },
        {
            name: 'sex',
            type:'string'
        },
        {
            name: 'helpbgtime',
            type:'string'
        }

    ]
});
