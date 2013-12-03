/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-8-7
 * Time: 下午5:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.StatisticsComplexNewLogouts', {
    extend: 'Ext.data.TreeStore',
    //alias : 'widget.headerviewers',
    model: 'ZSMZJ.model.dbgl.StatisticsComplexNewLogout',
    autoLoad :false,
    pageSize: 15,
    proxy: {
        type: 'ajax',
        url: 'ajax/getstatisticsbytype.jsp',
        getMethod:function(request){ return 'POST'; },
        extraParams:{
            type:'complexnewlogout'
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
