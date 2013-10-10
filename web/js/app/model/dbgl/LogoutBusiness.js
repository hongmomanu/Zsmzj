/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.LogoutBusiness', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'division'},
        {name:'owername'},
        {name:'owerid'},
        {name:'applytype'},
        {name:'poortype'},
        {name:'changedate'},
        {name:'changereason'},
        {name:'businesstype'},
        {name:'aftertotalhelpmoney'},
        {name:'afterpeople'},
        {name:'beforetotalhelpmoney'},
        {name:'beforepeople',type:'int'},
        {name:'familytype'},
        {name:'logoutdate'},
        {name:'logoutreason'},
        {name:'totalhelpmoney',type:'float'},
        {name:'helpbgtime'},
        {name:'helpedtime'},
        {name:'processstatustype'},
        {name:'familynum',type:'int'},
        {name:'processstatus'},
        {name:'process'},
        {name:'displayname'},
        {name:'approvaltime'},
        {name:'approvaluser'},
        {name:'businessid'}

    ]
});
