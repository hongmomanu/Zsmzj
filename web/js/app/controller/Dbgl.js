/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */


/**
 * Map controller
 * Used to manage map layers and showing their related views
 * 导航栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Dbgl', {
    extend: 'Ext.app.Controller',

    models: [],

    stores: [],


    refs: [
        {ref: 'myviewbusinessapplyform', selector: 'dbglbusinessapplyform'}
    ],
    views: [
        'dbgl.businessApply'
    ],

    init: function() {
        var me = this;

         this.control({
         'dbglbusinessapplyform component':{
           imgclick:function (c){

               alert(2);
           }
         }
         }, this);

    },


    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

