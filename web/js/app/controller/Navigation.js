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
        testobjs=me;
        this.control({
            'userconfiggrid,funcconfiggrid,systemconfiggrid': {
                itemclick: this.showContent
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
            alert(1);
        }
    },
    showContent: function (grid, record) {
        //alert(1);

        //console.log('Double clicked on ' + record.get('label'));

        var label = record.get('label');

        var tabs = Ext.getCmp('mainContent-panel');
        if (tabs.getComponent('tab' + label)) {
            tabs.getComponent('tab' + label).show();
        } else {
            var type = record.get('type');
            var value = record.get('value');
            if (type == 'widget') {
                tabs.add({
                    closable: true,
                    id: 'tab' + label,
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


    onLaunch: function () {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

