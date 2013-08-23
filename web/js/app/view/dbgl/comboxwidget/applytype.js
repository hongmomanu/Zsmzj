/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-21
 * Time: 下午5:53
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.comboxwidget.applytype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.dbglaplytype',
    requires: [

    ],
    initComponent: function () {
        Ext.apply(this, {
            displayField: 'label',
            editable: false,
            store: (function (me) {
                var s = Ext.widget('dbglapplytypes');
                s.proxy.extraParams = {
                    type: me.searchtype
                }
                return s;
            })(this),
            valueField: 'value'

        });
        this.callParent(arguments);
    }
});
