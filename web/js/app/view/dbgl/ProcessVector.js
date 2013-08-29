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
                    "stroke-width": "2",
                    stroke: 'blue',
                    x: 50,
                    y: 30
                },
                {
                    type: "text",
                    text: '开始流程',
                    x:25,
                    y:30

                },
                {
                    type: "path",

                    path: "M100 28  L150 28 L150 25 L155 30 L150 35 L150 32 L100 32 Z",    //路径      L150 50
                    "stroke-width": "1",
                    stroke: "#000",
                    fill: "blue"
                },

                {
                    type: "ellipse",
                    "stroke-width": "2",
                    radiusX: 50,
                    radiusY: 30,
                    stroke: 'blue',
                    x: 205,
                    y: 30
                },
                {
                    type: "text",
                    text: '街道/乡镇审核',
                    x:162,
                    y:30

                },
                {
                    type: "path",

                    path: "M255 28  L305 28 L305 25 L310 30 L305 35 L305 32 L255 32 Z",    //路径      L150 50
                    "stroke-width": "1",
                    stroke: "#000",
                    fill: "blue"
                },

                {
                    type: "ellipse",
                    "stroke-width": "2",
                    radiusX: 50,
                    radiusY: 30,
                    stroke: 'blue',
                    x: 360,
                    y: 30
                },
                {
                    type: "text",
                    text: '区/县/市审核',
                    x:317,
                    y:30

                },
                {
                    type: "path",

                    path: "M410 28  L460 28 L460 25 L465 30 L460 35 L460 32 L410 32 Z",    //路径      L150 50
                    "stroke-width": "1",
                    stroke: "#000",
                    fill: "blue"
                },
                {
                    type: "ellipse",
                    "stroke-width": "2",
                    radiusX: 50,
                    radiusY: 30,
                    stroke: 'blue',
                    x: 515,
                    y: 30
                },
                {
                    type: "text",
                    text: '结束流程',
                    x:485,
                    y:30

                }
            ]

        });

        this.callParent(arguments);

    }

});