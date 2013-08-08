/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-7
 * Time: 下午3:22
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.header.headViewPanel' ,{
    extend: 'Ext.Panel',
    alias : 'widget.headviewpanel',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            id: 'images-view',
            frame: false,
            //collapsible: true,
            //width: 535,
            height: 80,

            //renderTo: 'dataview-example',
            //title: 'Simple DataView (0 items selected)',
            items: Ext.create('Ext.view.View', {
                store: 'HeaderViewers',
                id: 'headviewitem',
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="thumb"><img src="{url}" title="{name}"></div>',
                    '<span class="x-editable">{shortName}</span></div>',
                    '</tpl>',
                    '<div class="x-clear"></div>'
                ],
                multiSelect: false,
                //height: 80,
                trackOver: true,
                overItemCls: 'x-item-over',
                itemSelector: 'div.thumb-wrap',
                emptyText: 'No images to display',
                plugins: [
                    Ext.create('Ext.ux.DataView.DragSelector', {}),
                    Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
                ],
                prepareData: function(data) {
                    Ext.apply(data, {
                        shortName: Ext.util.Format.ellipsis(data.name, 15),
                        sizeString: Ext.util.Format.fileSize(data.size),
                        dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                    });
                    return data;
                },

                listeners: {
                    selectionchange: function(dv, nodes ){
                        //alert(1);
                        //console.log(dv);
                        //console.log(nodes[0]);
                        var menu_arr=eval(nodes[0].raw.value);
                        //console.log(menu_arr);
                        Ext.getCmp('west-panel').removeAll();
                        Ext.getCmp('west-panel').add(menu_arr);





                        //var l = nodes.length,
                        //    s = l !== 1 ? 's' : '';
                        //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                    }
                }
            })



        });
        this.callParent(arguments);

        // store singleton selection model instance
    }
});
