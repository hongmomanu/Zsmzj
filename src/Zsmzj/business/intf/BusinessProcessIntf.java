package Zsmzj.business.intf;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
public interface BusinessProcessIntf {
    /**
     * saveApplyBusiness  saveFamilyMembers   saveAffixFiles 三个接口属于同一trancsiction
     * ***/
    public int saveApplyBusiness(Map<String,Object> param);//提交业务信息
    public int saveFamilyMembers(String membersjson,int businessid);//保存家庭成员信息
    public int saveAffixFiles(String filesjson,int businessid);//保存附件信心

    public int getNeedTodoCounts(int roleid);//获取待办事务
    public int changeStatus(int businessid,int type);//改变事务状态
}
