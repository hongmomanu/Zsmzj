/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.manager.FuncManager' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.funcmanagerpanel',
    cls:'navigation-grid',
    requires: [
    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },
    initComponent: function() {
        Ext.apply(this, {
            border: false,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [


                {header: '功能名', dataIndex: 'funcname',width:250},
                {header: '功能类别', dataIndex: 'functype',width:250},
                {header: '功能id', dataIndex: 'funcid',width: 250,hidden:true}

            ],
            flex: 1,
            tbar:[
                {
                    xtype: 'textfield',
                    hidden: false,
                    width:200,
                    //size:40,
                    listeners: {

                        "specialkey": function (field, e) {
                            if (e.keyCode == 13) {
                                var keyword = field.getValue().replace(/\s+/g, "");
                                var store=this.up('panel').getStore();
                                store.proxy.extraParams.keyword = keyword;
                                store.loadPage(1);
                            }
                        }
                    },
                    emptyText: '输入搜索关键字'

                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'manager.FuncManagers',
                displayInfo: true,
                displayMsg: '显示功能 {0} - {1} of {2}',
                emptyMsg: "没有功能可显示",
                items:[
                    '-', {
                        text: '新增功能',
                        action:'addnewfunc'

                    }]
            }),
            store: 'manager.FuncManagers'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.manager.FuncManager.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
