/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */



/**
 * Study controller
 * 助学救助业务控制层，描述低保各种业务信息
 */
Ext.define('ZSMZJ.controller.Study', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    refs: [

    ],
    views: [
        'studyhelp.businessApply',
        'studyhelp.businessAlter',
        'studyhelp.familybasicFieldset',
        'studyhelp.familyhouseFieldset',
        'studyhelp.familyinputFieldset',
        'studyhelp.familypropertyFieldset',
        'studyhelp.familyapplyFieldset',
        'studyhelp.applysubmitFieldset',
        'studyhelp.alterfamilybasicFieldset',
        'studyhelp.altersubmitFieldset',
        'studyhelp.altersubmitlogFieldset'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'studyhelpbusinessapplyform,studyhelpbusinessalterform': {
                afterrender: dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)/*加载小表单*/
            },
            'studyhelpbusinessapplyform component,studyhelpbusinessalterform component': {
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
            'studyhelpbusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'studyhelpbusinessalterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'studyhelpbusinessalterform button[action=sendbusiness]':{
                click: Ext.bind(header_cl.sendbusiness,header_cl)
            },
            'studyhelpbusinessalterform button[action=process]':{
                click: Ext.bind(header_cl.formprocess,header_cl)
            },
            'studyhelpbusinessalterform button[action=change]':{
                click: Ext.bind(header_cl.showchangeform,header_cl)
            },
            'studyhelpbusinessalterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'studyhelpbusinessalterform button[action=checkbusiness]':{
                click: Ext.bind(header_cl.showcheckwin,header_cl)
            },
            'studyhelpbusinessalterform button[action=signature]':{
                click: Ext.bind(header_cl.showsignature,header_cl)
            },
            'studyhelpbusinessalterform button[action=unsignature]':{
                click: Ext.bind(header_cl.delsignature,header_cl)
            },
            'studyhelpbusinessalterform button[action=print]':{
                click: Ext.bind(header_cl.formprint,header_cl)
            },
            'studyhelpbusinessalterform button[action=cancelsendbusiness]':{
                click: Ext.bind(header_cl.cancelsendbusiness,header_cl)
            },
            'studyhelpbusinessalterform button[action=logout]':{
                click: Ext.bind(header_cl.logoutbusiness,header_cl)
            }


        }, this);

    },



    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.studyhelp,true);
    },

    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

