/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:04
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.controller.Manager', {
    extend: 'Ext.app.Controller',

    models: ['manager.UserManager','manager.RoleManager'],
    stores: ['manager.UserManagers','manager.RoleManagers'],

    /*refs: [
     {ref: 'summitChart', selector: 'summitchart'},
     {ref: 'summitGrid', selector: 'summitgrid'}
     ],*/
    views: [

        'manager.UserManager',
        'manager.RoleManager',
        'manager.addNewRoleWin',
        'manager.roleMenu'

    ],

    init: function() {
        var me = this;

        this.control({
            'rolemanagerpanel button[action=addnewrole]':{
                click: this.addnewrolewin
            },
            'addnewrolewin button[action=add]': {
                click: this.addnewrole
            },
            'rolemanagerpanel': {
                itemcontextmenu: this.showMenu
            }
            ,
            'rolemenu button[action=del]': {
                click: this.delrole
            },
            'rolemenu > menuitem': {
                click: this.rolemanager
            }
        }, this);

    },
    showMenu: function (panelView, record, item, index, e, eOpts) {

        var me = this;
        e.preventDefault();
        e.stopEvent();
        var menu = Ext.widget('rolemenu');
        menu.roledata=record;
        menu.showAt(e.getXY());
    },

    rolemanager:function (item, e, eOpts) {
        var roleid=item.parentMenu.roledata.data.roleid;
        var params = {
           roleid:roleid
        };
        var rolestore=this.getManagerRoleManagersStore();
        var successFunc = function (form, action) {

            rolestore.load();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "删除角色失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/delrole.jsp', successFunc, failFunc);

    },


    addnewrolewin: function(btn) {

        if (!this.newRoleWin)this.newRoleWin = Ext.widget('addnewrolewin');
        this.newRoleWin.show();

    } ,
    addnewrole: function(btn) {
        var me=this;
        var params = {

        };
        var rolestore=this.getManagerRoleManagersStore();
        var successFunc = function (form, action) {
            rolestore.load();
            me.newRoleWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增角色失败，检查web服务或数据库服务");

        };
        testobj=this;
        this.formSubmit(btn, params, 'ajax/addnewrole.jsp', successFunc, failFunc,"正在提交数据");

    } ,
    ajaxSend:function(params,url,sucFun,failFunc){
        Ext.Ajax.request({
            url: url,
            params: params,
            success:sucFun,
            failure:failFunc
        });

    },
    formSubmit: function (button, params, url, sucFunc, failFunc,waitmsg) {
        var form = button.up('form').getForm();
        if (form.isValid()) {
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));

            form.submit({
                waitTitle: '提示', //标题
                waitMsg: waitmsg, //提示信息
                url: url,

                method: "POST",
                params: params,
                success: sucFunc,
                failure: failFunc
            });

        }


    },



    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});
