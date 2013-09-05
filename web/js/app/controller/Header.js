/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-27
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */


/**
 * Header controller
 * Used to manage map layers and showing their related views
 * 标题栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Header', {
    extend: 'Ext.app.Controller',

    models: ['header.HeaderViewer','header.NeedToDo'],

    stores: ['header.HeaderViewers','header.NeedToDos'],


    refs: [
        {ref: 'myviewheadViewPanel', selector: 'headviewpanel'} ,
        {ref: 'myprocesspicturePanel', selector: 'processpicturepanel'} ,
        {ref: 'myprocessvector', selector: 'dbglprocessvector'} ,
        {ref: 'mydbglbusinesscheckform', selector: 'dbglbusinesscheckform'},
        {ref: 'mydbglbusinessalterform', selector: 'dbglbusinessalterform'},
        {ref: 'myheaderPanel', selector: 'myheader'}
    ],
    views: [
        'Header','header.headViewPanel','header.NeedToDoGrid'
    ],

    init: function() {
        var me = this;
        this.initHeadView();

        this.control({
            /*'headviewpanel#headviewitem':{
                selectionchange: this.selectionchange
            }*/
            'myheader':{
                afterrender: this.headerRenderEvents

            },
            'dbglbusinessalterform':{
                alterapplyaftershow:function(){
                    var form=this.getMydbglbusinessalterform();
                    //this.widgetdolayout("mainContent-panel");
                    var businessid=form.objdata.businessid;
                    this.clearAlterContent(form);
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);
                    this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                    this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                }
            } ,
            'dbglbusinesscheckform':{
                alterapplyaftershow:function(){
                    var form=this.getMydbglbusinesscheckform();
                    //this.widgetdolayout("mainContent-panel");
                    var businessid=form.objdata.businessid;
                    this.clearAlterContent(form);
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);
                    this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                    this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                }

            },
            'dbglbusinessalterform button[action=sendbusiness]':{
                click: this.sendbusiness
            },
            'dbglbusinessalterform button[action=cancel]':{
                click: this.cancelcheck
            },
            'dbglbusinesscheckform button[action=cancel]':{
                click: this.cancelcheck

            },
            'dbglbusinesscheckform button[action=check]':{
                click: this.showcheckwin

            },

            'dbglbusinesscheckform button[action=showprocess]':{
                click: this.showcheckprocess

            },
            'myheader component':{
                needthingsclick:function (c){
                    this.showneedthings(c);
                }
            },
            'processpicturepanel':{
                afterrender: this.processpictureRenderEvent

            },
            'needtodopanel,needtodobusinesspanel':{

                afterrender: this.afterrenderEvents,
                alterapplyaftershow:function(grid){
                    //grid.getStore().load();
                    this.afterrenderEvents();
                },
                processclick:function (c,r,grid){//查看流程
                    this.showProcessWin(c,r,grid);
                },
                businessclick:function(c,r,grid){//业务审核处理

                   //me.widgetdolayout("mainContent-panel");
                    var me=this;
                    var callback=function fn(){
                        me.closemask();
                        me.widgetdolayout("mainContent-panel");
                    };

                   this.showBusinessCheckContent(c,r,grid,callback);
                },
                alterclick:function(c,r,grid){//未提交前修改

                    this.showAlterContent(c,r,grid);
                },
                delclick:function(c,r,grid){//未提交前删除

                    this.delbusinessapply(c,r,grid);
                },
                cancelclick:function(c,r,grid){//未审核前取消提交
                    this.cancelbusinesssubmit(c,r,grid);
                }
            }

        }, this);

    },
    sendbusiness:function(btn){
        var me=this;
        var form=btn.up('form');
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        var callback=function fn(){
            me.showoldtab(grid.up('panel').id);
            me.closetab(form.id);
        };
        this.showBusinessCheckContent(c,r,grid,callback);

    },

    cancelcheck:function(btn){
        var form=btn.up('form');
       this.closetab(form.id);
    },
    showcheckwin:function(btn){

        if(!this.checkprocessWin)this.checkprocessWin=Ext.widget('processcheckwin');
        this.checkprocessWin.show();
        this.checkprocessWin.dataform=btn.up('form');

    },
    showcheckprocess:function(btn){
        var form=this.getMydbglbusinesscheckform();
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        this.showProcessWin(c,r,grid);

    },
    clearAlterContent:function(form){

        form.getForm().reset();
        //家庭成员清空
        var grid=form.down('#familymembergrid');
        grid.getStore().removeAll();
        //照片清空
        var img_item=form.down('#dbglaccountimg');
        img_item.getEl().dom.src="img/noperson.gif";
        img_item.value="img/noperson.gif";

        //附件清空
        var affixfilespanel=form.down('#affixfilespanel');
        Ext.each(affixfilespanel.items.items,function(a){
            if(a.items){
                CommonFunc.updateitemnum(a.items.items[0],0);
                a.items.items[0].formdata=[];

            }
        });

        //清空窗口
        var dbgl_cl=this.application.getController("Dbgl");
        dbgl_cl.cleanuploadWin();


    },
    showAlterContent:function(c,r,grid){
        //var businessid=r.get('businessid');
        var objdata={
            businessid:r.get('businessid'),
            record:r,
            grid:grid,
            item:c

        };
        this.showtab("修改信息",'dbglbusinessalterform','widget',objdata);

    },
    cancelbusinesssubmit:function(c,r,grid){
        var businessid=r.get('businessid');
        var me=this;
        Ext.Msg.show({
            title: '确定要删除此申请?',
            msg: '你正在试图取消选中的 <a><font color="red">'+ r.get('displayname')+'</font></a> 的提交.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    me.cancelsubmitbybid(businessid,grid.getStore());
                }
            },
            icon: Ext.Msg.QUESTION
        });


    },
    delbusinessapply:function(c,r,grid){
        var businessid=r.get('businessid');
        var me=this;
        Ext.Msg.show({
            title: '确定要删除此申请?',
            msg: '你正在试图删除选中的 <a><font color="red">'+ r.get('displayname')+'</font></a> 的申请.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    me.delapplybybid(businessid,grid.getStore());
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    widgetdolayout:function(widgetid){
        function fn(){
            Ext.getCmp(widgetid).doLayout();
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(500);
    },
    cancelsubmitbybid:function(businessid,store){
        var me=this;
        var params = {
            businessid:businessid,
            status:processdiction.stepzero
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                 me.widgetdolayout("mainContent-panel");
            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "取消提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/changestatusbybid.jsp', successFunc, failFunc,'POST');

    },
    delapplybybid:function(businessid,store){
        var me=this;
        var params = {
            businessid:businessid
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                me.widgetdolayout("mainContent-panel");
            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/delbusinessbybid.jsp', successFunc, failFunc,'POST');


    },
    changeapplystatus:function(businessid,status,store,callback){
        var me=this;
        var params = {
            businessid:businessid,
            status:status
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                //me.closetab("dbglbusinessalterform");
                if(callback)callback();

            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/changeapplystatus.jsp', successFunc, failFunc,'POST');


    },


    showsendapplywin:function(c,r,grid,callback){
        var me=this;
        var businessid=r.get('businessid');
        var status= r.get('process');
        Ext.Msg.show({
            title: '确定提交申请?',
            msg: '你正在试图提交申请.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    me.changeapplystatus(businessid, status,grid.getStore(),callback);
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },

    showBusinessCheckContent:function(c,r,grid,callback){
        if(r.get("process")==processdiction.stepone){

             this.showsendapplywin(c,r,grid,callback);
        }
        else if(r.get("process")==processdiction.steptwo){
           //var businessid=r.get('businessid');
            var objdata={
                businessid:r.get('businessid'),
                record:r,
                grid:grid,
                item:c

            };

           this.showtab(processdiction.steptwo,'dbglbusinesscheckform','widget',objdata);

       }

    },


    getValueBybusinessid:function(businessid,url,callbackfn,form){
        var me=this;
        var params = {
            businessid:businessid
        };
        var successFunc = function (response, option) {
            var res = Ext.JSON.decode(response.responseText);
            callbackfn(res,me,form)
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取业务信息失败");
        };
        this.ajaxSend(params, url, successFunc, failFunc,'POST');

    },

    setFamilymembers:function(data,me,form){

        var grid=form.down('#familymembergrid');
        Ext.each(data,function(a){
            var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember',a);
            grid.getStore().insert(0, r);
        });
        me.closemask();
        var countitem=form.down('#FamilyPersons');
        var enjoyitem=form.down('#enjoyPersons');
        countitem.setValue(data.length);
        enjoyitem.setValue(data.length);

    },
    closemask:function(){
        try{
            Ext.getCmp('mainContent-panel').getEl().unmask();
        }catch (e){
        }
    },
    setAffixValue:function(data,me,form){
        var num=data.length;
        for(var i=0;i<num;i++){
            if(data[i].attachmenttype!='accountimgpath'){
                var item=form.down('#'+data[i].attachmenttype);
                var count=data[i].results.length;
                CommonFunc.updateitemnum(item,count);
                var formdata=[];
                Ext.each(data[i].results,function(a){
                    formdata.push(a);
                })
                item.formdata=formdata;
            }
            else{
                var filepath=data[i].results[0].attachmentpath;
                var img_item=form.down('#dbglaccountimg');
                img_item.getEl().dom.src=filepath;
                img_item.value=filepath;
            }



        }

    },
    setFormValues:function(data,me,form){
        form.getForm().setValues(data);
        var divisiontype=form.down('#divisiontype');

        divisiontype.setValue(data.division);
        divisiontype.setRawValue(data.division);
    },

    showProcessWin:function(c,r,grid){//显示进程窗口
       var me=this;
       //窗口初始化显示
       if(!me.processWin){
           me.processWin=Ext.widget('processwin');
           me.processWin.show();
           me.vectornums=me.getMyprocessvector().surface.items.items.length;
       }else{
           me.processWin.show();
       }
       //清空流程图
       var mysurface=me.getMyprocessvector().surface;
       for(var i=me.vectornums;i<mysurface.items.items.length;i++){
           mysurface.remove(mysurface.items.items[i]);
       }
        //显示历史审批表
        var store=me.processWin.down('grid').getStore();
        store.proxy.extraParams = {
            businessid: r.get('businessid')
        };
        store.load();
        //绘制流程图
        if(r.get("processstatus")==processdiction.stepzero){

            mysurface.add({
                type: "path",
                text:"muhahaaaa",
                path: "M40 35  L50 45 L65 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                fill: "blue"*/
            }).show(true);
            //流程分割符号
            mysurface.add({
                type: "path",
                path: "M110 80  L110 100 L105 100 L115 110 L125 100 L120 100 L120 80 Z",    //路径      L150 50
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);
            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:20,
                y:90

            }).show(true);

            me.processWin.doLayout();

        }else if(r.get("processstatus")==processdiction.stepone){

            mysurface.add({
                type: "path",
                path: "M195 35  L205 45 L220 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                 fill: "blue"*/
            }).show(true);
            //流程分割符号
            mysurface.add({
                type: "path",
                path: "M265 80  L265 100 L260 100 L270 110 L280 100 L275 100 L275 80 Z",    //路径      L150 50
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);
            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:175,
                y:90

            }).show(true);

            me.processWin.doLayout();

        }




    },
    afterrenderEvents:function(){
        CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
        this.widgetdolayout('mainContent-panel');
    },
    processpictureRenderEvent:function(){

    },
    headerRenderEvents:function(){
        var params = {
            roleid:roleid,
            type:'count'
        };
        var changeItem=this.getMyheaderPanel().down('#needtodopanel');
        var successFunc = function (response, option) {
            var res = Ext.JSON.decode(response.responseText);
            var count=res.count;
            CommonFunc.updateitemnum(changeItem,count)


        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取待办信息失败");

        };
        this.ajaxSend(params, 'ajax/getneedtodos.jsp', successFunc, failFunc,'POST');

    },
    ajaxSend:function(params,url,sucFun,failFunc,method){
        Ext.Ajax.request({
            url: url,
            method:method,
            params: params,
            success:sucFun,
            failure:failFunc
        });

    },
    showneedthings:function(c){

        this.showtab('代办业务','needtodopanel','widget');

    },
    closetab:function(value){
        var tabs = Ext.getCmp('mainContent-panel');
        var tab=tabs.getComponent(value)
        if (tab) {

            tab.close();
        }

    },
    showoldtab:function(id){
        var tabs = Ext.getCmp('mainContent-panel');
        tabs.getComponent(id).show();
    },
    showtab:function(label,value,type,objdata){
        this.closemask();
        ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
        var tabs = Ext.getCmp('mainContent-panel');
        if (tabs.getComponent('tab' + value)) {
            if(objdata)tabs.getComponent('tab' + value).objdata=objdata;
            if(tabs.getComponent('tab' + value).isHidden()){
                tabs.getComponent('tab' + value).show();
            }
            else{

                CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
            }


        } else {
            if (type == 'widget') {

                tabs.add({
                    closable: true,
                    id: 'tab' + value,
                    xtype: value,
                    objdata:objdata,
                    autoScroll: true,
                    iconCls: 'tabs',
                    title: label
                }).show();
            } else if (type == "url") {
                tabs.add({
                    closable: true,
                    id: 'tab' + label,
                    html: '<iframe src="' + value + '" width="100%" height="100%">',
                    //loader: { url: "http://www.baidu.com", contentType: 'html', loadMask: 'loading...', autoLoad: true, scripts: true },
                    autoScroll: false,
                    iconCls: 'tabs',
                    title: label
                }).show();

            }

        }

    },
    initHeadView:function(){
        var me=this;
        var store=this.getHeaderHeaderViewersStore();

        store.on('load', function (store, options) {
            var viewpanel=me.getMyviewheadViewPanel().items.items[0];
            viewpanel.select(0);
        });



    },
    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

