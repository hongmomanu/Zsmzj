/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.propertycheck.FamilyPropertyItemGrid',{
    extend:'Ext.grid.Panel',
    alias:'widget.propertycheckfamilypropertyitemgrid',
    cls:'navigation-grid',
    listeners:{

    },

    initComponent:function(){

        Ext.apply(this,{
            border:false,
            style:'list',
            viewConfig:{
                 trackOver:false,
                loadMask:true,
                scrollToTop:Ext.emptyFn(),
                enableTextSelection:true,
                stripeRows:true
            },
            columnLines:true,
            selmodel:{
                selType:'checkboxmodel'
            },
            columns: [
                { header: '核定项目', dataIndex: 'checkitem',flex:1,width:30},
                { header: '核定结果', dataIndex: 'checkresult',flex:1,width:30,
                    renderer:function(v,c,r){
                        var rs='';
                        switch(parseInt(v)){
                            case 0:rs="不通过";break;
                            case 1:rs="通过";break;
                        }
                        return rs;
                    }},
                { header: '核定备注', dataIndex: 'checkcomment',flex:2 } ,
                { header: '操作员', dataIndex: 'displayname' }
            ],
            flex: 1,
            store: 'propertycheck.FamilyPropertyItems'

        })

        this.callParent(arguments);
        ZSMZJ.view.propertycheck.FamilyPropertyItemGrid.selectionModel = this.getSelectionModel();

    }
})