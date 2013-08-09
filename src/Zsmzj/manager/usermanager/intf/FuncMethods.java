package Zsmzj.manager.usermanager.intf;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */
public interface FuncMethods {
    ArrayList<Map<String, Object>> getFuncs(int start, int limit, String keyword);
    int addnewFunc(String funcname,String functype);
    int delFunc(int funcid);

}
