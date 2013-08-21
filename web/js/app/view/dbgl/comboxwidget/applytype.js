/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-21
 * Time: 下午5:53
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.comboxwidget.mapTree', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.dbglaplytype',
    requires: [

    ],
    initComponent: function() {
        Ext.apply(this, {
            fieldLabel: 'Choose State',
            displayField: 'name',
            /*store: states,*/
            valueField: 'abbr'

        });
        this.callParent(arguments);
    }
});
