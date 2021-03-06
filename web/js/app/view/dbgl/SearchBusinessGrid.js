/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-8
 * Time: 下午12:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.SearchBusinessGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dbglsearchbusinessgrid',
    cls:'navigation-grid',
    requires: [

    ],
    listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        },
        afterrender:function(panel){
            var sm=panel.getSelectionModel();
            var selectItmes=panel.selectItmes;
            sm.on('select', function(c, r, index){
                if(selectItmes.indexOf(r.data.id)==-1){
                    selectItmes.push(r.data.id);
                }
                //console.log(selectItmes)
            });
            sm.on('deselect', function(c, r, index){
                selectItmes.splice(selectItmes.indexOf(r.data.id));
                //console.log(selectItmes)
            });
            this.getStore().on('load',function(s,rs,sf){
                for(var i=0;i<rs.length;i++){
                    if(selectItmes.indexOf(rs[i].data.id)>-1){
                        panel.getSelectionModel().select(i,true);
                    }
                }

            })
        }

    },



    initComponent: function() {
        var selModel = Ext.create('Ext.selection.CheckboxModel', {
            columns: [{
                xtype: 'checkcolumn',
                text: 'Active',
                dataIndex: 'id'
            }]});
        Ext.apply(this, {
            border: false,
            isnewgrid:true,
            stype:businessTableType.dbgl,
            //stype:this.up('grid'),
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },
            features: [{
                ftype: 'summary'//Ext.grid.feature.Summary表格汇总特性
            }],
            columns: [

                {header: '户主姓名',align:'center',dataIndex:'owername'},
                {header: '户主身份证',align:'center',dataIndex:'owerid',width:160},
                {header: '家庭类别',align:'center',dataIndex:'familytype',width:80}


            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'dbgl.SearchBusinesses',
                displayInfo: true,
                displayMsg: '显示发放人员 {0} - {1} of {2}',
                emptyMsg: "无待发放人员",
                items:[
                ]
            }),
            height: 195,
            selModel: selModel,
            store: 'dbgl.SearchBusinesses',
            selectItmes:[]

        });
        this.callParent(arguments);
        ZSMZJ.view.dbgl.SearchBusinessGrid.selectionModel = this.getSelectionModel();

    }
    /*,

     formatLable:function(value, p, record) {
     return Ext.String.format('<div class="navitem-div"><span class="author">{0}</span></div>', value);
     }*/
});
