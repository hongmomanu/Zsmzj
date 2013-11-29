/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */



/**
 * Disaster controller
 * 灾害救助业务控制层，描述低保各种业务信息
 */
Ext.define('ZSMZJ.controller.Disaster', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    refs: [

    ],
    views: [
        'disaster.businessApply',
        'disaster.warehouseApply',
        'disaster.EscapingMemberGrid',
        'disaster.EscapingSuppliesGrid',
        'disaster.businessAlter',
        'disaster.warehouseAlter',
        'disaster.calamityBusinessApply',
        'disaster.calamityBusinessAlter',
        'disaster.calamityBusinessCheck',
        'disaster.calamityBusinessChange',
        'disaster.calamityBusinessLogout',
        'disaster.applysubmitFieldset',
        'disaster.familybasicFieldset',
        'disaster.logoutsubmitFieldset',
        'disaster.changesubmitFieldset',
        'disaster.altersubmitFieldset'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'disasterhelpbusinessapplyform,disasterhelpbusinessalterform,disasterhelpwarehouseapplyform,disasterhelpwarealterform': {
                afterrender: dbgl_cl.afterrenderEvents
            },
            'escapingmembergrid button[action=addnewperson],escapingsuppliesgrid button[action=addnewperson]':{

                click:Ext.bind(dbgl_cl.addnewperson, dbgl_cl)
            },
            'escapingmembergrid button[action=delperson],escapingsuppliesgrid button[action=delperson]':{

                click:Ext.bind(dbgl_cl.delperson, dbgl_cl)
            },

            'disasterhelpbusinessapplyform component,disasterhelpbusinessalterform component': {
                imgclick: function (c) {
                    dbgl_cl.showUploadImgWin(c);
                },
                affixclick: function (c) {
                    dbgl_cl.showaffixWindow(c);
                },
                owerchange:function(c){
                    dbgl_cl.owerchanged(c);
                }
            },
            'disasterhelpbusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },'disasterhelpwarehouseapplyform button[action=applysubmit]': {
                click: this.wareapplysubmit
            },
            'disasterhelpbusinessalterform button[action=applysubmit],disasterhelpwarealterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },

            'disasterhelpbusinessalterform button[action=cancel],disasterhelpwarealterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'disasterhelpcalamitybusinessapplyform,disasterhelpcalamitybusinessalterform,disasterhelpcalamitybusinesschangeform,disasterhelpcalamitybusinesslogoutform':{
                afterrender:dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)

            },


            'disasterhelpcalamitybusinessapplyform button[action=applysubmit]': {
                click: this.calamityapplysubmit
            },


            'disasterhelpcalamitybusinessalterform button[action=applysubmit],disasterhelpcalamitybusinesschangeform button[action=applysubmit],disasterhelpcalamitybusinesslogoutform button[action=applysubmit]':{
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'disasterhelpcalamitybusinesschangeform button[action=saveapplysubmit]':{
                click: Ext.bind(dbgl_cl.applysubmitchange, dbgl_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=sendbusiness],disasterhelpcalamitybusinesschangeform button[action=sendbusiness]':{
                click: Ext.bind(header_cl.sendbusiness,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=process],disasterhelpcalamitybusinesschangeform button[action=process],disasterhelpcalamitybusinesslogoutform button[action=process]':{
                click: Ext.bind(header_cl.formprocess,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=change],disasterhelpcalamitybusinesschangeform button[action=change]':{
                click: Ext.bind(header_cl.showchangeform,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=cancel],disasterhelpcalamitybusinesschangeform button[action=cancel],disasterhelpcalamitybusinesslogoutform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=checkbusiness],disasterhelpcalamitybusinesschangeform button[action=checkbusiness],disasterhelpcalamitybusinesslogoutform button[action=checkbusiness]':{
                click: Ext.bind(header_cl.showcheckwin,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=signature],disasterhelpcalamitybusinesschangeform button[action=signature],disasterhelpcalamitybusinesslogoutform button[action=signature]':{
                click: Ext.bind(header_cl.showsignature,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=unsignature],disasterhelpcalamitybusinesschangeform button[action=unsignature],disasterhelpcalamitybusinesslogoutform button[action=unsignature]':{
                click: Ext.bind(header_cl.delsignature,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=print],disasterhelpcalamitybusinessalterform button[action=print],disasterhelpcalamitybusinesschangeform button[action=print],disasterhelpcalamitybusinesslogoutform button[action=print]':{
                click: Ext.bind(header_cl.formprint,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=cancelsendbusiness],disasterhelpcalamitybusinessalterform button[action=cancelsendbusiness],disasterhelpcalamitybusinesschangeform button[action=cancelsendbusiness],disasterhelpcalamitybusinesslogoutform button[action=cancelsendbusiness]':{
                click: Ext.bind(header_cl.cancelsendbusiness,header_cl)
            },
            'disasterhelpcalamitybusinessalterform button[action=logout],disasterhelpcalamitybusinesschangeform button[action=logout]':{
                click: Ext.bind(header_cl.logoutbusiness,header_cl)
            },
            'disasterhelpcalamitybusinesslogoutform button[action=savelogoutapplysubmit]':{
                click: Ext.bind(dbgl_cl.savelogoutapplysubmit, dbgl_cl)
            }


        }, this);

    },



    calamityapplysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.disasterhelp,true);
    },
    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.disasterplace,false);
    },
    wareapplysubmit:function(btn){
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.disasterware,false);
    },

    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

