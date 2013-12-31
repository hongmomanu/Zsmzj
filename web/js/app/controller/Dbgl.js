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
    //加载model
    models: ['dbgl.FamilyMember','dbgl.AffixFilesGrid',
        'dbgl.comboxwidget.ApplyType','dbgl.ProcessHistory',
        'dbgl.NeedToDoBusiness','dbgl.ChangedBusiness',
        'dbgl.LogoutBusiness','dbgl.PeopleQuery',
        'dbgl.FamilyQuery','dbgl.StatisticsFull',
        'dbgl.StatisticsComplexOne','dbgl.GrantMoneyModel',
        'dbgl.SearchCombo','dbgl.StatisticsComplexTwo',
        'dbgl.StatisticsComplexThree','dbgl.StatisticsComplexFour',
        'dbgl.StatisticsComplexCountry','dbgl.StatisticsComplexNewLogout',
        'dbgl.SearchBusiness'

    ],
    //加载store
    stores: ['dbgl.FamilyMembers','dbgl.AffixFilesGrids',
        'dbgl.comboxwidget.ApplyTypes','dbgl.ProcessHistorys',
        'dbgl.NeedToDoBusinesses','dbgl.ChangedBusinesses',
        'dbgl.LogoutBusinesses','dbgl.PeopleQuerys',
        'dbgl.FamilyQuerys','dbgl.StatisticsFulls',
        'dbgl.StatisticsComplexOnes','dbgl.GrantMoneyStore',
        'dbgl.SearchCombos','dbgl.StatisticsComplexTwos',
        'dbgl.StatisticsComplexThrees','dbgl.StatisticsComplexFours',
        'dbgl.StatisticsComplexCountrys','dbgl.StatisticsComplexNewLogouts',
        'dbgl.SearchBusinesses'

    ],
    //自定义引用名
    refs: [
        {ref: 'myviewbusinessapplyform', selector: 'dbglbusinessapplyform'},
        /*{ref: 'mydbglbusinesscheckform', selector: 'dbglbusinesscheckform'},*/
        {ref: 'familymemberage', selector: '#personage'},
        {ref: 'myviewfamilymembergrid', selector: 'familymembergrid'},
        {ref: 'myviewaffixfilesgrid', selector: 'affixfilesgrid'},
        {ref: 'myviewuploadimgfilewin', selector: 'uploadimgfilewin'}
    ],
    //加载view
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
        'dbgl.ProcessVector2',
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
        'dbgl.StatisticsComplexOneGrid',
        'dbgl.StatisticsComplexTwoGrid',
        'dbgl.StatisticsComplexThreeGrid',
        'dbgl.StatisticsComplexFourGrid',
        'dbgl.StatisticsComplexCountryGrid',
        'dbgl.StatisticsComplexNewLogoutGrid',
        'dbgl.personidSearchCombo',
        'dbgl.applysubmitFieldset',
        'dbgl.familyaffixFieldset',
        'dbgl.familybasicFieldset',
        'dbgl.familyhouseFieldset',
        'dbgl.familyinputFieldset',
        'dbgl.familymemberFieldset',
        'dbgl.familymoneyFieldset',
        'dbgl.familyapplyFieldset',
        'dbgl.applyhistoryFieldset',
        'dbgl.altersubmitFieldset',
        'dbgl.changesubmitFieldset',
        'dbgl.logoutsubmitFieldset',
        'dbgl.SearchBusinessGrid',
        'dbgl.SearchBusinessGrid',
        'dbgl.SquareshapedDiv',
        'dbgl.TheSameMonthBusinessPeopleGrid',
        'dbgl.TheSameMonthBusinessFamilyGrid'

    ],

    initStrore:function(){

    },
    init: function() {
        var me = this;
        this.initStrore();
        Ext.apply(Ext.form.field.VTypes, {
            personid:  function(v) {
                return CommonFunc.IdentityCodeValid(v).isok;
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
             totalhelpmoneychane:function(c){
                 this.totalhelpmoneychane(c);

             },
            moneychane:function(c){
                this.moneychane(c);
            },
            houseareachane:function(c){
                this.houseareachane(c);
            }
         },
             'personidsearchcombo':{
                 select: function (combo, records) {
                     var me=this;
                     ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                     ViewWaitMask.show();
                     function fn(){
                         var head_cl=me.application.getController("Header");
                         var form=combo.up('form');
                         var businessid=records[0].data.businessid;
                         form.objdata={};
                         form.objdata.businessid=businessid
                         head_cl.clearAlterContent(form);//清空修改内容
                         head_cl.getValueBybusinessid(businessid,'ajax/getapplyformallbybid.jsp',head_cl.setFormAllValuesWithOutSignature,form);
                         head_cl.formpanelstoreload(businessid,form);

                     }

                     var task = new Ext.util.DelayedTask(fn);
                     task.delay(10);


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
             },
             moneychane:function(c){
                 this.moneychane(c);
             },
             houseareachane:function(c){
                 this.houseareachane(c);
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
             },
             moneychane:function(c){
                 this.moneychane(c);
             },
             houseareachane:function(c){
                 this.houseareachane(c);
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
             },
             moneychane:function(c){
                 this.moneychane(c);
             },
             houseareachane:function(c){
                 this.houseareachane(c);
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
             afterrender: this.afterrenderEvents,
             initformaftershow:this.initformaftershow
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
             click: this.sendCheckForm
         },
         'addnewgrantwin button[action=grant]':{
             click: this.grantmoney
         },
         'affixfilesgrid button[action=delfile]':{
             click: this.delslectfile
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
    //生成新form
    makenewform:function(views,form,isajaxdata,callback){
        var me=this;
        for(var i=0;i<views.length;i++){
            (function a (index,len){

                var task = {
                    run: function(){
                        function fn(){
                            var form_widget=Ext.widget(views[index]);
                            form.add(form_widget);
                            if(isajaxdata){
                                if("dbglfamilybasicfieldset"==form_widget.xtype){
                                    var familyaccount=form.down('#familyaccount');
                                    if(familyaccount&&familyaccount.name=='familyaccount'){
                                        familyaccount.setValue(form.allformdata['familyaccount'])
                                    }
                                }
                                if(form_widget.itemId==='affixfilespanel'){
                                    var head_cl=me.application.getController("Header");
                                    head_cl.setAffixValue(form.affixfiledata,head_cl,form);
                                }
                                else{
                                    var items=form_widget.items.items;
                                    Ext.suspendLayouts();
                                    for(var j=0;j<items.length;j++){
                                        var name=items[j].name;
                                        if(name){
                                            items[j].setValue(form.allformdata[name]);
                                            if(items[j].itemId=='divisiontype'){
                                                items[j].setRawValue(form.allformdata[name]);
                                                items[j].focus();
                                                items[j].validateValue();
                                            }
                                        }/*else{
                                            var head_cl=me.application.getController("Header");
                                            head_cl.formgridload(form,items[j]);
                                        }*/
                                    }
                                    Ext.resumeLayouts(true);
                                }


                            }
                            if(len-1==index&&callback)callback();

                        }
                        var task = new Ext.util.DelayedTask(fn);
                        task.delay(index*20);
                    },
                    repeat:1,
                    interval: 1 //1 毫秒
                };
                Ext.TaskManager.start(task);

            })(i,views.length);

        }
    },
    //form初始化后显示触发事件
    initformaftershow:function(form,isajaxdata,callback){
        var views=applyformviews[CommonFunc.lookupitemname(formwidgettype,form.xtype)];
        //console.log(form.items.items.length);
        var me=this;
        if(form.items.items.length==0){

            this.makenewform(views,form,isajaxdata,callback);

        }
        else if(form.isnewbusiness){

            form.isnewbusiness=false;
        }
        else{
            var head_cl=me.application.getController("Header");
            head_cl.closemask();
        }



    },
    //afterrender 共用方法
    afterrenderEvents:function(){

        CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
        function fn(){
            Ext.getCmp('mainContent-panel').doLayout();
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(500);

    },
    //附件panel渲染后初始化
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
    //生日改变
    birthdaychange:function(obj,newValue, oldValue, eOpts ){
        if(newValue){
            var age=(new Date()).getFullYear()-newValue.getFullYear();
            var ageitem=obj.up('panel').down('#personage');
            ageitem.setValue(age);
        }

    },

    //删除家庭成员
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
       try{
           var enjoyitem=applyform.down('#enjoyPersons');
           var disableditem=applyform.down('#disabledpersons');
           var count=parseInt(countitem.getValue())-1;
           countitem.setValue(count);

           var enjoyednum= removeitem[0].get("isenjoyed")==isenjoyedtype.yes?parseInt(enjoyitem.getValue())-1:parseInt(enjoyitem.getValue());
           var disablednum=disabledtype.heavy.indexOf(removeitem[0].get("disabledlevel"))>0?parseInt(disableditem.getValue())-1:parseInt(disableditem.getValue());

           enjoyitem.setValue(enjoyednum);
           disableditem.setValue(disablednum);
           this.moneychane(gridpanel);

       }catch (e){
           //console.log(e)
       }

    },
    //新增家庭成员
    addnewperson:function(btn){
        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        rowEditing.cancelEdit();
        // Create a model instance
        var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', {
            name: '',
            relationship:'其它',
            personid:'',
            isenjoyed:'享受',
            persontype:'归正人员',
            jobstatus:'',
            bodystatus:'健康',
            sex: '男',
            birthday: Ext.Date.clearTime(new Date()),
            age:0,
            monthlyincome: 0

        });
        gridpanel.getStore().insert(0, r);
        var applyform=gridpanel.up('form');
        var countitem=applyform.down('#FamilyPersons');
        try{
            var count=parseInt(countitem.getValue())+1;

            countitem.setValue(count);
            var enjoyitem=applyform.down('#enjoyPersons');
            enjoyitem.setValue(parseInt(enjoyitem.getValue())+1);

            this.moneychane(gridpanel);
        }catch(e){

        }

        //testobj=gridpanel;
        try{
            rowEditing.startEdit(0, 0);
        }catch(e){

        }

        //var applyform=this.getMyviewbusinessapplyform();

    },
    //新增条件
    addnewcondition:function(btn){
        var form=btn.up('form');
        var win=btn.up('window');
        var searchbtn=form.down('#searchbtn');
        searchbtn.setDisabled(true);
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
                    listeners: {
                        change:function( combo, newValue, oldValue, eOpts ){
                            //testobj=combo;
                            if(combo.getValue()){
                                var next=combo.nextNode();
                                next.setDisabled(false);
                                //next.store.clearFilter();
                                next.clearValue();
                                next.store.proxy.extraParams.type=combo.searchtype+combo.getValue();
                            }
                        }
                    },
                    name:'name',
                    fieldLabel: '查询字段'

                },
                {
                    columnWidth: 0.23,
                    xtype:'dbglaplytype',
                    disabled:true,
                    listeners: {
                        beforequery: function(qe){
                            delete qe.combo.lastQuery;
                        }
                    },
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

                                    if(form.isValid()){
                                        searchbtn.setDisabled(false);
                                    }
                                }
                            }

                        }
                    ]
                }

            ]
        });

    },
    //高级条件搜索
    searchcondition:function(btn){

        var me=this;
        var win=btn.up('window');
        var ajaxform=win.down('form');
        var grid=win.dataobj;
        var values=ajaxform.getValues();
        var store=grid.getStore();

        if(grid.xtype=='thesamemonthbusinesspeoplegrid'||grid.xtype=='thesamemonthbusinessfamilygrid'){
            values.name=me.addconditiontosearch(values.name,grid.thesamemonthqueryparams.name);
            values.value=me.addconditiontosearch(values.value,grid.thesamemonthqueryparams.value);
            values.logic=me.addconditiontosearch(values.logic,grid.thesamemonthqueryparams.logic);
            values.compare=me.addconditiontosearch(values.compare,grid.thesamemonthqueryparams.compare);
        }
        if(Ext.isArray(values.name)){
            for(var i=0;i<values.name.length;i++){
                if('age'==values.name[i]){
                    values.name[i]="strftime('%Y','now')-strftime('%Y',birthday) "
                }
            }

        }else if('age'==values.name){
            values.name="strftime('%Y','now')-strftime('%Y',birthday) ";
        }

        store.proxy.extraParams.name = values.name;
        store.proxy.extraParams.value = values.value;
        store.proxy.extraParams.logic = values.logic;
        store.proxy.extraParams.compare = values.compare;
        store.loadPage(1);

    },
    addconditiontosearch:function(a1,a2){
        if(!Ext.isArray(a1)){
            a1=new Array(a1);
        }
        var fn=function(element,index){
            a1.push(element)
        }
        a2.forEach(fn)
        return a1;
    },
    //删除选中的文件
    delslectfile:function(btn){
      var gridpanel=btn.up('panel');
      var sm = gridpanel.getSelectionModel();
      var removeitem=sm.getSelection();
      gridpanel.getStore().remove(removeitem);
    },
    //资金发放
    grantmoney:function(btn){
        var me=this;
        mytestbtn=btn
        var win=btn.up('window');

        var ajaxform=btn.up('form');
        /*var recordList=win.down('#query_result').getSelectionModel().getSelection();
        var businessidList=[];
        for(var i=0;i<recordList.length;i++){
            businessidList.push(recordList[i].data.businessid);
        }*/
        var grid=win.dataobj;
        var params = {
            userid:userid,
            isnew:btn.isnew,
            divisionpath:divisionpath,
            grantid:ajaxform.down('dbglsearchbusinessgrid').selectItmes,
            businesstype:grid.businesstype
        };
        var successFunc = function (myform, action) {

            win.close();
            grid.getStore().load();

        };
        var failFunc = function (myform, action) {
            Ext.Msg.alert("提示信息", "发放资金失败,检查web服务");

        };

        this.formSubmit(ajaxform, params, 'ajax/grantmoneyform.jsp', successFunc, failFunc,"正在提交数据");


    },
    //上传附件确认
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
    //上传附件
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
    //保存业务注销
    savelogoutapplysubmit:function(btn){
        this.updateformbyurl(btn,'ajax/logoutapply.jsp',processstatustype.logout);
    },
    //业务变更提交
    applysubmitchange:function(btn){
        this.updateformbyurl(btn,'ajax/changeapply.jsp',processstatustype.change);
    },
    //更新form
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

        var familymembers=[];
        var affixfiles=[];


        var familygrid=btn.up('form').down('#familymembergrid');
        if(familygrid){
            var store=familygrid.getStore();
            Ext.each(store.data.items,function(a){
                familymembers.push(a.data);
            });
        }


        var affixpanel=form.down('#affixfilespanel');
        if(affixpanel){
            Ext.each(affixpanel.items.items,function(a){
                if(a.xtype=='container'){
                    var formdata=a.down('panel').formdata;
                    var affixfileitem={};
                    affixfileitem[a.down('panel').type]=formdata;
                    if(formdata)affixfiles.push(affixfileitem);
                }
            });

        };
        var accountimg=form.down('#dbglaccountimg');
        if(accountimg){
            affixfiles.push({"accountimgpath":[{'attachmentname':'照片','attachmentpath':form.down('#dbglaccountimg').value}]});
        }

        if(familymembers.length==0){
            Ext.Msg.alert("提示信息", "家庭成员为空");
            return;

        }else{
            var isower=false;
            for(var i=0;i<familymembers.length;i++){
                if(familymembers[i].relationship=='户主'){
                    isower=true;
                    break;
                }
            }
            if(!isower){
                Ext.Msg.alert("提示信息", "没有户主");
                return;
            }
        }

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

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交更新失败,检查web服务");

        };
        var form =btn.up('form');
        this.formSubmit(form, params, url, successFunc, failFunc,"正在提交数据");

    },
    //更新入口
    applysubmitupdate:function(btn){
        this.updateformbyurl(btn,'ajax/updateapply.jsp');

    },
    //发送审核form
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
            submituid:form.objdata.record.get("approvaluserid")?form.objdata.record.get("approvaluserid"):form.objdata.record.get("userid"),
            isapproval: ajaxform.getForm().getValues().approvalresult==approvalresult.yes,
            approvalname:win.approvalname
        };
        var successFunc = function (myform, action) {

            btn.up('window').close();
            Ext.Msg.alert("提示信息", "操作成功");
            var hc=me.application.getController("Header");
            hc.closetab(form.id);
            hc.headerRenderEvents();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", action.result.msg);

        };

        me.applysubmitupdate(win.dataformbtn);
        var fn=function(){
            me.formSubmit(ajaxform, params, 'ajax/sendcheckform.jsp', successFunc, failFunc,"正在提交数据");
        }
        new Ext.util.DelayedTask(fn).delay(800);




    },
    //form提交共用入口
    submitcommon:function(btn,businesstype,isprocess){
        var me=this;
        //var store=this.getMyviewfamilymembergrid().getStore();
        var familygrid=btn.up('form').down('#familymembergrid')

        var familymembers=[];
        var affixfiles=[];
        if(familygrid){
            var store=familygrid.getStore();
            Ext.each(store.data.items,function(a){
                familymembers.push(a.data);
            });
        }
        var form=btn.up('form');
        var affixpanel=form.down('#affixfilespanel');
        if(affixpanel){
            Ext.each(affixpanel.items.items,function(a){
                if(a.xtype=='container'){
                    var formdata=a.down('panel').formdata;
                    var affixfileitem={};
                    affixfileitem[a.down('panel').type]=formdata;
                    if(formdata)affixfiles.push(affixfileitem);

                }

            });
        }
        if(form.down('#dbglaccountimg')){
            affixfiles.push({"accountimgpath":[{'attachmentname':'照片','attachmentpath':form.down('#dbglaccountimg').value}]});
        }
         //testobj=form;
        if(businesstype==businessTableType.rangershelp){
            familymembers=[{name:form.getValues().owername,relationship:'户主'}];
        }
        if(familymembers.length==0){
            Ext.Msg.alert("提示信息", "家庭成员为空");
            return;

        }else{
            var isower=false;
            for(var i=0;i<familymembers.length;i++){
                if(familymembers[i].relationship=='户主'){
                    isower=true;
                    break;
                }
            }
            if(!isower){
                Ext.Msg.alert("提示信息", "没有户主");
                return;
            }
        }
        var params = {
            businesstype:businesstype,
            userid:userid,
            familymembers:Ext.JSON.encode(familymembers),
            processstatustype:processstatustype.ok,
            isprocess:isprocess,
            affixfiles:Ext.JSON.encode(affixfiles)
        };
        var successFunc = function (myform, action) {

            var hc=me.application.getController("Header");
            hc.closetab(form.id);
            Ext.Msg.alert("提示信息", "保存成功");
            /*function fn(){
                me.formSubmit(form, params, 'ajax/sendapply.jsp', successFunc, failFunc,"正在提交数据");
            }
            var task = new Ext.util.DelayedTask(fn);
            task.delay(10);*/


        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "保存失败,检查web服务");

        };
        var form =btn.up('form');
        this.formSubmit(form, params, 'ajax/sendapply.jsp', successFunc, failFunc,"正在提交数据");


    },
    //业务提交共用入口
    applysubmit:function(btn){

       this.submitcommon(btn,businessTableType.dbgl,true);
    },
    //上传图片文件
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
    //form提交共用方法
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
    //显示上传窗口
    showUploadImgWin:function(c){
        if(!this.uploadimgWin)this.uploadimgWin=Ext.widget('uploadimgfilewin');
        this.uploadimgWin.itemdata= c;
        this.uploadimgWin.show();

    },
    //清除上传窗口
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
    //显示修改的上传窗口
    showAlterUploadImgWin:function(c){
        if(!this.alteruploadimgWin)this.alteruploadimgWin=Ext.widget('uploadimgfilewin');
        this.alteruploadimgWin.itemdata= c;

        this.alteruploadimgWin.show();

    },
    //form 房屋结构 子项变更
    houseareachane:function(c){
        var formpanel= c.up('form');
        var person_nums=parseInt(formpanel.down('#FamilyPersons').getValue());
        var area= parseInt(c.getValue());
        c.nextNode().setValue(parseInt(person_nums==0?area:area/person_nums))

    },
    //form 收入 子项变更
    moneychane:function(c){
      //var value=
        //alert(c.getValue());
        var formpanel=c.up('form');
        myformpanel=  formpanel
        var type=formpanel.businesstype;
        var incomesum=formpanel.down('#incomesum');
        if(incomesum){
            var incomesum_value=0;
            var incomeitems=incomesum.up('fieldset').items.items;
            var person_nums=parseInt(formpanel.down('#FamilyPersons').getValue());

            for(var i=0;i<incomeitems.length;i++){
                if(incomeitems[i]==incomesum)break;
                incomesum_value+=parseFloat(incomeitems[i].getValue());
            }
            incomesum.setValue(incomesum_value);
            var incomesumarea=formpanel.down('#incomesumarea');
            incomesumarea.setValue(parseInt(incomesum_value/12));

            var incomesumareaperson=formpanel.down('#incomesumareaperson');
            incomesumareaperson.setValue(parseInt(person_nums==0?incomesum_value/12:incomesum_value/12/person_nums));

            var propertysum=formpanel.down('#propertysum');
            var propertysum_value=0;
            var propertyitems=propertysum.up('fieldset').items.items;
            for(var i=0;i<propertyitems.length;i++){
                if(propertyitems[i]==propertysum)break;
                propertysum_value+=parseFloat(propertyitems[i].getValue());
            }
            propertysum.setValue(propertysum_value);

            var familyincome=formpanel.down('#familyincome');
            familyincome.setValue(propertysum_value+incomesum_value);

            var averageincome=formpanel.down('#averageincome');


            averageincome.setValue((person_nums==0?parseInt(familyincome.getValue())/12:parseInt(familyincome.getValue())/12/person_nums).toFixed(1));
            var totalhelpmoney=formpanel.down('#totalhelpmoney');
            var poorstandard=formpanel.down('#poorstandard');
            var disableditem=formpanel.down('#disabledpersons');
            var disablednum=disableditem.getValue();
            if(type===businessTableType.dbgl){
                var minpercent=0.4;
                var isshanghai=formpanel.down('#isshanghai');
                if(isshanghai&&isshanghai.checked){
                    minpercent=0.5;
                }
                var helpmomey=poorstandard.getValue()-averageincome.getValue();
                //var helpmomey=poorstandard.getValue()*disablednum+()

                var totalmoney=poorstandard.getValue()*disablednum;
                if(helpmomey<minpercent*parseFloat(poorstandard.getValue())){
                    totalmoney+=(minpercent*parseFloat(poorstandard.getValue()))*(person_nums-disablednum);
                    //totalhelpmoney.setValue(0.4*parseFloat(poorstandard.getValue()));
                    //Ext.Msg.alert("提示信息", "低于低保标准的40%，则救助金采用低保金的40%");
                }else{
                    totalmoney+=helpmomey.toFixed(1)*(person_nums-disablednum)
                    //totalhelpmoney.setValue(helpmomey.toFixed(1));
                }
                totalhelpmoney.setValue(totalmoney.toFixed(1));
            }else if(type===businessTableType.dbbyh){
                var totalmoney=poorstandard.getValue()*disablednum;
                totalmoney+=poorstandard.getValue()*0.2*(person_nums-disablednum)
                totalhelpmoney.setValue(totalmoney);
            }


        }

        //console.log(testobj);
    },

    totalhelpmoneychane:function(c){
      var fieldset= c.up('fieldset');
      var poorstandard=fieldset.down('#poorstandard');
      if(parseFloat(c.getValue())<0.4*parseFloat(poorstandard.getValue())){
          c.setValue(0.4*parseFloat(poorstandard.getValue()));
          Ext.Msg.alert("提示信息", "低于低保标准的40%，则救助金采用低保金的40%");
      };

    },
    //form 用户 子项变更
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
                  persontype:'归正人员',
                  jobstatus:'',
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


              var formcontent=applyform.getDefaultContentTarget();
              var target=familygrid.getEl();
              target.scrollIntoView(formcontent,true,true,true);
              this.moneychane(familygrid);
              try{
                  rowEditing.startEdit(0, 0);
              }catch(e){

              }

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
    // 显示附件窗口
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
    //显示修改的附件窗口
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

