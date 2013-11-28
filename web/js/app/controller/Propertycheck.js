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
        'propertycheck.FamilyPropertyQuery',
        'propertycheck.FamilyPropertyItem'
    ],
    stores: [
        'propertycheck.FamilyPropertyQuerys',
        'propertycheck.FamilyPropertyItems'
    ],
    refs: [

    ],
    views: [
        'propertycheck.familyinfoRegister',
        'propertycheck.familybasicFieldset',
        'propertycheck.familyinputFieldset',
        'propertycheck.familyhouseFieldset',
        'propertycheck.familymoneyFieldset',
        'propertycheck.FamilyPropertyQueryGrid',
        'propertycheck.NeedToDoBusinessGrid',
        'propertycheck.NeedToCheckBusinessGrid',
        'propertycheck.familyinfoAlter',
        'propertycheck.familyinfoCheck',
        'propertycheck.propertyCheckWin',
        'propertycheck.processCheckWin'

    ],
    init: function () {
        propertyCheckRoleBtn=null;
        this.initPropertyCheckFromRole();
        var me = this;
        var dbgl_cl = this.application.getController("Dbgl");
        var header_cl = this.application.getController("Header");
        this.control({
                'propertycheckneedtocheckbusinesspanel,propertycheckneedtodobusinesspanel,propertycheckfamilyinforegister,propertycheckfamilyinputfieldset,propertycheckfamilyhousefieldset,propertycheckfamilymoneyfieldset':{
                    afterrender: dbgl_cl.afterrenderEvents,
                    initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl)

                },
                'propertycheckfamilyinfocheck':{
                    afterrender: dbgl_cl.afterrenderEvents,
                    initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl),
                    alterapplyaftershow:function(form){
                        var r=form.objdata.record;
                        var checkbtn=form.down('#propertycheckbtn');
                        if(r.data.checkresult=='1'&&checkbtn){
                            checkbtn.hide();
                        }
                        var fn=function(form){

                            form.loadRecord(r);
                            var division=form.down('#divisiontype');
                            if(division){
                                division.setRawValue(r.data.division);
                                division.focus();
                                division.validateValue();
                            }
                        }

                        var task = new Ext.util.DelayedTask(function(){fn(form)});
                        task.delay(500);
                    }
                },
                'propertycheckfamilyinfoalter':{
                    afterrender: dbgl_cl.afterrenderEvents,
                    initformaftershow:Ext.bind(dbgl_cl.initformaftershow, dbgl_cl),
                    alterapplyaftershow:function(form){
                        mytestform=form;
                        var fn=function(form){
                            var r=form.objdata.record;
                            form.loadRecord(r);
                            var division=form.down('#divisiontype');
                            if(division){
                                division.setRawValue(r.data.division);
                                division.focus();
                                division.validateValue();
                            }
                            var params={
                                eventName:'getperopertycheckitemdetailbyowerid',
                                owerid: r.data.owerid
                            }
                            var store=me.getStore("propertycheck.FamilyPropertyItems");
                            if(store.proxy.extraParams){
                                store.proxy.extraParams=params;
                            }
                            store.load({callback:function(){
                                var items=store.data.items;
                                for( var p in me.checkItemMap){
                                    for(var i=0;i<items.length;i++){
                                        var o= items[i].data;
                                        if(me.checkItemMap[p]==o.checkitem&&o.checkresult==1){
                                            form.query(p)[0].disable();
                                        }
                                    }
                                }
                                var grid=Ext.create('Ext.grid.Panel', {
                                    store: store,
                                    columns: [
                                        { header: '核定项目', dataIndex: 'checkitem',flex:1,width:30},
                                        { header: '核定结果', dataIndex: 'checkresult',flex:1,width:30,
                                            renderer:function(v,c,r){
                                                var rs='';
                                               switch(parseInt(v)){
                                                   case 0:rs="不通过";break;
                                                   case 1:rs="通过";break;
                                               }
                                               return rs;
                                        }},
                                        { header: '核定备注', dataIndex: 'checkcomment',flex:2 } ,
                                        { header: '操作员', dataIndex: 'userid' },
                                        { header: '操作员角色', dataIndex: 'roleid' }
                                    ],
                                    style: {
                                        border:'1px solid green',
                                        marginBottom: '10px',
                                        marginLeft:'10px',
                                        marginRight:'10px'
                                    }
                                });
                                form.add(grid);
                            }});


                        }

                        var task = new Ext.util.DelayedTask(function(){fn(form)});
                        task.delay(500);
                    }
                },
                'propertycheckfamilyinforegister button[action=applysubmit]':{
                    click: this.applysubmit
                },
                'propertycheckfamilyinforegister button[action=applytest]':{
                    click: this.test
                },
                'propertycheckfamilyinfocheck button[action=checkbusiness]':{
                    click: this.showpropertycheckwin
                },
                'propertycheckfamilyinfocheck button[action=cancel],propertycheckfamilyinfoalter button[action=cancel]':{
                    click: Ext.bind(header_cl.cancelcheck,header_cl)
                },
                'propertycheckwin button[action=send]':{
                    click:this.sendPropertyCheckForm
                },
                'propertyprocesscheckwin button[action=send]':{
                    click:this.sendPropertyCheckForm
                },
                'propertycheckfamilyinfoalter button[action=sendbusiness]':{
                    click:this.sendbusiness
                },
                'propertycheckfamilyinfoalter button[action=checkbusiness]':{
                    click: this.showcheckwin
                },
                'propertycheckneedtocheckbusinesspanel,propertycheckneedtodobusinesspanel':{
                    gridshowfresh:function(grid){
                        var store=grid.getStore();
                        if(store.proxy.extraParams){

                            store.proxy.extraParams.businesstype = grid.businesstype;
                            store.proxy.extraParams.type=grid.stype;
                            store.proxy.extraParams.divisionpath=divisionpath;
                            store.proxy.extraParams.ispublicinfo=grid.ispublicinfo;
                            store.proxy.extraParams.eventName='getfamilypropertyinfo';
                            if(grid.xtype=='propertycheckneedtocheckbusinesspanel'){
                                store.proxy.extraParams.addontype='1';
                                store.proxy.extraParams.eventName='getfamilypropertyinfobycheckrole';
                                store.proxy.extraParams.checkitem=propertyCheckRoleBtn[0].name;

                            }else{
                                store.proxy.extraParams.addontype='0';
                            }
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
                    },
                    afterrender: dbgl_cl.afterrenderEvents,

                    processclick:function (c,r,grid){//查看流程
                        this.showProcessWin(c,r,grid);
                    },

                    businessclick:function(c,r,grid){//业务审核处理
                        //me.widgetdolayout("mainContent-panel");
                        var me=this;
                        var callback=function fn(){
                            me.closemask();
                            Ext.Msg.alert("提示信息", "操作成功");
                            me.widgetdolayout("mainContent-panel");

                        };

                        this.showBusinessCheckContent(c,r,grid,callback);
                    },
                    alterclick:function(c,r,grid){//未提交前修改

                        this.showAlterContent(c,r,grid);
                    },

                    delclick:function(c,r,grid){//未提交前删除

                        this.delbusinessapply(c,r,grid);
                    },
                    cancelclick:function(c,r,grid){//未审核前取消提交
                        this.cancelbusinesssubmit(c,r,grid);
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

                'familypropertyquerygrid button[action=delete]':{
                    click:function(btn){

                        var recordList=btn.up('grid').getSelectionModel().getSelection();
                        for(var i=0;i<recordList.length;i++){
                            //console.log(recordList[i].data.owerid);
                        }
                        myrecordList=recordList;
                    }
                }
            }
        )
    },

/*事件注册完毕*/



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
    test:function(btn,businesstype,isprocess){
        var me=this;
        var wo={name:'魏攀',age:27};
        var params= {
            id: 1,
            wo:wo,
            wos:Ext.encode(wo)
        };
        Ext.Ajax.request({
            url:'ajax/sendfamilypropertyinfo.jsp',
            params:params,
            method:'POST',
            success:function(){alert('good')}
        })
    },
    submitcommon:function(btn,businesstype,isprocess){
        var successFunc = function (myform, action) {
            var hc=me.application.getController("Header");
            Ext.Msg.alert("提示信息", "提交申请成功");
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交申请失败,检查web服务");
        };
        form =btn.up('form');
        var array=form.query('textfield');
        var tmp={};
        for(var i=0;i<array.length;i++){
               var o=  array[i]  ;
            var json='{'+o.getName()+':"'+o.getValue()+'"}';
            var  val= o.getValue();
            val=!!val?val:'';
            var json= 'tmp.'+o.getName()+'="'+ val+'"';
            eval(json);

        }
        tmp.processstatustype=processstatustype.ok;
        var params = {
            eventName:'registerfamilyinfo',
            userid:userid,
            fm01:Ext.encode(tmp),
            isprocess:isprocess
        };
        Ext.Ajax.request({
            url:'ajax/sendfamilypropertyinfo.jsp',
            params:params,
            method:'POST',
            success:function(){alert('good')}
        })
    },
    //根据roleid获取初始化功能
    initPropertyCheckFromRole:function(){
        var me=this;
        var params = {
            roleid:roleid,
            type:"家庭财产核定"
        };
        var successFunc = function (response, action) {
            propertyCheckRoleBtn=Ext.JSON.decode(response.responseText);
            me.initCheckItemCmp.call(me,propertyCheckRoleBtn)  ;
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "取消提交失败，检查web服务或数据库服务");

        };
        Ext.Ajax.request({
            url:'ajax/getallfuncsbyrule.jsp',
            params:params,
            method:'POST',
            success:successFunc,
            failure:failFunc
        })
    },
    showtab:function(label,value,type,objdata){

        if(ViewWaitMask){
            try{
                Ext.getCmp('mainContent-panel').getEl().unmask();
            }catch (e){

            }
        }
        ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
        ViewWaitMask.show();

        var tabs = Ext.getCmp('mainContent-panel');
        var tabid=(objdata&&objdata.record)?objdata.record.get('owerid'):value;
        tabid=value+tabid;
        var tab=tabs.getComponent(tabid);
        if (tab) {
            //var tab=tabs.getComponent('tab' + value);

            if(objdata){
                //tab.isnewbusiness=false;
                tab.isnewbusiness=!(tab.objdata.owerid==objdata.owerid);
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
        this.submitcommon(btn,businessTableType.dbgl,true);
    },
    onLaunch: function () {
        var me = this;

    },
    showAlterContent:function(c,r,grid){
        mygrid=grid;
        var objdata={
            owerid:r.get('owerid'),
            record:r,
            grid:grid,
            item:c

        };
        var widgetname="";
        if(r.get('processstatustype')==processstatustype.ok){
               if(r.get('addontype')=='1'){
                   widgetname='propertycheckfamilyinfocheck';
               } else{
                   widgetname='propertycheckfamilyinfoalter';
               }

        }else if(r.get('processstatustype')==processstatustype.change){
            if(r.get('businesstype')==businessTableType.dbgl){
                widgetname='dbglbusinesschangeform';
            }else if(r.get('businesstype')==businessTableType.dbbyh){
                widgetname='dbedgebusinesschangeform';
            }

        }else if(r.get('processstatustype')==processstatustype.logout){
            if(r.get('businesstype')==businessTableType.dbgl){
                widgetname='dbglbusinesslogoutform';
            }else if(r.get('businesstype')==businessTableType.dbbyh){
                widgetname='dbedgebusinesslogoutform';
            }
        }
        this.showtab(r.get('owername'),widgetname,'widget',objdata);

    },
    checkItemMap:{
        propertycheckfamilyhousefieldset:'核定住房',
        propertycheckfamilyinputfieldset:'核定收入',
        propertycheckfamilymoneyfieldset:'核定现有资产'
    },

    initCheckItemCmp:function(array){

        var o=applyformviews.propertycheckitemalter;
        var b=new Array();
        b.push(o[0]);
        for(var i=0;i<array.length;i++){
            for(var j=1;j< o.length;j++){
                for(var p in this.checkItemMap){
                    if(this.checkItemMap[p]==array[i].name&&p==o[j]){
                        b.push(p);

                    }
                }
            }
        }
        applyformviews.propertycheckitemalter= b;
    },
    //显示核定窗口
    showpropertycheckwin:function(btn){
        mybtn=btn;
        if(!this.propertycheckwin){
            this.propertycheckwin=Ext.widget('propertycheckwin');
        }
        this.propertycheckwin.show();
        this.propertycheckwin.dataform=btn.up('form');
        this.propertycheckwin.approvalname=btn.namevalue;
        //testobj=this.checkprocessWin;

    },
    //显示审核审批窗口
    showcheckwin:function(btn){

        if(!this.checkprocessWin)this.checkprocessWin=Ext.widget('propertyprocesscheckwin');
        this.checkprocessWin.show();
        this.checkprocessWin.dataform=btn.up('form');
        this.checkprocessWin.approvalname=btn.namevalue;
        //testobj=this.checkprocessWin;

    },
    sendPropertyCheckForm:function(btn){

        var me=this;
        var win=btn.up('window');
        var form=win.dataform;
        mydataform=form;
        ajaxform=win.down('form');
        var grid=form.objdata.grid;
        var businessid=form.objdata.businessid;

        var fm03 = {},fm04={},eventName='';
        if('propertyprocesscheckwin'==win.xtype){
            eventName='processcheck',
            fm04={
                owerid:form.objdata.owerid,
                userid:userid,
                processstatus:form.objdata.record.get('processstatus'),
                //submituid:form.objdata.record.get("approvaluserid")?form.objdata.record.get("approvaluserid"):form.objdata.record.get("userid"),
                submituid:userid,
                isapproval: ajaxform.getForm().getValues().approvalresult==approvalresult.yes,
                approvalname:win.approvalname,
                approvalresult:ajaxform.query('radiogroup')[0].getChecked()[0].boxLabel,
                approvalopinion:ajaxform.query('textarea')[0].value
            }
        }else{
            eventName='checkpropertyitem',
            fm03 = {
                owerid:form.objdata.owerid,
                userid:userid,
                roleid:roleid,
                checkitem:propertyCheckRoleBtn[0].name,
                checkresult:ajaxform.query('radiogroup')[0].getChecked()[0].boxLabel=='同意'?1:0,
                checkcomment:ajaxform.query('textarea')[0].value
            };
        }

        var params = {
            eventName:eventName,
            fm03:Ext.encode(fm03),
            fm04:Ext.encode(fm04)
        }
        var successFunc = function (myform, action) {

            btn.up('window').close();
            Ext.Msg.alert("提示信息", "操作成功");
            var hc=me.application.getController("Header");
            hc.closetab(form.id);

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", action.result.msg);

        };

        Ext.Ajax.request({
            url:'ajax/sendfamilypropertyinfo.jsp',
            params:params,
            method:'POST',
            success:successFunc,
            failure:failFunc
        })



    },
    //提交表单
    sendbusiness:function(btn){
        var me=this;
        var form=btn.up('form');
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        var callback=function fn(){
            me.closetab(form.id);
            me.closemask();
            //me.widgetdolayout("mainContent-panel");
            //console.log(grid.id);
            /*if(grid.isLocked)grid=grid.up('panel')
             me.showoldtab(grid.id);*/

        };
        this.showBusinessCheckContent(c,r,grid,callback);

    },
    //显示审核审批窗口
    showBusinessCheckContent:function(c,r,grid,callback){
        var process=r.get("process");
        //alert(r.get("process"));
        if(process==processdiction.stepone){

            this.showsendapplywin(c,r,grid,callback);
        }
        else if(process==processdiction.steptwo){
            //var businessid=r.get('businessid');
            var objdata={
                businessid:r.get('businessid'),
                record:r,
                grid:grid,
                item:c
            };
            this.showAlterContent(c,r,grid);
            //this.showtab(processdiction.steptwo,'dbglbusinessalterform','widget',objdata);
        }else if(process==processdiction.stepthree){
            //var businessid=r.get('businessid');
            var objdata={
                businessid:r.get('businessid'),
                record:r,
                grid:grid,
                item:c
            };
            this.showAlterContent(c,r,grid);
            //this.showtab(processdiction.stepthree,'dbglbusinessalterform','widget',objdata);
        }

    },
    //提交申请
    showsendapplywin:function(c,r,grid,callback){
        var me=this;
        var owerid=r.get('owerid');
        var status= r.get('process');
        Ext.Msg.show({
            title: '确定提交申请?',
            msg: '你正在试图提交申请.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    //ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    //ViewWaitMask.show();
                    me.changeapplystatus(owerid, status,grid,callback);
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    //改变业务状态
    changeapplystatus:function(owerid,status,grid,callback){
        var me=this;
        var params = {
            eventName:'changebusinessprocessstatus', //提交申请
            rc:Ext.encode({owerid:owerid,processstatus:status})
        };
        var successFunc = function (form, action) {
            var panel=grid.up('panel');
            if(panel){
                if(panel.isHidden()){
                    if(callback)callback();
                }
                else{
                    grid.getStore().load({callback:function(){
                        //me.closetab("dbglbusinessalterform");
                        if(callback)callback();

                    }});
                }
            }else{
                grid.getStore().load({callback:function(){
                    //me.closetab("dbglbusinessalterform");
                    if(callback)callback();

                }});
            }
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/sendfamilypropertyinfo.jsp', successFunc, failFunc,'POST');
    },
    //ajax统一入口
    ajaxSend:function(params,url,sucFun,failFunc,method){
        Ext.Ajax.request({
            url: url,
            timeout: 60000,
            method:method,
            params: params,
            success:sucFun,
            failure:failFunc
        });

    }


});

