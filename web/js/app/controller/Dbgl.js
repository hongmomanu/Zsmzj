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
    models: ['dbgl.FamilyMember','dbgl.AffixFilesGrid',
        'dbgl.comboxwidget.ApplyType','dbgl.ProcessHistory',
        'dbgl.NeedToDoBusiness','dbgl.ChangedBusiness',
        'dbgl.LogoutBusiness','dbgl.PeopleQuery',
        'dbgl.FamilyQuery','dbgl.StatisticsFull',
        'dbgl.StatisticsComplexOne','dbgl.GrantMoneyModel'],

    stores: ['dbgl.FamilyMembers','dbgl.AffixFilesGrids',
        'dbgl.comboxwidget.ApplyTypes','dbgl.ProcessHistorys',
        'dbgl.NeedToDoBusinesses','dbgl.ChangedBusinesses',
        'dbgl.LogoutBusinesses','dbgl.PeopleQuerys',
        'dbgl.FamilyQuerys','dbgl.StatisticsFulls',
        'dbgl.StatisticsComplexOnes','dbgl.GrantMoneyStore'],

    refs: [
        {ref: 'myviewbusinessapplyform', selector: 'dbglbusinessapplyform'},
        /*{ref: 'mydbglbusinesscheckform', selector: 'dbglbusinesscheckform'},*/
        {ref: 'familymemberage', selector: '#personage'},
        {ref: 'myviewfamilymembergrid', selector: 'familymembergrid'},
        {ref: 'myviewaffixfilesgrid', selector: 'affixfilesgrid'},
        {ref: 'myviewuploadimgfilewin', selector: 'uploadimgfilewin'}
    ],
    views: [
        'dbgl.businessApply',
        'dbgl.FamilyMemberGrid',
        'dbgl.FamilyMemberPrintGrid',
        'dbgl.uploadImgFileWin',
        'dbgl.uploadAffixFileWin',
        'dbgl.AffixFilesGrid',
        'dbgl.comboxwidget.applytype',
        'dbgl.ProcessHistoryGrid',
        'dbgl.processWin',
        'dbgl.ProcessPicture',
        'dbgl.ProcessVector',
        'dbgl.businessPrint',
        'dbgl.businessAlter',
        'dbgl.businessChange',
        'dbgl.businessLogout',
        'dbgl.processCheckWin',
        'dbgl.NeedToDoBusinessGrid',
        'dbgl.ChangedBusinessGrid',
        'dbgl.LogoutBusinessGrid',
        'dbgl.PeopleQueryGrid',
        'dbgl.FamilyQueryGrid',
        'dbgl.GrantMoneyGrid',
        'dbgl.StatisticsFullGrid',
        'dbgl.addNewGrantWin',
        'dbgl.moreSearchFamilyWin',
        'common.MonthField',
        'dbgl.StatisticsComplexOneGrid'
    ],

    initStrore:function(){
        var store=this.getDbglNeedToDoBusinessesStore();
        var header_cl=this.application.getController("Header");
        store.on('load', function (store, options) {
            header_cl.widgetdolayout("mainContent-panel");
        });

        var changed_store=this.getDbglChangedBusinessesStore();
        changed_store.on('load', function (store, options) {
            header_cl.widgetdolayout("mainContent-panel");
        });

        var logout_store=this.getDbglLogoutBusinessesStore();
        logout_store.on('load', function (store, options) {
            header_cl.widgetdolayout("mainContent-panel");
        });

        var grant_store=this.getDbglGrantMoneyStoreStore();
        grant_store.on('load', function (store, options) {
            header_cl.widgetdolayout("mainContent-panel");
        });

    },
    init: function() {
        var me = this;
        this.initStrore();
        Ext.apply(Ext.form.field.VTypes, {
            personid:  function(v) {
                //规则区号（3-4位数字）-电话号码（7-8位数字）
                //console.log(v);
                return CommonFunc.IdentityCodeValid(v).isok;
                //return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})$/.test(v);
            },
            personidText: '请输入有效的身份证'
        });
         this.control({
         'dbglbusinessapplyform component':{
            imgclick:function (c){
               this.showUploadImgWin(c);
           },
            affixclick:function (c){
               this.showaffixWindow(c);
            },
            owerchange:function(c){
                this.owerchanged(c);
            },
            moneychane:function(c){
                this.moneychane(c);
            }
         },
         'dbglbusinessalterform component':{
             imgclick:function (c){
                 this.showAlterUploadImgWin(c);
             },
             affixclick:function (c){
                 this.showAlteraffixWindow(c);
             },
             owerchange:function(c){
                 this.owerchanged(c);
             }
         },
         'dbglbusinesslogoutform component':{
             imgclick:function (c){
                 this.showAlterUploadImgWin(c);
             },
             affixclick:function (c){
                 this.showAlteraffixWindow(c);
             },
             owerchange:function(c){
                 this.owerchanged(c);
             }
         },
         'dbglbusinesschangeform component':{
             imgclick:function (c){
                 this.showAlterUploadImgWin(c);
             },
             affixclick:function (c){
                 this.showAlteraffixWindow(c);
             },
             owerchange:function(c){
                 this.owerchanged(c);
             }
         },
             'dbglbusinessapplyform button[action=applysubmit]':{
             click: this.applysubmit
         },
         'moresearchfamilywin button[action=add]':{
             click: this.addnewcondition

         },'moresearchfamilywin button[action=search]':{
             click: this.searchcondition

         },
         'dbglbusinesschangeform button[action=saveapplysubmit]':{
             click: this.applysubmitchange
         },
         'dbglbusinesslogoutform button[action=savelogoutapplysubmit]':{
             click: this.savelogoutapplysubmit
         },

         'dbglbusinessalterform button[action=applysubmit],dbglbusinesschangeform button[action=applysubmit],dbglbusinesslogoutform button[action=applysubmit]':{
             click: this.applysubmitupdate
         },

         'dbglbusinessapplyform,dbglbusinesscheckform,dbglbusinessalterform,dbglbusinesschangeform,dbglbusinesslogoutform':{
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
         'processcheckwin button[action=send]':{
             click:this.sendCheckForm
         },
         'addnewgrantwin button[action=grant]':{
             click: this.grantmoney
         },
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
        function fn(){
            Ext.getCmp('mainContent-panel').doLayout();
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(500);

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
        var ageitem=obj.up('panel').down('#personage');
        ageitem.setValue(age);
    },

    delperson:function(btn){

        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        var sm = gridpanel.getSelectionModel();
        rowEditing.cancelEdit();
        var removeitem=sm.getSelection();
        gridpanel.getStore().remove(sm.getSelection());
        if (gridpanel.getStore().getCount() > 0) {
            sm.select(0);
        }
       //var applyform=this.getMyviewbusinessapplyform();
       var applyform=gridpanel.up('form');
       var countitem=applyform.down('#FamilyPersons');
       var enjoyitem=applyform.down('#enjoyPersons');
       var count=parseInt(countitem.getValue())-1;
       var enjoyednum= removeitem[0].get("isenjoyed")==isenjoyedtype.yes?parseInt(enjoyitem.getValue())-1:parseInt(enjoyitem.getValue());

       countitem.setValue(count);
       enjoyitem.setValue(enjoyednum);

    },
    addnewperson:function(btn){
        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        rowEditing.cancelEdit();
        // Create a model instance
        var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', {
            name: '赵某',
            relationship:'其它',
            personid:'xxxxxxxxxxxxxxxxxx',
            isenjoyed:'不享受',
            persontype:'五保对象',
            jobstatus:'登记失业',
            bodystatus:'健康',
            sex: '男',
            birthday: Ext.Date.clearTime(new Date()),
            age:0,
            monthlyincome: 0

        });
        gridpanel.getStore().insert(0, r);
        //testobj=gridpanel;
        rowEditing.startEdit(0, 0);
        //var applyform=this.getMyviewbusinessapplyform();
        var applyform=gridpanel.up('form');
        var countitem=applyform.down('#FamilyPersons');
        var count=parseInt(countitem.getValue())+1;

        countitem.setValue(count);
    },
    addnewcondition:function(btn){
        var form=btn.up('form');
        var win=btn.up('window');
        form.add({
            xtype:'panel',
            layout: 'column',
            border:0,
            items:[

                {
                    columnWidth: 0.23,
                    xtype:'dbglaplytype',
                    searchtype:win.searchtype,
                    allowBlank: false,
                    blankText: "不能为空",
                    name:'name',
                    fieldLabel: '查询字段'

                },
                {
                    columnWidth: 0.23,
                    xtype:'dbglaplytype',
                    searchtype:'comparelabel',
                    allowBlank: false,
                    blankText: "不能为空",
                    name:'compare',
                    fieldLabel: '操作符'

                },
                {
                    columnWidth: 0.23,
                    xtype:'textfield',
                    //searchtype:this.searchtype,
                    allowBlank: false,
                    blankText: "不能为空",
                    name:'value',
                    fieldLabel: '值'

                },
                {
                    columnWidth: 0.23,
                    xtype:'dbglaplytype',
                    searchtype:'logiclabel',
                    allowBlank: false,
                    blankText: "不能为空",
                    name:'logic',
                    fieldLabel: '逻辑符'

                },
                {
                    xtype: 'container',
                    columnWidth: 0.08,
                    padding :'20 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype:'button',
                            text : 'X',
                            listeners: {
                                click: function() {
                                    var item=this.up('panel');
                                    form.remove(item);
                                }
                            }

                        }
                    ]
                }

            ]
        });

    },
    searchcondition:function(btn){

        var me=this;
        var win=btn.up('window');
        var ajaxform=win.down('form');
        var grid=win.dataobj;
        var values=ajaxform.getValues();
        var store=grid.getStore();
        store.proxy.extraParams.name = values.name;
        store.proxy.extraParams.value = values.value;
        store.proxy.extraParams.logic = values.logic;
        store.proxy.extraParams.compare = values.compare;
        store.loadPage(1);

    },
    grantmoney:function(btn){
        var me=this;
        var win=btn.up('window');
        var ajaxform=win.down('form');

        var grid=win.dataobj;
        var params = {
            userid:userid,
            businesstype:grid.businesstype
        };
        var successFunc = function (myform, action) {

            btn.up('window').close();
            grid.getStore().load();

        };
        var failFunc = function (myform, action) {
            Ext.Msg.alert("提示信息", "发放资金失败,检查web服务");

        };

        this.formSubmit(ajaxform, params, 'ajax/grantmoneyform.jsp', successFunc, failFunc,"正在提交数据");


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
        var form =btn.up('form');
        this.formSubmit(form, params, 'ajax/uploadfile.jsp', successFunc, failFunc,"正在提交数据");
    },

    savelogoutapplysubmit:function(btn){
        this.updateformbyurl(btn,'ajax/logoutapply.jsp',processstatustype.logout);
    },
    applysubmitchange:function(btn){
        this.updateformbyurl(btn,'ajax/changeapply.jsp',processstatustype.change);
    },
    updateformbyurl:function(btn,url,processtype){
        var form=btn.up('form');
        var me=this;

        var head_cl=this.application.getController("Header");
        var s_arr=head_cl.signaturepicarr;
        var signatures=[];

        Ext.each(s_arr,function(item){
            var item_obj={};
            item_obj['businessid']=form.objdata.businessid;
            item_obj['userid']=item.userid;
            item_obj['x']=item.x;
            item_obj['y']=item.y;
            signatures.push(item_obj);
        });


        var store=btn.up('form').down('#familymembergrid').getStore();
        var familymembers=[];
        var affixfiles=[];

        Ext.each(store.data.items,function(a){
            familymembers.push(a.data);
        });

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
            businessid:form.objdata.businessid,
            familymembers:Ext.JSON.encode(familymembers),
            affixfiles:Ext.JSON.encode(affixfiles),
            signatures:Ext.JSON.encode(signatures)
        };
        if(processtype){
            params['processstatustype']=processtype;
        }

        var successFunc = function (myform, action) {
            Ext.Msg.alert("提示信息", "操作成功");
            var hc=me.application.getController("Header");
            hc.closetab(form.id);
            //alert(111);
            //var grid=form.objdata.grid;
            //grid.getStore().load();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交更新失败,检查web服务");

        };
        var form =btn.up('form');
        this.formSubmit(form, params, url, successFunc, failFunc,"正在提交数据");

    },
    applysubmitupdate:function(btn){
        this.updateformbyurl(btn,'ajax/updateapply.jsp');

    },

    sendCheckForm:function(btn){

        var me=this;
        var win=btn.up('window');
        var form=win.dataform;
        var ajaxform=win.down('form');
        var grid=form.objdata.grid;
        var businessid=form.objdata.businessid;
        var params = {
            userid:userid,
            businessid:businessid,
            processstatus:form.objdata.record.get('processstatus'),
            isapproval: ajaxform.getForm().getValues().approvalresult==approvalresult.yes,
            approvalname:win.approvalname
        };
        var successFunc = function (myform, action) {

            btn.up('window').close();
            Ext.Msg.alert("提示信息", "操作成功");
            var hc=me.application.getController("Header");
            hc.closetab(form.id);

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", action.result.msg);

        };

        this.formSubmit(ajaxform, params, 'ajax/sendcheckform.jsp', successFunc, failFunc,"正在提交数据");



    },
    submitcommon:function(btn,businesstype){
        var me=this;
        //var store=this.getMyviewfamilymembergrid().getStore();
        var store=btn.up('form').down('#familymembergrid').getStore();
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
            businesstype:businesstype,
            userid:userid,
            familymembers:Ext.JSON.encode(familymembers),
            processstatustype:processstatustype.ok,
            affixfiles:Ext.JSON.encode(affixfiles)
        };
        var successFunc = function (myform, action) {

            var hc=me.application.getController("Header");
            hc.closetab(form.id);

            Ext.Msg.alert("提示信息", "提交申请成功");

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交申请失败,检查web服务");

        };
        var form =btn.up('form');
        this.formSubmit(form, params, 'ajax/sendapply.jsp', successFunc, failFunc,"正在提交数据");


    },
    applysubmit:function(btn){

       this.submitcommon(btn,businessTableType.dbgl);
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
        var form =btn.up('form');
        this.formSubmit(form, params, 'ajax/uploadfile.jsp', successFunc, failFunc,"正在提交数据");

    },
    formSubmit: function (myform, params, url, sucFunc, failFunc,waitmsg) {
        var form = myform.getForm();
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

        }else{
            var invaliditem=form.getFields().findBy(function(c){if(!c.isValid()){return c}});
            var formcontent=myform.getDefaultContentTarget();
            var target=invaliditem.getEl();
            target.scrollIntoView(formcontent,true,true,true);
        }


    },

    showUploadImgWin:function(c){
        if(!this.uploadimgWin)this.uploadimgWin=Ext.widget('uploadimgfilewin');
        this.uploadimgWin.itemdata= c;
        this.uploadimgWin.show();

    },
    cleanuploadWin:function(){
        if(this.alteruploadaffixWin){
            this.alteruploadaffixWin.destroy();
            this.alteruploadaffixWin=null;
        }
        if(this.alteruploadimgWin){
            this.alteruploadimgWin.destroy();
            this.alteruploadimgWin=null;
        }
    },
    showAlterUploadImgWin:function(c){
        if(!this.alteruploadimgWin)this.alteruploadimgWin=Ext.widget('uploadimgfilewin');
        this.alteruploadimgWin.itemdata= c;

        this.alteruploadimgWin.show();

    },
    moneychane:function(c){
      //var value=
        //alert(c.getValue());
        var formpanel=c.up('panel');
        var incomesum=formpanel.down('#incomesum');
        var incomesum_value=0;
        var incomeitems=incomesum.up('fieldset').items.items;
        for(var i=0;i<incomeitems.length;i++){
            if(incomeitems[i]==incomesum)break;
            incomesum_value+=parseFloat(incomeitems[i].getValue());
        }
        incomesum.setValue(incomesum_value);

        var propertysum=formpanel.down('#propertysum');
        var propertysum_value=0;
        var propertyitems=propertysum.up('fieldset').items.items;
        for(var i=0;i<propertyitems.length;i++){
            if(propertyitems[i]==propertysum)break;
            propertysum_value+=parseFloat(propertyitems[i].getValue());
        }
        propertysum.setValue(propertysum_value);
        //console.log(testobj);
    },
    owerchanged:function(c){
      if(c.getRawValue()!=""){
          var familygrid= c.up('form').down('familymembergrid');
          var store=familygrid.getStore();
          if(store.getCount()==0){
              //var rowEditing=familygrid.editingPlugin;
              //rowEditing.cancelEdit();

              // Create a model instance
              var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', {
                  name: c.name=="owername"?c.getRawValue().replace(/\s+/g, ""):"",
                  relationship:'户主',
                  personid: c.name=='owerid'?c.getRawValue().replace(/\s+/g, ""):'',
                  isenjoyed:'享受',
                  persontype:'五保对象',
                  jobstatus:'否',
                  bodystatus:'健康',
                  sex: '男',
                  birthday: Ext.Date.clearTime(new Date()),
                  //birthday:'',
                  age:0,
                  monthlyincome: 0

              });
              familygrid.getStore().insert(0, r);
              var applyform=familygrid.up('form');
              var countitem=applyform.down('#FamilyPersons');

              countitem.setValue(1);
              var rowEditing=familygrid.editingPlugin;
              //testobj=gridpanel;
              rowEditing.startEdit(0, 0);

              var formcontent=applyform.getDefaultContentTarget();
              var target=familygrid.getEl();
              target.scrollIntoView(formcontent,true,true,true);



          }else{
              Ext.each(store.data.items,function(item){
                  if(item.get('relationship')=='户主'){
                      if(c.name=="owername")item.set("name",c.getRawValue().replace(/\s+/g, ""));
                      else if(c.name=="owerid")item.set("personid",c.getRawValue().replace(/\s+/g, ""));
                  }
              });

          }

      }

    },
    showaffixWindow:function(c){
        var store=null;
        if(!this.uploadaffixWin){
            this.uploadaffixWin=Ext.widget('uploadaffixfilewin');
            store=this.uploadaffixWin.down('panel').down('panel').getStore();
        }
        else{
            var store=this.uploadaffixWin.down('panel').down('panel').getStore();
            store.removeAll();
        }
        this.uploadaffixWin.itemdata=c;
        Ext.each(c.formdata,function(a){
            var r = Ext.create('ZSMZJ.model.dbgl.AffixFilesGrid',a);
            store.insert(0, r);
        });
        this.uploadaffixWin.show();

    },
    showAlteraffixWindow:function(c){
        var store=null;
        if(!this.alteruploadaffixWin){
            this.alteruploadaffixWin=Ext.widget('uploadaffixfilewin');
            store=this.alteruploadaffixWin.down('panel').down('panel').getStore();

        }else{
            store=this.alteruploadaffixWin.down('panel').down('panel').getStore();
            store.removeAll();
        }
        this.alteruploadaffixWin.itemdata=c;
        Ext.each(c.formdata,function(a){
            var r = Ext.create('ZSMZJ.model.dbgl.AffixFilesGrid',a);
            store.insert(0, r);
        });
        this.alteruploadaffixWin.show();

    },
    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

