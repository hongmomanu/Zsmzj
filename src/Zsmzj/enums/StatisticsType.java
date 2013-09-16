package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum StatisticsType {

    Full(1),ComplexOne(2);
    private int code;
    private StatisticsType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseStatisticsType {



        public static String getChineseSeason(StatisticsType pType){
            String result = "";
            switch(pType){
                case Full:
                    result ="full" ;
                    break;
                case ComplexOne:
                    result="complexone";
                    break;

                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
