/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */


/**
 * Dbgl controller
 * 低保管理业务控制层，描述低保各种业务信息
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
        'dbedge.businessAlter'

    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        this.control({
            'dbedgebusinessapplyform,dbedgebusinessalterform,dbedgebusinesschangeform,dbedgebusinesslogoutform': {
                afterrender: dbgl_cl.afterrenderEvents
            },
            'dbedgebusinessapplyform component,dbedgebusinessalterform component,dbedgebusinesschangeform component,dbedgebusinesslogoutform component': {
                imgclick: function (c) {
                    dbgl_cl.showUploadImgWin(c);
                },
                affixclick: function (c) {
                    dbgl_cl.showaffixWindow(c);
                }
            },
            'dbedgebusinessapplyform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmit, dbgl_cl)
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
        dbgl_cl.submitcommon(btn, businessTableType.dbbyh);
    },


    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

