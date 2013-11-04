/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.StatisticsComplexNewLogout', {
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
            name: 'newmonthmoney'
        },
        {
            name: 'newcitymonthfamilynum'
        },
        {
            name: 'newcitymonthpeoplenum'
        },
        {
            name: 'newcitymonthmoney'
        },

        {
            name: 'logoutmonthfamilynum'
        },
        {
            name: 'logoutmonthpeoplenum'
        },
        {
            name: 'logoutmonthmoney'
        },
        {
            name: 'logoutcitymonthfamilynum'
        },
        {
            name: 'logoutcitymonthpeoplenum'
        },
        {
            name: 'logoutcitymonthmoney'
        }
    ]
});
