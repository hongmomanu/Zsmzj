/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-7
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */


var extLocation="http://115.193.181.185/easyui/";

 //extLocation="http://127.168.2.141/ext-4.2.1/";
 extLocation="http://127.168.2.112/easyui/";

var businessTableType=
        {   'dbgl':"低保",
            'dbbyh':"边缘户",
            'temporaryhelp':'临时救助',
            'studyhelp':'助学救助',
            'charitablehelp':'慈善救助',
            'charitableinstitutionhelp':'慈善机构救助',
            'medicalhelp':'医疗救助',
            'disasterhelp':'灾害救助',
            'disasterware':'避灾仓库',
            'disasterplace':'避灾场所',
            'rangershelp':'流浪救助',
            'allquery':'all'
        };
var spatialchildTableType={
    '避灾仓库':'disasterware',

    '避灾场所': 'disasterplace',
    '核定收入':'checkinput',
    '核定住房':'checkhouse',
    '核定现有资产':'checknowmoney',
    'shenshispatial':'嵊泗县'
};

var formwidgettype={
    'dbglapply':'dbglbusinessapplyform',
    'dbglalter':'dbglbusinessalterform',
    'dbglchange':'dbglbusinesschangeform',
    'dbglchangeclick':'dbglbusinesschangeclickform',
    'dbgllogout':'dbglbusinesslogoutform',
    'dbgllogoutclick':'dbglbusinesslogoutclickform',
    'dbedgeapply':'dbedgebusinessapplyform' ,
    'dbedgealter':'dbedgebusinessalterform' ,
    'dbedgechange':'dbedgebusinesschangeform' ,
    'dbedgechangeclick':'dbedgebusinesschangeclickform',
    'dbedgelogoutclick':'dbedgebusinesslogoutclickform',
    'dbedgelogout':'dbedgebusinesslogoutform',
    'medicalhelpapply':'medicalhelpbusinessapplyform',/*医疗救助申请表单*/
    'medicalhelpalter':'medicalhelpbusinessalterform',/*医疗救助申请表单修改*/
    'charitablehelpapply':'charitablehelpbusinessapplyform',/*慈善救助申请*/
    'charitablehelpalter':'charitablehelpbusinessalterform',/*慈善救助申请表单修改*/
    'studyhelpapply':'studyhelpbusinessapplyform',/*助学救助申请*/
    'studyhelpalter':'studyhelpbusinessalterform',/*助学救助修改*/
    'temporaryhelpapply':'temporaryhelpbusinessapplyform',/*临时救助申请*/
    'temporaryhelpalter':'temporaryhelpbusinessalterform',
    'disasterhelpcalamityapply':'disasterhelpcalamitybusinessapplyform',
    'disasterhelpcalamityalter':'disasterhelpcalamitybusinessalterform',
    'disasterhelpcalamitychange':'disasterhelpcalamitybusinesschangeform',
    'disasterhelpcalamitychangeclick':'disasterhelpcalamitybusinesschangeclickform',
    'disasterhelpcalamitylogout':'disasterhelpcalamitybusinesslogoutform',
    'disasterhelpcalamitylogoutclick':'disasterhelpcalamitybusinesslogoutclickform',
    'disasterhelpapply':'disasterhelpbusinessapplyform',
    'disasterhelpwarehouseapply':'disasterhelpwarehouseapplyform',
    'disasterhelpalter':'disasterhelpbusinessalterform',
    'disasterhelpwarealter':'disasterhelpwarealterform',
    'rangershelpapply':'rangershelpbusinessapplyform',
    'rangershelpalter':'rangershelpbusinessalterform',
    'propertycheckregister':'propertycheckfamilyinforegister',
    'propertycheckalter':'propertycheckfamilyinfoalter',
    'propertycheckchange':'propertycheckfamilyinfochange',
    'propertychecklogout':'propertycheckfamilyinfologout',

    'propertycheckchangeclick':'propertycheckbusinesschangeclickform',
    'propertychecklogoutclick':'propertycheckbusinesslogoutclickform',
    'propertycheckitemalter':'propertycheckfamilyinfocheck'/*家庭基本信息核定*/

};

var familyheaders={
    'dbgl':[


        {title: '行政区划', field: 'division',align:'center',width: 250},
        {title: '户主身份证',align:'center',field:'owerid',width: 250},
        {title: '申请类别',align:'center',field:'applytype',width:80},
        {title: '业务类型',align:'center',field:'businesstype',width:80},
        {title: '家庭类别',align:'center',field:'familytype',width:80},
        {title: '救助金额',align:'center',field:'totalhelpmoney',width:80},
        {title: '救助开始日期',align:'center',field:'helpbgtime',width:80},
        {title: '救助结束日期',align:'center',field:'helpedtime',width:80},
        {title: '家庭人数',align:'center',field:'familynum',width:80},
        {title: '家庭户口性质',align:'center',field:'familyaccount',width:80},
        {title: '享受人数',align:'center',field:'enjoyednum',width:80},
        {title: '开户人',align:'center',field:'bankower',width:80},
        {title: '银行帐号',align:'center',field:'bankid',width:80},
        {title: '救助证编号',align:'center',field:'aidnum',width:80},
        {field:'time',title:'时间',width:80,hidden:true,align:'center',sortable:true},
        {title: '业务id',align:'center', width: 150,field:'businessid',hidden:true}

    ]


};

var applyformviewsjs={
    'dbglapply':[
         'dbglapply'
    ]
};

var applyformviews={
    'dbglapply':[
        'dbglfamilybasicfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbglapplysubmitfieldset'
    ],
    'dbglalter':[
        'dbglfamilybasicfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbglapplysubmitfieldset',
        'dbglapplyhistoryfieldset'

    ],
    'dbglchange':[
        'dbglfamilybasicfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbglchangesubmitfieldset',
        'dbglapplyhistoryfieldset'

    ],'dbglchangeclick':[
        'dbglfamilybasicfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbglchangesubmitfieldset',
        'dbglapplyhistoryfieldset'

    ],'dbgllogout':[
        'dbglfamilybasicfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbgllogoutsubmitfieldset',
        'dbglapplyhistoryfieldset'

    ],'dbgllogoutclick':[
        'dbglfamilybasicfieldset',
        'dbgllogoutsubmitfieldset',
        'dbglfamilymemberfieldset',
        'dbglfamilymoneyfieldset',
        'dbglfamilyhousefieldset',
        'dbglfamilyinputfieldset',
        'dbglfamilyaffixfieldset',
        'dbglfamilyapplyfieldset',
        'dbglapplyhistoryfieldset'

    ],'dbedgeapply':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgeapplysubmitfieldset'
    ],
    'dbedgealter':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgealtersubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'

    ],
    'dbedgechange':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgechangesubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'

    ],'dbedgechangeclick':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgechangesubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'

    ],'dbedgelogout':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgelogoutsubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'

    ],'dbedgelogoutclick':[
        'dbedgefamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilymoneyfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        '../dbgl/dbglfamilyinputfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        '../dbgl/dbglfamilyapplyfieldset',
        'dbedgelogoutsubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'

    ],'medicalhelpapply':[/*医疗救助申请表单分隔的各个小表单*/
        'medicalhelpfamilybasicfieldset',
        '../dbgl/dbglfamilyhousefieldset',
        /*'medicalhelpfamilyhousefieldset',
        'medicalhelpfamilyinputfieldset',
        'medicalhelpfamilypropertyfieldset',*/
        '../dbgl/dbglfamilymemberfieldset',//家庭成员信息
        '../dbgl/dbglfamilyaffixfieldset',//电子附件信息
        'medicalhelpfamilyapplyfieldset',
        'medicalhelpapplysubmitfieldset'

    ],'medicalhelpalter':[/*医疗救助申请表单修改界面 分隔的各个小表单*/
        'medicalhelpfamilybasicfieldset',
        /*'medicalhelpalterfamilybasicfieldset',
        'medicalhelpfamilyhousefieldset',
        'medicalhelpfamilyinputfieldset',
        'medicalhelpfamilypropertyfieldset',*/
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'medicalhelpfamilyapplyfieldset',
        'medicalhelpapplysubmitfieldset',/*
        'medicalhelpaltersubmitfieldset',
        'medicalhelpaltersubmitlogfieldset'*/
        '../dbgl/dbglapplyhistoryfieldset'

    ],'charitablehelpapply':[/*慈善救助申请*/
        'charitablehelpfamilybasicfieldset',
        //'charitablehelpfamilyhousefieldset',
        //'charitablehelpfamilyinputfieldset',
        //'medicalhelpfamilypropertyfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'charitablehelpfamilyapplyfieldset',
        'charitablehelpapplysubmitfieldset'

    ],'charitablehelpalter':[/*慈善救助申请 修改*/
        //'charitablehelpalterfamilybasicfieldset',
        //'charitablehelpfamilyhousefieldset',
        //'charitablehelpfamilyinputfieldset',
        //'medicalhelpfamilypropertyfieldset',
        'charitablehelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'charitablehelpfamilyapplyfieldset',
        //'charitablehelpaltersubmitfieldset',
        'charitablehelpapplysubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        /*
        'charitablehelpaltersubmitlogfieldset'*/

    ],'studyhelpapply':[/*助学救助申请 */
        'studyhelpfamilybasicfieldset',
        //'studyhelpfamilyhousefieldset',
        //'studyhelpfamilyinputfieldset',
        //'studyhelpfamilypropertyfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'studyhelpfamilyapplyfieldset',
        'studyhelpapplysubmitfieldset'

    ],'studyhelpalter':[/*助学救助申请 修改*/
        //'studyhelpalterfamilybasicfieldset',
        //'studyhelpfamilyhousefieldset',
        //'studyhelpfamilyinputfieldset',
        //'studyhelpfamilypropertyfieldset',
        'studyhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'studyhelpfamilyapplyfieldset',
        /*'studyhelpaltersubmitfieldset',*/
        'studyhelpapplysubmitfieldset'

    ],'temporaryhelpapply':[/* 临时救助申请*/
        'temporaryhelpfamilybasicfieldset',
        /*'temporaryhelpfamilyhousefieldset',
        'temporaryhelpfamilyinputfieldset',
        'temporaryhelpfamilypropertyfieldset',*/
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'temporaryhelpfamilyapplyfieldset',
        'temporaryhelpapplysubmitfieldset'

    ],'temporaryhelpalter':[/* 临时救助修改*/
        'temporaryhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'temporaryhelpfamilyapplyfieldset',
        'temporaryhelpaltersubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
       /* 'temporaryhelpaltersubmitfieldset',
        'temporaryhelpaltersubmitlogfieldset'*/

    ],'disasterhelpcalamityapply':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'disasterhelpapplysubmitfieldset'

    ],'disasterhelpcalamityalter':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        //'disasterhelpaltersubmitfieldset',
        'disasterhelpapplysubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        /*'temporaryhelpaltersubmitlogfieldset'*/

    ],'disasterhelpcalamitychange':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'disasterhelpchangesubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        //'temporaryhelpaltersubmitlogfieldset'

    ],'disasterhelpcalamitychangeclick':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'disasterhelpchangesubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        //'temporaryhelpaltersubmitlogfieldset'

    ],'disasterhelpcalamitylogout':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'disasterhelplogoutsubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        //'temporaryhelpaltersubmitlogfieldset'

    ],'disasterhelpcalamitylogoutclick':[
        'disasterhelpfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        '../dbgl/dbglfamilyaffixfieldset',
        'disasterhelplogoutsubmitfieldset',
        '../dbgl/dbglapplyhistoryfieldset'
        //'temporaryhelpaltersubmitlogfieldset'

    ],
    'disasterhelpapply':[
        'disasterhelpapplyfamilybasicfieldset',
        'disasterhelpapplyfamilymemberfieldset'

    ],'rangershelpapply':[
        'rangershelpapplyfamilybasicfieldset'

    ],'rangershelpalter':[
        'rangershelpapplyfamilybasicfieldset'

    ],'disasterhelpwarehouseapply':[
        'disasterhelpwarehouseapplyfamilybasicfieldset',
        'disasterhelpwarehouseapplyfamilymemberfieldset'

    ],'disasterhelpalter':[
        'disasterhelpapplyfamilybasicfieldset',
        'disasterhelpapplyfamilymemberfieldset'

    ],'disasterhelpwarealter':[
        'disasterhelpwarehouseapplyfamilybasicfieldset',
        'disasterhelpwarehouseapplyfamilymemberfieldset'

    ],'propertycheckregister':[/* 家庭基本信息登记*/
        'propertycheckfamilybasicfieldset',
        '../dbgl/dbglfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset'

    ],'propertycheckalter':[/* 家庭基本信息修改*/
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset',
        'propertycheckitemhistoryfieldset',
        'propertycheckapplyhistoryfieldset'

    ],'propertycheckchange':[
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset',
        'propertycheckitemhistoryfieldset',
        'propertycheckapplyhistoryfieldset'

    ],'propertycheckchangeclick':[
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset',
        'propertycheckitemhistoryfieldset',
        'propertycheckapplyhistoryfieldset'

    ],'propertychecklogout':[
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset',
        'propertycheckitemhistoryfieldset',
        'propertycheckapplyhistoryfieldset'

    ],'propertychecklogoutclick':[
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymemberfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset',
        'propertycheckitemhistoryfieldset',
        'propertycheckapplyhistoryfieldset'

    ],'propertycheckitemalter':[/* 家庭基本信息核定*/
        'propertycheckfamilybasicfieldset',
        'propertycheckfamilymoneyfieldset',
        'propertycheckfamilyhousefieldset',
        'propertycheckfamilyinputfieldset'

    ]

}
var icons='img/icon/';
var imgfiletype={'jpg':true,'jpeg':true,'gif':true};
var ViewWaitMask=null;
var processdiction={"stepzero":"申请","stepone":"提交","steptwo":"审核","stepthree":"审批","stepback":"退回","noprocess":"无流程"};
var approvalresult={"yes":"同意","no":"不同意"};
var processRoleBtn=null;
var processstatustype={"ok":"正常","change":"变更","logout":"注销"};
var isenjoyedtype={"yes":"享受","no":"不享受"};
var disabledtype={"heavy":['一级','二级']};

