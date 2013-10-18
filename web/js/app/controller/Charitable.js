/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */



/**
 * Charitable controller
 * 慈善救助管理业务控制层，描述低保各种业务信息
 */
Ext.define('ZSMZJ.controller.Charitable', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    refs: [

    ],
    views: [
        'charitablehelp.businessApply',
        'charitablehelp.businessAlter'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'charitablehelpbusinessapplyform,charitablehelpbusinessalterform': {
                afterrender: dbgl_cl.afterrenderEvents
            },
            'charitablehelpbusinessapplyform component,charitablehelpbusinessalterform component': {
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
            'charitablehelpbusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'charitablehelpbusinessalterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'charitablehelpbusinessalterform button[action=sendbusiness]':{
                click: Ext.bind(header_cl.sendbusiness,header_cl)
            },
            'charitablehelpbusinessalterform button[action=process]':{
                click: Ext.bind(header_cl.formprocess,header_cl)
            },
            'charitablehelpbusinessalterform button[action=change]':{
                click: Ext.bind(header_cl.showchangeform,header_cl)
            },
            'charitablehelpbusinessalterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'charitablehelpbusinessalterform button[action=checkbusiness]':{
                click: Ext.bind(header_cl.showcheckwin,header_cl)
            },
            'charitablehelpbusinessalterform button[action=signature]':{
                click: Ext.bind(header_cl.showsignature,header_cl)
            },
            'charitablehelpbusinessalterform button[action=unsignature]':{
                click: Ext.bind(header_cl.delsignature,header_cl)
            },
            'charitablehelpbusinessalterform button[action=print]':{
                click: Ext.bind(header_cl.formprint,header_cl)
            },
            'charitablehelpbusinessalterform button[action=cancelsendbusiness]':{
                click: Ext.bind(header_cl.cancelsendbusiness,header_cl)
            },
            'charitablehelpbusinessalterform button[action=logout]':{
                click: Ext.bind(header_cl.logoutbusiness,header_cl)
            }


        }, this);

    },



    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.charitablehelp,true);
    },

    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

