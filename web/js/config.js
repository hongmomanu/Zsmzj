/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-7
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
var extLocation="http://192.168.2.112/extjs4.2/";

var businessTableType=
        {   'dbgl':"低保",
            'dbbyh':"边缘户",
            'temporaryhelp':'临时救助',
            'studyhelp':'助学救助',
            'charitablehelp':'慈善救助',
            'medicalhelp':'医疗救助',
            'disasterhelp':'灾害救助',
            'disasterware':'避灾仓库',
            'disasterplace':'避灾场所',
            'rangershelp':'流浪救助',
            'allquery':'all'
        };

var familyheaders={
    'dbgl':[

        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true, name:'tests',
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();
            Ext.defer(function () {
                //console.log(document.getElementById(id0));
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);



            return Ext.String.format('<span id="{0}"></span>',id0);
        }},


        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '申请类别',align:'center',dataIndex:'applytype',itemId:'applytype'},
        {header: '业务类型',align:'center',dataIndex:'businesstype',itemId:'businesstype'},

        {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},
        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},


        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'dbbyh':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true, name:'tests',
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

                }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},


        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '申请类别',align:'center',dataIndex:'applytype',itemId:'applytype'},
        {header: '业务类型',align:'center',dataIndex:'businesstype',itemId:'businesstype'},

        {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},
        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},


        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'temporaryhelp':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},
        {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},
        {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

        {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},
        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'studyhelp':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},


        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

        {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},


        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}


    ],
    'charitablehelp':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},

        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

        {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},


        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'medicalhelp':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},
        {header: '救助性质',align:'center',dataIndex:'helpnature',itemId:'helpnature'},
        {header: '医保性质',align:'center',dataIndex:'medicarenature',itemId:'medicarenature'},

        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

        {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},

        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'disasterhelp':[],
    'disasterware':[
        {header: '仓库名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '仓库对象数',align:'center',dataIndex:'familynum',width: 250},
        {header: '联系人1',dataIndex: 'conectperson',align:'center'},
        {dataIndex: 'telnum',align:'center',header:'联系人1电话'},
        {dataIndex: 'conectperson2',align:'center',header:'联系人2'},
        {dataIndex: 'telnum2',align:'center',header:'联系人2电话'},
        {dataIndex: 'housestructure',align:'center',header:'结构'},
        {dataIndex: 'houseusearea',align:'center',header:'使用面积'},
        {dataIndex: 'housearea',align:'center',header:'建筑面积'},
        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ],
    'disasterplace':[
        {header: '避灾场所',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '避灾对象数',align:'center',dataIndex:'familynum',width: 250},
        {header: '联系人1',dataIndex: 'conectperson',align:'center'},
        {dataIndex: 'telnum',align:'center',header:'联系人1电话'},
        {dataIndex: 'conectperson2',align:'center',header:'联系人2'},
        {dataIndex: 'telnum2',align:'center',header:'联系人2电话'},
        {dataIndex: 'windresistance',align:'center',header:'抗风能力'},
        {dataIndex: 'earthquakeresistance',align:'center',header:'抗震能力'},
        {dataIndex: 'housestructure',align:'center',header:'结构'},
        {dataIndex: 'escapingnum',align:'center',header:'避灾人数'},
        {dataIndex: 'houseusearea',align:'center',header:'使用面积'},
        {dataIndex: 'housearea',align:'center',header:'建筑面积'},
        {dataIndex: 'coverage',align:'center',header:'覆盖范围'},
        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}
    ],
    'rangershelp':[
        {header: '流浪人姓名',align:'center',dataIndex:'owername',locked : true,
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},
        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户籍地',align:'center',dataIndex:'accountaddress',width: 250},
        {header: '救助时间',align:'center',dataIndex:'helpbgtime',width: 250},
        {header: '救助原因',align:'center',dataIndex:'helpreason',width: 250},
        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}
    ],
    'allquery':[
        {header: '户主姓名',align:'center',dataIndex:'owername',locked : true, name:'tests',
            summaryRenderer: function(value){
                return '本页合计'
            },renderer: function (v, m, r) {
            var me=this;
            var id0=Ext.id();

            Ext.defer(function () {
                if(Ext.get(id0)){
                    Ext.widget('label', {
                        renderTo: id0,
                        //margin: '0 5 0 5',
                        border:0,
                        text: v,
                        overCls:'mouseover',
                        width: 55,
                        listeners: {

                            render: function(c){
                                c.getEl().on('click', function(){
                                    testobj=me.up('panel');
                                    me.up('panel').fireEvent('alterclick', c,r,me);
                                }, c);
                            }

                        }
                    });
                }

            }, 50);


            return Ext.String.format('<span id="{0}"></span>',id0);
        }},


        {header: '行政区划', dataIndex: 'division',align:'center',width: 250},
        {header: '户主身份证',align:'center',dataIndex:'owerid',width: 250},


        {header: '申请类别',align:'center',dataIndex:'applytype',itemId:'applytype'},
        {header: '业务类型',align:'center',dataIndex:'businesstype',itemId:'businesstype'},
        {header: '致贫原因',align:'center',dataIndex:'poorfamilytype',itemId:'poorfamilytype'},
        {header: '救助性质',align:'center',dataIndex:'helpnature',itemId:'helpnature'},
        {header: '医保性质',align:'center',dataIndex:'medicarenature',itemId:'medicarenature'},


        {header: '家庭类别',align:'center',dataIndex:'familytype',itemId:'familytype'},
        {header: '救助金额',align:'center',dataIndex:'totalhelpmoney',summaryType: 'sum',width:150,//求数量
            summaryRenderer: function(value){
                return '总金额:'+value
            }},
        {header: '救助开始日期',align:'center',dataIndex:'helpbgtime'},
        {header: '救助结束日期',align:'center',dataIndex:'helpedtime'},
        {header: '家庭人数',align:'center',dataIndex:'familynum',summaryType: 'sum', width:150,//求数量
            summaryRenderer: function(value){
                return '总人数:'+value
            }},

        {header: '家庭户口性质',align:'center',dataIndex:'familyaccount'},

        {header: '低保户类型',align:'center',dataIndex:'poorfamilytype',itemId:'dbpoorfamilytype'},

        {header: '享受人数',align:'center',dataIndex:'enjoynum'},
        {header: '开户人',align:'center',dataIndex:'bankower'},
        {header: '银行帐号',align:'center',dataIndex:'bankid'},
        {header: '救助证编号',align:'center',dataIndex:'aidnum'},


        {header: '联系人1',dataIndex: 'conectperson',align:'center'},
        {dataIndex: 'telnum',align:'center',header:'联系人1电话'},
        {dataIndex: 'conectperson2',align:'center',header:'联系人2'},
        {dataIndex: 'telnum2',align:'center',header:'联系人2电话'},
        {dataIndex: 'windresistance',align:'center',header:'抗风能力'},
        {dataIndex: 'earthquakeresistance',align:'center',header:'抗震能力'},
        {dataIndex: 'housestructure',align:'center',header:'结构'},
        {dataIndex: 'escapingnum',align:'center',header:'避灾人数'},
        {dataIndex: 'houseusearea',align:'center',header:'使用面积'},
        {dataIndex: 'housearea',align:'center',header:'建筑面积'},
        {dataIndex: 'coverage',align:'center',header:'覆盖范围'},
        {header: '人员id',align:'center', width: 150,dataIndex:'businessid',hidden:true}

    ]


};

var menu_shjz=[
    {
        layout: 'fit',
        title: '低保管理',
        items:[
            {xtype:'dbglconfigtree',searchtype:"低保管理",businesstype:businessTableType.dbgl}
        ],
        iconCls: 'nav'
    },

    {
        layout: 'fit',
        title: '低保边缘户',
        items:[
            {xtype:'dbglconfigtree',searchtype:"低保边缘户",businesstype:businessTableType.dbbyh}
        ],
        iconCls: 'nav'
    },

    {
        layout: 'fit',
        title: '临时救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"临时救助",businesstype:businessTableType.temporaryhelp}
        ],
        iconCls: 'nav'
    },

    {
        layout: 'fit',
        title: '医疗救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"医疗救助",businesstype:businessTableType.medicalhelp}
        ],
        iconCls: 'nav'
    },
    {
        layout: 'fit',
        title: '助学救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"助学救助",businesstype:businessTableType.studyhelp}
        ],
        iconCls: 'nav'
    },
    {
        layout: 'fit',
        title: '慈善救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"慈善救助",businesstype:businessTableType.charitablehelp}
        ],
        iconCls: 'nav'
    },
    {
        layout: 'fit',
        title: '灾害救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"灾害救助",businesstype:businessTableType.disasterhelp}
        ],
        iconCls: 'nav'
    },{
        layout: 'fit',
        title: '流浪救助',
        items:[
            {xtype:'dbglconfigtree',searchtype:"流浪救助",businesstype:businessTableType.rangershelp}
        ],
        iconCls: 'nav'
    },

    {
        layout: 'fit',
        title: '综合查询',
        items:[
            {xtype:'dbglconfigtree',searchtype:"综合查询",businesstype:businessTableType.allquery}
        ],
        iconCls: 'nav'
    }
];

var menu_qxgl=[{layout: 'fit',title: '权限设置',items:[{xtype:'userconfiggrid'}],iconCls: 'nav' },
    {title: '系统配置',items:[{xtype:'systemconfiggrid'}],iconCls: 'nav'}, {
    title: '服务日志',items:[{xtype:'funcconfiggrid'}],iconCls: 'nav'}];

var imgfiletype={'jpg':true,'jpeg':true,'gif':true};

var ViewWaitMask=null;
var processdiction={"stepzero":"申请","stepone":"提交","steptwo":"审核","stepthree":"审批","stepback":"退回"};
var approvalresult={"yes":"同意","no":"不同意"};
var processRoleBtn=null;
var processstatustype={"ok":"正常","change":"变更","logout":"注销"};
var isenjoyedtype={"yes":"享受","no":"不享受"};
var disabledtype={"heavy":"||一级,二级||"};
