package Zsmzj.manager.usermanager.business;

import Zsmzj.manager.usermanager.impl.UserImplement;
import net.sf.json.JSONArray;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
public class UserControl {
    public String getUsers(int start,int limit,String keyword){

        UserImplement user=new UserImplement();
        return JSONArray.fromObject(user.getUsers(start, limit, keyword)).toString();

    }


}
