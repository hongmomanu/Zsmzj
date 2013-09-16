/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-20
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.model.dbgl.StatisticsComplexOne', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'divisionname'
        },
        {
            name: 'oldperson'
        },
        {
            name: 'loginnojob'
        },
        {
            name: 'logoutnojob'
        },
        {
            name: 'student'
        },
        {
            name: 'totalfamily',defadefaultValue: 0
        },
        {
            name: 'totalperson'
        },
        {
            name: 'totalmen'
        },
        {
            name: 'totalgirls'
        },
        {
            name: 'totalmoney',defadefaultValue: 0
        },
        {
            name: 'cityfamily'
        },
        {
            name: 'cityperson'
        },
        {
            name: 'citymen'
        },
        {
            name: 'citygirls'
        },
        {
            name: 'citymoney' ,defadefaultValue: 0

        },
        {
            name: 'villagefamily'
        },
        {
            name: 'villageperson'
        },
        {
            name: 'villagemen'
        },
        {
            name: 'villagegirls'
        },
        {
            name: 'villagemoney' ,defadefaultValue: 0
        }
    ]
});
