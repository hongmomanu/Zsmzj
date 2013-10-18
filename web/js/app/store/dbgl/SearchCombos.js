/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 上午9:12
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.store.dbgl.SearchCombos', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.dbgl.SearchCombo',
    alias : 'widget.SearchCombos',


    autoLoad:false,
    proxy:{
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        },
        url: 'ajax/searchbusinessbypid.jsp'
    }

});