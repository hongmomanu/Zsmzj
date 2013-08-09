/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.manager.roleMenu', {
    extend : 'Ext.menu.Menu',
    alias : 'widget.rolemenu',
    items:[{
        text: '删除角色',
        action:'del'
    }]

});