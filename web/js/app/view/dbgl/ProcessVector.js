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
            width: 153,
            height: 306,
            viewBox:true,
            cls: 'cursor-dragme',
            draggable: {
                constrain: true,
                constrainTo: Ext.getBody()
            },
            floating: {
                shadow: false
            },
            //renderTo: Ext.getBody(),
            items: [
                {
                    type: "image",
                    viewBox:true,
                    src: "img/2013061301494220876442.gif",
                    width: 153,
                    height: 153
                },
                {
                    type: "ellipse",
                    radiusX: 100,
                    radiusY: 50,
                    stroke: 'red',
                    x: 100,
                    y: 100/*,
                 fill: 'red'
                 */
                },
                {
                    type: 'circle',
                    fill: '#79BB3F',
                    radius: 20,
                    x: 10,
                    y: 10
                },
                {
                    type: 'circle',
                    fill: '#79BB3F',
                    radius: 20,
                    x: 40,
                    y: 40
                },

                {
                    type: "text",
                    text: '测试',
                    x:70,
                    y:70

                }
                , {
                    type: "path",
                    path: "M100 0  L200 0 Z",    //路径      L150 50
                    "stroke-width": "1",
                    stroke: "#000",
                    fill: "blue"
                }

            ]



        });

        this.callParent(arguments);

    }

});