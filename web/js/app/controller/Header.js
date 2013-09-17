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

    models: ['header.HeaderViewer','header.NeedToDo'],

    stores: ['header.HeaderViewers','header.NeedToDos'],


    refs: [
        {ref: 'myviewheadViewPanel', selector: 'headviewpanel'} ,
        {ref: 'myprocesspicturePanel', selector: 'processpicturepanel'} ,
        {ref: 'myprocessvector', selector: 'dbglprocessvector'} ,
        /*{ref: 'mydbglbusinesscheckform', selector: 'dbglbusinesscheckform'},*/
        {ref: 'mydbglbusinessalterform', selector: 'dbglbusinessalterform'},
        {ref: 'myheaderPanel', selector: 'myheader'}
    ],
    views: [
        'Header','header.headViewPanel','header.NeedToDoGrid'
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
            'dbglbusinessalterform':{
                alterapplyaftershow:function(form){
                    this.closemask();
                    //this.initchangelogoutbtns(form);
                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    //var form=this.getMydbglbusinessalterform();
                    var businessid=form.objdata.businessid;
                    var store=form.down('#processhistorypanel').getStore();
                    store.proxy.extraParams = {
                        businessid:businessid
                    };
                    store.load();

                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);
                    /*this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                    this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                    this.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',this.setSignature,form);*/

                }
            } ,
            'dbglbusinesschangeform':{
                alterapplyaftershow:function(form){
                    this.closemask();

                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    var businessid=form.objdata.businessid;
                    var store=form.down('#processhistorypanel').getStore();
                    store.proxy.extraParams = {
                        businessid:businessid
                    };
                    store.load();
                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    //this.initchangelogoutbtns(form);//更具是否操作来过滤按钮
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);


                   /* this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                    this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                    this.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',this.setSignature,form);*/

                }
            } ,
            'dbglbusinesslogoutform':{
                alterapplyaftershow:function(form){
                    this.closemask();
                    //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();


                    var businessid=form.objdata.businessid;
                    var store=form.down('#processhistorypanel').getStore();
                    store.proxy.extraParams = {
                        businessid:businessid
                    };
                    store.load();
                    this.clearAlterContent(form);//清空修改内容
                    this.initProcessBtns(form); //初始化操作功能键
                    //this.initchangelogoutbtns(form);//更具是否操作来过滤按钮
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);


                    /* this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                     this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                     this.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',this.setSignature,form);*/

                }
            } ,
            /*'dbglbusinesscheckform':{
                alterapplyaftershow:function(){
                    var form=this.getMydbglbusinesscheckform();
                    //this.widgetdolayout("mainContent-panel");
                    var businessid=form.objdata.businessid;
                    this.clearAlterContent(form);
                    this.getValueBybusinessid(businessid,'ajax/getapplyformbybid.jsp',this.setFormValues,form);
                    this.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',this.setAffixValue,form);
                    this.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',this.setFamilymembers,form);
                }

            },*/
            'dbglbusinessalterform button[action=sendbusiness],dbglbusinesschangeform button[action=sendbusiness],dbglbusinesslogoutform button[action=sendbusiness]':{
                click: this.sendbusiness
            },
            'dbglbusinessalterform button[action=process],dbglbusinesschangeform button[action=process],dbglbusinesslogoutform button[action=process]':{
                click: this.formprocess
            },
            'dbglbusinessalterform button[action=change],dbglbusinesschangeform button[action=change],dbglbusinesslogoutform button[action=change]':{
                click: this.showchangeform
            },
            'dbglbusinessalterform button[action=cancel],dbglbusinesschangeform button[action=cancel],dbglbusinesslogoutform button[action=cancel]':{
                click: this.cancelcheck
            },
            'dbglbusinessalterform button[action=checkbusiness],dbglbusinesschangeform button[action=checkbusiness],dbglbusinesslogoutform button[action=checkbusiness]':{
                click: this.showcheckwin
            },
            'dbglbusinessalterform button[action=signature],dbglbusinesschangeform button[action=signature],dbglbusinesslogoutform button[action=signature]':{
                click: this.showsignature
            },
            'dbglbusinessalterform button[action=unsignature],dbglbusinesschangeform button[action=unsignature],dbglbusinesslogoutform button[action=unsignature]':{
                click: this.delsignature
            },
            'dbglbusinessalterform button[action=print],dbglbusinesschangeform button[action=print],dbglbusinesslogoutform button[action=print]':{
                click: this.formprint
            },
            'dbglbusinessalterform button[action=cancelsendbusiness],dbglbusinesschangeform button[action=cancelsendbusiness],dbglbusinesslogoutform button[action=cancelsendbusiness]':{
                click: this.cancelsendbusiness
            },
            'dbglbusinessalterform button[action=logout],dbglbusinesschangeform button[action=logout],dbglbusinesslogoutform button[action=logout]':{
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
            'peoplequerypanel button[action=outexcel]':{
                click: this.outexcel_person

            },
            'dbglstatisticsfullpanel button[action=outexcel]':{
                click: this.outexcel_statistics

            },
            'dbglstatisticscomplexonepanel button[action=outexcel]':{
                click: this.outexcel_complex

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

            'needtodopanel,needtodobusinesspanel,changedbusinesspanel,logoutbusinesspanel,peoplequerypanel,familyquerypanel,dbglstatisticsfullpanel,grantmoneypanel,dbglstatisticscomplexonepanel':{

                afterrender: this.afterrenderEvents,
                alterapplyaftershow:function(grid){
                    //grid.getStore().load();
                    this.afterrenderEvents();
                },
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

            if(grid.isLocked)grid=grid.up('panel')
            me.showoldtab(grid.id);
            me.closetab(form.id);
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
        this.showtab("变更操作",'dbglbusinesschangeform','widget',form.objdata);


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
        this.showtab("注销操作",'dbglbusinesslogoutform','widget',form.objdata);


    },
    showcheckwin:function(btn){

        if(!this.checkprocessWin)this.checkprocessWin=Ext.widget('processcheckwin');
        this.checkprocessWin.show();
        this.checkprocessWin.dataform=btn.up('form');

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
        //testobj=form.down('#businesscheckinfo');
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
            testobj=signaturepic;
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
    outexcel_complex:function(btn){
        var root=btn.up('panel').getRootNode();
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
            title:'低保综合表',
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

        var root=btn.up('panel').getRootNode();
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
            title:'低保汇总表',
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
    outexcel_person:function(btn){

        var store=btn.up('panel').getStore();
        var rows=[];
        Ext.each(store.data.items,function(item){
            rows.push(item.raw);
        });
        var sum={"monthlyincome":store.sum("monthlyincome")};
        if(rows.length==0){
            Ext.Msg.alert("提示信息", "无相关数据可导出");
            return ;
        }
        var me=this;
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:'低保人员列表',
            //headerheight:1,
            headerheight:1,
            headercols:17,
            headers:Ext.JSON.encode([
                {name:"序号",value:"index",columns:[],
                    col:[0,0],
                    row:[1,1]},
                {name:"户主姓名",value:"owername",columns:[],
                    col:[1,1],
                    row:[1,1]},
                {name: '行政区划', value: 'division',columns:[],
                    col:[2,2],
                    row:[1,1]},
                {name: '户主身份证',value:'owerid',columns:[],
                    col:[3,3],
                    row:[1,1]},
                {name: '与户主关系',value:'relationship',columns:[],
                    col:[4,4],
                    row:[1,1]},
                {name: '姓名',value:'name',columns:[],
                    col:[5,5],
                    row:[1,1]},
                {name: '身份证',value:'personid',columns:[],
                    col:[6,6],
                    row:[1,1]},
                {name: '性别',value:'sex',columns:[],
                    col:[7,7],
                    row:[1,1]},
                {name: '年龄',value:'age',columns:[],
                    col:[8,8],
                    row:[1,1]},
                {name: '户口性质',value:'accounttype',columns:[],
                    col:[9,9],
                    row:[1,1]},
                {name: '文化程度',value:'education',columns:[],
                    col:[10,10],
                    row:[1,1]},
                {name: '政治面貌',value:'political',columns:[],
                    col:[11,11],
                    row:[1,1]},
                {name: '健康状况',value:'bodystatus',columns:[],
                    col:[12,12],
                    row:[1,1]},
                {name: '婚姻状况',value:'maritalstatus',columns:[],
                    col:[13,13],
                    row:[1,1]},
                {name: '月人均收入',value:'monthlyincome',columns:[],
                    col:[14,14],
                    row:[1,1]},
                {name: '人员类别',value:'persontype',columns:[],
                    col:[15,15],
                    row:[1,1]},
                {name: '是否享受',value:'isenjoyed',columns:[],
                    col:[16,16],
                    row:[1,1]}

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
    outexcel_family:function(btn){
        var store=btn.up('panel').getStore();
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
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:'低保家庭列表',
            headerheight:1,
            headercols:16,
            headers:Ext.JSON.encode([{name:"序号",value:"index",columns:[],
                col:[0,0],
                row:[1,1]},
                {name:"户主姓名",value:"owername",columns:[],
                    col:[1,1],
                    row:[1,1]},
                {name: '行政区划', value: 'division',columns:[],
                    col:[2,2],
                    row:[1,1]},
                {name: '户主身份证',value:'owerid',columns:[],
                    col:[3,3],
                    row:[1,1]},
                {name: '申请类别',value:'applytype',columns:[],
                    col:[4,4],
                    row:[1,1]},
                {name: '家庭类别',value:'familytype',columns:[],
                    col:[5,5],
                    row:[1,1]},
                {name: '救助金额',value:'totalhelpmoney',columns:[],
                    col:[6,6],
                    row:[1,1]},
                {name: '救助开始日期',value:'helpbgtime',columns:[],
                    col:[7,7],
                    row:[1,1]},
                {name: '救助结束日期',value:'helpedtime',columns:[],
                    col:[8,8],
                    row:[1,1]},
                {name: '家庭人数',value:'familynum',columns:[],
                    col:[9,9],
                    row:[1,1]},
                {name: '家庭户口性质',value:'familyaccount',columns:[],
                    col:[10,10],
                    row:[1,1]},
                {name: '低保户类型',value:'poorfamilytype',columns:[],
                    col:[11,11],
                    row:[1,1]},
                {name: '享受人数',value:'enjoynum',columns:[],
                    col:[12,12],
                    row:[1,1]},
                {name: '开户人',value:'bankower',columns:[],
                    col:[13,13],
                    row:[1,1]},
                {name: '银行帐号',value:'bankid',columns:[],
                    col:[14,14],
                    row:[1,1]},
                {name: '救助证编号',value:'aidnum',columns:[],
                    col:[15,15],
                    row:[1,1]}


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
    outexcel_logout:function(btn){
        var store=btn.up('panel').getStore();
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

        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:'低保业务注销列表',
            headerheight:1,
            headercols:15,
            headers:Ext.JSON.encode([{name:"序号",value:"index",columns:[],
                col:[0,0],
                row:[1,1]},{name:"行政区划名称",value:"division",columns:[],
                col:[1,1],
                row:[1,1]},
                {name:"户主姓名",value:"owername",columns:[],
                    col:[2,2],
                    row:[1,1]},{name:"户主身份证",value:"owerid",columns:[],
                    col:[3,3],
                    row:[1,1]},{name:"申请类别",value:"applytype",columns:[],
                    col:[4,4],
                    row:[1,1]},
                {name:"家庭类别",value:"familytype",columns:[],
                    col:[5,5],
                    row:[1,1]},
                {name:"注销原因",value:"logoutreason",columns:[],
                    col:[6,6],
                    row:[1,1]},
                {name:"注销日期",value:"changedate",columns:[],
                    col:[7,7],
                    row:[1,1]},
                {name:"救助金额",value:"totalhelpmoney",columns:[],
                    col:[8,8],
                    row:[1,1]},
                {name:"家庭人口",value:"familynum",columns:[],
                    col:[9,9],
                    row:[1,1]},
                /*{name:"救助开始日期",value:"helpbgtime"},{name:"救助结束日期",value:"helpedtime"},*/
                /* {name:"低保户类型",value:"poorfamilytype"},*/{name:"状态描述",value:"processstatus",columns:[],
                    col:[10,10],
                    row:[1,1]},
                {name:"审核人",value:"approvaluser",columns:[],
                    col:[11,11],
                    row:[1,1]},{name:"审核日期",value:"approvaltime",columns:[],
                    col:[12,12],
                    row:[1,1]},
                {name:"制单人",value:"displayname",columns:[],
                    col:[13,13],
                    row:[1,1]},{name:"制单日期",value:"time",columns:[],
                    col:[14,14],
                    row:[1,1]}
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
    outexcel_changed:function(btn){
        var store=btn.up('panel').getStore();
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
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:'低保业务变更列表',
            headerheight:1,
            headercols:17,
            headers:Ext.JSON.encode([{name:"序号",value:"index",columns:[],
                col:[0,0],
                row:[1,1]},{name:"行政区划名称",value:"division",columns:[],
                col:[1,1],
                row:[1,1]},
                {name:"户主姓名",value:"owername",columns:[],
                    col:[2,2],
                    row:[1,1]},{name:"户主身份证",value:"owerid",columns:[],
                    col:[3,3],
                    row:[1,1]},{name:"申请类别",value:"applytype",columns:[],
                    col:[4,4],
                    row:[1,1]},
                {name:"家庭类别",value:"familytype",columns:[],
                    col:[5,5],
                    row:[1,1]},
                {name:"变更原因",value:"changereason",columns:[],
                    col:[6,6],
                    row:[1,1]},
                {name:"变更日期",value:"changedate",columns:[],
                    col:[7,7],
                    row:[1,1]},
                {name:"变更前金额",value:"beforetotalhelpmoney",columns:[],
                    col:[8,8],
                    row:[1,1]},
                {name:"变更后金额",value:"totalhelpmoney",columns:[],
                    col:[9,9],
                    row:[1,1]},
                /*{name:"救助开始日期",value:"helpbgtime"},{name:"救助结束日期",value:"helpedtime"},*/
                {name:"变更前人数",value:"beforepeople",columns:[],
                    col:[10,10],
                    row:[1,1]},{name:"变更后人数",value:"familynum",columns:[],
                    col:[11,11],
                    row:[1,1]},
               /* {name:"低保户类型",value:"poorfamilytype"},*/{name:"状态描述",value:"processstatus",columns:[],
                    col:[12,12],
                    row:[1,1]},
                {name:"审核人",value:"approvaluser",columns:[],
                    col:[13,13],
                    row:[1,1]},{name:"审核日期",value:"approvaltime",columns:[],
                    col:[14,14],
                    row:[1,1]},
                {name:"制单人",value:"displayname",columns:[],
                    col:[15,15],
                    row:[1,1]},{name:"制单日期",value:"time",columns:[],
                    col:[16,16],
                    row:[1,1]}
            ])
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
        var store=btn.up('panel').getStore();
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
        var params = {
            rows:Ext.JSON.encode(rows),
            sum:Ext.JSON.encode(sum),
            title:'低保业务办理列表',
            headerheight:1,
            headercols:17,
            headers:Ext.JSON.encode([{name:"序号",value:"index",columns:[],
                col:[0,0],
                row:[1,1]},{name:"行政区划名称",value:"division",columns:[],
                col:[1,1],
                row:[1,1]},
                {name:"户主姓名",value:"owername",columns:[],
                    col:[2,2],
                    row:[1,1]},{name:"户主身份证",value:"owerid",columns:[],
                    col:[3,3],
                    row:[1,1]},{name:"申请类别",value:"applytype",columns:[],
                    col:[4,4],
                    row:[1,1]},
                {name:"家庭类别",value:"familytype",columns:[],
                    col:[5,5],
                    row:[1,1]},{name:"救助金额",value:"totalhelpmoney",columns:[],
                    col:[6,6],
                    row:[1,1]},
                {name:"救助开始日期",value:"helpbgtime",columns:[],
                    col:[7,7],
                    row:[1,1]},{name:"救助结束日期",value:"helpedtime",columns:[],
                    col:[8,8],
                    row:[1,1]},
                {name:"家庭人数",value:"familynum",columns:[],
                    col:[9,9],
                    row:[1,1]},{name:"享受人数",value:"familynum",columns:[],
                    col:[10,10],
                    row:[1,1]},
                {name:"低保户类型",value:"poorfamilytype",columns:[],
                    col:[11,11],
                    row:[1,1]},{name:"状态描述",value:"processstatus",columns:[],
                    col:[12,12],
                    row:[1,1]},
                {name:"审核人",value:"approvaluser",columns:[],
                    col:[13,13],
                    row:[1,1]},{name:"审核日期",value:"approvaltime",columns:[],
                    col:[14,14],
                    row:[1,1]},
                {name:"制单人",value:"displayname",columns:[],
                    col:[15,15],
                    row:[1,1]},{name:"制单日期",value:"time",columns:[],
                    col:[16,16],
                    row:[1,1]}
            ])
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
        /*var targetElement = form;
        testobj=targetElement;
        var myWindow = window.open('', '', '');
        myWindow.document.write('<html><head>');
        myWindow.document.write('<title>' + 'Title' + '</title>');
       // myWindow.document.write('<link rel="Stylesheet" type="text/css" href="http://dev.sencha.com/deploy/ext-4.0.1/resources/css/ext-all.css" />');
        //myWindow.document.write('<script type="text/javascript" src="http://dev.sencha.com/deploy/ext-4.0.1/bootstrap.js"></script>');
        myWindow.document.write('</head><body>');
        //myWindow.document.write(targetElement.body.dom.innerHTML);
        myWindow.document.write("hello world!");
        myWindow.document.write('</body></html>');
        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();*/

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
            a.setVisible(!!CommonFunc.lookup(CommonFunc.lookup(processRoleBtn,
                {name:"name",value:form.objdata.record.get("processstatus")}).children,
                {name:"name",value:a.text}))
        })
    },
    clearAlterContent:function(form){

        form.getForm().reset();
        //家庭成员清空
        var grid=form.down('#familymembergrid');
        grid.getStore().removeAll();
        //照片清空
        var img_item=form.down('#dbglaccountimg');
        img_item.getEl().dom.src="img/noperson.gif";
        img_item.value="img/noperson.gif";

        //附件清空
        var affixfilespanel=form.down('#affixfilespanel');
        Ext.each(affixfilespanel.items.items,function(a){
            if(a.items){
                CommonFunc.updateitemnum(a.items.items[0],0);
                a.items.items[0].formdata=[];

            }
        });

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
        if(r.get('processstatustype')==processstatustype.ok){
            this.showtab("业务操作",'dbglbusinessalterform','widget',objdata);
        }else if(r.get('processstatustype')==processstatustype.change){
            this.showtab("业务操作",'dbglbusinesschangeform','widget',objdata);
        }else if(r.get('processstatustype')==processstatustype.logout){
            this.showtab("业务操作",'dbglbusinesslogoutform','widget',objdata);
        }

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
        //console.log(r.get('processstatustype'));
        var me=this;
        Ext.Msg.show({
            title: '确定要删除此申请?',
            msg: '你正在试图删除选中的 <a><font color="red">'+ r.get('displayname')+'</font></a> 的申请.你想继续么?',
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if(btn=='yes'){
                    testobj=r.get('processstatustype');
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
    changeapplystatus:function(businessid,status,store,callback){
        var me=this;
        var params = {
            businessid:businessid,
            status:status
        };
        var successFunc = function (form, action) {
            store.load({callback:function(){
                //me.closetab("dbglbusinessalterform");
                if(callback)callback();

            }});

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
                    ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
                    ViewWaitMask.show();
                    me.changeapplystatus(businessid, status,grid.getStore(),callback);
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

           //this.showtab(processdiction.steptwo,'dbglbusinesscheckform','widget',objdata);
            this.showtab(processdiction.steptwo,'dbglbusinessalterform','widget',objdata);
       }else if(r.get("process")==processdiction.stepthree){
            //var businessid=r.get('businessid');
            var objdata={
                businessid:r.get('businessid'),
                record:r,
                grid:grid,
                item:c
            };

            //this.showtab(processdiction.steptwo,'dbglbusinesscheckform','widget',objdata);
            this.showtab(processdiction.stepthree,'dbglbusinessalterform','widget',objdata);
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
                renderTo: target,
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
          Ext.each(data,function(item){
              me.addSignature(item,form);
          });
        //初始化位置
        me.initchangelogoutbtns(form);
        me.closemask();

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
                img_item.getEl().dom.src=filepath;
                img_item.value=filepath;
            }



        }

        me.getValueBybusinessid(businessid,'ajax/getfamilymembersbybid.jsp',me.setFamilymembers,form);
        //this.getValueBybusinessid(businessid,'ajax/getsignaturebybid.jsp',this.setSignature,form);

    },
    setFormValues:function(data,me,form){
        var businessid=form.objdata.businessid;
        form.getForm().setValues(data);
        var divisiontype=form.down('#divisiontype');
        divisiontype.setValue(data.division);
        divisiontype.setRawValue(data.division);

        me.getValueBybusinessid(businessid,'ajax/getaffixfilebybid.jsp',me.setAffixValue,form);

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
       for(var i=me.vectornums;i<mysurface.items.items.length;i++){
           mysurface.remove(mysurface.items.items[i]);
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
        this.closemask();
        //ViewWaitMask = Ext.getCmp('mainContent-panel').getEl().mask('页面加载中', '');
        ViewWaitMask=new Ext.LoadMask(Ext.getCmp('mainContent-panel').getEl(), {msg:"页面加载中..."});
        ViewWaitMask.show();
        var tabs = Ext.getCmp('mainContent-panel');
        if (tabs.getComponent('tab' + value)) {
            if(objdata)tabs.getComponent('tab' + value).objdata=objdata;
            if(tabs.getComponent('tab' + value).isHidden()){
                tabs.getComponent('tab' + value).show();
            }
            else{
                this.initchangelogoutbtns(tabs.getComponent('tab' + value));

                CommonFunc.removeTask(ViewWaitMask,Ext.getCmp('mainContent-panel').getEl());
            }



        } else {
            if (type == 'widget') {

                tabs.add({
                    closable: true,
                    id: 'tab' + value,
                    xtype: value,
                    objdata:objdata,
                    autoScroll: true,
                    iconCls: 'tabs',
                    title: label
                }).show();
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

