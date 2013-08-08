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

    models: ['HeaderViewer'],

    stores: ['HeaderViewers'],


    /*refs: [
        {ref: 'summitChart', selector: 'summitchart'},
        {ref: 'summitGrid', selector: 'summitgrid'}
    ],*/
    views: [
        'Header'
    ],

    init: function() {
        var me = this;
        /**
        this.control({
            'missiongrid':{
                itemclick: this.showContent
            },
            'managergrid':{
                itemclick: this.showContent
            }
        }, this);
         **/
    },

    showContent: function(grid, record) {
        console.log('Double clicked on ' + record.get('label'));


    } ,



    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

