/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.manager.divisionMenu', {
    extend : 'Ext.menu.Menu',
    alias : 'widget.divisionmenu',
    items:[{
        text: '删除',
        value:'del'
    },{
        text: '新增',
        value:'add'
    }]

});