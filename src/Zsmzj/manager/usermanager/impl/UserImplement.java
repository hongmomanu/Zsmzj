package Zsmzj.manager.usermanager.impl;

import Zsmzj.manager.usermanager.dao.UserDao;
import Zsmzj.manager.usermanager.intf.UserMethods;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 */
public class UserImplement implements UserMethods {
    @Override
    public ArrayList<Map<String, Object>> getUsers(int start, int limit, String keyword) {
        UserDao dao=new UserDao();
        return dao.getUsers(start,limit,keyword);
    }

    @Override
    public int addnewUser(String username, String password, int roleid) {
        UserDao dao=new UserDao();
        return dao.addnewUser(username,password,roleid);
    }

    @Override
    public int delUser(int userid) {
        UserDao dao=new UserDao();
        return dao.delUser(userid);
    }

    @Override
    public Map<String, Object> login(String username, String password) {
        UserDao dao=new UserDao();
        return dao.login(username,password);
    }
}
