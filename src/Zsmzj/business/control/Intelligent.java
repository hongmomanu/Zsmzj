package Zsmzj.business.control;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by weipan on 2014/4/29.
 */
public class Intelligent {

    public static String[] generalSql(String fulltable,String[]name, String[] compare, String[] value, String[]logic){
        String sql_list="";
        String sql_count="";

        if(name!=null&&name.length>0){


            for(int i=0;i<name.length;i++){
                String col_name=name[i].split("附")[0];
                if(compare[i].equals(">=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) >= "+value[i]+")";
                    }
                    sql_list+=sql;
                    sql_count+=sql;


                }else if(compare[i].equals("<=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+" a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+") ";

                    }else{
                        sql=" "+logic[i]+" (a.id in (select id from "+fulltable+" where CAST("+col_name+" AS real) <= "+value[i]+")";
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }else if(compare[i].equals("=")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') ";

                    }else{
                        sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" = '"+value[i]+"') ";
                    }
                    sql_list+=sql;
                    sql_count+=sql;

                }else if(compare[i].equals("match")){
                    String sql=" ";
                    if(logic[i].equals("and")){
                        if("division".equalsIgnoreCase(col_name)){ //行政区划为 两个%%

                            sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%') ";
                        }else{

                            sql=" "+logic[i]+"  a.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%') ";
                        }


                    }else{
                        if("division".equalsIgnoreCase(col_name)){

                            sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" like '%"+value[i]+"%')";
                        }else{

                            sql=" "+logic[i]+"  (a.id in (select id from "+fulltable+" where "+col_name+" like '"+value[i]+"%')";
                        }
                    }
                    sql_list+=sql;
                    sql_count+=sql;
                }
            }
        }
        String[] strArray=new String[2];
        strArray[0]=sql_list;
        strArray[1]=sql_count;
        return strArray;
    }
}
