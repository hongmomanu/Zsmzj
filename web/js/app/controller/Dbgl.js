/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */


/**
 * Map controller
 * Used to manage map layers and showing their related views
 * 导航栏，显示各种信息
 */
Ext.define('ZSMZJ.controller.Dbgl', {
    extend: 'Ext.app.Controller',

    models: ['dbgl.FamilyMember'],

    stores: ['dbgl.FamilyMembers'],

    refs: [
        {ref: 'myviewbusinessapplyform', selector: 'dbglbusinessapplyform'},
        {ref: 'familymemberage', selector: '#personage'},
        {ref: 'myviewfamilymembergrid', selector: 'familymembergrid'},
        {ref: 'myviewuploadimgfilewin', selector: 'uploadimgfilewin'}
    ],
    views: [
        'dbgl.businessApply',
        'dbgl.FamilyMemberGrid',
        'dbgl.uploadImgFileWin'
    ],

    init: function() {
        var me = this;

         this.control({
         'dbglbusinessapplyform component':{
           imgclick:function (c){
               this.showUploadImgWin();
           }
         },
         'uploadimgfilewin button[action=upload]':{
             click: this.uploadImgFile
         },
          'familymembergrid button[action=addnewperson]':{

              click:this.addnewperson
          },
         'familymembergrid button[action=delperson]':{

             click:this.delperson
         },
         'familymembergrid':{

             selectionchange:this.personselected
         },
         '#personbirthday':{ //更新生日，触发年龄信息

             change:this.birthdaychange
         }
         }, this);


    },
    birthdaychange:function(newValue, oldValue, eOpts ){
        testobj=newValue;
        testobjs=oldValue;
        this.getFamilymemberage().setValue(12);
    },
    personselected:function(view, records){
        var grid=this.getMyviewfamilymembergrid();
        grid.down('#removePerson').setDisabled(!records.length);
    },
    delperson:function(btn){

        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        var sm = gridpanel.getSelectionModel();
        rowEditing.cancelEdit();
        gridpanel.getStore().remove(sm.getSelection());
        if (gridpanel.getStore().getCount() > 0) {
            sm.select(0);
        }
       var applyform=this.getMyviewbusinessapplyform();
       var countitem=applyform.down('#FamilyPersons');
       countitem.setValue(parseInt(countitem.getValue())-1);
    },
    addnewperson:function(btn){
        var  gridpanel=btn.up('panel');
        var rowEditing=gridpanel.editingPlugin;
        rowEditing.cancelEdit();
        // Create a model instance
        var r = Ext.create('ZSMZJ.model.dbgl.FamilyMember', {
            name: '赵某',
            relationship:'户主',
            personid:'xxxxxxxxxxxxxxxxxx',
            isenjoyed:'不享受',
            persontype:'低保户',
            jobstatus:'无',
            bodystatus:'差',
            sex: '男',
            birthday: Ext.Date.clearTime(new Date()),
            age:0,
            monthlyincome: 0

        });

        gridpanel.getStore().insert(0, r);
        rowEditing.startEdit(0, 0);

        var applyform=this.getMyviewbusinessapplyform();
        var countitem=applyform.down('#FamilyPersons');
        countitem.setValue(parseInt(countitem.getValue())+1);
    },

    uploadImgFile:function(btn){
        var me=this;
        var params = {

        };
        var successFunc = function (form, action) {
            var filepath=action.result.filepath;
            Ext.getCmp('dbglaccountimg').getEl().dom.src=filepath;
            me.uploadimgWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "上传文件失败，检查web服务");

        };

        this.formSubmit(btn, params, 'ajax/uploadfile.jsp', successFunc, failFunc,"正在提交数据");



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

    showUploadImgWin:function(){
        if(!this.uploadimgWin)this.uploadimgWin=Ext.widget('uploadimgfilewin');
        this.uploadimgWin.show();

    },
    onLaunch: function() {
        var me = this;

        // for dev purpose
        //ctrl = this;
    }


});

