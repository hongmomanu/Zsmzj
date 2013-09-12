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
        //行政区划名称	户主姓名	户主身份证	与户主关系	姓名	身份证	性别	年龄	户口性质	文化程度	政治面貌
        // 健康状况	婚姻状况	月人均收入	人员类别	是否享受
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
        {name:'monthlyincome'},
        {name:'persontype'},
        {name:'isenjoyed'},
        {name:'rowid'}
    ]
});
