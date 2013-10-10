/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.NeedToDoBusiness', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'division'},
        {name:'owername'},
        {name:'owerid'},
        {name:'applytype'},
        {name:'poortype'},
        {name:'familytype'},
        {name:'familyaccount'},
        {name:'totalhelpmoney',type:'float'},
        {name:'helpbgtime'},
        {name:'helpedtime'},
        {name:'poorfamilytype'},
        {name:'processstatustype'},
        {name:'businesstype'},
        {name:'familynum',type:'int'},
        {name:'enjoyednum',type:'int'},
        {name:'processstatus'},
        {name:'process'},
        {name:'displayname'},
        {name:'approvaltime'},
        {name:'approvaluser'},
        {name:'businessid'}


    ]
});
