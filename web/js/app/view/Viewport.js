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
        'Ext.ux.TabCloseMenu',
        'Ext.ux.TabScrollerMenu',
        'ZSMZJ.view.MainPanel',
        'Ext.resizer.Splitter'

    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {

            items: [{
                xtype: 'panel',
                //id:'wholepanel',
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
                        listeners: {
                            afterrender: function (panel) {
                                panel.getEl().addCls('custom-header');
                            }
                        },
                        width: 204,
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
                        //deferredRender: false,
			            layout:'fit',
                        id: 'mainContent-panel',

                        //maskOnDisable:false,
                        plugins: Ext.create('Ext.ux.TabCloseMenu', {
                            extraItemsTail: [
                                '-',
                                {
                                    text: 'Closable',
                                    checked: true,
                                    hideOnClick: true,
                                    handler: function (item) {
                                        currentItem.tab.setClosable(item.checked);
                                    }
                                },
                                '-',
                                {
                                    text: 'Enabled',
                                    checked: true,
                                    hideOnClick: true,
                                    handler: function(item) {
                                        currentItem.tab.setDisabled(!item.checked);
                                    }
                                }
                            ],
                            listeners: {
                                beforemenu: function (menu, item) {
                                    var enabled = menu.child('[text="Enabled"]');
                                    menu.child('[text="Closable"]').setChecked(item.closable);
                                    if (item.tab.active) {
                                        enabled.disable();
                                    } else {
                                        enabled.enable();
                                        enabled.setChecked(!item.tab.isDisabled());
                                    }

                                    currentItem = item;
                                }
                            }
                        }),
                        //hideMode:"visibility",
                        closeAction:'hide',
                        activeTab: 0,     // first tab initially active
                        items: [
                            {
                                xtype: 'mainpanel'

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
