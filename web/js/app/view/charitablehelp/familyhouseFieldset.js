/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-6
 * Time: 上午10:51
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.charitablehelp.familyhouseFieldset',{
    extend:'Ext.form.FieldSet',
    alias:'widget.charitablehelpfamilyhousefieldset',
    requires:[],

    initComponent:function(){
        var required='<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this,{
            xtype: 'fieldset',
            cls:'fieldset-border',
            title: '<a>家庭房产信息</a>',
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
                    fieldLabel: '住房总面积(㎡)',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                },{
                    name: 'houseaveragearea',
                    fieldLabel: '住房人均面积',
                    //afterLabelTextTpl: required,
                    //emptyText: '低保户类型',
                    allowBlank: true
                }

            ]
        });

        this.callParent(arguments);
    }
})