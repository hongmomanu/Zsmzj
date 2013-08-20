/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.FamilyMember', {
    extend: 'Ext.data.Model',
    alias : 'widget.familymember',
    fields: [

        'name',
        'email',
        { name: 'start', type: 'date', dateFormat: 'n/j/Y' },
        { name: 'salary', type: 'float' },
        { name: 'active', type: 'bool' }

    ]
});
