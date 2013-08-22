package Zsmzj.business.control;

import org.apache.log4j.Logger;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */
public class BusinessProcessControl {

    private static final Logger log = Logger.getLogger(BusinessProcessControl.class);
    public String saveNewBusinessApply(Map<String,Object> params,String familymembers,
                                       String affixfiles,String businessType){

        log.debug(businessType);
        return "{sucess:true}";
    }


}
