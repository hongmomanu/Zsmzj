/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.AffixFilesGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.affixfilesgrid',
    cls:'navigation-grid',
    requires: [

    ],
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


                {   header: '附件名',
                    dataIndex: 'attachmentname',
                    flex:1

                },
                {header: '附件路径', dataIndex: 'attachmentpath',width: 250,hidden:true}

            ],
            flex: 1,
            /*bbar: Ext.create('Ext.PagingToolbar', {
                store: 'manager.UserManagers',
                displayInfo: true,
                displayMsg: '显示用户 {0} - {1} of {2}',
                emptyMsg: "没有用户",
                items:[
                    '-', {
                        text: '新增用户',
                        action:'addnewuser'

                    }]
            }),*/
            store: 'dbgl.AffixFilesGrids'


        });
        this.callParent(arguments);
        // store singleton selection model instance
        ZSMZJ.view.dbgl.AffixFilesGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
