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
        var zsj='舟山市';
        var localdivisionpath=divisionpath;
        if(divisionpath.indexOf(zsj)==0&&divisionpath!=zsj){
            localdivisionpath=divisionpath.substring(zsj.length);
        }
        Ext.apply(this, {
            id: 'images-view',
            frame: false,
            //collapsible: true,
            //width: 535,
            height: 58,

            //renderTo: 'dataview-example',
            //title: 'Simple DataView (0 items selected)',
            items: Ext.create('Ext.view.View', {
                store: 'header.HeaderViewers',
                id: 'headviewitem',
                tpl: [
                    '<tpl for=".">',
                    '<div class="thumb-wrap" id="{name}">',
                    '<div class="thumb"><img src="{url}" title="{name}"></div>',
                    '<span class="x-editable">{shortName}</span></div>',
                    '</tpl>',
                    //'<div class="x-clear"></div>',

                    '<div id="navspace">'+
                    '<div style="width: 50px;height: 20px;float: right;"></div>' +
                    '<ul id="headnavul">' +
                    '<li style="width: width: 250px;"><img src="img/head/1.png"/><a>欢迎您:'+displayname+'('+localdivisionpath+')</a></li>' +
                    '<li style="width: width: 100px;"><img src="img/head/2.png"/><a id="domneedtodocount">待办业务(55)</a></li>' +
                    '<li style="width: width: 100px;"><img src="img/head/4.png"/><a>在线人数('+onlinenums+')</a></li>' +
                    '<li style="width: width: 80px;"><img src="img/head/5.png"/><a id="domshowalterpwd">重设密码</a></li>' +
                    '<li style="width: width: 50px;"><img src="img/head/7.png"/>' +
                        '<a id="domlogout" href="logout" style="text-decoration: none;">退出</a></li>' +
                    '</ul>'+
                    '</div>'
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
                        if(nodes[0]){
                            var menu_arr=eval(nodes[0].raw.value);
                            Ext.getCmp('west-panel').removeAll();
                            Ext.getCmp('west-panel').add(menu_arr);

                        }

                        //var l = nodes.length,
                        //    s = l !== 1 ? 's' : '';
                        //this.up('panel').setTitle('Simple DataView (' + l + ' item' + s + ' selected)');
                    },
                    afterrender:function(dv,opts){


                    }

                }
            })



        });
        this.callParent(arguments);

        // store singleton selection model instance
    }
});
