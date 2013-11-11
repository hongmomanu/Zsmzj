/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-10-23
 * Time: 下午2:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.view.dbgl.familyhouseFieldset', {
    extend : 'Ext.form.FieldSet',
    alias : 'widget.dbglfamilyhousefieldset',
    requires: [


    ],

    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,
            {
                title: '<a>家庭房产信息</a>',
                cls:'fieldset-border',
                defaultType: 'textfield',
                bodyStyle: 'padding:5px 5px 5px 5px',
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
                items:[
                    {
                        xtype:'dbglaplytype',
                        searchtype:"dbglhouseproperties",
                        name: 'houseproperties',
                        fieldLabel: '住房性质',
                        listeners:{
                            scope: this,
                            'select': function (combo, records) {
                                var value=combo.getValue();
                                if(value==='自有'){
                                    combo.nextNode().setEditable(true)
                                }
                                else{
                                    combo.nextNode().setEditable(false);
                                }

                            }
                        },
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }
                    ,{
                        xtype:'dbglaplytype',
                        searchtype:"dbglhousestructure",
                        name: 'housestructure',
                        fieldLabel: '住房结构',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'housearea',
                        fieldLabel: '住房总建筑面积(㎡)',
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('houseareachane', field);
                            }
                        },
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'houseaveragearea',
                        fieldLabel: '住房人均建筑面积',

                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'houseusearea',
                        fieldLabel: '住房总使用面积(㎡)',
                        listeners: {

                            "blur":function(field,e){
                                this.fireEvent('houseareachane', field);
                            }
                        },
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    },{
                        name: 'houseaverageusearea',
                        fieldLabel: '住房人均使用面积',
                        //afterLabelTextTpl: required,
                        //emptyText: '低保户类型',
                        allowBlank: true
                    }

                ]
            }
        );
        this.callParent(arguments);

    }

});
