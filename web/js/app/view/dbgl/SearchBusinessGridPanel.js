/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-8
 * Time: 下午12:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.SearchBusinessGridPanel' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.dbglsearchbusinessgridpanel',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },



    initComponent: function() {
        var me=this;
        Ext.apply(this, {

            items: [
                {
                    xtype:'panel',
                    layout: 'column',
                    border:0,
                    paddingBottom:'10px',
                    items:[
                        {
                            columnWidth: 0.7,
                            xtype: 'textfield',
                            width: 400,
                            itemId:'query_text',
                            emptyText:'身份证号码'/*,
                         fieldLabel: '查询条件'*/

                        },{
                            columnWidth: 0.3,
                            xtype:'button',
                            text:'查询',
                            listeners:{
                                click:function(){
                                    var query_text=this.up('panel').down('#query_text').value;
                                    var grid=this.up('window').down('#query_result');
                                    var store=grid.getStore();
                                    store.proxy.extraParams.type=this.up('window').dataobj.businesstype;
                                    store.proxy.extraParams.query=query_text;
                                    store.pageSize=20;
                                    store.start=0;
                                    store.load();
                                }
                            }
                        }
                    ]

            },{
                xtype: 'dbglsearchbusinessgrid',
                itemId:'query_result'
            }]
        });
        this.callParent(arguments);

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
