package Zsmzj.manager.usermanager.impl;

import Zsmzj.manager.usermanager.dao.RoleDao;
import Zsmzj.manager.usermanager.dao.UserDao;
import Zsmzj.manager.usermanager.intf.RoleMethods;
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
public class RoleImplement implements RoleMethods {
    @Override
    public ArrayList<Map<String, Object>> getRoles(int start, int limit, String keyword) {
        RoleDao dao=new RoleDao();
        return dao.getRoles(start, limit, keyword);
    }

    @Override
    public int addnewRole(String rolename) {
        RoleDao dao=new RoleDao();
        return dao.addNewRole(rolename);
    }
}
