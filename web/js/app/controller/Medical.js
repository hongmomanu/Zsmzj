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
    models: [
        'medicalhelp.MedicalStandard'
    ],

    stores: [
        'medicalhelp.MedicalStandards'
    ],

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
            },'addnewmedicalstandardwin button[action=add]':{
                click:this.addnewmedicalstandardrecord
            }

        }, this);

    },
    addnewmedicalstandard:function(btn){
        if (!this.newaddMedicalstandardWin)this.newaddMedicalstandardWin = Ext.widget('addnewmedicalstandardwin');
        this.newaddMedicalstandardWin.dataobj=btn.up('grid');
        this.newaddMedicalstandardWin.show();

    },
    addnewmedicalstandardrecord:function(btn){

        var win=btn.up('window');
        var ajaxform=win.down('form');

        var grid=win.dataobj;
        var params = {
            tablename:"medicalstandard"
        };
        var successFunc = function (myform, action) {
            btn.up('window').close();
            grid.getStore().load();
        };
        var failFunc = function (myform, action) {
            Ext.Msg.alert("提示信息", "发放资金失败,检查web服务");
        };
        var dbgl_cl = this.application.getController("Dbgl");
        Ext.bind(dbgl_cl.formSubmit(ajaxform, params, 'ajax/sendformcommon.jsp', successFunc, failFunc,"正在提交数据"),dbgl_cl);

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

