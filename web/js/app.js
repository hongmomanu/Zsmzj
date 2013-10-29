/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-7
 * Time: 上午11:08
 * To change this template use File | Settings | File Templates.
 */

/**
 * Ext.Loader
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext.ux':'js/Ext/ux'
    }

});



var splashscreen;

Ext.onReady(function() {

    splashscreen = new Ext.LoadMask(Ext.getBody().el, {msg:"页面加载中..."});//{useMsg: false}
    splashscreen.show();

});


/**
 * ZSMZJ.app
 * 舟山民政救助系统应用mvc框架配置入口
 *
 */

Ext.application({
    name: 'ZSMZJ',
    appFolder: 'js/app',
    //附加dataview组件
    requires: [
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor',
        'Ext.ux.window.Notification',
        'Ext.ux.TreeCombo'
    ],
    //对应controller目录下的文件
    controllers: [
        'Navigation','Header','Manager','Dbgl',
        'Dbedge','Temporaryhelp','Medical',
        'Study','Charitable','Disaster','Rangers'
    ],

    launch: function() {

        splashscreen.hide();
    },

    autoCreateViewport: true
});

/**
 * 测试用的全局变量
 */
var testobj;
