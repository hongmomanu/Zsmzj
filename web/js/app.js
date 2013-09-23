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
        'Ext.ux':'js/Ext/ux'
    }

});



var splashscreen;

Ext.onReady(function() {
    // Start the mask on the body and get a reference to the mask
    //splashscreen = Ext.getBody().mask('页面加载中', 'splashscreen');
    splashscreen = new Ext.LoadMask(Ext.getBody().el, {msg:"页面加载中..."});//{useMsg: false}
    splashscreen.show();
    //splashscreen.addCls('splashscreen');

   /* Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
        cls: 'x-splash-icon'
    });*/
});




/**
 * ZSMZJ.app
 * 舟山民政救助系统应用mvc框架配置入口
 *
 */



//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
Ext.application({
    name: 'ZSMZJ',
    appFolder: 'js/app',
    //附加dataview组件
    requires: [
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor',
        'Ext.ux.TreeCombo'
    ],
    controllers: [
        'Navigation','Header','Manager','Dbgl','Dbedge'
    ],

    launch: function() {
        // Setup a task to fadeOut the splashscreen
        /*var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });
            // Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function() {
                        // Set the body as unmasked after the animation
                        try{
                            Ext.getBody().unmask();
                        }catch(e){

                        }
                    }
                }
            });
        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);*/
        splashscreen.hide();
    },

    autoCreateViewport: true
});

/**
 * 测试用的全局变量
 */
var testobj;
