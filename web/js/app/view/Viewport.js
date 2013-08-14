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
                        items: []
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
                                title: '首页',
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
