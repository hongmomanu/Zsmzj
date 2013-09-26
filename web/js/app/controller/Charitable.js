/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */



/**
 * Dbedge controller
 * 低保边缘户管理业务控制层，描述低保各种业务信息
 */
Ext.define('ZSMZJ.controller.Charitable', {
    extend: 'Ext.app.Controller',
    models: [],

    stores: [],

    refs: [

    ],
    views: [
        'charitable.businessApply'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'charitablebusinessapplyform,charitablebusinessalterform': {
                afterrender: dbgl_cl.afterrenderEvents
            },
            'charitablebusinessapplyform component,charitablebusinessalterform component': {
                imgclick: function (c) {
                    dbgl_cl.showUploadImgWin(c);
                },
                affixclick: function (c) {
                    dbgl_cl.showaffixWindow(c);
                },
                owerchange:function(c){
                    dbgl_cl.owerchanged(c);
                },
                medicalexpenseschange:function(c){
                    this.medicalexpenseschange(c);
                }
            },
            'charitablebusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'charitablebusinessalterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'charitablebusinessalterform button[action=sendbusiness]':{
                click: Ext.bind(header_cl.sendbusiness,header_cl)
            },
            'charitablebusinessalterform button[action=process]':{
                click: Ext.bind(header_cl.formprocess,header_cl)
            },
            'charitablebusinessalterform button[action=change]':{
                click: Ext.bind(header_cl.showchangeform,header_cl)
            },
            'charitablebusinessalterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'charitablebusinessalterform button[action=checkbusiness]':{
                click: Ext.bind(header_cl.showcheckwin,header_cl)
            },
            'charitablebusinessalterform button[action=signature]':{
                click: Ext.bind(header_cl.showsignature,header_cl)
            },
            'charitablebusinessalterform button[action=unsignature]':{
                click: Ext.bind(header_cl.delsignature,header_cl)
            },
            'charitablebusinessalterform button[action=print]':{
                click: Ext.bind(header_cl.formprint,header_cl)
            },
            'charitablebusinessalterform button[action=cancelsendbusiness]':{
                click: Ext.bind(header_cl.cancelsendbusiness,header_cl)
            },
            'charitablebusinessalterform button[action=logout]':{
                click: Ext.bind(header_cl.logoutbusiness,header_cl)
            }

        }, this);

    },
    medicalexpenseschange:function(item){

        testobj=item;

    },
    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.charitablehelp);
    },


    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

