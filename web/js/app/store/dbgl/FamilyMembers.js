Ext.define('ZSMZJ.store.dbgl.FamilyMembers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.dbgl.FamilyMember',
    alias : 'widget.familymembers',
    //pageSize: 100,

    /*autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/getrolefuncs.jsp'
    },
    listeners: {
        load: function(store, records, success) {

        }
    }*/
    data: []

});