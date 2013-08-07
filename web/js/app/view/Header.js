/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('ZSMZJ.view.Header', {
    extend: 'Ext.Component',

    dock: 'top',
    baseCls: 'main-header',

    initComponent: function() {
        Ext.applyIf(this, {
            html: '舟山市社会救助管理平台 '
        });

        this.callParent(arguments);
    }
});
