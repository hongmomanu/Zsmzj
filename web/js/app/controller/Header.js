/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-27
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */


/**
 * Map controller
 * Used to manage map layers and showing their related views
 * 导航栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Header', {
    extend: 'Ext.app.Controller',

    models: ['header.HeaderViewer'],

    stores: ['header.HeaderViewers'],


    refs: [
        {ref: 'myviewheadViewPanel', selector: 'headviewpanel'} ,
        {ref: 'myheaderPanel', selector: 'myheader'}
    ],
    views: [
        'Header','header.headViewPanel'
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
            }

        }, this);

    },

    headerRenderEvents:function(){
        var params = {
            roleid:roleid,
            type:'count'
        };
        var changeItem=this.getMyheaderPanel().down('#needtodopanel');
        //testobj=this.getMyheaderPanel();
        var successFunc = function (response, option) {
            var res = Ext.JSON.decode(response.responseText);
            var count=res.count;
            var text=changeItem.el.dom.innerText;
            var before_str=text.slice(0,text.indexOf("(")+count);
            var after_str=text.slice(text.indexOf(")"));
            changeItem.update(before_str+count+after_str);


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
       alert(1);
        testobj=c;
        console.log(c);

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

