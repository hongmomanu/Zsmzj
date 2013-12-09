Ext.define('ZSMZJ.store.propertycheck.FamilyMembers', {
    extend: 'Ext.data.Store',
    model: 'ZSMZJ.model.dbgl.FamilyMember',
    alias : 'widget.propertycheckfamilymembers',
    //pageSize: 100,

    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: 'ajax/sendfamilypropertyinfo.jsp',
        extraParams:{
            eventName:'getfamilymembersbyfmy001',
            fmy001:-1
        }
    },
    data: []

});