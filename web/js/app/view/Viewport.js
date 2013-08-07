/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('ZSMZJ.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.Accordion',
        'Ext.tab.*',
        'Ext.resizer.Splitter'

    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                border: false,
                layout: 'border',
                dockedItems: [
                    Ext.create('ZSMZJ.view.Header')
                ],
                items: [
                    {
            		region: "center",
            		xtype: 'tabpanel',
            		tabBar: {
               			 hidden: true
            		},
                        items: [
                	{
                	
                		layout: "border",
               			items: [
                    {
                        region: 'west',
                        id: 'west-panel', // see Ext.getCmp() below
                        title: '导航栏',
                        split: false,
                        width: 200,
                        style: {
                             border: 'none'
                        },
			
                        minWidth: 175,
                        maxWidth: 400,
                        collapsible: true,
                        animCollapse: true,
                        margins: '0 0 0 0',
                        layout: 'accordion',
                        items: [{
                            //html: '<p>Some settings in here.</p>',
                            /*items:[
                           							{xtype:'mapTree'}
                            					],*/
                            	layout: 'fit',
                            title: '低保管理',
                            iconCls: 'nav' // see the HEAD section for style used
                        }, {
                            title: '低保边缘户',
                            /*items:[
                                {
                                   xtype:'missiongrid'
                                }
                            ],*/

                            iconCls: 'nav'
                        }, {
                            title: '临时救助',
                            /*items:[
                                {
                                    xtype:'managergrid'
                                }
                            ],*/

                            iconCls: 'nav'

                        }, {
                            title: '医疗救助',
                            /*items:[
                                {
                                    xtype:'managergrid'
                                }
                            ],*/

                            iconCls: 'nav'

                        }]
                    },

                    Ext.create('Ext.tab.Panel', {
                        region: 'center', // a center region is ALWAYS required for border layout
                        deferredRender: false,
			            layout:'border',
                        id: 'mainContent-panel',
                        activeTab: 0,     // first tab initially active
                        items: [
                            {
                                xtype: 'cf_mappanel',
                                title: '地图浏览',
                                autoScroll: true
                            }

			    
				    ]
                   })
		   ]
		   }
		   ]
            }]
        }]});

        me.callParent(arguments);
    }
});
