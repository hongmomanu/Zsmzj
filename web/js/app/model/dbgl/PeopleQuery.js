/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.PeopleQuery', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'owername'},
        {name:'processstatus'},
        {name:'processstatustype'},
        {name:'businessid'},
        {name: 'division'},
        {name:'owerid'},
        {name:'relationship'},
        {name:'name'},
        {name:'personid'},
        {name:'sex'},
        {name:'age'},
        {name:'accounttype'},
        {name:'education'},
        {name:'political'},
        {name:'bodystatus'},
        {name:'maritalstatus'},
        {name:'monthlyincome',type:'float'},
        {name:'persontype'},
        {name:'isenjoyed'},
        {name:'rowid'}
    ]
});
