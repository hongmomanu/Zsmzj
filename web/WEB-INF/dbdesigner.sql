----------------------系统用户角色功能表设计----------------------------------------------------
--用户表
CREATE TABLE IF NOT EXISTS users
(

  id integer primary key autoincrement,                   --自增主键
  username VARCHAR(50),                                   --用户名字
  password VARCHAR(50),                                   --用户密码
  --time TIMESTAMP default CURRENT_TIMESTAMP,
  displayname VACHAR(50),                                 --显示名称
  divisionid  integer,                                    --行政区划id
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --注册时间
  roleid  integer                                         --角色id

);


--行政区划表
CREATE VIRTUAL TABLE IF NOT EXISTS divisions USING fts3
  (

  id integer primary key autoincrement,            --自增主键
  parentid integer,                                --父节点
  divisionname VARCHAR(50),                         --角色名称
  signaturepath VARCHAR(250),                         --签章路径
  divisionpath varchar(50)                         --行政区划路径


  );


--角色表
CREATE TABLE IF NOT EXISTS roles
(

  id integer primary key autoincrement,   --自增主键
  rolename VARCHAR(50)                   --角色名称


);



--功能表
CREATE TABLE IF NOT EXISTS functions
(

  id integer primary key autoincrement,   --自增主键
  funcname VARCHAR(50),                   --功能名称
  label  VARCHAR(50),                     --功能标识
  imgurl  VARCHAR(250),                   --图片标识
  sortnum integer,                        --排序号
  functype VARCHAR(50)                    --功能类型

);

--角色功能关联表
CREATE TABLE IF NOT EXISTS functorole
(

  id integer primary key autoincrement,   --自增主键
  funcid integer,                   --功能id
  roleid integer                    --角色id

);

----------------------业务功能表设计----------------------------------------------------
--枚举类型表
CREATE VIRTUAL TABLE IF NOT EXISTS enumerate USING fts3
(
  id integer primary key autoincrement,            --自增主键
  enumeratetype            VARCHAR(50),            --枚举类型
  enumeratevalue           VARCHAR(50),            --枚举值
  enumeratelabel           VARCHAR(50)             --枚举标识

);

--附件表
CREATE VIRTUAL TABLE IF NOT EXISTS attachment USING fts3
  (
  id integer primary key autoincrement,            --自增主键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --提交时间
  businessid               integer,                --业务信息id
  attachmentname           VARCHAR(50),            --附件名称
  attachmenttype           VARCHAR(50),            --附件类型
  attachmentpath           VARCHAR(500)            --附件路径

  );

--业务信息表
CREATE VIRTUAL TABLE IF NOT EXISTS business USING fts3
(

  id integer primary key autoincrement,                             --自增主键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --业务提交时间
  businesstype            VARCHAR(50),                              --业务表类型（低保，低保边缘，临时救助等）
  processstatus           VARCHAR(50),                              --流程状态
  division                VARCHAR(50),                              --行政区划
  applytype               VARCHAR(50),                              --申请类别
  familytype              VARCHAR(50),                              --家庭类别*
  owername                VARCHAR(50),                              --户主姓名*
  owerid                  VARCHAR(50),                              --户主身份证*
  poorfamilytype          VARCHAR(50),                              --低保户类型*
  familyaccount           VARCHAR(50),                              --家庭户口
  accountaddress          VARCHAR(50),                              --户口所在地
  accountzipcode          VARCHAR(50),                              --户口所在地邮政编码
  realaddress             VARCHAR(50),                              --实际居住地
  realzipcode             VARCHAR(50),                              --实际所在地邮政编码
  households              VARCHAR(50),                              --家庭总人口
  telnum                  VARCHAR(50),                              --联系电话
  bank                    VARCHAR(50),                              --开户银行
  bankower                VARCHAR(50),                              --开户人
  bankid                  VARCHAR(50),                              --银行账号
  otherfamilyinfo         VARCHAR(50),                              --家庭备注
  houseproperties         VARCHAR(50),                              --住房性质
  housestructure          VARCHAR(50),                              --住房结构
  housearea               VARCHAR(50),                              --住房总面积
  houseaveragearea        VARCHAR(50),                              --住房人均面积
  interest                VARCHAR(50),                              --利息、股息、红利
  wages                   VARCHAR(50),                              --工资、薪金
  planting                VARCHAR(50),                              -- 种植、养殖、捕捞
  pension                 VARCHAR(50),                              --离退休金、养老保险等
  management              VARCHAR(50),                              --承包经营
  alimony                 VARCHAR(50),                              --赡（抚、扶）养费
  incidentalincome        VARCHAR(50),                              --赔偿、继承、赠与、偶然所得
  remuneration            VARCHAR(50),                              --劳务报酬
  allowance               VARCHAR(50),                              --各类生活补助
  paidservices            VARCHAR(50),                              --生产经营、有偿服务
  propertylease           VARCHAR(50),                              --财产租赁、转让
  otherincome             VARCHAR(50),                              --其他
  cash                    VARCHAR(50),                              --现金
  banksecurities          VARCHAR(50),                              --银行存款及有价证券
  debt                    VARCHAR(50),                              -- 债权
  vehicle                 VARCHAR(50),                              --机动车辆
  nonresidentialhouse     VARCHAR(50),                              --非居住类房屋
  insurance               VARCHAR(50),                              --商业保险
  registeredcapital       VARCHAR(50),                              --工商注册资金（资本）
  userid                  integer,                                  --制单人id
  icomemonth              VARCHAR(50),                              --收入累计月份*
  poortype                VARCHAR(50),                              --低保类型
  familyincome            real,                                     --家庭总收入* T
  averageincome           real,                                     --月人均收入
  applymoney              real,                                     --申请救济金
  poorstandard            VARCHAR(50),                              --低保标准*
  aidnum                  VARCHAR(50),                              --救助证编号
  helpbgtime              DATETIME,                                 --救助开始日期*
  helpedtime              DATETIME,                                 --救助结束日期
  --helppersons             VARCHAR(50),                              --享受人数*
  disabledpersons         VARCHAR(50),                              --重残人数
  disabledmoney           VARCHAR(50),                              --重残低保金
  othershelpmoney         VARCHAR(50),                              --其他人员低保金
  totalhelpmoney          VARCHAR(50),                              --总救助金额
  publicityedtm           DATETIME,                                 --公示结束日期
  helpreason              VARCHAR(500),                             --救助原因*
  villageopinion          VARCHAR(500),                             --社区/村意见
  townopinion             VARCHAR(500),                             --街道/乡镇意见
  civilopinion            VARCHAR(500),                             --民政局意见
  processstatustype       VARCHAR(50),                              --业务流程类型（正常，变更，注销）
  changedate               VARCHAR(50),                              --变更日期
  changereason             VARCHAR(50),                              --变更原因
 logoutdate                VARCHAR(50),                              --注销日期
logoutreason                VARCHAR(50),                             --注销原因
helpway            VARCHAR(50),                             --救助方式
losemoney                   VARCHAR(50),                             --受损金额
damagetime                  VARCHAR(50),                             --受灾日期
hospitalname                VARCHAR(50),                             --就诊医院*
illnessname                 VARCHAR(50),                            --疾病名称*
medicarenature              VARCHAR(50),                            --医保性质*
helpnature                 VARCHAR(50),                             --救助性质*
medicarenum                 VARCHAR(50),                            --医保卡号
writeofftype                 VARCHAR(50),                            --报销类型*
doctordate                  VARCHAR(50),                            --就诊日期*
outhospitaldate             VARCHAR(50),                             --出院日期*
medicalmoney               VARCHAR(50),                              --医疗费用总额*
medicalselfmoney          VARCHAR(50),                                --自理金额*
writeoffmoney             VARCHAR(50),                                --已报销金额*
responsiblemoney           VARCHAR(50),                                --自负金额
                                                                      --本次救助金额
writeoffcardinalnumberyear     VARCHAR(50),                               --本年度已报销基数
helpedmoneyyear               VARCHAR(50),                            --本年度已救助金额
helpedtimesyear               VARCHAR(50),                            --本年度已救助次数
hospitalizedwriteoffcardinalnumberyear        VARCHAR(50),            --本年度住院累计报销基数
hospitalizedhelpedmoneyyear    VARCHAR(50),                            --本年度住院累计救助金额
hospitalizedhelpedtimesyear    VARCHAR(50),                            --本年度住院累计救助次数
outpatientwriteoffcardinalnumberyear           VARCHAR(50),            --本年度门诊累计报销基数
outpatienthelpedmoneyyear         VARCHAR(50),                         --本年度门诊累计救助金额
outpatienthelpedtimesyear      VARCHAR(50),                              --本年度门诊累计救助次数
studyyear                      VARCHAR(50),                            --就读学年
studyclass                     VARCHAR(50),                            --就读班级
studytime                      VARCHAR(50),                            --学习时段
admission                      VARCHAR(50),                            --录取分数
schoolenrollment               VARCHAR(50),                            --录取学校
ticketnumber                    VARCHAR(50)                           --准考证号
);


--业务信息变更记录表
CREATE VIRTUAL TABLE IF NOT EXISTS businesschange USING fts3
  (

  id integer primary key autoincrement,                             --自增主键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --业务提交时间
  businesstype            VARCHAR(50),                              --业务表类型（低保，低保边缘，临时救助等）
  processstatus           VARCHAR(50),                              --流程状态
  division                VARCHAR(50),                              --行政区划
  applytype               VARCHAR(50),                              --申请类别
  familytype              VARCHAR(50),                              --家庭类别*
  owername                VARCHAR(50),                              --户主姓名*
  owerid                  VARCHAR(50),                              --户主身份证*
  poorfamilytype          VARCHAR(50),                              --低保户类型*
  familyaccount           VARCHAR(50),                              --家庭户口
  accountaddress          VARCHAR(50),                              --户口所在地
  accountzipcode          VARCHAR(50),                              --户口所在地邮政编码
  realaddress             VARCHAR(50),                              --实际居住地
  realzipcode             VARCHAR(50),                              --实际所在地邮政编码
  households              VARCHAR(50),                              --家庭总人口
  telnum                  VARCHAR(50),                              --联系电话
  bank                    VARCHAR(50),                              --开户银行
  bankower                VARCHAR(50),                              --开户人
  bankid                  VARCHAR(50),                              --银行账号
  otherfamilyinfo         VARCHAR(50),                              --家庭备注
  houseproperties         VARCHAR(50),                              --住房性质
  housestructure          VARCHAR(50),                              --住房结构
  housearea               VARCHAR(50),                              --住房总面积
  houseaveragearea        VARCHAR(50),                              --住房人均面积
  interest                VARCHAR(50),                              --利息、股息、红利
  wages                   VARCHAR(50),                              --工资、薪金
  planting                VARCHAR(50),                              -- 种植、养殖、捕捞
  pension                 VARCHAR(50),                              --离退休金、养老保险等
  management              VARCHAR(50),                              --承包经营
  alimony                 VARCHAR(50),                              --赡（抚、扶）养费
  incidentalincome        VARCHAR(50),                              --赔偿、继承、赠与、偶然所得
  remuneration            VARCHAR(50),                              --劳务报酬
  allowance               VARCHAR(50),                              --各类生活补助
  paidservices            VARCHAR(50),                              --生产经营、有偿服务
  propertylease           VARCHAR(50),                              --财产租赁、转让
  otherincome             VARCHAR(50),                              --其他
  cash                    VARCHAR(50),                              --现金
  banksecurities          VARCHAR(50),                              --银行存款及有价证券
  debt                    VARCHAR(50),                              -- 债权
  vehicle                 VARCHAR(50),                              --机动车辆
  nonresidentialhouse     VARCHAR(50),                              --非居住类房屋
  insurance               VARCHAR(50),                              --商业保险
  registeredcapital       VARCHAR(50),                              --工商注册资金（资本）
  userid                  integer,                                  --制单人id
  icomemonth              VARCHAR(50),                              --收入累计月份*
  poortype                VARCHAR(50),                              --低保类型
  familyincome            real,                                     --家庭总收入* T
  averageincome           real,                                     --月人均收入
  applymoney              real,                                     --申请救济金
  poorstandard            VARCHAR(50),                              --低保标准*
  aidnum                  VARCHAR(50),                              --救助证编号
  helpbgtime              DATETIME,                                 --救助开始日期*
  helpedtime              DATETIME,                                 --救助结束日期
  --helppersons             VARCHAR(50),                              --享受人数*
  disabledpersons         VARCHAR(50),                              --重残人数
  disabledmoney           VARCHAR(50),                              --重残低保金
  othershelpmoney         VARCHAR(50),                              --其他人员低保金
  totalhelpmoney          VARCHAR(50),                              --总救助金额
  publicityedtm           DATETIME,                                 --公示结束日期
  helpreason              VARCHAR(500),                             --救助原因*
  villageopinion          VARCHAR(500),                             --社区/村意见
  townopinion             VARCHAR(500),                             --街道/乡镇意见
  civilopinion            VARCHAR(500),                             --民政局意见
  processstatustype       VARCHAR(50),                              --业务流程类型（正常，变更，注销）
  changedate               VARCHAR(50),                             --变更日期
  changereason             VARCHAR(50),                             --变更原因
  logoutdate                VARCHAR(50),                              --注销日期
  logoutreason              VARCHAR(50),                              --注销原因

  helpway            VARCHAR(50),                             --救助方式
  losemoney                   VARCHAR(50),                             --受损金额
  damagetime                  VARCHAR(50),                             --受灾日期
  hospitalname                VARCHAR(50),                             --就诊医院*
  illnessname                 VARCHAR(50),                            --疾病名称*
  medicarenature              VARCHAR(50),                            --医保性质*
  helpnature                 VARCHAR(50),                             --救助性质*
  medicarenum                 VARCHAR(50),                            --医保卡号
  writeofftype                 VARCHAR(50),                            --报销类型*
  doctordate                  VARCHAR(50),                            --就诊日期*
  outhospitaldate             VARCHAR(50),                             --出院日期*
  medicalmoney               VARCHAR(50),                              --医疗费用总额*
  medicalselfmoney          VARCHAR(50),                                --自理金额*
  writeoffmoney             VARCHAR(50),                                --已报销金额*
  responsiblemoney           VARCHAR(50),                                --自负金额
                                                                      --本次救助金额
  writeoffcardinalnumberyear     VARCHAR(50),                               --本年度已报销基数
  helpedmoneyyear               VARCHAR(50),                            --本年度已救助金额
  helpedtimesyear               VARCHAR(50),                            --本年度已救助次数
  hospitalizedwriteoffcardinalnumberyear        VARCHAR(50),            --本年度住院累计报销基数
  hospitalizedhelpedmoneyyear    VARCHAR(50),                            --本年度住院累计救助金额
  hospitalizedhelpedtimesyear    VARCHAR(50),                            --本年度住院累计救助次数
  outpatientwriteoffcardinalnumberyear           VARCHAR(50),            --本年度门诊累计报销基数
  outpatienthelpedmoneyyear         VARCHAR(50),                         --本年度门诊累计救助金额
  outpatienthelpedtimesyear      VARCHAR(50),                              --本年度门诊累计救助次数

  studyyear                      VARCHAR(50),                            --就读学年
  studyclass                     VARCHAR(50),                            --就读班级
  studytime                      VARCHAR(50),                            --学习时段
  admission                      VARCHAR(50),                            --录取分数
  schoolenrollment               VARCHAR(50),                            --录取学校
  ticketnumber                   VARCHAR(50),                           --准考证号


  businessid               integer,                                 --业务id
  insertdate               VARCHAR(50)                              --charuriq
  );



---家庭成员表
CREATE VIRTUAL TABLE IF NOT EXISTS familymembers  USING fts3
(

  id integer primary key autoincrement,                             --自增主键
  businessid  integer                 ,                             --业务id外键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --时间
  birthday                DATETIME,                                 --出生日期*
  isenjoyed               VARCHAR(50) ,                             --是否享受
  persontype              VARCHAR(50),                              --人员类别
  jobstatus               VARCHAR(50),                              --职业状况*
  bodystatus              VARCHAR(50),                              --健康状况*
  specialobject           VARCHAR(50),                              --特定救助对象
  workunits               VARCHAR(50),                              --工作单位
  monthlyincome           real,                                     --月收入
  accounttype             VARCHAR(50),                              --户口性质
  maritalstatus           varchar(50),                              --婚姻状况
  education               varchar(50),                              --文化程度
  political               varchar(50),                              --政治面貌
  disabledtype            varchar(50),                              --残疾类别
  disabledlevel           varchar(50),                              --残疾等级
  disablenum              varchar(50),                              --残疾证号
  workability             varchar(50),                              --劳动能力
  ispension               VARCHAR(50),                              --是否有养老保险
  ismedical               VARCHAR(50),                              --是否医疗保险
  medicaltype             varchar(50),                              --医保类型
  medicalnum              varchar(50),                              --医保卡号
  isunemployment          VARCHAR(50),                              --是否有失业保险
  unemploymentnum         VARCHAR(50),                              --失业证号
  relationship            VARCHAR(50),                              --与户主关系*
  name                    VARCHAR(50),                              --姓名
  personid                VARCHAR(50),                              --身份证*
  sex                     VARCHAR(50),                              --性别
  other                   VARCHAR(50)                               --备注
);


---家庭成员表
CREATE VIRTUAL TABLE IF NOT EXISTS familymembershistory  USING fts3
  (
  id integer primary key autoincrement,                             --自增主键
  businessid  integer                 ,                             --业务id外键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --时间
  birthday                DATETIME,                                 --出生日期*
  isenjoyed               VARCHAR(50) ,                             --是否享受
  persontype              VARCHAR(50),                              --人员类别
  jobstatus               VARCHAR(50),                              --职业状况*
  bodystatus              VARCHAR(50),                              --健康状况*
  specialobject           VARCHAR(50),                              --特定救助对象
  workunits               VARCHAR(50),                              --工作单位
  monthlyincome           real,                                     --月收入
  accounttype             VARCHAR(50),                              --户口性质
  maritalstatus           varchar(50),                              --婚姻状况
  education               varchar(50),                              --文化程度
  political               varchar(50),                              --政治面貌
  disabledtype            varchar(50),                              --残疾类别
  disabledlevel           varchar(50),                              --残疾等级
  disablenum              varchar(50),                              --残疾证号
  workability             varchar(50),                              --劳动能力
  ispension               VARCHAR(50),                              --是否有养老保险
  ismedical               VARCHAR(50),                              --是否医疗保险
  medicaltype             varchar(50),                              --医保类型
  medicalnum              varchar(50),                              --医保卡号
  isunemployment          VARCHAR(50),                              --是否有失业保险
  unemploymentnum         VARCHAR(50),                              --失业证号
  relationship            VARCHAR(50),                              --与户主关系*
  name                    VARCHAR(50),                              --姓名
  personid                VARCHAR(50),                              --身份证*
  sex                     VARCHAR(50),                              --性别
  other                   VARCHAR(50),                              --备注
  isnewest                integer                                   --是否为最新历史数据
  );



---流程审批表
CREATE VIRTUAL TABLE IF NOT EXISTS approvalprocess USING fts3
(

  id integer primary key autoincrement,                             --自增主键
  businessid  integer                 ,                             --业务id外键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --时间
  approvalname            VARCHAR(50),                              --审批名称*
  approvalresult          VARCHAR(50),                              --审批结果
  userid                   integer,                                 --审批人id*
  approvalopinion         VARCHAR(500)
);

--附件表
CREATE VIRTUAL TABLE IF NOT EXISTS businesssignature USING fts3
  (
    id integer primary key autoincrement,            --自增主键
    time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --提交时间
    businessid                integer,                --业务信息id
    path                      VARCHAR(200),           --文件路径
    userid                    integer,                --用户id
    x                         integer,                --x
    y                         integer                 --y
  );

--资金发放表
CREATE VIRTUAL TABLE IF NOT EXISTS grantmoney USING fts3
  (
  id integer primary key autoincrement,            --自增主键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --提交时间
  businessid                integer,                --业务信息id
  userid                    integer,                --用户id
  bgdate                    VARCHAR(100),           --开始日期
  eddate                    VARCHAR(100),           --结束日期
  grantdate                 VARCHAR(100)            --结束日期
  );

--资金发放表
CREATE VIRTUAL TABLE IF NOT EXISTS medicalstandard USING fts3
  (
  id integer primary key autoincrement,            --自增主键
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --提交时间
  divisionid                integer,                --行政区划id
  helppercent               integer,                --救助比例
  helptype                  VARCHAR(100),           --救助类别
  bgmoney                    VARCHAR(100),          --起始金额
  edmoney                    VARCHAR(100),          --结束金额
  helpnature                 VARCHAR(100)           --医疗救助性质
  );



----技巧说明 日期比较 time Between '2008-06-10' and  '2013-09-11'   数值比较CAST(totalhelpmoney AS real)