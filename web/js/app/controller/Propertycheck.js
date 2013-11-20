/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */


Ext.define('ZSMZJ.controller.Propertycheck', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    refs: [

    ],
    views: [
        'propertycheck.familyinfoRegister',
        'propertycheck.familybasicFieldset',
        'propertycheck.familyinputFieldset',
        'propertycheck.familyhouseFieldset',
        'propertycheck.familymoneyFieldset'

    ],


    init: function () {
        var me = this;
        var dbgl_cl = this.application.getController("Dbgl");
        this.control({
            'propertycheckfamilyinforegister,propertycheckfamilyinputfieldset,propertycheckfamilyhousefieldset,propertycheckfamilymoneyfieldset':{
                afterrender: dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)
            },
            'propertycheckfamilyinforegister button[action=applysubmit]':{
                click: this.applysubmit
            }
        })
    },


    submitcommon:function(btn,businesstype,isprocess){
        var me=this;
        var familygrid=btn.up('form').down('#familymembergrid')

        var familymembers=[];
        var affixfiles=[];
        if(familygrid){
            var store=familygrid.getStore();
            Ext.each(store.data.items,function(a){
                familymembers.push(a.data);
            });
        }
        var form=btn.up('form');
        var affixpanel=form.down('#affixfilespanel');
        if(affixpanel){
            Ext.each(affixpanel.items.items,function(a){
                if(a.xtype=='panel'){
                    var formdata=a.down('panel').formdata;
                    var affixfileitem={};
                    affixfileitem[a.down('panel').type]=formdata;
                    if(formdata)affixfiles.push(affixfileitem);

                }

            });
        }
        if(form.down('#dbglaccountimg')){
            affixfiles.push({"accountimgpath":[{'attachmentname':'照片','attachmentpath':form.down('#dbglaccountimg').value}]});
        }


        var params = {
            //businesstype:businesstype,
            userid:userid,
            //familymembers:Ext.JSON.encode(familymembers),
            //processstatustype:processstatustype.ok,
            //isprocess:isprocess,
            //affixfiles:Ext.JSON.encode(affixfiles)
        };
        var successFunc = function (myform, action) {

            var hc=me.application.getController("Header");
            hc.closetab(form.id);

            Ext.Msg.alert("提示信息", "提交申请成功");

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交申请失败,检查web服务");

        };
        var form =btn.up('form');
        var dbgl_cl = this.application.getController("Dbgl");

        dbgl_cl.formSubmit(form, params, 'ajax/sendfamilypropertyinfo.jsp', successFunc, failFunc,"正在提交数据");


    },
    //业务提交共用入口
    applysubmit:function(btn){
        alert(1)
        this.submitcommon(btn,businessTableType.dbgl,true);
    },
    onLaunch: function () {
        var me = this;
        // for dev purpose
        //ctrl = this;
    }


});

