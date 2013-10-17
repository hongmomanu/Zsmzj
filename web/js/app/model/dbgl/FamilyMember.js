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
        'personresource',
        'disastertype',
        'disasterintime',
        'disasterouttime',

        'unit',
        'suppliesbuytime',
        'suppliesmoney',
        'name',
        'relationship',
        'noenjoyedreason',
        'personid',
        'sex',
        'isenjoyed',
        'persontype',
        'jobstatus',
        'bodystatus',
        'age',
        'specialobject',
        'workunits',
        'accounttype',
        'maritalstatus',
        'education',
        'political',
        'disabledtype',
        'disabledlevel',
        'disablenum',
        { name: 'birthday', type: 'date',dateFormat: 'Y-m-dTH:i:s' },
        { name: 'monthlyincome', type: 'float' }

    ]
});
