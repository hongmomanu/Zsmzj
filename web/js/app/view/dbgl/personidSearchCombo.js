
/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */

Ext.define('ZSMZJ.view.dbgl.personidSearchCombo' ,{
    extend: 'Ext.form.ComboBox',
    alias : 'widget.personidsearchcombo',
    cls:'navigation-grid',
    requires: [

    ],

    initComponent: function() {
        Ext.apply(this,
            {
                store: 'dbgl.SearchCombos',
                displayField: 'owerid',
                width:600,
                valueField:'owerid',
                typeAhead: false,
                //hideLabel: true,
                hideTrigger:true,
                anchor: '100%',
                listConfig: {
                    loadingText: '查询中...',
                    emptyText: '没有找到相关的用户.',

                    //自定义显示格式
                    getInnerTpl: function() {
                        //[Ext.Date.format(helpbgtime, "M j, Y")]
                        return '<a class="search-item">' +
                            '<h3><span>{helpbgtime}<br />性别 {sex}</span>{owername}</h3>' +
                            '{helpreason}' +
                            '</a>';
                    }
                },
                pageSize: 5

            }
        );
        this.callParent(arguments);

    }

});
