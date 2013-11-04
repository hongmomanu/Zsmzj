/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.StatisticsComplexTwo', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'divisionname'
        },
        {
            name: 'newmonthfamilynum'
        },
        {
            name: 'newmonthpeoplenum'
        },
        {
            name: 'newtotalhelpmoney'
        },
        {
            name: 'logoutmonthfamilynum'
        },
        {
            name: 'logoutmonthpeoplenum',defadefaultValue: 0
        },
        {
            name: 'logouttotalhelpmoney'
        },
        {
            name: 'addmoneymonthfamilynum'
        },
        {
            name: 'addmoneymonthpeoplenum'
        },
        {
            name: 'addmoneytotalhelpmoney',defadefaultValue: 0
        },
        {
            name: 'reducemoneymonthfamilynum'
        },
        {
            name: 'reducemoneymonthpeoplenum'
        },
        {
            name: 'reducemoneytotalhelpmoney',defadefaultValue: 0
        }
    ]
});
