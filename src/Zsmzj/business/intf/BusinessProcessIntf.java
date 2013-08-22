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
    public int applyBusiness(Map<String,Object> param);
    public int saveFamilyMembers(String membersjson);
    public int saveAffixFiles(String filesjson);
}
