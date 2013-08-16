/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 下午1:04
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ZSMZJ.controller.Manager', {
    extend: 'Ext.app.Controller',

    models: ['manager.UserManager','manager.RoleManager',
             'manager.FuncManager','manager.RoleFunc',
             'manager.EnumerateConfigManager'
            ],
    stores: ['manager.UserManagers','manager.RoleManagers',
             'manager.FuncManagers','manager.RoleFuncs',
             'manager.EnumerateConfigManagers'
            ],

    refs: [
     {ref: 'viewRoleManager', selector: 'rolemanagerpanel'}, //view的实例引用自定义名,class别名
     {ref: 'viewRoleFuncGrid', selector: 'rolefuncgrid'}
     ],
    views: [

        'manager.UserManager',
        'manager.RoleManager',
        'manager.FuncManager',
        'manager.EnumerateConfigManager',
        'manager.RoleFuncGrid',
        'manager.addNewRoleWin',
        'manager.addNewFuncWin',
        'manager.addNewUserWin',
        'manager.addNewEnumWin',
        'manager.RoleFuncWin',
        'manager.EditFuncWin',
        'manager.funcMenu',
        'manager.userMenu',
        'manager.roleMenu'

    ],

    init: function() {
        var me = this;
        //testobj=me;
        this.control({
            'rolemanagerpanel button[action=addnewrole]':{
                click: this.addnewrolewin
            },
            'funcmanagerpanel button[action=addnewfunc]':{
                click: this.addnewfuncwin
            },
            'enumerateconfigmanager button[action=addnewenumerate]':{
                click: this.addnewenumwin
            },
            'usermanagerpanel button[action=addnewuser]':{
                click: this.addnewuserwin
            },
            'addnewuserwin button[action=add]': {
                click: this.addnewuser
            },
            'addnewrolewin button[action=add]': {
                click: this.addnewrole
            },
            'addnewfuncwin button[action=add]': {
                click: this.addnewfunc
            },
            'addnewenumwin button[action=add]': {
                click: this.addnewenum
            },
            'editfuncwin button[action=save]': {
                click: this.saveeditfunc
            },

            'rolefuncgrid button[action=save]': {
                click: this.saverolefuncs
            },
            'rolefuncgrid button[action=cancel]': {
                click: this.cancelrolefuncs
            },
            'usermanagerpanel': {
                itemcontextmenu: this.showUserMenu
            },

            'rolemanagerpanel': {
                itemcontextmenu: this.showRoleMenu
            },
            'funcmanagerpanel': {
                itemcontextmenu: this.showFuncMenu
            }
            ,
            'rolemenu button[action=del]': {
                click: this.delrole
            },
            'usermenu > menuitem': {
                click: this.usermanager
            },
            'rolemenu > menuitem': {
                click: this.rolemanager
            },
            'funcmenu > menuitem': {
                click: this.funcmanager
            }
        }, this);



    },
    showUserMenu: function (panelView, record, item, index, e, eOpts) {

        var me = this;
        e.preventDefault();
        e.stopEvent();
        var menu = Ext.widget('usermenu');
        menu.userdata=record;
        menu.showAt(e.getXY());
    },
    showRoleMenu: function (panelView, record, item, index, e, eOpts) {

        var me = this;
        e.preventDefault();
        e.stopEvent();
        var menu = Ext.widget('rolemenu');
        menu.roledata=record;
        menu.showAt(e.getXY());
    },
    showFuncMenu: function (panelView, record, item, index, e, eOpts) {

        var me = this;
        e.preventDefault();
        e.stopEvent();
        var menu = Ext.widget('funcmenu');
        menu.funcdata=record;
        menu.showAt(e.getXY());
    },

    funcmanager:function (item, e, eOpts) {
        var funcid=item.parentMenu.funcdata.data.funcid;

        if(item.text=='删除功能'){
            var params = {
                funcid:funcid
            };
            var funcstore=this.getManagerFuncManagersStore();
            var successFunc = function (form, action) {

                funcstore.load();

            };
            var failFunc = function (form, action) {
                Ext.Msg.alert("提示信息", "删除角色失败，检查web服务或数据库服务");

            };
            this.ajaxSend(params, 'ajax/delfunc.jsp', successFunc, failFunc);

        }
        else if (item.text=='编辑功能'){
            this.editfuncwin(funcid,item.parentMenu.funcdata.raw);

        }

    },
    usermanager:function (item, e, eOpts) {
        var userid=item.parentMenu.userdata.data.userid;

        if(item.text=='删除用户'){
            var params = {
                userid:userid
            };
            var userstore=this.getManagerUserManagersStore();
            var successFunc = function (form, action) {

                userstore.load();

            };
            var failFunc = function (form, action) {
                Ext.Msg.alert("提示信息", "删除角色失败，检查web服务或数据库服务");

            };
            this.ajaxSend(params, 'ajax/deluser.jsp', successFunc, failFunc);

        }
        else if(item.text=='修改密码'){

            //this.rolefuncwin(roleid);

        }

    },
    rolemanager:function (item, e, eOpts) {
        var roleid=item.parentMenu.roledata.data.roleid;

        if(item.text=='删除角色'){
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

        }
        else if(item.text=='功能配置'){

            this.rolefuncwin(roleid);

        }

    },


    addnewrolewin: function(btn) {

        if (!this.newRoleWin)this.newRoleWin = Ext.widget('addnewrolewin');
        this.newRoleWin.show();

    } ,
    addnewfuncwin:function(btn){
        if (!this.newFuncWin)this.newFuncWin = Ext.widget('addnewfuncwin');
        this.newFuncWin.show();
    },
    addnewenumwin:function(btn){

        if (!this.newEnumWin)this.newEnumWin = Ext.widget('addnewenumwin');
        this.newEnumWin.show();
    },

    addnewuserwin:function(btn){
        if (!this.newUserWin)this.newUserWin = Ext.widget('addnewuserwin');
        this.newUserWin.show();

    },

    rolefuncwin:function(roleid){

        var rolefuncstore=this.getManagerRoleFuncsStore();
        rolefuncstore.proxy.extraParams.roleid=roleid;


        if (!this.rolewin)this.rolewin =Ext.widget('rolefuncwin');
        this.rolewin.roleid=roleid;
        this.rolewin.show();
        this.rolefuncstoreLoad(rolefuncstore);

    },
    editfuncwin:function(funcid,data){


        if (!this.edit_func_win)this.edit_func_win =Ext.widget('editfuncwin');
        this.edit_func_win.down('form').getForm().reset();
        this.edit_func_win.down('form').getForm().setValues(data);
        this.edit_func_win.show();
        this.edit_func_win.editdata=data;


    },
    rolefuncstoreLoad:function(store){
        var me=this;

        store.on('beforeload', function (store, options) {
            //var new_params = { name: Ext.getCmp('search').getValue() };
            //Ext.apply(store.proxy.extraParams, new_params);
            // alert('beforeload');
        });
        store.on('load', function (store, options) {
            var grid=me.getViewRoleFuncGrid();
            Ext.each(store.data.items,function(a){
                if(a.raw.selected){
                    grid.getSelectionModel().select(a.index,true,false);
                }
            });
            //var new_params = { name: Ext.getCmp('search').getValue() };
            //Ext.apply(store.proxy.extraParams, new_params);
            // alert('beforeload');
        });

        store.load();

    },

    saverolefuncs:function(btn){
        var me=this;
        var panel=btn.up('panel');
        var selModel=panel.getSelectionModel();
        var selectItems=selModel.getSelection();
        var funcid_arr=[];
        var delete_arr=[];
        Ext.each(selectItems,function(a){
            funcid_arr.push(a.data.funcid);
        });
        Ext.each(panel.getStore().data.items,function(a){
            delete_arr.push(a.data.funcid);
        });
        var params = {
            roleid:btn.up('window').roleid,
            deleteid:delete_arr,
            funcid:funcid_arr

        };

        var rolefuncstore=this.getManagerRoleFuncsStore();
        var successFunc = function (form, action) {
            me.rolewin.hide();
            me.rolefuncstoreLoad(rolefuncstore);
            Ext.Msg.alert("提示信息", "功能设置成功");


        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "功能设置失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/makerolefunc.jsp', successFunc, failFunc);


    },
    cancelrolefuncs:function(btn){
        var win = btn.up('window');
        win.hide();

    },
    saveeditfunc:function(btn){

        var me=this;
        var params = {
           funcid:btn.up('window').editdata.funcid
        };
        var funcstore=this.getManagerFuncManagersStore();
        var successFunc = function (form, action) {
            funcstore.load();
            me.edit_func_win.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增功能失败，检查web服务或数据库服务");

        };

        this.formSubmit(btn, params, 'ajax/editfunc.jsp', successFunc, failFunc,"正在提交数据");




    },
    addnewenum:function(btn){
        var me=this;
        var params = {

        };
        var enumstore=this.getManagerEnumerateConfigManagersStore();
        var successFunc = function (form, action) {
            enumstore.load();
            me.newEnumWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增枚举失败，检查web服务或数据库服务");

        };

        this.formSubmit(btn, params, 'ajax/addnewenum.jsp', successFunc, failFunc,"正在提交数据");



    },
    addnewfunc:function(btn){
        var me=this;
        var params = {

        };
        var funcstore=this.getManagerFuncManagersStore();
        var successFunc = function (form, action) {
            funcstore.load();
            me.newFuncWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增功能失败，检查web服务或数据库服务");

        };

        this.formSubmit(btn, params, 'ajax/addnewfunc.jsp', successFunc, failFunc,"正在提交数据");


    },

    addnewuser:function(btn){

        var me=this;
        var params = {

        };
        var userstore=this.getManagerUserManagersStore();
        var successFunc = function (form, action) {
            userstore.load();
            me.newUserWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增用户失败，检查web服务或数据库服务");

        };

        this.formSubmit(btn, params, 'ajax/addnewuser.jsp', successFunc, failFunc,"正在提交数据");



    },

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
