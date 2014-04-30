package Zsmzj.business.control;

import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by weipan on 2014/4/29.
 */
public class Intelligent {

    public static String generalSql(String fulltable,String[]name, String[] compare, String[] value, String[]logic){
        fulltable="("+fulltable+")";
        StringBuffer sb=new StringBuffer();
        if(name!=null&&name.length>0){

            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                String lgc=" "+(logic[i].equals("and")?"and":logic[i])+" ";
                if(compare[i].equals(">=")){
                    sb.append(lgc+" CAST("+col_name+" AS real) >= "+value[i]+") ");
                }else if(compare[i].equals("<=")){
                    sb.append(lgc+" CAST("+col_name+" AS real) <= "+value[i]+") ");
                }else if(compare[i].equals("=")){
                    sb.append(lgc+col_name+" = "+value[i]+" ");
                }else if(compare[i].equals("match")){
                    if("division".equalsIgnoreCase(col_name)){ //行政区划为 两个%%
                        sb.append(lgc+col_name+" like '%"+value[i]+"%' ");
                    }else{
                        sb.append(lgc+col_name+" like '"+value[i]+"%' ");
                    }
                }
            }
        }

        return sb.toString();
    }

    @Test
    public  void testMain() {
        String fulltable="select a.*,a.rowid as businessid,b.displayname from business a,users b" +
                " where a.userid = b.id   and a.division like '舟山市%' and a.businesstype = '低保'";

        String[] name={"status","age"};
        String[] compare={">=",">="};
        String[] value={"1","25"};
        String[] logic={"and","and"};
        String result=Intelligent.generalSql(fulltable,name,compare,value,logic);
        System.out.println(result);
    }
}
