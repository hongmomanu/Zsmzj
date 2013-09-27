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
Ext.define('ZSMZJ.controller.Medical', {
    extend: 'Ext.app.Controller',
    models: [],

    stores: [],

    refs: [

    ],
    views: [
        'medicalhelp.businessApply',
        'medicalhelp.addNewMedicalStandardWin',
        'medicalhelp.MedicalStandardGrid'
    ],

    initStrore: function () {
    },
    init: function () {
        var me = this;
        this.initStrore();
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl=this.application.getController("Header");
        this.control({
            'medicalhelpbusinessapplyform,medicalhelpbusinessalterform': {
                afterrender: dbgl_cl.afterrenderEvents
            },
            'medicalhelpbusinessapplyform component,medicalhelpbusinessalterform component': {
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
            'medicalhelpbusinessapplyform button[action=applysubmit]': {
                click: this.applysubmit
            },
            'medicalhelpbusinessalterform button[action=applysubmit]': {
                click: Ext.bind(dbgl_cl.applysubmitupdate, dbgl_cl)
            },
            'medicalhelpbusinessalterform button[action=sendbusiness]':{
                click: Ext.bind(header_cl.sendbusiness,header_cl)
            },
            'medicalhelpbusinessalterform button[action=process]':{
                click: Ext.bind(header_cl.formprocess,header_cl)
            },
            'medicalhelpbusinessalterform button[action=change]':{
                click: Ext.bind(header_cl.showchangeform,header_cl)
            },
            'medicalhelpbusinessalterform button[action=cancel]':{
                click: Ext.bind(header_cl.cancelcheck,header_cl)
            },
            'medicalhelpbusinessalterform button[action=checkbusiness]':{
                click: Ext.bind(header_cl.showcheckwin,header_cl)
            },
            'medicalhelpbusinessalterform button[action=signature]':{
                click: Ext.bind(header_cl.showsignature,header_cl)
            },
            'medicalhelpbusinessalterform button[action=unsignature]':{
                click: Ext.bind(header_cl.delsignature,header_cl)
            },
            'medicalhelpbusinessalterform button[action=print]':{
                click: Ext.bind(header_cl.formprint,header_cl)
            },
            'medicalhelpbusinessalterform button[action=cancelsendbusiness]':{
                click: Ext.bind(header_cl.cancelsendbusiness,header_cl)
            },
            'medicalhelpbusinessalterform button[action=logout]':{
                click: Ext.bind(header_cl.logoutbusiness,header_cl)
            },
            'medicalstandardgridpanel button[action=addnew]':{
                click:this.addnewmedicalstandard

            },'medicalstandardgridpanel button[action=del]':{
                click:this.delmedicalstandard

            },'medicalstandardgridpanel button[action=outexcel]':{
                click:this.outexcel

            }


        }, this);

    },
    addnewmedicalstandard:function(btn){
        if (!this.newaddMedicalstandardWin)this.newaddMedicalstandardWin = Ext.widget('addnewmedicalstandardwin');
        this.newaddMedicalstandardWin.show();

    },
    delmedicalstandard:function(btn){
        console.log(btn);
    },
    outexcel:function(btn){
        console.log(btn);
    },
    medicalexpenseschange:function(item){

        testobj=item;

    },
    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.medicalhelp);
    },


    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

