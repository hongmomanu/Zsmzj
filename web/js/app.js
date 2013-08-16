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
        //GeoExt: "static/javascripts/geoext4/src/GeoExt",
        // for dev use
        //Ext: extLocation+"src"
        // for build purpose
        'Ext.ux': extLocation+'examples/ux'
    }

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
        'Ext.ux.DataView.LabelEditor'
    ],
    controllers: [
        'Navigation','Header','Manager','Dbgl'
    ],
    autoCreateViewport: true
});

/**
 * 测试用的全局变量
 */
var testobj;
