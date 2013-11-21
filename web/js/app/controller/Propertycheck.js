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
        'propertycheck.FamilyPropertyQuery'
    ],
    stores: [
        'propertycheck.FamilyPropertyQuerys'
    ],
    refs: [

    ],
    views: [
        'propertycheck.familyinfoRegister',
        'propertycheck.familybasicFieldset',
        'propertycheck.familyinputFieldset',
        'propertycheck.familyhouseFieldset',
        'propertycheck.familymoneyFieldset',
        'propertycheck.FamilyPropertyQueryGrid'

    ],


    init: function () {
        var me = this;
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl = this.application.getController("Header");
        this.control({
            'propertycheckfamilyinforegister,propertycheckfamilyinputfieldset,propertycheckfamilyhousefieldset,propertycheckfamilymoneyfieldset,familypropertyquerygrid':{
                afterrender: dbgl_cl.afterrenderEvents,
                initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)
            },
            'propertycheckfamilyinforegister button[action=applysubmit]':{
                click: this.applysubmit
            },
            'familypropertyquerygrid':{
                gridshowfresh:function(grid){
                    if(grid.xtype=='familyquerypanel'){
                        var result_arr=Ext.clone(grid.columns);
                        //var result_arr=Ext.clone(familyheaders[CommonFunc.lookupitemname(businessTableType,grid.businesstype)]);
                        Ext.Array.insert(result_arr,0,[Ext.create('Ext.grid.RowNumberer')]);
                        grid.reconfigure(undefined,result_arr);
                    }

                    var store=grid.getStore();
                    if(store.proxy.extraParams){
                        store.proxy.extraParams.businesstype = grid.businesstype;
                        store.proxy.extraParams.type=grid.stype;
                        store.proxy.extraParams.divisionpath=divisionpath;
                        store.proxy.extraParams.ispublicinfo=grid.ispublicinfo;
                        if(grid.isnewgrid){
                            store.load();
                            grid.isnewgrid=false;
                        }

                        //清空高级搜索
                        store.on('load', function (store, options) {
                            store.proxy.extraParams.name=null;
                            store.proxy.extraParams.logic=null;
                            store.proxy.extraParams.compare=null;
                            store.proxy.extraParams.value=null;
                            //CommonFunc.widgetdolayout("mainContent-panel",1);
                        });
                    }

                },
                'edit':function(c){
                    myedit=c;
                    //console.log(c)
                }
            },
            'propertycheckfamilyinforegister component':{
                moneychane:function(c){
                    this.moneychane(c);
                },
                houseareachane:function(c){
                    this.houseareachane(c);
                }
            },
            'familypropertyquerygrid button[action=register]':{
                click:function(){
                    //header_cl.showtab('待办业务','needtodopanel','widget');
                    this.showtab('待办业务','needtodopanel','widget');
                }
            },
            'familypropertyquerygrid button[action=delete]':{
                click:function(btn){

                    var recordList=btn.up('grid').getSelectionModel().getSelection();
                    for(var i=0;i<recordList.length;i++){
                        //console.log(recordList[i].data.owerid);
                    }

                    myrecordList=recordList;
                }
            }
        })
    },


    //form 房屋结构 子项变更
    houseareachane:function(c){
        var formpanel= c.up('form');
        var person_nums=parseInt(formpanel.down('#FamilyPersons').getValue());
        var area= parseInt(c.getValue());
        c.nextNode().setValue(parseInt(person_nums==0?area:area/person_nums))

    },
    moneychane:function(c){

        var formpanel=c.up('form');
        var type=formpanel.businesstype;
        var incomesum=formpanel.down('#incomesum');
        if(incomesum){
            var incomesum_value=0;
            var incomeitems=incomesum.up('fieldset').items.items;
            var person_nums=parseInt(formpanel.down('#FamilyPersons').getValue());
            alert(person_nums)
            for(var i=0;i<incomeitems.length;i++){
                if(incomeitems[i]==incomesum)break;
                incomesum_value+=parseFloat(incomeitems[i].getValue());
            }
            incomesum.setValue(incomesum_value);
            var incomesumarea=formpanel.down('#incomesumarea');
            incomesumarea.setValue(parseInt(incomesum_value/12));

            var incomesumareaperson=formpanel.down('#incomesumareaperson');
            incomesumareaperson.setValue(parseInt(person_nums==0?incomesum_value/12:incomesum_value/12/person_nums));

            var propertysum=formpanel.down('#propertysum');
            var propertysum_value=0;
            var propertyitems=propertysum.up('fieldset').items.items;
            for(var i=0;i<propertyitems.length;i++){
                if(propertyitems[i]==propertysum)break;
                propertysum_value+=parseFloat(propertyitems[i].getValue());
            }
            propertysum.setValue(propertysum_value);

            var familyincome=formpanel.down('#familyincome');
            familyincome.setValue(propertysum_value+incomesum_value);

            var averageincome=formpanel.down('#averageincome');
            averageincome.setValue((person_nums==0?parseInt(familyincome.getValue())/12:parseInt(familyincome.getValue())/12/person_nums).toFixed(1));


            var totalhelpmoney=formpanel.down('#totalhelpmoney');
            var poorstandard=formpanel.down('#poorstandard');
            var disableditem=formpanel.down('#disabledpersons');
            var disablednum=disableditem.getValue();



        }

        //console.log(testobj);
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
            userid:userid
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
    showtab:function(label,value,type,objdata){

        //ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
        //ViewWaitMask.show();
        if(ViewWaitMask){
            try{
                Ext.getCmp('mainContent-panel').getEl().unmask();
            }catch (e){

            }


        }
        ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
        ViewWaitMask.show();

        var tabs = Ext.getCmp('mainContent-panel');
        var tabid=(objdata&&objdata.record)?objdata.record.get('businessid'):value;
        tabid=value+tabid;
        var tab=tabs.getComponent(tabid);
        if (tab) {
            //var tab=tabs.getComponent('tab' + value);

            if(objdata){
                //tab.isnewbusiness=false;
                tab.isnewbusiness=!(tab.objdata.businessid==objdata.businessid);
                if(tab.isnewbusiness){
                    //tab.removeAll();

                    function fn(){
                        tabs.add({
                            closable: true,
                            id: tabid,
                            xtype: value,
                            objdata:objdata,
                            businesstype:objdata?objdata.record.get('businesstype'):null,
                            autoScroll: true,
                            iconCls: 'tabs',
                            title: label
                        }).show();
                        if(tabs.items.items.length==3){

                            tabs.items.items[1].close();
                            //tabs.remove(tabs.items.items[1]);
                        }
                    }
                    var task = new Ext.util.DelayedTask(fn);
                    task.delay(50);
                    return;

                }
                tab.objdata=objdata;
            }

            if(tab.isHidden()){

                //function fn(){
                tab.tab.show();
                tabs.setActiveTab(tab);

                //}

                //var task = new Ext.util.DelayedTask(fn);
                //task.delay(10);
            }
            else{
                this.initchangelogoutbtns(tabs.getComponent(tabid));
                CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
            }



        } else {
            //alert(1);
            if (type == 'widget') {

                function fn(){
                    tabs.add({
                        closable: true,
                        id: tabid,
                        xtype: value,
                        objdata:objdata,
                        businesstype:objdata?objdata.record.get('businesstype'):null,
                        autoScroll: true,
                        iconCls: 'tabs',
                        title: label
                    }).show();
                    if(tabs.items.items.length==3){
                        tabs.items.items[1].close();
                        //tabs.remove(tabs.items.items[1]);
                    }
                }
                var task = new Ext.util.DelayedTask(fn);
                task.delay(50);


            } else if (type == "url") {
                tabs.add({
                    closable: true,
                    id: 'tab' + label,
                    html: '<iframe src="' + value + '" width="100%" height="100%">',
                    //loader: { url: "http://www.baidu.com", contentType: 'html', loadMask: 'loading...', autoLoad: true, scripts: true },
                    autoScroll: false,
                    iconCls: 'tabs',
                    title: label
                }).show();

            }

        }

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

