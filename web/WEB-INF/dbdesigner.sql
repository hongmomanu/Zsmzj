--用户表
CREATE TABLE IF NOT EXISTS users
(

  id integer primary key autoincrement,   --自增主键
  username VARCHAR(50),                   --用户名字
  password VARCHAR(50),                    --用户密码
  roleid  integer                         --角色id

);
--角色表
CREATE TABLE IF NOT EXISTS roles
(

  id integer primary key autoincrement,   --自增主键
  rolename VARCHAR(50),                   --角色名称
  funcidarr Text                          --功能集合

);
--功能表
CREATE TABLE IF NOT EXISTS functions
(

  id integer primary key autoincrement,   --自增主键
  funcname VARCHAR(50),                   --功能名称
  functype VARCHAR(50)                    --功能类型

);

