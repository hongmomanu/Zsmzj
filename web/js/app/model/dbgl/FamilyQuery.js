/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.FamilyQuery', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'owername'},
        {name:'processstatus'},
        {name:'processstatustype'},
        {name:'businesstype'},
        {name:'poorfamilytype'},
        'helpreason',
        'accountaddress',
        {name:'process'},
        {name: 'division'},
        {name: 'telnum2'},
        {name: 'telnum'},
        {name: 'conectperson2'},
        {name: 'conectperson'},
        {name: 'windresistance'},
        {name: 'earthquakeresistance'},
        {name: 'housestructure'},
        {name: 'escapingnum'},
        {name: 'houseusearea'},
        {name: 'housearea'},
        {name: 'coverage'},
        {name:'owerid'},
        {name:'applytype'},
        {name:'familytype'},
        {name:'totalhelpmoney',type:'float'},
        {name:'helpbgtime'},
        {name:'helpnature'},
        {name:'medicarenature'},

        {name:'helpedtime'},
        {name:'familynum',type:'int'},
        {name:'familyaccount'},
        {name:'poorfamilytype'},
        {name:'enjoynum'},
        {name:'bankower'},
        {name:'bankid'},
        {name:'aidnum'},
        {name:'businessid',mapping:'id'}

    ]
});
