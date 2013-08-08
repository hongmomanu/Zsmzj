package Zsmzj.jdbc;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-8
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */
public class jdbcFactory {
    private static Connection conn = null;

    public static  Connection getConn(String dbtype) {
        try {

            if(conn==null||conn.isClosed()){
                if(dbtype.equalsIgnoreCase("sqlite")){

                }
                else if(dbtype.equalsIgnoreCase("postgres")){
                    PostgreSql db = new PostgreSql();
                    conn = db.getConn();

                }
            }

        }catch (SQLException ex){



        }
        return conn;



    }



}
