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
                processclick:function (c,r){
                    this.showProcessWin(c,r);
                }
            }


        }, this);

    },
    showProcessWin:function(c,r){//显示进程窗口

       var me=this;

       if(!me.processWin)me.processWin=Ext.widget('processwin');
       me.processWin.show();
       testobj=me.getMyprocessvector().surface;
       me.getMyprocessvector().surface.add({
           type: "text",
           text: '侧四海',
           x:555,
           y:30

       }).show(true);




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
        testobj= changeItem;
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

