Ext.define('ZSMZJ.store.dbgl.FamilyMembers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.dbgl.FamilyMember',
    alias : 'widget.familymembers',
    //pageSize: 100,

    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/getfamilymembersbybid.jsp'
    },
    data: []

});