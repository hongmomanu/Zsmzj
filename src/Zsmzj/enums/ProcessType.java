package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum ProcessType {

    Apply(1),Submit(2), Check(3), Approval(4), Grant(5),Cancellation(6);

    private int code;
    private ProcessType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseProcessType {
        /**
         * 将英文的季节转换成中文季节
         * @param pType
         * @return
         */
        public static String getChineseSeason(ProcessType pType){
            String result = "";
            switch(pType){
                case Apply :
                    result ="申请" ;
                    break;
                case Submit:
                    result = "提交";
                    break;
                case Check:
                    result = "审核";
                    break;
                case Approval:
                    result = "审批";
                    break;
                case Grant:
                    result = "资金发放";
                    break;
                case Cancellation:
                    result = "注销";
                    break;
                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
