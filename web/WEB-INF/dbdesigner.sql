--用户表
CREATE TABLE IF NOT EXISTS users
(

  id integer primary key autoincrement,                   --自增主键
  username VARCHAR(50),                                   --用户名字
  password VARCHAR(50),                                   --用户密码
  --time TIMESTAMP default CURRENT_TIMESTAMP,
  time DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')),  --注册时间
  roleid  integer                                         --角色id

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
