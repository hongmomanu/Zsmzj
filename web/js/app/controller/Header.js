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
            'myheader component':{
                needthingsclick:function (c){
                    this.showneedthings(c);
                }
            },
            'processpicturepanel':{
                afterrender: this.processpictureRenderEvent

            },
            'needtodopanel':{

                afterrender: this.afterrenderEvents,
                processclick:function (c,r){//查看流程
                    this.showProcessWin(c,r);
                },
                businessclick:function(c,r){//业务审核处理

                   this.showBusinessCheckContent(c,r);
                },
                alterclick:function(c,r){//业务审核处理

                    this.showAlterContent(c,r);
                }
            }


        }, this);

    },
    showAlterContent:function(c,r){
        this.showtab("修改信息",'dbglbusinessalterform','widget');
        var form=this.getMydbglbusinessalterform();

        this.getValueBybusinessid(r.get('businessid'),'ajax/getapplyformbyid.jsp',this.setFormValus,form);


    },
    showBusinessCheckContent:function(c,r){
        if(r.get("process")==processdiction.stepone){

           /* this.showtab(processdiction.steptwo,'dbglbusinessapplyform','widget');
            var form=this.getMydbglbusinessapplyform();

            this.getValueBybusinessid(r.get('businessid'),'ajax/getapplyformbyid.jsp',this.setFormValus,form);*/

        }
        else if(r.get("process")==processdiction.steptwo){
           this.showtab(processdiction.steptwo,'dbglbusinesscheckform','widget');

            var form=this.getMydbglbusinesscheckform();
           this.getValueBybusinessid(r.get('businessid'),'ajax/getapplyformbyid.jsp',this.setFormValus,form);



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



    setFormValus:function(data,me,form){
        form.getForm().setValues(data);
        var divisiontype=form.down('#divisiontype');

        divisiontype.setValue(data.division);
        divisiontype.setRawValue(data.division);
    },

    showProcessWin:function(c,r){//显示进程窗口

       var me=this;

       if(!me.processWin){
           me.processWin=Ext.widget('processwin');
           me.processWin.show();
           me.vectornums=me.getMyprocessvector().surface.items.items.length;
       }else{
           me.processWin.show();
       }

       var mysurface=me.getMyprocessvector().surface;
       for(var i=me.vectornums;i<mysurface.items.items.length;i++){
           mysurface.remove(mysurface.items.items[i]);

       }
        if(r.get("processstatus")==processdiction.stepone){

            mysurface.add({
                type: "path",

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

        }




    },
    afterrenderEvents:function(){
        CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
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
            var text=changeItem.el.dom.innerHTML;
            var before_str=text.slice(0,text.indexOf("(")+1);
            var after_str=text.slice(text.indexOf(")"));

            changeItem.el.setHTML(before_str+count+after_str);


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
        /*testobj=c;
        console.log(c);*/
        this.showtab('代办业务','needtodopanel','widget');

    },
    showtab:function(label,value,type){
        if(ViewWaitMask){
            try{
                Ext.getCmp('mainContent-panel').getEl().unmask();
            }catch (e){

            }


        }
        var tabs = Ext.getCmp('mainContent-panel');
        if (tabs.getComponent('tab' + value)) {
            tabs.getComponent('tab' + value).show();
        } else {
            if (type == 'widget') {

                ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');

                tabs.add({
                    closable: true,
                    id: 'tab' + value,
                    xtype: value,
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

