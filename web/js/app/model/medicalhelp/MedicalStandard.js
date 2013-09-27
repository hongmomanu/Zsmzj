/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.medicalhelp.MedicalStandard', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'division'},

        {name:'helptype'},//{name:'familytype'},
        {name:'bgmoney'},
        {name:'edmoney'},
        {name:'helptype'},
        {name:'helppercent'},
        {name:'helpnature'},
        {name:'rid'}


    ]
});
