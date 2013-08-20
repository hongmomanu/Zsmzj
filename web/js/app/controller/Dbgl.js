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
        {ref: 'myviewuploadimgfilewin', selector: 'uploadimgfilewin'}
    ],
    views: [
        'dbgl.businessApply',
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
         }
         }, this);


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

