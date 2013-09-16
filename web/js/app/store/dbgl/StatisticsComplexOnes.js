/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.StatisticsComplexOnes', {
    extend: 'Ext.data.TreeStore',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.dbgl.StatisticsComplexOne',
    autoLoad:true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'ajax/getstatisticsbytype.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            type:'complexone'

        }
    }
    ,
    root: {
        text: '舟山市',
        divisionpath:'舟山市',
        id:0,
        expanded: true
    }



});
