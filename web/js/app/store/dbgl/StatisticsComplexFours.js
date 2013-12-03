/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.StatisticsComplexFours', {
    extend: 'Ext.data.TreeStore',
    model: 'ZSMZJ.model.dbgl.StatisticsComplexFour',
    autoLoad:false,
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: 'ajax/getstatisticsbytype.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            type:'complexfour'
        }
    }
    ,
    root: {
        text: '舟山市',
        divisionpath:'舟山市',
        id:0,
        expanded: false
    }



});
