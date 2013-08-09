package Zsmzj.manager.usermanager.impl;

import Zsmzj.manager.usermanager.dao.FuncDao;
import Zsmzj.manager.usermanager.intf.FuncMethods;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 */
public class FuncImplement implements FuncMethods {
    @Override
    public ArrayList<Map<String, Object>> getFuncs(int start, int limit, String keyword) {
        FuncDao dao=new FuncDao();
        return dao.getFuncs(start, limit, keyword);
    }

    @Override
    public int addnewFunc(String funcname,String functype) {
        FuncDao dao=new FuncDao();
        return dao.addNewFunc(funcname,functype);
    }

    @Override
    public int delFunc(int funcid) {
        FuncDao dao=new FuncDao();
        return dao.delFunc(funcid);
    }
}
