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
        {ref: 'myviewheadViewPanel', selector: 'headviewpanel'}
    ],
    views: [
        'Header','header.headViewPanel'
    ],

    init: function() {
        var me = this;
        this.initHeadView();

        /*
        this.control({
            'headviewpanel#headviewitem':{
                selectionchange: this.selectionchange
            }
        }, this);
*/
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

