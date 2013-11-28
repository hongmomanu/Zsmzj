/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-20
 * Time: 上午9:50
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.model.propertycheck.FamilyPropertyQuery', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'owerid'},
        {name:'time'},
        {name:'division'},
        {name:'processstatus'},
        {name:'process'},
        {name:'applytype'},
        {name:'familytype'},
        {name:'owername'},
        {name:'poorfamilytype'},
        {name:'familyaccount'},
        {name:'accountaddress'},
        {name:'accountzipcode'},
        {name:'realaddress'},
        {name:'realzipcode'},
        {name:'households'},
        {name:'telnum'},
        {name:'bank'},
        {name:'bankower'},
        {name:'bankid'},
        {name:'otherfamilyinfo'},

        {name:'checkstatus'},

        {name:'interest'},
        {name:'wages'},
        {name:'planting'},
        {name:'pension'},
        {name:'management'},
        {name:'alimony'},
        {name:'incidentalincome'},
        {name:'remuneration'},
        {name:'allowance'},
        {name:'paidservices'},
        {name:'propertylease'},
        {name:'otherincome'},
        {name:'userid'},
        {name:'incomesumarea'},
        {name:'incomesumareaperson'},
        {name:'incomesum'},
        {name:'cash'},
        {name:'banksecurities'},
        {name:'debt'},
        {name:'vehicle'},
        {name:'nonresidentialhouse'},
        {name:'nolifeneededmachine'},
        {name:'insurance'},
        {name:'registeredcapital'},
        {name:'propertysum'},
        {name:'houseproperties'},
        {name:'housestructure'},
        {name:'housearea'},
        {name:'houseaveragearea'},
        {name:'houseusearea'},
        {name:'houseaverageusearea'}  ,
        {name:'processstatustype'} ,


        {name:'addontype'},
        {name:'checkitem'},
        {name:'checkresult'},
        {name:'checkcomment'}
    ]
});
