/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-23
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */



/**
 * Medical controller
 * 医疗业务控制层，描述低保各种业务信息
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
        'medicalhelp.businessAlter',
        'medicalhelp.addNewMedicalStandardWin',
        'medicalhelp.MedicalStandardGrid',
        'medicalhelp.familybasicFieldset',
        'medicalhelp.familyhouseFieldset',
        'medicalhelp.familyinputFieldset',
        'medicalhelp.familypropertyFieldset',
        'medicalhelp.familyapplyFieldset',
        'medicalhelp.applysubmitFieldset',
        //'medicalhelp.alterfamilybasicFieldset',
        'medicalhelp.altersubmitFieldset',
        'medicalhelp.alreadyhelpaidFieldset',
        'medicalhelp.altersubmitlogFieldset'
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
                afterrender: dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)/*加载小表单*/
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
            },'medicalstandardgridpanel':{
                selectionchange:function(view, records){
                    view.view.up('panel').down('#removeStandard').setDisabled(!records.length);
                }
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
            Ext.Msg.alert("提示信息", "添加标准失败,检查web服务");
        };
        var dbgl_cl = this.application.getController("Dbgl");
        Ext.bind(dbgl_cl.formSubmit(ajaxform, params, 'ajax/sendformcommon.jsp', successFunc, failFunc,"正在提交数据"),dbgl_cl);

    },
    delmedicalstandard:function(btn){
        var me=this;
        var grid=btn.up('grid');
        var selModel = grid.getSelectionModel() ;
        var isGridSelected = selModel.hasSelection() ;
        if (!isGridSelected) { //没有被选中
            Ext.MessageBox.alert("提示","请选则要删除的数据") ;
            return ;
        }
        Ext.Msg.show({
            title: '确定要删除所选项么?',
            msg: '你正在试图删除所选项.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (confirmbtn) {
                if(confirmbtn=='yes'){
                    var lstSelRec = selModel.getLastSelected() ; //获取最后一个选择的一行的数据

                    var params = {
                        id:lstSelRec.get('rid'),
                        idname:'rowid',
                        isrowid:true,
                        tablename:'medicalstandard'
                    };
                    var successFunc = function (response, action) {
                        var res = Ext.JSON.decode(response.responseText);
                        if(res.isok){
                            grid.getStore().load();
                        }
                        else{
                            Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");
                        }
                    };
                    var failFunc = function (res, action) {
                        Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");
                    };
                    var header_cl=me.application.getController("Header");
                    Ext.bind(header_cl.ajaxSend(params, 'ajax/delcommonbyid.jsp', successFunc, failFunc,'POST'),header_cl);

                }
            },
            icon: Ext.Msg.QUESTION
        });



    },
    outexcel:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var header_cl=this.application.getController("Header");
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }

        var me=this;
        var headers=header_cl.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };

        Ext.bind(header_cl.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST'),header_cl);

    },
    medicalexpenseschange:function(item){

        //testobj=item;
        var panel=item.up('panel');
        var helptype=panel.down('#helptype');
        var helpnature=panel.down('#helpnature');
        var medicalmoney=panel.down('#medicalmoney');
        var medicalselfmoney=panel.down('#medicalselfmoney');
        var writeoffmoney=panel.down('#writeoffmoney');
        var responsiblemoney=panel.down('#responsiblemoney');
        var totalhelpmoney=panel.down('#totalhelpmoney');
        if(helptype&&helpnature){
            var params = {
                querystr:Ext.JSON.encode({helpnature:helpnature.getValue(),helptype:helptype.getValue()}),
                tablename:'medicalstandard'
            };
            var successFunc = function (response, action) {
                var res = Ext.JSON.decode(response.responseText);
                responsiblemoney.setValue(medicalmoney.getValue()- medicalselfmoney.getValue()-writeoffmoney.getValue());
                if(res.length>0){
                    var rem=responsiblemoney.getValue();
                    for(var i=0;i<res.length;i++){
                        if(parseInt(res[i].bgmoney)<=rem&&rem<=parseInt(res[i].edmoney)){
                            var percent=res[i].helppercent;
                            totalhelpmoney.setValue(rem*(parseInt(percent)/100));
                            break;
                        }

                    }


                }else{
                    Ext.Msg.alert("提示信息", "缺少对应的医疗标准，不能自动计算医保金额!");
                }

            };
            var failFunc = function (res, action) {
                Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");
            };
            var header_cl=this.application.getController("Header");
            Ext.bind(header_cl.ajaxSend(params, 'ajax/getcommonlist.jsp', successFunc, failFunc,'POST'),header_cl);

        }


    },
    applysubmit: function (btn) {
        var dbgl_cl = this.application.getController("Dbgl");
        dbgl_cl.submitcommon(btn, businessTableType.medicalhelp,true);
    },

    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

