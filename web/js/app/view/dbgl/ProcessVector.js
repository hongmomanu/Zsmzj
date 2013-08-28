/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-28
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.ProcessVector' ,{
    extend: 'Ext.draw.Component',
    alias : 'widget.dbglprocessvector',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            viewBox: false,
            items: [

                {
                    type: "ellipse",
                    radiusX: 50,
                    radiusY: 30,
                    stroke: 'blue',
                    x: 50,
                    y: 30
                }
            ]

        });

        this.callParent(arguments);

    }

});