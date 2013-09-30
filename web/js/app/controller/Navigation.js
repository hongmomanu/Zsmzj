/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-27
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */


/**
 * Navigation controller
 * 导航栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Navigation', {
    extend: 'Ext.app.Controller',

    models: ['navigation.UserConfig','navigation.SystemConfig',
             'navigation.FuncConfig', 'navigation.DbglTreeConfig'
            ],
    stores: ['navigation.UserConfigs','navigation.SystemConfigs',
             'navigation.FuncConfigs', 'navigation.DbglTreeConfigs'
            ],

    refs: [
        {ref: 'mydbglConfigTree', selector: 'dbglconfigtree'}
    ],
    views: [
        'navigation.userConfigGrid',
        'navigation.systemConfigGrid',
        'navigation.dbglConfigTree',
        'navigation.funcConfigGrid'

    ],

    init: function () {
        var me = this;
        this.control({
            'userconfiggrid,funcconfiggrid,systemconfiggrid': {
                itemclick: this.showGridContent
            },
            'dbglconfigtree': {
                itemclick: this.treeclick,
                beforeitemclick: this.beforeitemclick,

                beforeload:function(store){return this.initLoadStore(store,store.getRootNode().data.text);}
            }


        }, this);
        //this.initLoadStore(this.getNavigationDbglTreeConfigsStore(),"低保管理");

    },
    initLoadStore:function(store,type){
        var me=this;

        var params={
                roleid:roleid,
                leaf:true,
                type:type+me.searchtype

        };
        Ext.apply(store.proxy.extraParams, params);


    },


    beforeitemclick:function (record, item, index, e, eOpts){
        this.searchtype=item.data.text;

    },
    treeclick: function (record, item, index, e, eOpts) {



        if (item.data.leaf) {
            testobj=record;
            var businesstype=record.panel.businesstype;
            this.showtab(item.data.text,item.data.value,item.data.type,businesstype);

        }
    },
    tabdolayout:function(value){

        Ext.getCmp('tab' + value).doLayout();
    },
    showtab:function(label,value,type,businesstype){

        if(ViewWaitMask){
             try{
                 Ext.getCmp('mainContent-panel').getEl().unmask();
             }catch (e){

             }


        }
        var tabs = Ext.getCmp('mainContent-panel');
        var tab=tabs.getComponent('tab' + value)
        if (tab) {
            tab.businesstype=businesstype;
            if(!tab.isHidden())tab.fireEvent('gridshowfresh',tab);
            tab.show();

        } else {
            if (type == 'widget') {

                //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                ViewWaitMask.show();
                tabs.add({
                    closable: true,
                    id: 'tab' + value,
                    xtype: value,
                    businesstype:businesstype,
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
    showGridContent: function (grid, record) {

        var label = record.get('label');
        var type = record.get('type');
        var value = record.get('value');
        this.showtab(label,value,type);

    },


    onLaunch: function () {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

