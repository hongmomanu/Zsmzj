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
    disableCaching: true
});


/**
 * ZSMZJ.app
 * 舟山民政救助系统应用mvc框架
 *
 */
Ext.application({
    name: 'ZSMZJ',
    appFolder: 'js/app',
    controllers: [
        'Navigation'
    ],
    autoCreateViewport: true
});

/**
 * 测试用的全局变量
 */
var testobj;
