/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:35
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.addNewGrantWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewgrantwin',
    requires: [
        //'Ext.form.*'
        'Ext.Img',
        'Ext.tip.QuickTipManager'
    ],

    /*添加listeners触发本页面中的grid组件的gridshowfresh*/
    listeners: {
        show: function(panel) {
            var grid=panel.down('grid');
            grid.fireEvent('gridshowfresh',grid);
        }
    },
    initComponent: function() {
        Ext.apply(this, {
            title: '资金发放',
            height: 460,//260
            width: 430,
            closeAction : 'hide',
            resizable:false,
            layout: 'fit',
            items: {
                xtype:'tabpanel',
                items:[
                    {
                        title:'月发放',
                        xtype: 'form',

                        layout: {
                            type: 'vbox',

                            align: 'stretch'
                        },
                        border: false,
                        bodyPadding: 10,
                        //xtype: 'fieldset',

                        fieldDefaults: {
                            labelAlign: 'top',
                            labelWidth: 100,
                            labelStyle: 'font-weight:bold'
                        },
                        listeners: {
                            fieldvaliditychange: function() {
                                this.updateErrorState();
                            },
                            fielderrorchange: function() {
                                this.updateErrorState();
                            }
                        },

                        updateErrorState: function() {
                            var me = this,
                                errorCmp, fields, errors;

                            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                                errorCmp = me.down('#formErrorState');
                                fields = me.getForm().getFields();
                                errors = [];
                                fields.each(function(field) {
                                    Ext.Array.forEach(field.getErrors(), function(error) {
                                        errors.push({name: field.getFieldLabel(), error: error});
                                    });
                                });
                                errorCmp.setErrors(errors);
                                me.hasBeenDirty = true;
                            }
                        },

                        items: [
                            /*{
                             fieldLabel: '行政区划',
                             //id:'testcombox',
                             name: 'divisionid',
                             //width:'200',
                             *//*xtype: 'combo',*//*
                             xtype:'dbgldivsioncombtree',
                             //xtype:,
                             allowBlank: false,
                             blankText: "不能为空",
                             displayField: 'text',
                             valueField: 'id',
                             emptyText: '请选择行政区划'

                             },*/
                            {
                                xtype:'panel',
                                layout: 'column',
                                border:0,
                                items:[
                                    {
                                        columnWidth: 0.5,
                                        xtype: 'datefield',
                                        allowBlank: false,
                                        blankText: "不能为空",
                                        name:'bgdate',
                                        fieldLabel: '本次发放从',
                                        value: Ext.Date.format(Ext.Date.getFirstDateOfMonth(new Date()), 'Y-m-d'),
                                        format: 'Y-m-d'

                                    },
                                    {
                                        columnWidth: 0.5,
                                        xtype: 'datefield',
                                        allowBlank: false,
                                        blankText: "不能为空",
                                        name:'eddate',
                                        fieldLabel: '到',
                                        value: Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()), 'Y-m-d'),
                                        format: 'Y-m-d'

                                    }
                                ]
                            },
                            {
                                xtype: 'datefield',
                                name:'grantdate',
                                fieldLabel: '发放日期',
                                value: Ext.Date.format(new Date(), 'Y-m-d'),
                                format: 'Y-m-d'

                            },{
                                xtype:'textfield',
                                fieldLabel:'调整金额（元）',
                                value:0,
                                name:'adjustmoney'

                            },{
                                xtype:'dbglsearchbusinessgridpanel'
                            }

                        ],

                        dockedItems: [{
                            cls: Ext.baseCSSPrefix + 'dd-drop-ok',
                            xtype: 'container',
                            dock: 'bottom',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            padding: '10 10 5',

                            items: [
                                {
                                xtype: 'component',
                                id: 'formErrorState',
                                invalidCls: Ext.baseCSSPrefix + 'form-invalid-icon',
                                validCls: Ext.baseCSSPrefix + 'dd-drop-icon',
                                baseCls: 'form-error-state',
                                flex: 1,
                                validText: '发放信息合法',
                                invalidText: '发放信息不合法',
                                tipTpl: Ext.create('Ext.XTemplate', '<ul class="' + Ext.plainListCls + '"><tpl for="."><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                                onDestroy: function() {
                                    Ext.destroy(this.tip);
                                    Ext.Component.prototype.onDestroy.call(this);
                                },
                                getTip: function() {
                                    var tip = this.tip;
                                    if (!tip) {
                                        tip = this.tip = Ext.widget('tooltip', {
                                            target: this.el,
                                            title: '错误详情:',
                                            minWidth: 200,
                                            autoHide: false,
                                            anchor: 'top',
                                            //mouseOffset: [-11, -2],
                                            closable: true,
                                            //constrain :true,
                                            constrainPosition: false,
                                            cls: 'errors-tip'
                                        });

                                        var win = this.up('window');

                                        if (win) {
                                            /*tip.mon(win, 'move', function() {
                                             if (tip.isVisible()) {
                                             Ext.defer(tip.show, 50, tip);
                                             }
                                             });*/
                                            tip.mon(Ext.getBody(), 'mouseup', function() {
                                                if (tip.isVisible()) {
                                                    tip.show();
                                                }
                                            }, null, {delay: 50});
                                        }

                                        tip.show();

                                    }
                                    return tip;
                                },

                                setErrors: function(errors) {
                                    var me = this,
                                        tip = me.getTip();


                                    errors = Ext.Array.from(errors);

                                    // Update CSS class and tooltip content
                                    if (errors.length) {
                                        me.addCls(me.invalidCls);
                                        me.removeCls(me.validCls);
                                        me.update(me.invalidText);
                                        tip.setDisabled(false);
                                        tip.update(me.tipTpl.apply(errors));
                                    } else {
                                        me.addCls(me.validCls);
                                        me.removeCls(me.invalidCls);
                                        me.update(me.validText);
                                        tip.setDisabled(true);
                                        tip.hide();
                                    }
                                }
                            }, {
                                xtype: 'button',
                                formBind: true,
                                disabled: true,
                                isnew:true,
                                text: '资金发放',
                                action:'grant'
                            },{
                                    xtype: 'button',
                                    formBind: true,
                                    disabled: true,
                                    isnew:false,
                                    text: '资金重新发放',
                                    action:'grant'
                                },{
                                xtype: 'button',
                                formBind: true,
                                disabled: true,
                                text: '取消',
                                handler: function () {
                                    this.up('window').hide();
                                }
                            }]
                        }],

                        border: false

                    },
                    {
                        title:"年末13月发放",
                        xtype:'form',
                        items:[
                            {
                                xtype: 'textfield',
                                name:'grantdate',
                                fieldLabel: '发放年份',
                                value: Ext.Date.format(new Date(), 'Y')

                            },{
                                xtype:'textfield',
                                fieldLabel:'调整金额（元）',
                                value:0,
                                name:'adjustmoney'

                            }
                        ],
                        dockedItems: [{
                            cls: Ext.baseCSSPrefix + 'dd-drop-ok',
                            xtype: 'container',
                            dock: 'bottom',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            padding: '10 10 5',

                            items: [
                                {
                                    xtype: 'component',
                                    flex: 1
                                },
                            {
                                xtype: 'button',
                                //formBind: true,
                                //disabled: true,
                                text: '资金发放',
                                action:'grant'
                            },{
                                xtype: 'button',
                                formBind: true,
                                disabled: true,
                                text: '取消',
                                handler: function () {
                                    this.up('window').hide();
                                }
                            }]
                        }],
                        layout: {
                            type: 'vbox',

                            align: 'stretch'
                        },
                        bodyPadding: 10,
                        //xtype: 'fieldset',

                        fieldDefaults: {
                            labelAlign: 'top',
                            labelWidth: 100,
                            labelStyle: 'font-weight:bold'
                        },
                        border: false

                    }

                ]


            }

        });
        this.callParent(arguments);
    }

});