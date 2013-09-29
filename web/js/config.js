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
            'allquery':'all'
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
var isenjoyedtype={"yes":"享受","no":"不享受"}
