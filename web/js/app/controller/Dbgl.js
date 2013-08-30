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
Ext.define('ZSMZJ.controller.Dbgl', {
    extend: 'Ext.app.Controller',
    models: ['dbgl.FamilyMember','dbgl.AffixFilesGrid','dbgl.comboxwidget.ApplyType'],

    stores: ['dbgl.FamilyMembers','dbgl.AffixFilesGrids','dbgl.comboxwidget.ApplyTypes'],

    refs: [
        {ref: 'myviewbusinessapplyform', selector: 'dbglbusinessapplyform'},
        {ref: 'familymemberage', selector: '#personage'},
        {ref: 'myviewfamilymembergrid', selector: 'familymembergrid'},
        {ref: 'myviewaffixfilesgrid', selector: 'affixfilesgrid'},
        {ref: 'myviewuploadimgfilewin', selector: 'uploadimgfilewin'}
    ],
    views: [
        'dbgl.businessApply',
        'dbgl.FamilyMemberGrid',
        'dbgl.uploadImgFileWin',
        'dbgl.uploadAffixFileWin',
        'dbgl.AffixFilesGrid',
        'dbgl.comboxwidget.applytype',
        'dbgl.ProcessHistoryGrid',
        'dbgl.processWin',
        'dbgl.ProcessPicture',
        'dbgl.ProcessVector',
        'dbgl.businessCheck',
        'dbgl.businessAlter'

    ],

    init: function() {
        var me = this;

         this.control({
         'dbglbusinessapplyform component':{
            imgclick:function (c){
               this.showUploadImgWin(c);
           },
            affixclick:function (c){
               this.showaffixWindow(c);
            }
         },
         'dbglbusinessalterform component':{
             imgclick:function (c){
                 this.showAlterUploadImgWin(c);
             },
             affixclick:function (c){
                 this.showAlteraffixWindow(c);
             }
         },
         'dbglbusinessapplyform button[action=applysubmit]':{
             click: this.applysubmit
         },
         'dbglbusinessapplyform,dbglbusinesscheckform,dbglbusinessalterform':{
             afterrender: this.afterrenderEvents
         },

         'uploadimgfilewin button[action=upload]':{
             click: this.uploadImgFile
         },
         'uploadaffixfilewin button[action=upload]':{
                 click: this.uploadAffixFile
         },
         'uploadaffixfilewin button[action=confirm]':{
             click: this.uploadAffixFileConfirm
         },
          'familymembergrid button[action=addnewperson]':{

              click:this.addnewperson
          },
         'familymembergrid button[action=delperson]':{

             click:this.delperson
         },
         /*'familymembergrid':{

             selectionchange:this.personselected
         },*/
         /*'affixfilesgrid':{

             itemmouseenter:this.affixgridprew
         },*/
         'affixfilesgrid':{

             afterrender:this.affixgridrendered

         },
         '#personbirthday':{ //更新生日，触发年龄信息

             change:this.birthdaychange
         },
         'dbglapplytype': {

             beforeload:function(store){alert(1)}
         }
         }, this);


    },
    afterrenderEvents:function(){
        CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
    },
    affixgridrendered:function(grid,e){
        var view = grid.getView();
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: view.el,
            delegate: view.itemSelector,
            trackMouse: true,
            //renderTo: Ext.getBody(),
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    tip.update('<div><img width="220" height="170" src="' + view.getRecord(tip.triggerElement).get('attachmentpath') + '"/></div>');
                }
            }
        });
    },
    /*affixgridprew:function (view, record, item) {
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: item,
            html: '<div><img width="100" height="110" src="'+record.data.attachmentpath+'"/></div>'
        });
        tip.show();

    },*/
    birthdaychange:function(obj,newValue, oldValue, eOpts ){

        var age=(new Date()).getFullYear()-newValue.getFullYear();
        this.getFamilymemberage().setValue(age);
    },

    delperson:function(btn){

        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        var sm = gridpanel.getSelectionModel();
        rowEditing.cancelEdit();
        gridpanel.getStore().remove(sm.getSelection());
        if (gridpanel.getStore().getCount() > 0) {
            sm.select(0);
        }
       var applyform=this.getMyviewbusinessapplyform();
       var countitem=applyform.down('#FamilyPersons');
       var enjoyitem=applyform.down('#enjoyPersons');
       var count=parseInt(countitem.getValue())-1;
       countitem.setValue(count);
       enjoyitem.setValue(count)

    },
    addnewperson:function(btn){
        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        rowEditing.cancelEdit();
        // Create a model instance
        var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', {
            name: '赵某',
            relationship:'户主',
            personid:'xxxxxxxxxxxxxxxxxx',
            isenjoyed:'不享受',
            persontype:'低保户',
            jobstatus:'无',
            bodystatus:'差',
            sex: '男',
            birthday: Ext.Date.clearTime(new Date()),
            age:0,
            monthlyincome: 0

        });

        gridpanel.getStore().insert(0, r);
        rowEditing.startEdit(0, 0);

        //var applyform=this.getMyviewbusinessapplyform();
        var applyform=gridpanel.up('form');
        var countitem=applyform.down('#FamilyPersons');
        var enjoyitem=applyform.down('#enjoyPersons');
        var count=parseInt(countitem.getValue())+1;

        countitem.setValue(count);
        enjoyitem.setValue(count);
    },
    uploadAffixFileConfirm:function(btn){
        var win=btn.up('window');
        var grid=btn.up('panel').down('panel');
        var store=grid.getStore();
        var count=store.getCount();
        var formdata=[];
        Ext.each(store.data.items,function(a){
            formdata.push(a.data);
        });
        CommonFunc.updateitemnum(win.itemdata,count);
        win.itemdata.formdata=formdata;
        win.hide();
        //console.log(store);


    },
    uploadAffixFile:function(btn){
        var me=this;
        var params = {

        };
        var successFunc = function (form, action) {
            var filepath=action.result.filepath;
            var filename=action.result.filename;
            //var grid=me.getMyviewaffixfilesgrid();
            var grid=btn.up('panel').down('panel');
            var r = Ext.create('ZSMZJ.model.dbgl.AffixFilesGrid', {
                attachmentname: filename,
                attachmentpath:filepath

            });

            grid.getStore().insert(0, r);

            grid.doLayout();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "上传文件失败，检查web服务");

        };

        this.formSubmit(btn, params, 'ajax/uploadfile.jsp', successFunc, failFunc,"正在提交数据");



    },
    applysubmit:function(btn){
      /*var form = button.up('form').getForm();
      if (form.isValid()) {
       familymembers,affixfiles,
      }*/

        var store=this.getMyviewfamilymembergrid().getStore();
        var familymembers=[];
        var affixfiles=[];

        Ext.each(store.data.items,function(a){
            familymembers.push(a.data);
        })
        var form=btn.up('form');
        var affixpanel=form.down('#affixfilespanel');
        Ext.each(affixpanel.items.items,function(a){
            if(a.xtype=='panel'){
                var formdata=a.down('panel').formdata;
                var affixfileitem={};
                affixfileitem[a.down('panel').type]=formdata;
                if(formdata)affixfiles.push(affixfileitem);

            }

        });

        affixfiles.push({"accountimgpath":[{'attachmentname':'照片','attachmentpath':form.down('#dbglaccountimg').value}]});
        var params = {
            businesstype:businessTableType.dbgl,
            userid:userid,
            familymembers:Ext.JSON.encode(familymembers),
            affixfiles:Ext.JSON.encode(affixfiles)
        };
        var successFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交申请成功");

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交申请失败,检查web服务");

        };

        this.formSubmit(btn, params, 'ajax/sendapply.jsp', successFunc, failFunc,"正在提交数据");


    },
    uploadImgFile:function(btn){
        var me=this;
        var params = {

        };
        //var applyform=this.getMyviewbusinessapplyform();
        var win=btn.up('window');

        var applyform=win.itemdata.up('form');
        var successFunc = function (form, action) {
            var filepath=action.result.filepath;
            applyform.down('#dbglaccountimg').getEl().dom.src=filepath;
            applyform.down('#dbglaccountimg').value=filepath;
            win.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "上传文件失败，检查web服务");

        };

        this.formSubmit(btn, params, 'ajax/uploadfile.jsp', successFunc, failFunc,"正在提交数据");



    },
    formSubmit: function (button, params, url, sucFunc, failFunc,waitmsg) {
        var form = button.up('form').getForm();
        if (form.isValid()) {
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));

            form.submit({
                waitTitle: '提示', //标题
                waitMsg: waitmsg, //提示信息
                url: url,

                method: "POST",
                params: params,
                success: sucFunc,
                failure: failFunc
            });

        }


    },

    showUploadImgWin:function(c){
        if(!this.uploadimgWin)this.uploadimgWin=Ext.widget('uploadimgfilewin');
        this.uploadimgWin.itemdata= c;
        this.uploadimgWin.show();

    },
    showAlterUploadImgWin:function(c){
        if(!this.alteruploadimgWin)this.alteruploadimgWin=Ext.widget('uploadimgfilewin');
        this.alteruploadimgWin.itemdata= c;

        this.alteruploadimgWin.show();

    },
    showaffixWindow:function(c){
        if(!this.uploadaffixWin){
            this.uploadaffixWin=Ext.widget('uploadaffixfilewin');
            this.uploadaffixWin.itemdata=c;
        }
        this.uploadaffixWin.show();

    },
    showAlteraffixWindow:function(c){
        if(!this.alteruploadaffixWin){
            this.alteruploadaffixWin=Ext.widget('uploadaffixfilewin');
            this.alteruploadaffixWin.itemdata=c;
            //console.log(this.alteruploadaffixWin.down('panel'));
            var store=this.alteruploadaffixWin.down('panel').down('panel').getStore();
            //console.log(store);
            Ext.each(c.formdata,function(a){
                var r = Ext.create('ZSMZJ.model.dbgl.AffixFilesGrid',a);
                store.insert(0, r);
            });

        }
        this.alteruploadaffixWin.show();




    },
    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

