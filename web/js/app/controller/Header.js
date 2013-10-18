/**
 * Created with JetBrains WebStorm.
 * User: jack
 * Date: 13-6-27
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */


/**
 * Header controller
 * Used to manage map layers and showing their related views
 * 标题栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Header', {
    extend: 'Ext.app.Controller',

    models: ['header.HeaderViewer','header.NeedToDo','header.Announce'],

    stores: ['header.HeaderViewers','header.NeedToDos','header.Announces'],


    refs: [
        {ref: 'myviewheadViewPanel', selector: 'headviewpanel'} ,
        {ref: 'myprocesspicturePanel', selector: 'processpicturepanel'} ,
        {ref: 'myprocessvector', selector: 'dbglprocessvector'} ,
        /*{ref: 'mydbglbusinesscheckform', selector: 'dbglbusinesscheckform'},*/
        {ref: 'mydbglbusinessalterform', selector: 'dbglbusinessalterform'},
        {ref: 'myheaderPanel', selector: 'myheader'}
    ],
    views: [
        'Header','header.headViewPanel','header.NeedToDoGrid','header.AnnounceGrid'
    ],

    init: function() {
        var me = this;
        this.initHeadView();


        this.control({
            /*'headviewpanel#headviewitem':{
                selectionchange: this.selectionchange
            }*/
            'myheader':{
                afterrender: this.headerRenderEvents

            },
            'mainpanel':{
                //indexmsginit:function a(panel){this.initIndexMsg();},
                afterrender:function a(){this.initIndexMsg();}
            },
            'dbglbusinessalterform,dbedgebusinessalterform,temporaryhelpbusinessalterform,medicalhelpbusinessalterform,studyhelpbusinessalterform,charitablehelpbusinessalterform,disasterhelpwarealterform,disasterhelpbusinessalterform,rangershelpbusinessalterform':{

                alterapplyaftershow:function(form){
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    var businessid=form.objdata.businessid;

                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    this.getValueBybusinessid(businessid,'ajax/getapplyformallbybid.jsp',this.setFormAllValues,form);

                    this.formpanelstoreload(businessid,form);





                }
            } ,
            'dbglbusinesschangeform,dbedgebusinesschangeform':{
                render: function(p){
                    /*p.body.on('scroll', function(e,t){
                        //console.log(e);
                        //console.log(t);
                    }, p);*/
                },
                alterapplyaftershow:function(form){
                    //this.closemask();
                    var me =this;
                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    var businessid=form.objdata.businessid;

                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    //this.initchangelogoutbtns(form);//更具是否操作来过滤按钮
                    this.getValueBybusinessid(businessid,'ajax/getapplyformallbybid.jsp',this.setFormAllValues,form);
                    this.formpanelstoreload(businessid,form);
                }
            } ,
            'dbglbusinesslogoutform,dbedgebusinesslogoutform':{
                alterapplyaftershow:function(form){
                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    var businessid=form.objdata.businessid;
                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    //this.initchangelogoutbtns(form);//更具是否操作来过滤按钮
                    this.getValueBybusinessid(businessid,'ajax/getapplyformallbybid.jsp',this.setFormAllValues,form);
                    this.formpanelstoreload(businessid,form);

                }
            } ,

            'dbglbusinessalterform button[action=sendbusiness],dbedgebusinessalterform button[action=sendbusiness],dbglbusinesschangeform button[action=sendbusiness],dbedgebusinesschangeform button[action=sendbusiness],dbglbusinesslogoutform button[action=sendbusiness],dbedgebusinesslogoutform button[action=sendbusiness]':{
                click: this.sendbusiness
            },
            'dbglbusinessalterform button[action=process],dbedgebusinessalterform button[action=process],dbglbusinesschangeform button[action=process],dbedgebusinesschangeform button[action=process],dbglbusinesslogoutform button[action=process],dbedgebusinesslogoutform button[action=process]':{
                click: this.formprocess
            },
            'dbglbusinessalterform button[action=change],dbedgebusinessalterform button[action=change],dbglbusinesschangeform button[action=change],dbedgebusinesschangeform button[action=change],dbglbusinesslogoutform button[action=change],dbedgebusinesslogoutform button[action=change]':{
                click: this.showchangeform
            },
            'dbglbusinessalterform button[action=cancel],dbedgebusinessalterform button[action=cancel],dbglbusinesschangeform button[action=cancel],dbedgebusinesschangeform button[action=cancel],dbglbusinesslogoutform button[action=cancel],dbedgebusinesslogoutform button[action=cancel]':{
                click: this.cancelcheck
            },
            'dbglbusinessalterform button[action=checkbusiness],dbedgebusinessalterform button[action=checkbusiness],dbglbusinesschangeform button[action=checkbusiness],dbedgebusinesschangeform button[action=checkbusiness],dbglbusinesslogoutform button[action=checkbusiness],dbedgebusinesslogoutform button[action=checkbusiness]':{
                click: this.showcheckwin
            },
            'dbglbusinessalterform button[action=signature],dbedgebusinessalterform button[action=signature],dbglbusinesschangeform button[action=signature],dbedgebusinesschangeform button[action=signature],dbglbusinesslogoutform button[action=signature],dbedgebusinesslogoutform button[action=signature]':{
                click: this.showsignature
            },
            'dbglbusinessalterform button[action=unsignature],dbedgebusinessalterform button[action=unsignature],dbglbusinesschangeform button[action=unsignature],dbedgebusinesschangeform button[action=unsignature],dbglbusinesslogoutform button[action=unsignature],dbedgebusinesslogoutform button[action=unsignature]':{
                click: this.delsignature
            },
            'dbglbusinessalterform button[action=print],dbedgebusinessalterform button[action=print],dbglbusinesschangeform button[action=print],dbedgebusinesschangeform button[action=print],dbglbusinesslogoutform button[action=print],dbedgebusinesslogoutform button[action=print]':{
                click: this.formprint
            },
            'dbglbusinessalterform button[action=cancelsendbusiness],dbedgebusinessalterform button[action=cancelsendbusiness],dbglbusinesschangeform button[action=cancelsendbusiness],dbedgebusinesschangeform button[action=cancelsendbusiness],dbglbusinesslogoutform button[action=cancelsendbusiness],dbedgebusinesslogoutform button[action=cancelsendbusiness]':{
                click: this.cancelsendbusiness
            },
            'dbglbusinessalterform button[action=logout],dbedgebusinessalterform button[action=logout],dbglbusinesschangeform button[action=logout],dbedgebusinesschangeform button[action=logout],dbglbusinesslogoutform button[action=logout],dbedgebusinesslogoutform button[action=logout]':{
                click: this.logoutbusiness
            },

/*
            'dbglbusinesscheckform button[action=cancel]':{
                click: this.cancelcheck

            },
            'dbglbusinesscheckform button[action=check]':{
                click: this.showcheckwin

            },

            'dbglbusinesscheckform button[action=showprocess]':{
                click: this.showcheckprocess

            },*/
            'needtodobusinesspanel button[action=outexcel]':{
                click: this.outexcel

            },
            'changedbusinesspanel button[action=outexcel]':{
                click: this.outexcel_changed

            },
            'logoutbusinesspanel button[action=outexcel]':{
                click: this.outexcel_logout

            },
            'familyquerypanel button[action=outexcel]':{
                click: this.outexcel_family

            },
            'familyquerypanel button[action=moresearch]':{
                click: this.moresearch_family

            },

            'peoplequerypanel button[action=outexcel]':{
                click: this.outexcel_person

            },
            'dbglstatisticsfullpanel button[action=outexcel]':{
                click: this.outexcel_statistics

            },
            'dbglstatisticscomplexonepanel button[action=outexcel]':{
                click: this.outexcel_complex

            },
            'dbglgrantmoneypanel button[action=newgrant]':{
                click:this.new_grant
            },
            'dbglgrantmoneypanel button[action=outexcel]':{
                click:this.grant_outexcel
            },

            'myheader component':{
                needthingsclick:function (c){
                    this.showneedthings(c);
                }
            },
            'processpicturepanel':{
                afterrender: this.processpictureRenderEvent

            },
            'dbglbusinessprintform':{

                printapplyaftershow:function(form){
                    this.afterrenderEvents();
                    this.initprintform(form);
                }
            },
            'dbglbusinessprintform button[action=print]':{
                click: function(btn){
                       var form =btn.up("form");
                       this.printformFn(form);
                }

            },
            'dbglbusinessprintform button[action=cancel]':{
                click: function(btn){
                    var form =btn.up("form");
                    this.closetab(form.id);
                }

            },

            'needtodopanel,announcegridpanel,enumerateconfigmanager,usermanagerpanel,rolemanagerpanel,funcmanagerpanel,needtodobusinesspanel,changedbusinesspanel,logoutbusinesspanel,peoplequerypanel,familyquerypanel,dbglstatisticsfullpanel,dbglgrantmoneypanel,dbglstatisticscomplexonepanel,medicalstandardgridpanel':{

                gridshowfresh:function(grid){
                  if(grid.xtype=='familyquerypanel'){
                      var result_arr=Ext.clone(familyheaders[CommonFunc.lookupitemname(businessTableType,grid.businesstype)]);
                      Ext.Array.insert(result_arr,0,[Ext.create('Ext.grid.RowNumberer')]);
                      grid.reconfigure(undefined,result_arr);
                  }

                  var store=grid.getStore();
                  if(store.proxy.extraParams){
                      store.proxy.extraParams.businesstype = grid.businesstype;
                      store.proxy.extraParams.type=grid.stype
                      store.proxy.extraParams.ispublicinfo=grid.ispublicinfo
                      store.load({callback:function(){

                          CommonFunc.widgetdolayout("mainContent-panel",100);
                      }});
                      //清空高级搜索
                      store.on('load', function (store, options) {
                          store.proxy.extraParams.name=null;
                          store.proxy.extraParams.logic=null;
                          store.proxy.extraParams.compare=null;
                          store.proxy.extraParams.value=null;
                      });
                  }

                },
                afterrender: this.afterrenderEvents,

                processclick:function (c,r,grid){//查看流程
                    this.showProcessWin(c,r,grid);
                },

                businessclick:function(c,r,grid){//业务审核处理
                   //me.widgetdolayout("mainContent-panel");
                    var me=this;
                    var callback=function fn(){
                        me.closemask();
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
            }

        }, this);

    },

    initchangelogoutbtns:function(form){
        if(this.ischangeclick){
            this.showchangebtn(form);
            var invaliditem=form.down('#businesscheckinfo');
            var formcontent=form.getDefaultContentTarget();
            var target=invaliditem.getEl();
            target.scrollIntoView(formcontent,true,true,true);
        }
        if(this.islogoutclick){
            this.showlogoutbtn(form);
            var invaliditem=form.down('#businesscheckinfo');
            var formcontent=form.getDefaultContentTarget();
            var target=invaliditem.getEl();
            target.scrollIntoView(formcontent,true,true,true);
        }
    }
    ,
    formpanelstoreload:function(businessid,form){

            var processpanel=form.down('#processhistorypanel');
            if(processpanel){
                var store=form.down('#processhistorypanel').getStore();
                store.proxy.extraParams = {
                    businessid:businessid
                };
                function fn1(){
                    store.load();
                }
                var task = new Ext.util.DelayedTask(fn1);
                task.delay(500);


            }

            var familgrid=form.down('#familymembergrid');
            if(familgrid){
                var familystore=familgrid.getStore();
                familystore.proxy.extraParams = {
                    businessid:businessid
                };

                function fn(){
                    familystore.load({callback:function(){
                        var enjoyednum=0;
                        Ext.each(familystore.data.items,function(a){
                            if(a.get("isenjoyed")==isenjoyedtype.yes){
                                enjoyednum++;
                            }
                        });

                        var countitem=form.down('#FamilyPersons');
                        var enjoyitem=form.down('#enjoyPersons');
                        if(countitem)countitem.setValue(familystore.data.items.length);
                        if(enjoyitem)enjoyitem.setValue(enjoyednum);

                    }});
                }
                var task = new Ext.util.DelayedTask(fn);
                task.delay(1000);

            }

    },
    initprintform:function(form){
        var me=this;
        var formvalues=form.objdata.getValues();
        for(var key in formvalues){
            if(form.down('#'+key)){
                form.down('#'+key).setText(formvalues[key]);
            }
        }


        Ext.each(this.signaturepicprintarr,function(a){

            Ext.Array.remove(me.signaturepicprintarr,a);
        });

        Ext.each(this.signaturepicarr,function(a){
            var target=form.down('#businesscheckinfo').getEl();
            //target.scrollIntoView(formcontent);
            var signaturepic = Ext.create('Ext.draw.Component', {
                width: 153,
                height: 153,
                //id:'signaturepic',
                viewBox:true,
                cls: 'cursor-dragme',
                draggable: {
                    constrain: true,
                    constrainTo: form.getEl()
                },
                floating: {
                    shadow: false
                },
                layout: {
                    type: 'vbox'
                },
                renderTo: target,
                items: [
                    {
                        type: "image",
                        viewBox:true,
                        src: a.items[0].src,
                        width: 153,
                        height: 153
                    }
                ]
            });

            //signaturepic.userid=item.userid;
            signaturepic.setLocalX(a.x);
            signaturepic.setLocalY(a.y);

            me.signaturepicprintarr.push(signaturepic);


        });

        var base_grid=form.objdata.down('#familymembergrid');

        var grid=form.down('#familymembergrid');
        Ext.each(base_grid.getStore().data.items,function(b){
            var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', b.data);
            grid.getStore().insert(0, r);
        });
        //me.closemask();
        /*var countitem=form.down('#FamilyPersons');
        var enjoyitem=form.down('#enjoyPersons');
        countitem.setValue(data.length);
        enjoyitem.setValue(data.length);
        */


    },
    formprocess:function(btn){
        var form=btn.up('form');
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        this.showProcessWin(c,r,grid);

    },
    cancelsendbusiness:function(btn){
        var form=btn.up('form');
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        this.cancelbusinesssubmit(c,r,grid,form);
    },
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

    cancelcheck:function(btn){
        var form=btn.up('form');
        this.closetab(form.id);
    },

    showchangeform:function(btn){
        this.ischangeclick=true;
        var form=btn.up('form');
        var widgetname="";
        var businesstype=form.objdata.record.get('businesstype');
        if(businesstype==businessTableType.dbgl){
            widgetname='dbglbusinesschangeform';
        }else if(businesstype==businessTableType.dbbyh){
            widgetname='dbedgebusinesschangeform';
        }
        this.showtab("变更操作",widgetname,'widget',form.objdata);

    },
    ischangeclick:false,
    islogoutclick:false,
    showchangebtn:function(form){

        var btns=form.getDockedItems('toolbar[dock="bottom"]')[0].items.items;
        Ext.each(btns,function(a){
            a.setVisible(a.text=="保存变更"||a.text=="返回")
        });
        this.ischangeclick=false;
    },
    showlogoutbtn:function(form){
        var btns=form.getDockedItems('toolbar[dock="bottom"]')[0].items.items;
        Ext.each(btns,function(a){
            a.setVisible(a.text=="保存注销"||a.text=="返回")
        });
        this.islogoutclick=false;
    },

    logoutbusiness:function(btn){
        this.islogoutclick=true;
        var form=btn.up('form');
        var widgetname="";
        var businesstype=form.objdata.record.get('businesstype');
        if(businesstype==businessTableType.dbgl){
            widgetname='dbglbusinesslogoutform';
        }else if(businesstype==businessTableType.dbbyh){
            widgetname='dbedgebusinesslogoutform';
        }

        this.showtab("注销操作",widgetname,'widget',form.objdata);


    },
    showcheckwin:function(btn){

        if(!this.checkprocessWin)this.checkprocessWin=Ext.widget('processcheckwin');
        this.checkprocessWin.show();
        this.checkprocessWin.dataform=btn.up('form');
        this.checkprocessWin.approvalname=btn.namevalue;
        //testobj=this.checkprocessWin;

    },
    signaturepicarr:[],
    signaturepicprintarr:[],
    issignaturedone:function(path){
      var result={isok:false};
      for(var i=0;i<this.signaturepicarr.length;i++){
         if(this.signaturepicarr[i].items[0].src==path){
             result.isok=true;
             result.item=this.signaturepicarr[i];
             break;
         }
      }
        return result;

    },
    clearsignaturepic:function(btn,res){
        var form=btn.up('form');
        var formcontent=form.getDefaultContentTarget();
        var target=form.down('#businesscheckinfo').getEl();
        target.scrollIntoView(formcontent);
        var result=this.issignaturedone(res.signaturepath)
        if(result.isok){
            result.item.destroy();
            Ext.Array.remove(this.signaturepicarr,result.item);
        }

    },
    makesignaturepic:function(btn,res){

        var form=btn.up('form');
        var formcontent=form.getDefaultContentTarget();
        var target=form.down('#businesscheckinfo').getEl();
        target.scrollIntoView(formcontent);
        if(!this.issignaturedone(res.signaturepath).isok){
            var signaturepic = Ext.create('Ext.draw.Component', {
                width: 153,
                height: 153,
                //id:'signaturepic',
                viewBox:true,
                cls: 'cursor-dragme',
                draggable: {
                    constrain: true,
                    constrainTo: form.getEl()
                },
                floating: {
                    shadow: false
                },
                layout: {
                    type: 'vbox'
                },
                renderTo: target,
                items: [
                    {
                        type: "image",
                        viewBox:true,
                        src: res.signaturepath,
                        width: 153,
                        height: 153
                    }
                ]
            });
            signaturepic.userid=userid;
            this.signaturepicarr.push(signaturepic)


        }


    },
    showsignature:function(btn){
        var me=this;
        var params = {
            userid:userid
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                me.makesignaturepic(btn,res);
            }
            else{
                Ext.Msg.alert("提示信息", "该行政区域暂无签章");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "取消提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/getsignaturebyuid.jsp', successFunc, failFunc,'POST');

    },
    treeToarr:function(node,arr){
        for(var i=0;i<node.childNodes.length;i++){
            arr.push(node.childNodes[i].raw);
            if(node.childNodes[i].hasChildNodes()){
                this.treeToarr(node.childNodes[i],arr);
            }
        }
        return arr;

    },
    new_grant:function(btn){
        var grid=btn.up('panel');
        if(!this.newGrantWin)this.newGrantWin=Ext.widget('addnewgrantwin');
        this.newGrantWin.show();
        this.newGrantWin.dataobj=grid;

    },
    grant_outexcel:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            var row=item.raw;
            var grantdate=row.grantdate;
            row.grantmonth=Ext.util.Format.date(Ext.Date.parse(grantdate, "Y-m-d"), 'Y-m');
            //row.grantdate=Ext.util.Format.date(Ext.Date.parse(grantdate, "Y-m-d"), 'Y-m');
            row.granttime=Ext.util.Format.date(Ext.Date.parse(row.granttime, "Y-m-d H:i:s"), 'Y-m-d H:i');
            rows.push(item.raw);
        });
        var sum={"monthlyincome":store.sum("monthlyincome")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            //headerheight:1,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');


    },
    outexcel_complex:function(btn){
        var grid=btn.up('panel');
        var root=grid.getRootNode();
        var rows=this.treeToarr(root,[]);

        var sum={};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;

        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:3,
            headercols:15,
            headers:Ext.JSON.encode([
                {
                    name:"序号",
                    value:"index",
                    col:[0,0],
                    row:[1,1],
                    columns:[]
                },
                {
                    name: '地区',
                    columns:[],
                    col:[1,1],
                    row:[1,3],
                    value: 'divisionname'
                },
                {
                    name     : '低保户数',
                    columns:[],
                    col:[2,2],
                    row:[1,3],
                    value: 'totalfamily'
                },
                {
                    name     : '低保人数',
                    align:   'center',
                    columns:[],
                    //flex:1,
                    col:[3,3],
                    row:[1,3],
                    width:160,
                    value: 'totalperson'
                },
                {
                    name: '低保人数(按类别分)',

                    col:[4,10],
                    row:[1,1],
                    value:'',
                    columns: [{
                        name     : '老年人',
                        col:[4,4],
                        row:[2,3],
                        columns:[],
                        width    : 75,
                        sortable : true,
                        align:   'center',
                        value: 'oldperson'
                    }, {
                        name     : '成年人',
                        col:[5,8],
                        row:[2,2],
                        value:'',
                        columns: [
                            {
                                name     : '在职职工',
                                width    : 80,
                                col:[5,5],
                                row:[3,3],
                                columns:[],
                                align:   'center',
                                value: 'jobers'
                            },
                            {
                                name     : '灵活就业人员',
                                width    : 80,
                                col:[6,6],
                                row:[3,3],
                                columns:[],
                                align:   'center',
                                value: 'freejobers'
                            } ,
                            {
                                name     : '登记失业人员',
                                width    : 80,
                                col:[7,7],
                                row:[3,3],
                                columns:[],
                                align:   'center',
                                value: 'loginnojob'
                            } ,
                            {
                                name     : '登记未失业人员',
                                width    : 80,
                                col:[8,8],
                                row:[3,3],
                                columns:[],
                                align:   'center',
                                value: 'logoutnojob'
                            }

                        ],
                        width    : 80,
                        align:   'center'
                    }, {
                        name     : '未成年人',
                        col:[9,10],
                        row:[2,2],
                        value:'',
                        columns: [
                            {
                                name     : '在校生',
                                width    : 80,
                                columns:[],
                                col:[9,9],
                                row:[3,3],
                                align:   'center',
                                value: 'student'
                            },
                            {
                                name     : '其他人员',
                                col:[10,10],
                                row:[3,3],
                                columns:[],
                                width    : 80,
                                align:   'center',
                                value: 'otherperson'
                            }
                        ],
                        width    : 50,
                        align:   'center',
                        value: 'totalmen'
                    }]
                },  {
                    name: '残疾人',
                    col:[11,12],
                    row:[1,1],
                    value:'',
                    columns: [{
                        name     : '总人数',
                        columns:[],
                        col:[11,11],
                        row:[2,3],
                        width    : 75,
                        //sortable : true,
                        align:   'center',
                        value: 'disabilitynum'
                    }, {
                        name     : '其中',
                        col:[12,12],
                        row:[2,2],
                        value:'',
                        align:   'center',
                        width    : 80,
                        columns: [{
                            name     : '重残疾人数',
                            col:[12,12],
                            row:[3,3],
                            columns:[],
                            width    : 75,
                            sortable : true,
                            value: 'harddisabilitynum'
                        }]


                    }]
                },{
                    name: '资金支出',
                    col:[13,14],
                    row:[1,1],
                    value:'',
                    columns: [{
                        name     : '当月支出',
                        col:[13,13],
                        row:[2,3],
                        columns:[],
                        width    : 75,
                        sortable : true,
                        value: 'totalmoney'
                    }, {
                        name     : '当月累计',
                        col:[14,14],
                        row:[2,3],
                        columns:[],
                        width    : 80,
                        align:   'center',
                        value: 'totalmoney'
                    }]
                }

            ])
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');




    },
    outexcel_statistics:function(btn){
        var grid=btn.up('panel');
        var root=grid.getRootNode();
        var rows=this.treeToarr(root,[]);

        var sum={};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;

        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:2,
            headercols:16,
            headers:Ext.JSON.encode([
                {
                    name:"序号",
                    value:"index",
                    col:[0,0],
                    row:[1,1],
                    columns:[]
                },
                {
                    name: '地区',
                    columns:[],
                    col:[1,1],
                    row:[1,2],
                    value: 'divisionname'
                }, {
                    name: '合计',
                    value:'',
                    col:[2,6],
                    row:[1,1],
                    columns: [{
                        name     : '总户数',
                        columns:[],
                        col:[2,2],
                        row:[2,2],
                        value: 'totalfamily'
                    }, {
                        name     : '总人数',
                        col:[3,3],
                        row:[2,2],
                        columns:[],
                        value: 'totalperson'
                    }, {
                        name     : '男',
                        col:[4,4],
                        row:[2,2],
                        columns:[],
                        value: 'totalmen'
                    }, {
                        name     : '女',
                        columns:[],
                        col:[5,5],
                        row:[2,2],
                        value: 'totalgirls'
                    }, {
                        name     : '总金额',
                        columns:[],
                        col:[6,6],
                        row:[2,2],
                        value: 'totalmoney'
                    }]
                },  {
                    name: '城镇',
                    value:'',
                    col:[7,11],
                    row:[1,1],
                    columns: [{
                        name     : '户数',
                        columns:[],
                        col:[7,7],
                        row:[2,2],
                        value: 'cityfamily'
                    }, {
                        name     : '人数',
                        columns:[],
                        col:[8,8],
                        row:[2,2],
                        value: 'cityperson'
                    }, {
                        name     : '男',
                        col:[9,9],
                        row:[2,2],
                        columns:[],
                        value: 'citymen'
                    }, {
                        name     : '女',
                        col:[10,10],
                        row:[2,2],
                        columns:[],
                        value: 'citygirls'
                    }, {
                        name     : '金额',
                        columns:[],
                        col:[11,11],
                        row:[2,2],
                        value: 'citymoney'
                    }]
                },{
                    name: '农村',
                    value:'',
                    col:[12,16],
                    row:[1,1],
                    columns: [{
                        name     : '户数',
                        col:[12,12],
                        row:[2,2],
                        columns:[],
                        value: 'villagefamily'
                    }, {
                        name     : '人数',
                        columns:[],
                        col:[13,13],
                        row:[2,2],
                        value: 'villageperson'
                    }, {
                        name     : '男',
                        columns:[],
                        col:[14,14],
                        row:[2,2],
                        value: 'villagemen'
                    }, {
                        name     : '女',
                        columns:[],
                        col:[15,15],
                        row:[2,2],
                        value: 'villagegirls'
                    }, {
                        name     : '金额',
                        columns:[],
                        col:[16,16],
                        row:[2,2],
                        value: 'villagemoney'
                    }]
                }
            ])
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');



    },
    makecommon_headers:function(grid){
        //testobj=grid;
        var columns=grid.columnManager.getColumns();
        var index=1;
        var headers=[
            {name:"序号",value:"index",columns:[],
                col:[0,0],
                row:[1,1]}];
        Ext.each(columns,function(column){
              if(!(column.xtype=='rownumberer'||column.isHidden()||column.text=='操作栏'||column.text=='业务操作')){
                  var item={name:column.text,value:column.dataIndex,columns:[],col:[index,index],row:[1,1]};
                  headers.push(item);
                  index++;
              }
        });

        return headers;
    },
    outexcel_person:function(btn){

        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            var time =Ext.Date.parse(item.raw['birthday'], "Y-m-dTH:i:s");
            var now =new Date();
            var val =now.getFullYear()-time.getFullYear();
            item.raw.age=val;
            rows.push(item.raw);
        });
        var sum={"monthlyincome":store.sum("monthlyincome")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            //headerheight:1,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');

    },


    moresearch_family:function(btn){
        var grid=btn.up('panel');
        if(!this.newMoreSearchWin)this.newMoreSearchWin=Ext.widget('moresearchfamilywin',{ // Equivalent to Ext.create('widget.panel')
            searchtype: 'moresearchfamily'
        });
        //this.newMoreSearchWin.searchtype="moresearchfamily";
        this.newMoreSearchWin.dataobj=grid;
        this.newMoreSearchWin.show();

        //console.log(11);
    },
    outexcel_family:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={"totalhelpmoney":store.sum("totalhelpmoney"),"familynum":store.sum("familynum")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');

    },
    outexcel_logout:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={"totalhelpmoney":store.sum("totalhelpmoney"),"familynum":store.sum("familynum")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }

        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
                //var win = window.open(res.path);
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');

    },
    outexcel_changed:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={"totalhelpmoney":store.sum("totalhelpmoney"),"familynum":store.sum("familynum")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }

        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');

    },
    outexcel:function(btn){
        var grid=btn.up('panel');
        var store=grid.getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={"totalhelpmoney":store.sum("totalhelpmoney"),"familynum":store.sum("familynum")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }

        var me=this;
        var headers=this.makecommon_headers(grid);
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:grid.title,
            headerheight:1,
            headercols:headers.length,
            headers:Ext.JSON.encode(headers)
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                window.location.href = res.path;
            }
            else{
                Ext.Msg.alert("提示信息", "导出excel文件失败");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "导出excel文件失败");
        };
        this.ajaxSend(params, 'ajax/makeexcel.jsp', successFunc, failFunc,'POST');
    },
    printformFn:function(form){
        var el = form;

        var win = window.open('', '', '');
        if (win==null){
            alert("Pop-up is blocked!");
            return;
        }



        win.document.write('<html><head>');
        win.document.write('<title>' + document.title + '</title>');
        win.document.write('<link rel="stylesheet" type="text/css" href="'+extLocation+
            'resources/ext-theme-neptune/ext-theme-neptune-all.css"><\/>');


        win.document.write('<link rel="stylesheet" type="text/css" href="css/main.css" />');
        win.document.write('<link rel="stylesheet" type="text/css" href="css/data-view.css" />');
        win.document.write('</head><body>');
        win.document.write(el.body.dom.innerHTML);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        win.print();
        win.close();

    },
    formprint:function(btn){
        var form=btn.up('form');
        this.showtab("打印","dbglbusinessprintform","widget",form);


    },
    delsignature:function(btn){
        var me=this;
        var params = {
            userid:userid
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.isok){
                Ext.Msg.show({
                    title: '确定要删除签章么?',
                    msg: '你正在试图删除签章.你想继续么?',
                    buttons: Ext.Msg.YESNO,
                    fn: function (confirmbtn) {
                        if(confirmbtn=='yes'){
                            me.clearsignaturepic(btn,res);
                        }
                    },
                    icon: Ext.Msg.QUESTION
                });

            }
            else{
                Ext.Msg.alert("提示信息", "该行政区域暂无签章");
            }
        };
        var failFunc = function (res, action) {
            Ext.Msg.alert("提示信息", "删除签章失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/getsignaturebyuid.jsp', successFunc, failFunc,'POST');

    },
    showcheckprocess:function(btn){
        var form=this.getMydbglbusinesscheckform();
        var c=form.objdata.item;
        var r=form.objdata.record;
        var grid=form.objdata.grid;
        this.showProcessWin(c,r,grid);

    },
    initProcessBtns:function(form){
        var btns=form.getDockedItems('toolbar[dock="bottom"]')[0].items.items;
        Ext.each(btns,function(a){
            var parent=CommonFunc.lookup(processRoleBtn,
                {name:"name",value:form.objdata.record.get("processstatus")});
            if(parent){
                var children=parent.children;
                a.setVisible(!!CommonFunc.lookup(children,
                    {name:"name",value:a.text}));
            }

        })
    },
    clearAlterContent:function(form){

        form.getForm().reset();
        //家庭成员清空
        var grid=form.down('#familymembergrid');
        if(grid){
            grid.getStore().removeAll();
        }

        //照片清空
        var img_item=form.down('#dbglaccountimg');
        if(img_item){
            img_item.getEl().dom.src="img/noperson.gif";
            img_item.value="img/noperson.gif";

        }

        //附件清空
        var affixfilespanel=form.down('#affixfilespanel');
        if(affixfilespanel){
            Ext.each(affixfilespanel.items.items,function(a){
                if(a.items){
                    CommonFunc.updateitemnum(a.items.items[0],0);
                    a.items.items[0].formdata=[];

                }
            });
        }


        //清空窗口
        var dbgl_cl=this.application.getController("Dbgl");
        dbgl_cl.cleanuploadWin();
        //清空签章
        Ext.each(this.signaturepicarr,function(item){
           item.destroy();
        });
        this.signaturepicarr=[];

    },

    showAlterContent:function(c,r,grid){
        //var businessid=r.get('businessid');
        var objdata={
            businessid:r.get('businessid'),
            record:r,
            grid:grid,
            item:c

        };
        var widgetname="";
        if(r.get('processstatustype')==processstatustype.ok){
            if(r.get('businesstype')==businessTableType.dbgl){
                widgetname='dbglbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.dbbyh){
                widgetname='dbedgebusinessalterform';
            }
            else if(r.get('businesstype')==businessTableType.temporaryhelp){
                widgetname='temporaryhelpbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.charitablehelp){
                widgetname='charitablehelpbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.medicalhelp){
                widgetname='medicalhelpbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.studyhelp){
                widgetname='studyhelpbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.disasterware){
                widgetname='disasterhelpwarealterform';
            }else if(r.get('businesstype')==businessTableType.disasterplace){
                widgetname='disasterhelpbusinessalterform';
            }else if(r.get('businesstype')==businessTableType.rangershelp){
                widgetname='rangershelpbusinessalterform';
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
        this.showtab("业务操作",widgetname,'widget',objdata);

    },
    cancelbusinesssubmit:function(c,r,grid,form){
        var businessid=r.get('businessid');
        var me=this;
        Ext.Msg.show({
            title: '确定要删除此申请?',
            msg: '你正在试图取消选中的 <a><font color="red">'+ r.get('displayname')+'</font></a> 的提交.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    me.cancelsubmitbybid(businessid,grid.getStore(),form);
                }
            },
            icon: Ext.Msg.QUESTION
        });


    },
    delbusinessapply:function(c,r,grid){
        var businessid=r.get('businessid');
        var me=this;
        Ext.Msg.show({
            title: '确定要删除此申请?',
            msg: '你正在试图删除选中的 <a><font color="red">'+ r.get('displayname')+'</font></a> 的申请.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    if(r.get('processstatustype')===processstatustype.ok){
                        me.delapplybybid(businessid,grid.getStore());
                    }else{
                        me.recoverapplybybid(businessid,grid.getStore());
                    }

                }
            },
            icon: Ext.Msg.QUESTION
        });

    },
    widgetdolayout:function(widgetid){
        function fn(){
            Ext.getCmp(widgetid).doLayout();
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(500);
    },
    cancelsubmitbybid:function(businessid,store,form){
        var me=this;
        var params = {
            businessid:businessid,
            status:processdiction.stepzero
        };
        var successFunc = function (myform, action) {
            me.closetab(form.id);
            store.load({callback:function(){
                 me.widgetdolayout("mainContent-panel");
            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "取消提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/changestatusbybid.jsp', successFunc, failFunc,'POST');

    },
    recoverapplybybid:function(businessid,store){
        var me=this;
        var params = {
            businessid:businessid,
            processstatustype:processstatustype.ok,
            processstatus:processdiction.stepthree
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                me.widgetdolayout("mainContent-panel");
            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/changeprocessstatustype.jsp', successFunc, failFunc,'POST');

    },
    delapplybybid:function(businessid,store){
        var me=this;
        var params = {
            businessid:businessid
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                me.widgetdolayout("mainContent-panel");
            }});

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "删除失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/delbusinessbybid.jsp', successFunc, failFunc,'POST');


    },
    changeapplystatus:function(businessid,status,grid,callback){
        var me=this;
        var params = {
            businessid:businessid,
            status:status
        };
        var successFunc = function (form, action) {
            var panel=grid.up('panel');
            if(panel.isHidden()){
                if(callback)callback();
            }
            else{
                grid.getStore().load({callback:function(){
                 //me.closetab("dbglbusinessalterform");
                 if(callback)callback();

                 }});
            }

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/changeapplystatus.jsp', successFunc, failFunc,'POST');


    },


    showsendapplywin:function(c,r,grid,callback){
        var me=this;
        var businessid=r.get('businessid');
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
                    me.changeapplystatus(businessid, status,grid,callback);
                }
            },
            icon: Ext.Msg.QUESTION
        });

    },

    showBusinessCheckContent:function(c,r,grid,callback){
        if(r.get("process")==processdiction.stepone){

             this.showsendapplywin(c,r,grid,callback);
        }
        else if(r.get("process")==processdiction.steptwo){
           //var businessid=r.get('businessid');
            var objdata={
                businessid:r.get('businessid'),
                record:r,
                grid:grid,
                item:c
            };
            this.showAlterContent(c,r,grid);
            //this.showtab(processdiction.steptwo,'dbglbusinessalterform','widget',objdata);
       }else if(r.get("process")==processdiction.stepthree){
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


    getValueBybusinessid:function(businessid,url,callbackfn,form){
        var me=this;
        var params = {
            businessid:businessid
        };
        var successFunc = function (response, option) {
            var res = Ext.JSON.decode(response.responseText);
            callbackfn(res,me,form)
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取业务信息失败");
        };
        this.ajaxSend(params, url, successFunc, failFunc,'POST');

    },

    addSignature:function(item,form){
        var formcontent=form.getDefaultContentTarget();
        var target=form.down('#businesscheckinfo').getEl();
        //target.scrollIntoView(formcontent);

            var signaturepic = Ext.create('Ext.draw.Component', {
                width: 153,
                height: 153,
                //id:'signaturepic',
                viewBox:true,
                cls: 'cursor-dragme',
                draggable: {
                    constrain: true,
                    constrainTo: form.getEl()
                },
                floating: {
                    shadow: false
                },
                layout: {
                    type: 'vbox'
                },
                renderTo:target,
                items: [
                    {
                        type: "image",
                        viewBox:true,
                        src: item.signaturepath,
                        width: 153,
                        height: 153
                    }
                ]
            });

            signaturepic.userid=item.userid;
            signaturepic.setLocalX(item.x);
            signaturepic.setLocalY(item.y);

            this.signaturepicarr.push(signaturepic)


    },
    setSignature:function(data,me,form){
        me.closemask();
        //alert(22);
        function fn(){
            Ext.each(data,function(item){
                me.addSignature(item,form);
            });
            me.initchangelogoutbtns(form);
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(10);


    },
    setFamilymembers:function(data,me,form){
        var businessid=form.objdata.businessid;
        var grid=form.down('#familymembergrid');
        var enjoyednum=0;
        Ext.each(data,function(a){
            var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember',a);
            if(a.isenjoyed==isenjoyedtype.yes){
                enjoyednum++;
            }
            grid.getStore().insert(0, r);
        });

        var countitem=form.down('#FamilyPersons');
        var enjoyitem=form.down('#enjoyPersons');
        countitem.setValue(data.length);
        enjoyitem.setValue(enjoyednum);

        me.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',me.setSignature,form);

    },
    closemask:function(){
        try{
            Ext.getCmp('mainContent-panel').getEl().unmask();
        }catch (e){
        }
    },
    setAffixValue:function(data,me,form){
        var businessid=form.objdata.businessid;
        var num=data.length;
        for(var i=0;i<num;i++){
            if(data[i].attachmenttype!='accountimgpath'){
                var item=form.down('#'+data[i].attachmenttype);
                var count=data[i].results.length;

                CommonFunc.updateitemnum(item,count);
                var formdata=[];
                Ext.each(data[i].results,function(a){
                    formdata.push(a);
                })
                item.formdata=formdata;
            }
            else{
                var filepath=data[i].results[0].attachmentpath;
                var img_item=form.down('#dbglaccountimg');
                if(img_item){
                    function fn(){
                        img_item.getEl().dom.src=filepath;
                        img_item.value=filepath;
                    }
                    var task = new Ext.util.DelayedTask(fn);
                    task.delay(10);

                }

            }



        }
        //me.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',me.setSignature,form);


    },
    setFormAllValues:function(data,me,form){
        var businessid=form.objdata.businessid;
        form.getForm().setValues(data.form);
        var divisiontype=form.down('#divisiontype');
        divisiontype.setValue(data.form.division);
        divisiontype.setRawValue(data.form.division);
        me.setSignature(data.signature,me,form);
        function fn(){
            me.setAffixValue(data.affixfile,me,form);
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(100);

    },
    setFormValues:function(data,me,form){
        var businessid=form.objdata.businessid;
        form.getForm().setValues(data);
        var divisiontype=form.down('#divisiontype');
        divisiontype.setValue(data.division);
        divisiontype.setRawValue(data.division);

        //me.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',me.setAffixValue,form);

    },


    showProcessWin:function(c,r,grid){//显示进程窗口
       var me=this;
       //窗口初始化显示
       if(!me.processWin){
           me.processWin=Ext.widget('processwin');
           me.processWin.show();
           me.vectornums=me.getMyprocessvector().surface.items.items.length;
       }else{
           me.processWin.show();
       }

       //清空流程图
       var mysurface=me.getMyprocessvector().surface;
       var length=mysurface.items.items.length;
       var numsize=me.vectornums;
       for(var i=length;i>numsize;i--){
           mysurface.remove(mysurface.items.items[i-1]);
       }
        //显示历史审批表
        var store=me.processWin.down('grid').getStore();
        store.proxy.extraParams = {
            businessid: r.get('businessid')
        };
        store.load();
        //绘制流程图
        if(r.get("processstatus")==processdiction.stepzero){

            mysurface.add({
                type: "path",
                text:"muhahaaaa",
                path: "M40 35  L50 45 L65 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                fill: "blue"*/
            }).show(true);
            //流程分割符号
            mysurface.add({
                type: "path",
                path: "M110 80  L110 100 L105 100 L115 110 L125 100 L120 100 L120 80 Z",    //路径      L150 50
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);
            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:20,
                y:90

            }).show(true);

            me.processWin.doLayout();

        }else if(r.get("processstatus")==processdiction.stepone){

            mysurface.add({
                type: "path",
                path: "M195 35  L205 45 L220 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                 fill: "blue"*/
            }).show(true);
            //流程分割符号
            mysurface.add({
                type: "path",
                path: "M265 80  L265 100 L260 100 L270 110 L280 100 L275 100 L275 80 Z",    //路径      L150 50
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);
            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:175,
                y:90

            }).show(true);

            me.processWin.doLayout();

        }else if(r.get("processstatus")==processdiction.steptwo){

            mysurface.add({
                type: "path",
                path: "M350 35  L360 45 L375 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                 fill: "blue"*/
            }).show(true);

            //流程分割符号
            mysurface.add({
                type: "path",
                path: "M420 80  L420 100 L415 100 L425 110 L435 100 L430 100 L430 80 Z",    //路径      L150 50
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);

            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:330,
                y:90
            }).show(true);
            me.processWin.doLayout();

        }else if(r.get("processstatus")==processdiction.stepthree){

            mysurface.add({
                type: "path",
                path: "M505 35  L515 45 L530 28",    //路径      L150 50
                "stroke-width": "4",
                opacity :0.6,
                stroke: "red"/*,
                 fill: "blue"*/
            }).show(true);

            //流程分割符号
            /*mysurface.add({
                type: "path",
                path: "M575 80  L575 100 L570 100 L580 110 L590 100 L585 100 L585 80 Z",    //路径      L150 50
                //M420 80  L420 100 L415 100 L425 110 L435 100 L430 100 L430 80 Z
                "stroke-width": "2",
                //opacity :0.6,
                stroke: "red",
                fill: "red"
            }).show(true);

            //提交申请人名单
            mysurface.add({
                type: "text",
                text:r.get("displayname"),
                x:485,
                y:90
            }).show(true);*/
            me.processWin.doLayout();
        }

    },
    afterrenderEvents:function(){
        CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
        this.widgetdolayout('mainContent-panel');
    },
    processpictureRenderEvent:function(){

    },
    headerRenderEvents:function(){
        var params = {
            roleid:roleid,
            userid:userid,
            divisionpath:divisionpath,
            type:'count'
        };
        var changeItem=this.getMyheaderPanel().down('#needtodopanel');
        var successFunc = function (response, option) {
            var res = Ext.JSON.decode(response.responseText);
            var count=res.count;
            CommonFunc.updateitemnum(changeItem,count)


        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取待办信息失败");

        };
        this.ajaxSend(params, 'ajax/getneedtodos.jsp', successFunc, failFunc,'POST');

    },
    ajaxSend:function(params,url,sucFun,failFunc,method){
        Ext.Ajax.request({
            url: url,
            method:method,
            params: params,
            success:sucFun,
            failure:failFunc
        });

    },
    showneedthings:function(c){

        this.showtab('待办业务','needtodopanel','widget');

    },
    closetab:function(value){
        var tabs = Ext.getCmp('mainContent-panel');
        var tab=tabs.getComponent(value);
        if (tab) {

            tab.close();
        }

    },
    showoldtab:function(id){
        var tabs = Ext.getCmp('mainContent-panel');
        tabs.getComponent(id).show();
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
        if (tabs.getComponent('tab' + value)) {
            var tab=tabs.getComponent('tab' + value);
            if(objdata)tab.objdata=objdata;

            if(tab.isHidden()){

                //function fn(){
                    tab.tab.show();
                    tabs.setActiveTab(tab);
                //}

                //var task = new Ext.util.DelayedTask(fn);
                //task.delay(10);
            }
            else{
                this.initchangelogoutbtns(tabs.getComponent('tab' + value));
                CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
            }



        } else {
            //alert(1);
            if (type == 'widget') {
                function fn(){
                    tabs.add({
                        closable: true,
                        id: 'tab' + value,
                        xtype: value,
                        objdata:objdata,
                        autoScroll: true,
                        iconCls: 'tabs',
                        title: label
                    }).show();
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
    initProcessFromRole:function(){
        var me=this;
        var params = {
            roleid:roleid,
            type:"流程操作"
        };
        var successFunc = function (response, action) {
            processRoleBtn=Ext.JSON.decode(response.responseText);
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "取消提交失败，检查web服务或数据库服务");

        };
        this.ajaxSend(params, 'ajax/getallfuncsbyrule.jsp', successFunc, failFunc,'POST');

    },
    initIndexMsg:function(){
        var me=this;
        function fn(){
            Ext.create('widget.uxNotification', {
                title: '公示公告',
                position: 'tr',
                closeAction: 'hide',
                width:200,
                height:200,
                draggable:true,
                shadow:true,
                manager: 'tabindex',
                renderTo :'tabindex',
                autoClose:false,
                //useXAxis: true,
                iconCls: 'ux-notification-icon-information',
                items:[
                    {xtype:'indexmsggrid'}

                ]
            }).show();
        }
        var task = new Ext.util.DelayedTask(fn);
        task.delay(100);

    },
    initHeadView:function(){
        this.initProcessFromRole();
        var me=this;
        var store=this.getHeaderHeaderViewersStore();

        store.on('load', function (store, options) {
            var viewpanel=me.getMyviewheadViewPanel().items.items[0];
            viewpanel.select(0);
        });

    },
    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

