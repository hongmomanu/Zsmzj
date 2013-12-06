/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-5
 * Time: 下午3:38
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.medicalhelp.alreadyhelpaidFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.medicalhelpalreadyhelpaidfieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                xtype: 'fieldset',
                title: '<a>已救助情况</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',

                //layout: 'anchor',
                layout: {
                    type: 'table',
                    tdAttrs:{style: "border:1px solid #2E2E2E;"},
                    // The total column count must be specified here
                    columns: 3,
                    tableAttrs: {
                        border: 1,
                        cellpadding: 5,
                        cellspacing: 0,
                        width: '100%',
                        align: 'center',
                        style: "border:1px solid #2E2E2E;border-collapse:collapse;margin:0 auto;text-align:left;"
                        /*style: {
                         width: '100%'
                         }*/
                    }
                },

                items: [{

                    name: 'writeoffcardinalnumberyear',
                    fieldLabel: '本年度已报销基数'/*,
                    afterLabelTextTpl: required,
                    allowBlank: false*/
                } ,
                    {

                        name: 'helpedmoneyyear',
                        fieldLabel: '本年度已救助金额'
                    },{

                        name: 'helpedtimesyear',
                        fieldLabel: '本年度已救助次数'
                    },{

                        name: 'hospitalizedwriteoffcardinalnumberyear',
                        fieldLabel: '本年度住院累计报销基数'
                    },{

                        name: 'hospitalizedhelpedmoneyyear',
                        fieldLabel: '本年度住院累计救助金额'
                    },{

                        name: 'hospitalizedhelpedtimesyear',
                        fieldLabel: '本年度住院累计救助次数'
                    },{

                        name: 'outpatientwriteoffcardinalnumberyear',
                        fieldLabel: '本年度门诊累计报销基数'
                    },{

                        name: 'outpatienthelpedmoneyyear',
                        fieldLabel: '本年度门诊累计救助金额'
                    },{

                        name: 'outpatienthelpedtimesyear',
                        fieldLabel: '本年度门诊累计救助次数'
                    }


                ]
            }
        );
        this.callParent(arguments);

    }

});
