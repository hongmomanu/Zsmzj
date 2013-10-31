package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum EnumApplyType {

    A(1),B(2),C(3);
    private int code;
    private EnumApplyType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseStatisticsType {



        public static String getChineseSeason(EnumApplyType pType){
            String result = "";
            switch(pType){
                case A:
                    result ="A类" ;
                    break;
                case B:
                    result="B类";
                    break;
                case C:
                    result="C类";
                    break;
                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
