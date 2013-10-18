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
Ext.define('ZSMZJ.controller.Rangers', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    refs: [

    ],
    views: [
        'rangers.businessApply',
        'rangers.businessAlter'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'rangershelpbusinessapplyform,rangershelpbusinessalterform': {
                afterrender: dbgl_cl.afterrenderEvents
            },

            'rangershelpbusinessapplyform component,rangershelpbusinessalterform component': {
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
            'rangershelpbusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'rangershelpbusinessalterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },

            'rangershelpbusinessalterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            }



        }, this);

    },


    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.rangershelp,false);
    },

    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

