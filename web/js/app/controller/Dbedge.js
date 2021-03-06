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
Ext.define('ZSMZJ.controller.Dbedge', {
    extend: 'Ext.app.Controller',
    models: [],

    stores: [],

    refs: [

    ],
    views: [
        'dbedge.businessApply',
        'dbedge.businessChange',
        'dbedge.businessLogout',
        'dbedge.businessAlter',
        'dbedge.familybasicFieldset',
        'dbedge.applysubmitFieldset',
        'dbedge.altersubmitFieldset',
        'dbedge.changesubmitFieldset',
        'dbedge.logoutsubmitFieldset'

    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        this.control({
            'dbedgebusinessapplyform,dbedgebusinessalterform,dbedgebusinesschangeform,dbedgebusinesslogoutform': {
                afterrender: dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)

            },
            'dbedgebusinessapplyform component,dbedgebusinessalterform component,dbedgebusinesschangeform component,dbedgebusinesslogoutform component': {
                imgclick: function (c) {
                    dbgl_cl.showUploadImgWin(c);
                },
                affixclick: function (c) {
                    dbgl_cl.showaffixWindow(c);
                },
                owerchange:function(c){
                    dbgl_cl.owerchanged(c);
                },
                moneychane:function(c){
                    dbgl_cl.moneychane(c);
                },
                houseareachane:function(c){
                    dbgl_cl.houseareachane(c);
                }
            },
            'dbedgebusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'dbedgebusinessalterform button[action=applysubmit],dbedgebusinesschangeform button[action=applysubmit],dbedgebusinesslogoutform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'dbedgebusinesschangeform button[action=saveapplysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitchange, dbgl_cl)
            },
            'dbedgebusinesslogoutform button[action=savelogoutapplysubmit]': {
                click: Ext.bind(dbgl_cl.savelogoutapplysubmit, dbgl_cl)
            }


        }, this);

    },
    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.dbbyh,true);
    },


    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

