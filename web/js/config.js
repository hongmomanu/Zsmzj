/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-7
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
var extLocation="http://192.168.2.112/extjs4.2/";
var menu_shjz=[{layout: 'fit',title: '低保管理',items:[{xtype:'dbglconfigtree',searchtype:"低保管理"}],iconCls: 'nav' },
    {title: '低保边缘户',items:[{xtype:'dbglconfigtree',searchtype:"低保边缘户"}],iconCls: 'nav'}, {
    title: '临时救助',iconCls: 'nav'}, {title: '医疗救助',iconCls: 'nav'}, {title: '孤儿救助',iconCls: 'nav'},
    {title: '慈善救助',iconCls: 'nav'},  {title: '综合查询',iconCls: 'nav'}];

var menu_qxgl=[{layout: 'fit',title: '权限设置',items:[{xtype:'userconfiggrid'}],iconCls: 'nav' },
    {title: '系统配置',items:[{xtype:'systemconfiggrid'}],iconCls: 'nav'}, {
    title: '服务日志',items:[{xtype:'funcconfiggrid'}],iconCls: 'nav'}];

var imgfiletype={'jpg':true,'jpeg':true,'gif':true};
var businessTableType={'dbgl':"低保",'dbbyh':"边缘户"};
var ViewWaitMask=null;
var processdiction={"stepzero":"申请","stepone":"提交","steptwo":"审核","stepthree":"审批","stepback":"退回"};
var approvalresult={"yes":"同意","no":"不同意"};
var processRoleBtn=null;
var processstatustype={"ok":"正常","change":"变更","logout":"注销"};
var isenjoyedtype={"yes":"享受","no":"不享受"}
